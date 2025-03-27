'use client';
import React, { useState } from 'react';
import { BookOpen, Upload, CheckCircle, FileText } from 'lucide-react';
import {
  uploadPdfToStorage,
  saveAssignmentToFirestore,
  AssignmentDetails
} from '@/app/api/assignment/route';
import Navbar from '@/components/navbar/page';
import Footer from '@/components/footer/page';
import { div } from 'framer-motion/client';

const TeacherAssignmentUpload = () => {
  const [assignment, setAssignment] = useState<File | null>(null);
  const [assignmentDetails, setAssignmentDetails] = useState<AssignmentDetails>({
    title: '',
    description: '',
    dueDate: '',
    classCode: '',
    teacherName: '',
    subject: '',
    subjectCode: '',
    semester: '',
    course: ''
  });
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const file = files[0];
      setAssignment(file);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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
        classCode: '',
        teacherName: '',
        subject: '',
        subjectCode: '',
        semester: '',
        course: ''
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
    <div>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-sky-100 flex items-center justify-center p-4 pt-20">
        <div className="
      w-full 
      max-w-3xl 
      bg-white 
      rounded-2xl 
      shadow-2xl 
      overflow-hidden
      border-t-4 
      border-sky-600
      transform transition-all duration-300 hover:scale-[1.01]
    ">
          <div className="p-8">
            {/* Header */}
            <div className="flex items-center mb-8 space-x-4">
              <BookOpen className="w-12 h-12 text-sky-600 drop-shadow-md" />
              <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                Assignment Upload Portal
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* First Row: Teacher Name */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Teacher Name
                </label>
                <input
                  type="text"
                  name="teacherName"
                  value={assignmentDetails.teacherName}
                  onChange={handleInputChange}
                  placeholder="Your Name"
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

              <div className="">
                {/* Second Row: Subject and Subject Code */}
                <div className="grid md:grid-cols-5 gap-6">
                  <div className="md:col-span-3">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={assignmentDetails.subject}
                      onChange={handleInputChange}
                      placeholder="Mathematics"
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
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Subject Code
                    </label>
                    <input
                      type="text"
                      name="subjectCode"
                      value={assignmentDetails.subjectCode}
                      onChange={handleInputChange}
                      placeholder="MATH101"
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
                </div>
              </div>

              {/* Course and Semester */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Select Course
                  </label>
                  <select
                    name="course"
                    value={assignmentDetails.course}
                    onChange={handleInputChange}
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
                  >
                    <option value="" disabled>Select a Course</option>
                    <option value="Bachelor of Technology">B.Tech</option>
                    <option value="Bachelor of Computer Application">BCA</option>
                    <option value="Bachelor of Arts">B.A</option>
                    <option value="Bachelor of Business Administration">BBA</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Semester
                  </label>
                  <input
                    type="text"
                    name="semester"
                    value={assignmentDetails.semester}
                    onChange={handleInputChange}
                    min="1"
                    max="8"
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
              </div>

              {/* Assignment Details */}
              <div className="space-y-6">
                <div className='grid md:grid-cols-5 gap-6'>
                  <div className='md:col-span-3'>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Assignment Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={assignmentDetails.title}
                      onChange={handleInputChange}
                      placeholder="Enter assignment title"
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
                  <div className='md:col-span-2'>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Due Date
                    </label>
                    <input
                      type="date"
                      name="dueDate"
                      value={assignmentDetails.dueDate}
                      onChange={handleInputChange}
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
                </div>


                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Assignment Description
                  </label>
                  <textarea
                    name="description"
                    value={assignmentDetails.description}
                    onChange={handleInputChange}
                    placeholder="Provide detailed assignment instructions"
                    rows={4}
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


              </div>

              {/* File Upload */}
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6">
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
              "
                >
                  <FileText className="w-12 h-12 text-sky-600 mb-4" />
                  <p className="text-gray-700 font-medium text-center">
                    {assignment
                      ? `Uploaded: ${assignment.name}`
                      : 'Click to Upload Assignment PDF'
                    }
                  </p>
                </label>

                {assignment && (
                  <div className="mt-4 flex items-center justify-center text-green-600">
                    <CheckCircle className="mr-2 w-6 h-6" />
                    <span className="font-semibold">File Ready for Upload</span>
                  </div>
                )}
              </div>

              {/* Status Messages */}
              {uploadStatus === 'uploading' && (
                <div className="text-center text-sky-700 font-semibold">
                  Uploading assignment...
                </div>
              )}
              {uploadStatus === 'success' && (
                <div className="text-center text-green-600 font-semibold">
                  Assignment uploaded successfully!
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="
              w-full 
              bg-sky-600 
              text-white 
              py-4 
              rounded-lg 
              font-bold 
              text-lg 
              hover:bg-sky-700 
              transition-colors 
              shadow-lg 
              hover:shadow-xl
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
                disabled={
                  uploadStatus === 'uploading' ||
                  !assignment
                }
              >
                Publish Assignment
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TeacherAssignmentUpload;