import React from 'react';
import { FileText, ArrowRight } from 'lucide-react';
// import { useRouter } from 'next/router';

const TeacherUploadLandingButton = () => {
    const handleClick = () => {
        // Navigation logic can be added here
        // For example: window.location.href = '/teacher/upload'
        console.log('Navigating to teacher upload page');
        // route to open-form page
        window.location.href = '/teacher/verify-teacher';
        // useRouter().push('/teacher/verify-teacher');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-sky-50/50 p-4">
            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                    Streamline Your <span className="text-sky-700">Classroom</span> Assignments
                </h1>
                <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
                    Effortlessly manage and distribute assignments with our intuitive platform
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
                Are You a Teacher? Upload Assignment Here
                <ArrowRight className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-1" />
            </button>
        </div>
    );
};

export default TeacherUploadLandingButton;