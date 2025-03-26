'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Adjust the import path to your Firebase config
import { FileText, Upload } from 'lucide-react';

interface classDetails {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    classCode: string;
    teacherName: string;
    subject: string;
    fileURL?: string;
    uploadedAt: string;
    createdAt: string;
}

const ClassAssignmentsPage = () => {
    const [classCode, setClassCode] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [assignments, setAssignments] = useState<classDetails[]>([]);

    // Function to fetch existing assignments for the class
    const fetchExistingAssignments = async (classCode: string) => {
        console.log('Fetching existing requests for assignments:', classCode);
        try {
            setIsLoading(true);
            const requestsQuery = query(
                collection(db, 'assignments'),
                where('classCode', '==', classCode)
            );
            console.log('Requests query:', requestsQuery);

            const requestsSnapshot = await getDocs(requestsQuery);
            console.log('Requests snapshot:', requestsSnapshot);
            const requests: classDetails[] = [];
            requestsSnapshot.forEach(doc => {
                const data = doc.data();
                requests.push({
                    id: doc.id,
                    title: data.title,
                    description: data.description,
                    dueDate: data.dueDate,
                    classCode: data.classCode,
                    teacherName: data.teacherName,
                    subject: data.subject,
                    fileURL: data.fileURL,
                    uploadedAt: data.uploadedAt,
                    createdAt: data.createdAt
                });
            });

            setAssignments(requests);
        } catch (error) {
            setError('An error occurred while fetching assignments. Please try again.');
            console.error('Error fetching assignments requests:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const checkClassCode = async () => {
            try {
                setIsLoading(true);

                // Get houseId from URL parameters
                const params = new URLSearchParams(window.location.search);
                const classCode = params.get('classCode');

                if (!classCode) {
                    setIsLoading(false);
                    return;
                }

                console.log('Class Code:', classCode);

                // Query Firestore to check if houseId exists
                const classQuery = query(
                    collection(db, 'classes'),
                    where('classCode', '==', classCode),
                );

                const classSnapshot = await getDocs(classQuery);

                if (classSnapshot.empty) {
                    alert('This class does not exist.');
                    window.location.href = '/student/class-code';
                    return;
                }

                setClassCode(classCode);

                // Fetch existing assignments for the class
                await fetchExistingAssignments(classCode);

                setIsLoading(false);
            } catch (error) {
                console.error('Error checking class code:', error);
                setIsLoading(false);
                alert('An error occurred while checking the class code. Please try again.');
            }
        };

        checkClassCode();
    }, []);
    const handleViewAssignment = (fileURL: string | URL | undefined) => {
        if (fileURL) {
            window.open(fileURL, '_blank');
        }
    };

    const formatDate = (dateString: string | number | Date) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleSubmitAssignment = (assignmentId: string) => {
        // Navigate to assignment submission page
        // router.push(`/student/class/${classCode}/assignment/${assignmentId}/submit`);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-sky-50 flex items-center justify-center">
                <div className="text-sky-700 text-xl">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-sky-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <h2 className="text-sky-700 text-2xl font-bold mb-4">
                        Error
                    </h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.history.back()}
                        className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-sky-50 p-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-sky-700 text-3xl font-bold mb-6 text-center">
                    Class Assignments
                </h1>
                <p className="text-gray-600 text-center mb-6">
                    Class Code: {classCode.toUpperCase()}
                </p>

                {assignments.length === 0 ? (
                    <div className="text-center text-gray-600">
                        No assignments available for this class.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {assignments.map((assignment) => (
                            <div
                                key={assignment.id}
                                className="border border-gray-200 rounded-lg p-4 hover:bg-sky-50 transition-colors"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-sky-700 text-xl font-semibold">
                                            {assignment.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            {assignment.subject} | by {assignment.teacherName}
                                        </p>
                                    </div>
                                    <span className="text-gray-500 text-xs">
                                        Assigned: {formatDate(assignment.createdAt)}
                                    </span>
                                </div>

                                <p className="text-gray-600 mb-4">
                                    {assignment.description}
                                </p>

                                <div className="flex justify-between items-center">
                                    <div className="text-gray-500 text-sm">
                                        <strong>Due:</strong> {formatDate(assignment.dueDate)}
                                    </div>

                                    <div className="flex space-x-2">
                                        {assignment.fileURL && (
                                            <button
                                                onClick={() => handleViewAssignment(assignment.fileURL)}
                                                className="bg-sky-100 text-sky-700 px-3 py-1 rounded-lg hover:bg-sky-200 transition-colors flex items-center space-x-1"
                                            >
                                                <FileText size={16} />
                                                <span>View Assignment</span>
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleSubmitAssignment(assignment.id)}
                                            className="bg-amber-500 text-white px-3 py-1 rounded-lg hover:bg-amber-600 transition-colors flex items-center space-x-1"
                                        >
                                            <Upload size={16} />
                                            <span>Submit</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClassAssignmentsPage;