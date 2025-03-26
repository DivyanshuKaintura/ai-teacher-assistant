import React, { useState } from 'react';
import { Upload, FileText, BookOpen, CheckCircle } from 'lucide-react';

const TeacherAssignmentUpload = () => {
  const [assignment, setAssignment] = useState(null);
  const [assignmentDetails, setAssignmentDetails] = useState({
    title: '',
    description: '',
    dueDate: ''
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setAssignment(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAssignmentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for submitting assignment would go here
    console.log('Assignment Submitted', { 
      file: assignment, 
      details: assignmentDetails 
    });
  };

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
              rows="4"
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
                    : 'Click to Upload Assignment File'
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
              disabled={!assignment || !assignmentDetails.title || !assignmentDetails.description || !assignmentDetails.dueDate}
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