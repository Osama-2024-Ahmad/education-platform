import { db } from "@/config/db"
import { coursesTable } from "@/config/schema"
import { currentUser } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function GET(req) {
    const { searchParams } = new URL(req.url)

    const courseId = searchParams.get("courseId")

    const user = await currentUser()

    if (courseId) {
        const result = await db.select().from(coursesTable).where(eq(coursesTable.cid, courseId))

        console.log(result)

        // Parse courseContent if it's a JSON string
        if (result[0] && result[0].courseContent && typeof result[0].courseContent === 'string') {
            try {
                result[0].courseContent = JSON.parse(result[0].courseContent)
            } catch (e) {
                console.error("Failed to parse courseContent:", e)
            }
        }

        return NextResponse.json(result[0])
    }
    else {
        const result = await db.select().from(coursesTable).where(eq(coursesTable.email, user?.primaryEmailAddress?.emailAddress))

        console.log(result)

        // Parse courseContent for each course
        result.forEach(course => {
            if (course.courseContent && typeof course.courseContent === 'string') {
                try {
                    course.courseContent = JSON.parse(course.courseContent)
                } catch (e) {
                    console.error("Failed to parse courseContent:", e)
                }
            }
        })

        return NextResponse.json(result)
    }

}