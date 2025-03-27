'use client';
import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { FileText, Upload, CheckCircle, XCircle } from 'lucide-react';
// import Markdown from 'react-markdown';

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

const formatGeminiResponse = (response: string) => {
    // Remove any potential markdown symbols or extra formatting
    const cleanedResponse = response.replace(/\*\*/g, '').replace(/\*/g, '');

    // Split the response into sections
    const sections = cleanedResponse.split(/\n\n/).filter(section => section.trim() !== '');

    // Create a structured response with different sections
    return sections.map((section, index) => {
        // Determine section type
        if (section.toLowerCase().includes('overall')) {
            return {
                type: 'overall',
                content: section
            };
        } else if (section.toLowerCase().includes('question')) {
            return {
                type: 'question',
                content: section
            };
        } else {
            return {
                type: 'general',
                content: section
            };
        }
    });
};

const ClassAssignmentsPage = () => {
    const [course, setCourse] = useState<string | null>(null);
    const [semester, setSemester] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [assignments, setAssignments] = useState<classDetails[]>([]);
    const [uploadedAssignment, setUploadedAssignment] = useState<File | null>(null);
    const [processingResponse, setProcessingResponse] = useState<boolean>(false);
    const [response, setResponse] = useState<{ type: string, content: string }[] | null>(null);

    useEffect(() => {
        const getDetails = async () => {
            try {
                setIsLoading(true);
                const params = new URLSearchParams(window.location.search);
                const course = params.get('course');
                setCourse(course);
                const semester = params.get('semester');
                setSemester(semester);

                if (!course || !semester) {
                    setIsLoading(false);
                    return;
                }

                const assignmentQuery = query(
                    collection(db, 'assignments'),
                    where('course', '==', course),
                    where('semester', '==', semester),
                );

                const assignmentSnapshot = await getDocs(assignmentQuery);
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

    // const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const files = event.target.files;
    //     if (files && files.length > 0) {
    //         const file = files[0];
    //         setUploadedAssignment(file);

    //         try {
    //                 const fileBuffer = await file.arrayBuffer();
    //                 const base64File = btoa(String.fromCharCode(...new Uint8Array(fileBuffer)));
    //                 setProcessingResponse(true);

    //                 // console.log('file from main:', base64File);

    //                 // Send file to `/api/extract-text`.

    //                 const apiKey = process.env.GOOGLE_CLOUD_VISION_API_KEY; // Store API key in .env file
    //                 const visionAPIUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
            
    //                 const requestBody = {
    //                     requests: [
    //                         {
    //                             image: {
    //                                 content: base64File, // Use the entire base64 string of the file
    //                             },
    //                             features: [
    //                                 {
    //                                     type: "DOCUMENT_TEXT_DETECTION", // Use DOCUMENT_TEXT_DETECTION for better document text extraction
    //                                 },
    //                             ],
    //                         },
    //                     ],
    //                 };
            
    //                 console.log('File: ', base64File);
    //                 console.log(requestBody);

    //                 const response = await fetch(visionAPIUrl, {
    //                     method: "POST",
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                     },
    //                     body: JSON.stringify(requestBody),
    //                 });
            
    //                 // Parse the response from the Vision API
    //                 const data = await response.json();
    //                 const extractedText =
    //                     data.responses[0]?.fullTextAnnotation?.text ||
    //                     "No text detected"; // Fallback text in case nothing is

    //                 // const response = await fetch("/api/extract-text", {
    //                 //     method: "POST",
    //                 //     headers: {
    //                 //         "Content-Type": "application/json",
    //                 //     },
    //                 //     body: JSON.stringify({ file: base64File }),
    //                 // });

    //                 // if (!response.ok) {
    //                 //     throw new Error("Failed to extract text from the PDF.");
    //                 // }

    //                 // const data = await response.json();
    //                 // const extractedText = data.text;
    //                 console.log('Extracted text: ', extractedText);

    //                 const payload = {
    //                     assignmentText: extractedText,
    //                     instructions: "Check each question for correctness, provide feedback for improvement, and summarize overall performance. Give only very brief solution, and tell the student what they did right or wrong. Give response as if you are giving response to a student directly.",
    //                 };

    //                 // Send text to `/api/get-response`.
    //                 // const responseGemini = await fetch("/api/get-response", {
    //                 //     method: "POST",
    //                 //     headers: {
    //                 //         "Content-Type": "application/json",
    //                 //     },
    //                 //     body: JSON.stringify(payload),
    //                 // });

    //                 // if (!responseGemini.ok) {
    //                 //     throw new Error("Failed to process the assignment with Gemini API.");
    //                 // }

    //                 // const result = await responseGemini.json();
    //                 const formattedResponse = formatGeminiResponse("answer");
    //                 console.log(formattedResponse);
    //                 setResponse(formattedResponse);
    //                 setProcessingResponse(false);
                

    //         } catch (error) {
    //             console.error("Error uploading file:", error);
    //             setProcessingResponse(false);
    //         }
    //     } else {
    //         alert("Please upload an assignment in PDF format.");
    //     }
    // };


    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setUploadedAssignment(file);
    
            try {
                const fileBuffer = await file.arrayBuffer();
                const base64File = btoa(String.fromCharCode(...new Uint8Array(fileBuffer)));
                setProcessingResponse(true);
    
                const apiKey = process.env.NEXT_PUBLIC_GOOGLE_CLOUD_VISION_API_KEY; 
                const visionAPIUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
        
                const requestBody = {
                    requests: [
                        {
                            image: {
                                content: base64File,
                            },
                            features: [
                                {
                                    type: "TEXT_DETECTION",
                                    maxResults: 1
                                },
                            ],
                        },
                    ],
                };
        
                console.log('API Key:', apiKey ? 'Present' : 'Missing');
                console.log('Request URL:', visionAPIUrl);
                console.log('Request Body:', JSON.stringify(requestBody).slice(0, 200) + '...'); // Truncate for logging
    
                const response = await fetch(visionAPIUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(requestBody),
                });
        
                // Log full response for debugging
                const responseData = await response.json();
                
                if (!response.ok) {
                    console.error('Vision API Error Response:', responseData);
                    throw new Error(`API call failed with status ${response.status}: ${JSON.stringify(responseData)}`);
                }
    
                const extractedText =
                    responseData.responses[0]?.fullTextAnnotation?.text ||
                    "No text detected";
    
                console.log('Extracted text: ', extractedText);
    
                const payload = {
                    assignmentText: extractedText,
                    instructions: "Check each question for correctness, provide feedback for improvement, and summarize overall performance. Give only very brief solution, and tell the student what they did right or wrong. Give response as if you are giving response to a student directly.",
                };
    
                const formattedResponse = formatGeminiResponse("answer");
                console.log(formattedResponse);
                setResponse(formattedResponse);
                setProcessingResponse(false);
        
            } catch (error) {
                console.error("Error uploading file:", error);
                setProcessingResponse(false);
                // Optionally, show an error message to the user
                alert(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        } else {
            alert("Please upload an assignment in PDF format.");
        }
    };

    const renderResponseSection = (section: { type: string, content: string }) => {
        let iconColor = 'text-blue-600';
        let Icon = CheckCircle;

        switch (section.type) {
            case 'overall':
                Icon = CheckCircle;
                iconColor = 'text-green-600';
                break;
            case 'question':
                Icon = XCircle;
                iconColor = 'text-red-600';
                break;
            default:
                Icon = CheckCircle;
                iconColor = 'text-blue-600';
        }

        return (
            <div key={section.content} className="bg-white rounded-lg shadow-md p-4 mb-4 flex items-start space-x-4">
                <Icon className={`${iconColor} flex-shrink-0 mt-1`} size={24} />
                <div className="flex-grow">
                    <p className="text-gray-800">{section.content}</p>
                </div>
            </div>
        );
    };

    // Processing Overlay Component
    const ProcessingOverlay = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full">
                <div className="animate-pulse mb-4">
                    <svg className="mx-auto h-16 w-16 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-sky-700 mb-2">Processing Assignment</h2>
                <p className="text-gray-600 mb-4">We're analyzing your submission and generating personalized feedback.</p>
                <div className="w-full bg-sky-100 h-1 rounded-full overflow-hidden">
                    <div className="bg-sky-500 h-full w-full animate-pulse"></div>
                </div>
            </div>
        </div>
    );

    if (isLoading) {
        return (
            <div className="min-h-screen bg-sky-50 flex items-center justify-center">
                <div className="text-sky-700 text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-sky-50 p-4">
            {processingResponse && <ProcessingOverlay />}

            {response && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-sky-700">Assignment Feedback</h2>
                            <button
                                onClick={() => setResponse(null)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <XCircle size={24} />
                            </button>
                        </div>
                        {response.map(renderResponseSection)}
                    </div>
                </div>
            )}

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
                                <div className="flex flex-col sm:flex-row justify-between items-start mb-2">
                                    <div className="mb-2 sm:mb-0">
                                        <h3 className="text-sky-700 text-xl font-semibold">
                                            {assignment.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            {assignment.subject} ({assignment.subjectCode}) | by {assignment.teacherName}
                                        </p>
                                    </div>
                                    <span className="text-gray-500 text-xs">
                                        Assigned: {new Date(assignment.createdAt).toLocaleDateString()}
                                    </span>
                                </div>

                                <p className="text-gray-600 mb-4">
                                    {assignment.description}
                                </p>

                                <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                                    <div className="text-gray-500 text-sm">
                                        <strong>Due:</strong> {new Date(assignment.dueDate).toLocaleDateString()}
                                    </div>

                                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                                        {assignment.fileURL && (
                                            <button
                                                onClick={() => window.open(assignment.fileURL, '_blank')}
                                                className="w-full sm:w-auto bg-sky-100 text-sky-700 px-3 py-1 rounded-lg hover:bg-sky-200 transition-colors flex items-center justify-center space-x-1"
                                            >
                                                <FileText size={16} />
                                                <span>View Assignment</span>
                                            </button>
                                        )}
                                        <div className="w-full sm:w-auto bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
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
                                                    w-full
                                                    text-center
                                                "
                                            >
                                                <Upload size={16} />
                                                <span>Upload Assignment</span>
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