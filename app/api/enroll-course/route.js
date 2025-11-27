import { db } from "@/config/db"
import { coursesTable, enrollToCourseTable } from "@/config/schema"
import { currentUser } from "@clerk/nextjs/server"
import { and, eq } from "drizzle-orm"
import { NextResponse } from "next/server"


BigInt.prototype.toJSON = function () {
    return this.toString()
}

export async function POST(req) {
    const { courseId } = await req.json()

    const user = await currentUser()



    // if already enrolled

    const enrollCourse = await db.select().from(enrollToCourseTable).where(and(eq(enrollToCourseTable.email, user?.primaryEmailAddress.emailAddress), eq(enrollToCourseTable.cid, courseId)))

    if (enrollCourse?.length == 0) {
        const result = await db.insert(enrollToCourseTable).values({
            cid: courseId,
            email: user?.primaryEmailAddress?.emailAddress
        }).returning(enrollToCourseTable)

        return NextResponse.json(result)
    }

    return NextResponse.json({ message: "already enrolled" })


}

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url)
        const courseId = searchParams.get("courseId")
        const user = await currentUser()

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        if (courseId) {
            let result = await db.select().from(coursesTable).innerJoin(enrollToCourseTable, eq(coursesTable.cid, enrollToCourseTable.cid)).where(and(eq(enrollToCourseTable.email, user?.primaryEmailAddress?.emailAddress), eq(enrollToCourseTable.cid, courseId)))

            // If user is not enrolled, auto-enroll them
            if (!result || result.length === 0) {
                console.log("User not enrolled, auto-enrolling...");
                await db.insert(enrollToCourseTable).values({
                    cid: courseId,
                    email: user?.primaryEmailAddress?.emailAddress
                })

                // Fetch again after enrollment
                result = await db.select().from(coursesTable).innerJoin(enrollToCourseTable, eq(coursesTable.cid, enrollToCourseTable.cid)).where(and(eq(enrollToCourseTable.email, user?.primaryEmailAddress?.emailAddress), eq(enrollToCourseTable.cid, courseId)))
            }

            console.log("Enroll Course Result:", result[0]);

            // Parse courseContent if it's a JSON string
            if (result[0]?.courses?.courseContent && typeof result[0].courses.courseContent === 'string') {
                try {
                    result[0].courses.courseContent = JSON.parse(result[0].courses.courseContent)
                } catch (e) {
                    console.error("Failed to parse courseContent:", e)
                }
            }

            return NextResponse.json(result[0])
        }
        else {
            const result = await db.select().from(coursesTable).innerJoin(enrollToCourseTable, eq(coursesTable.cid, enrollToCourseTable.cid)).where(eq(enrollToCourseTable.email, user?.primaryEmailAddress?.emailAddress))

            // Parse courseContent for each course
            result.forEach(item => {
                if (item?.courses?.courseContent && typeof item.courses.courseContent === 'string') {
                    try {
                        item.courses.courseContent = JSON.parse(item.courses.courseContent)
                    } catch (e) {
                        console.error("Failed to parse courseContent:", e)
                    }
                }
            })

            return NextResponse.json(result)
        }
    } catch (error) {
        console.error("Error in enroll-course GET:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}