import React from 'react'
import CourseList from '../_components/CourseList'

export default function ExploreCourses() {
    return (
        <div className="p-4">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground">Explore Courses</h1>
                <p className="text-muted-foreground mt-2">
                    Browse and discover AI-generated courses.
                </p>
            </div>

            <CourseList />
        </div>
    )
}
