import React from 'react';
import { FileText, ArrowRight } from 'lucide-react';

const StudentStatusCheck = () => {
    const handleClick = () => {
        window.location.href = '/student/class-code';
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-sky-50/50 p-4">
            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                    Submit Your <span className="text-sky-700">Classroom</span> Assignments
                </h1>
                <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
                    Effortlessly see the assignment given by your teacher
                </p>
            </div>

            <button
                onClick={handleClick}
                className="
          flex 
          items-center 
          justify-center 
          group
          bg-amber-500 
          text-white 
          px-8 
          py-4 
          rounded-lg 
          hover:bg-amber-600 
          transition-colors 
          duration-300 
          shadow-lg
          hover:shadow-xl
          text-lg
          font-semibold
        "
            >
                <FileText className="w-6 h-6 mr-3 text-white group-hover:animate-pulse" />
                Are You a Student? Upload Assignment Solution Here
                <ArrowRight className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-1" />
            </button>
        </div>
    );
};

export default StudentStatusCheck;