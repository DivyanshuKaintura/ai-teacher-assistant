'use client';
import React, { useState } from 'react';
import { Upload, BookOpen, CheckCircle } from 'lucide-react';
import {
  uploadPdfToStorage,
  saveAssignmentToFirestore,
  AssignmentDetails
} from '@/app/api/assignment/route';

const TeacherAssignmentUpload = () => {
  const [assignment, setAssignment] = useState<File | null>(null);
  const [assignmentDetails, setAssignmentDetails] = useState<AssignmentDetails>({
    title: '',
    description: '',
    dueDate: '',
    teacherName: '',
    subject: ''
  });
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const file = files[0];
      setAssignment(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAssignmentDetails((prev: any) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!assignment) {
      alert('Please upload an assignment file');
      return;
    }

    try {
      setUploadStatus('uploading');

      // Upload PDF to Firebase Storage
      const fileURL = await uploadPdfToStorage(assignment);

      // Prepare assignment details with file URL
      const completeAssignmentDetails: AssignmentDetails = {
        ...assignmentDetails,
        fileURL
      };

      // Save assignment details to Firestore
      const docId = await saveAssignmentToFirestore(completeAssignmentDetails);

      // Reset form and show success
      setAssignment(null);
      setAssignmentDetails({
        title: '',
        description: '',
        dueDate: '',
        teacherName: '',
        subject: ''
      });
      setUploadStatus('success');

      console.log('Assignment uploaded with ID: ', docId);
    } catch (error) {
      console.error('Error uploading assignment: ', error);
      setUploadStatus('error');
      alert('Failed to upload assignment. Please try again.');
    }
  };

  // The rest of the component remains the same as in the previous example
  return (
    <div className="min-h-screen bg-sky-50/50 flex items-center justify-center p-4">
      <div className="
        w-full max-w-2xl 
        bg-white 
        rounded-xl 
        shadow-lg 
        p-8 
        border-t-4 
        border-sky-700
      ">
        <div className="flex items-center mb-6">
          <BookOpen className="w-10 h-10 text-sky-700 mr-4" />
          <h1 className="text-2xl font-bold text-gray-800">
            Upload Assignment for Students
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Teacher Name Input */}
          <div>
            <label
              htmlFor="teacher-name"
              className="block text-gray-600 mb-2"
            >
              Teacher Name
            </label>
            <input
              type="text"
              id="teacher-name"
              name="teacherName"
              value={assignmentDetails.teacherName}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="
                w-full 
                p-3 
                border 
                border-gray-300 
                rounded-lg 
                focus:border-sky-700 
                focus:ring-2 
                focus:ring-sky-50
                text-gray-800
              "
              required
            />
          </div>

          {/* Subject Input */}
          <div>
            <label
              htmlFor="subject"
              className="block text-gray-600 mb-2"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={assignmentDetails.subject}
              onChange={handleInputChange}
              placeholder="Enter subject name"
              className="
                w-full 
                p-3 
                border 
                border-gray-300 
                rounded-lg 
                focus:border-sky-700 
                focus:ring-2 
                focus:ring-sky-50
                text-gray-800
              "
              required
            />
          </div>

          {/* Existing inputs for Assignment Title, Description, Due Date */}
          <div>
            <label
              htmlFor="assignment-title"
              className="block text-gray-600 mb-2"
            >
              Assignment Title
            </label>
            <input
              type="text"
              id="assignment-title"
              name="title"
              value={assignmentDetails.title}
              onChange={handleInputChange}
              placeholder="Enter assignment title"
              className="
                w-full 
                p-3 
                border 
                border-gray-300 
                rounded-lg 
                focus:border-sky-700 
                focus:ring-2 
                focus:ring-sky-50
                text-gray-800
              "
              required
            />
          </div>

          <div>
            <label
              htmlFor="assignment-description"
              className="block text-gray-600 mb-2"
            >
              Assignment Description
            </label>
            <textarea
              id="assignment-description"
              name="description"
              value={assignmentDetails.description}
              onChange={handleInputChange}
              placeholder="Provide assignment details and instructions"
              rows={4}
              className="
                w-full 
                p-3 
                border 
                border-gray-300 
                rounded-lg 
                focus:border-sky-700 
                focus:ring-2 
                focus:ring-sky-50
                text-gray-800
              "
              required
            />
          </div>

          <div>
            <label
              htmlFor="due-date"
              className="block text-gray-600 mb-2"
            >
              Due Date
            </label>
            <input
              type="date"
              id="due-date"
              name="dueDate"
              value={assignmentDetails.dueDate}
              onChange={handleInputChange}
              className="
                w-full 
                p-3 
                border 
                border-gray-300 
                rounded-lg 
                focus:border-sky-700 
                focus:ring-2 
                focus:ring-sky-50
                text-gray-800
              "
              required
            />
          </div>

          {/* File Upload Section */}
          <div>
            <label
              htmlFor="file-upload"
              className="block text-gray-600 mb-2"
            >
              Upload Assignment File
            </label>
            <div
              className="
                border-2 
                border-dashed 
                rounded-lg 
                p-4 
                text-center 
                cursor-pointer 
                hover:border-sky-700 
                transition-colors 
                duration-300
                bg-gray-50
              "
            >
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
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="w-8 h-8 text-gray-600 mb-2" />
                <p className="text-gray-600">
                  {assignment
                    ? `${assignment.name}`
                    : 'Click to Upload PDF Assignment File'
                  }
                </p>
              </label>
            </div>

            {assignment && (
              <div className="mt-4 flex items-center text-green-600">
                <CheckCircle className="mr-2 w-5 h-5" />
                <span className="text-sm">File Uploaded Successfully</span>
              </div>
            )}
          </div>

          {/* Upload Status Indicator */}
          {uploadStatus === 'uploading' && (
            <div className="text-center text-sky-700">
              Uploading assignment...
            </div>
          )}
          {uploadStatus === 'success' && (
            <div className="text-center text-green-600">
              Assignment uploaded successfully!
            </div>
          )}
          {uploadStatus === 'error' && (
            <div className="text-center text-red-600">
              Upload failed. Please try again.
            </div>
          )}

          <div className="text-center">
            <button
              type="submit"
              className="
                bg-amber-500 
                text-white 
                px-8 
                py-3 
                rounded-lg 
                hover:bg-amber-600 
                transition-colors 
                duration-300 
                shadow-md
                w-full
              "
              disabled={
                uploadStatus === 'uploading' ||
                !assignment ||
                !assignmentDetails.title ||
                !assignmentDetails.description ||
                !assignmentDetails.dueDate ||
                !assignmentDetails.teacherName ||
                !assignmentDetails.subject
              }
            >
              Publish Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherAssignmentUpload;