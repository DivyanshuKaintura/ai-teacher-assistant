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
    subjectCode: string;
    semester: string;
    course: string;
    fileURL?: string;
    uploadedAt: string;
    createdAt: string;
}

const ClassAssignmentsPage = () => {
    const [course, setCourse] = useState<string | null>(null);
    const [semester, setSemester] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [assignments, setAssignments] = useState<classDetails[]>([]);
    const [uploadedAssignment, setUploadedAssignment] = useState<File | null>(null);

    useEffect(() => {
        const getDetails = async () => {
            try {
                setIsLoading(true);

                // Get houseId from URL parameters
                const params = new URLSearchParams(window.location.search);
                const course = params.get('course');
                setCourse(course);
                const semester = params.get('semester');
                setSemester(semester);

                if (!course || !semester) {
                    setIsLoading(false);
                    return;
                }

                console.log('Course:', course);
                console.log('Semester:', semester);

                // Query Firestore to check if houseId exists
                const assignmentQuery = query(
                    collection(db, 'assignments'),
                    where('course', '==', course),
                    where('semester', '==', semester),
                );

                console.log('Fetching existing requests for assignments:');
                const assignmentSnapshot = await getDocs(assignmentQuery);

                console.log('Assignments Returned: ', assignmentSnapshot.docs.length);
                const requests: classDetails[] = [];
                assignmentSnapshot.forEach(doc => {
                    const data = doc.data();
                    requests.push({
                        id: doc.id,
                        title: data.title,
                        description: data.description,
                        dueDate: data.dueDate,
                        classCode: data.classCode,
                        teacherName: data.teacherName,
                        subject: data.subject,
                        subjectCode: data.subjectCode,
                        semester: data.semester,
                        course: data.course,
                        fileURL: data.fileURL,
                        uploadedAt: data.uploadedAt,
                        createdAt: data.createdAt
                    });
                });

                setAssignments(requests);

                setIsLoading(false);
            } catch (error) {
                setError('');
                console.error('Error checking class code:', error);
                setIsLoading(false);
                alert('An error occurred while checking the class code. Please try again.');
            }
        };

        getDetails();
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

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
          const file = files[0];
          setUploadedAssignment(file);
        }

        try {
            if(!uploadedAssignment) {
                alert('Please upload assignment in PDF format.');
                return;
            }

            // const extractedText = await extractTextFromPDF(uploadedAssignment);


        } catch (error) {
            console.error('Error uploading file:', error);
        }
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
                    Assignments
                </h1>
                <p className="text-gray-600 text-center mb-6">
                    Course: {course}, Semester: {semester}
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
                                            {assignment.subject} ({assignment.subjectCode}) | by {assignment.teacherName}
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
                                        {/* File Upload */}
                                        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg ">
                                            <input
                                            type="file"
                                            id="file-upload"
                                            className="hidden"
                                            onChange={handleFileUpload}
                                            accept=".pdf"
                                            required
                                            />
                                            <label
                                            htmlFor="file-upload"
                                            className="
                                            flex 
                                            flex-col 
                                            items-center 
                                            cursor-pointer 
                                            hover:bg-sky-50 
                                            p-4 
                                            rounded-lg 
                                            transition-colors
                                            text-green-800
                                            bg-green-200
                                            "
                                                >
                                            Upload Assignment
                                            </label>

                                            
                                        </div>
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