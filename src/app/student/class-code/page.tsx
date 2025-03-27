'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen } from 'lucide-react';

const ClassCodeEntry = () => {
    const [course, setCourse] = useState<string>('');
    const [semester, setSemester] = useState<string>('');
    const [error, setError] = useState<string>('');
    const router = useRouter();

    const courses = [
        { value: 'Bachelor of Technology', label: 'B.Tech' },
        { value: 'Bachelor of Computer Application', label: 'BCA' },
        { value: 'Bachelor of Arts', label: 'B.A' },
        { value: 'Bachelor of Business Administration', label: 'BBA' }
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!course) {
            setError('Please select a course');
            return;
        }

        if (!semester || isNaN(Number(semester)) || Number(semester) < 1 || Number(semester) > 8) {
            setError('Please enter a valid semester (1-8)');
            return;
        }

        // Navigate to the student assignments page with course and semester
        router.push(`/student/assignments?course=${encodeURIComponent(course)}&semester=${semester}`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-sky-50/50 p-4">
            <div className="
                w-full 
                max-w-md 
                bg-white 
                rounded-2xl 
                shadow-2xl 
                p-8 
                border-t-4 
                border-sky-600
            ">
                <div className="flex items-center justify-center mb-6">
                    <BookOpen className="w-10 h-10 text-sky-700 mr-4" />
                    <h2 className="text-2xl font-bold text-gray-800">
                        Select Your Course
                    </h2>
                </div>

                <p className="text-gray-600 text-center mb-6">
                    Choose your course and current semester
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="course"
                            className="block text-gray-700 font-semibold mb-2"
                        >
                            Select Course
                        </label>
                        <select
                            id="course"
                            value={course}
                            onChange={(e) => {
                                setCourse(e.target.value);
                                setError('');
                            }}
                            className="
                                w-full 
                                p-3 
                                border-2 
                                border-gray-200 
                                rounded-lg 
                                focus:outline-none 
                                focus:border-sky-500 
                                transition-colors
                                bg-gray-50
                                text-gray-700
                            "
                            required
                        >
                            <option value="" disabled>Select your course</option>
                            {courses.map((courseOption) => (
                                <option
                                    key={courseOption.value}
                                    value={courseOption.value}
                                >
                                    {courseOption.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="semester"
                            className="block text-gray-700 font-semibold mb-2"
                        >
                            Enter Semester
                        </label>
                        <input
                            type="text"
                            id="semester"
                            value={semester}
                            onChange={(e) => {
                                // Only allow single digits 1-8
                                const value = e.target.value;
                                if (/^[1-8]?$/.test(value)) {
                                    setSemester(value);
                                    setError('');
                                }
                            }}
                            placeholder="Semester (1-8)"
                            className="
                                w-full 
                                p-3 
                                border-2 
                                border-gray-200 
                                rounded-lg 
                                focus:outline-none 
                                focus:border-sky-500 
                                transition-colors
                                bg-gray-50
                                placeholder-gray-400
                                tracking-wider
                               text-gray-800
                            "
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm text-center">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="
                            w-full 
                            py-3 
                            bg-sky-600 
                            text-white 
                            rounded-lg 
                            hover:bg-sky-700 
                            transition-colors 
                            font-semibold
                            shadow-md
                            hover:shadow-lg
                        "
                    >
                        Continue
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ClassCodeEntry;