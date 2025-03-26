'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ClassCodeEntry = () => {
    const [classCode, setClassCode] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        // Basic validation
        if (!classCode.trim()) {
            setError('Please enter a class code');
            return;
        }

        // Remove any whitespace and convert to uppercase
        const sanitizedClassCode = classCode.trim().toUpperCase();
        setClassCode(sanitizedClassCode);

        // Navigate to the student class page with the class code
        router.push(`/student/assignments?classCode=${classCode}`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-sky-50 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h2 className="text-sky-700 text-2xl font-bold mb-4 text-center">
                    Enter Class Code
                </h2>

                <p className="text-gray-600 text-center mb-6">
                    Please enter the class code provided by your instructor
                </p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={classCode}
                        onChange={(e) => {
                            setClassCode(e.target.value);
                            setError(''); // Clear error when user starts typing
                        }}
                        placeholder="Class Code"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-700"
                    />

                    {error && (
                        <p className="text-red-500 text-sm mb-4 text-center">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-semibold"
                    >
                        Join Class
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ClassCodeEntry;