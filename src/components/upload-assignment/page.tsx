import React, { useState } from 'react';
import { Upload, FileText, UserCircle, CheckCircle } from 'lucide-react';

const AssignmentUploadPortal = () => {
    const [teacherFile, setTeacherFile] = useState<File | null>(null);
    const [studentFile, setStudentFile] = useState<File | null>(null);
    const [activeRole, setActiveRole] = useState<'teacher' | 'student' | null>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, isTeacher: any) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (isTeacher) {
            setTeacherFile(file);
        } else {
            setStudentFile(file);
        }
    };

    const renderUploadSection = (isTeacher: boolean) => {
        const file = isTeacher ? teacherFile : studentFile;
        const roleText = isTeacher ? "Teacher Assignment" : "Student Solution";
        const icon = isTeacher ? <FileText className="w-10 h-10 text-sky-700" /> : <UserCircle className="w-10 h-10 text-sky-700" />;

        return (
            <div
                className={`
          p-6 rounded-lg shadow-md transition-all duration-300 
          ${activeRole === (isTeacher ? 'teacher' : 'student')
                        ? 'bg-sky-50 border-2 border-sky-700'
                        : 'bg-gray-50 hover:bg-sky-50/50'
                    }
        `}
                onClick={() => setActiveRole(isTeacher ? 'teacher' : 'student')}
            >
                <div className="flex items-center justify-between mb-4">
                    {icon}
                    <h2 className="text-gray-800 font-bold text-xl">{roleText}</h2>
                </div>

                <div
                    className="
            border-2 border-dashed rounded-lg p-4 
            text-center cursor-pointer 
            hover:border-sky-700 
            transition-colors duration-300
            bg-gray-50
          "
                >
                    <input
                        type="file"
                        className="hidden"
                        id={`${isTeacher ? 'teacher' : 'student'}-upload`}
                        onChange={(e) => handleFileUpload(e, isTeacher)}
                    />
                    <label
                        htmlFor={`${isTeacher ? 'teacher' : 'student'}-upload`}
                        className="cursor-pointer flex flex-col items-center"
                    >
                        <Upload className="w-8 h-8 text-gray-600 mb-2" />
                        <p className="text-gray-600">
                            {file
                                ? `${file.name}`
                                : `Click to Upload ${roleText}`
                            }
                        </p>
                    </label>
                </div>

                {file && (
                    <div className="mt-4 flex items-center text-green-600">
                        <CheckCircle className="mr-2 w-5 h-5" />
                        <span className="text-sm">File Uploaded Successfully</span>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-sky-50/50 flex items-center justify-center p-4">
            <div className="
        w-full max-w-4xl 
        bg-white 
        rounded-xl 
        shadow-lg 
        p-8 
        grid 
        md:grid-cols-2 
        gap-8
        border-t-4 
        border-sky-700
      ">
                <div className="space-y-4">
                    {renderUploadSection(true)}
                </div>
                <div className="space-y-4">
                    {renderUploadSection(false)}
                </div>

                <div className="md:col-span-2 text-center mt-6">
                    <button
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
            "
                        disabled={!teacherFile || !studentFile}
                    >
                        Submit Assignment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssignmentUploadPortal;