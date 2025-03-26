'use client';
import React, { useState } from 'react';
import { Lock, AlertTriangle, Info } from 'lucide-react';

interface LoginFormState {
    password: string;
    error: string;
    isLoggedIn: boolean;
}

const TeacherLogin: React.FC = () => {
    const [formState, setFormState] = useState < LoginFormState > ({
        password: '',
        error: '',
        isLoggedIn: false
    });

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState(prev => ({
            ...prev,
            password: e.target.value,
            error: ''
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Simple password check
        if (formState.password === 'teacher123') {
            setFormState(prev => ({
                ...prev,
                isLoggedIn: true,
                error: ''
            }));
        } else {
            setFormState(prev => ({
                ...prev,
                error: 'Incorrect password. Please try again.',
                isLoggedIn: false
            }));
        }
    };

    // If already logged in, you would typically redirect to another page
    if (formState.isLoggedIn) {
        return (
            <div className="min-h-screen bg-sky-50/50 flex items-center justify-center p-4">
                <div className="
          bg-white 
          rounded-xl 
          shadow-lg 
          p-8 
          max-w-md 
          w-full 
          text-center
          border-t-4 
          border-sky-700
        ">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Welcome, Teacher!
                    </h2>
                    <p className="text-gray-600 mb-6">
                        You are now logged in. Proceed to the dashboard.
                    </p>
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
            "
                        onClick={() => {
                            // Typically, you would use React Router to navigate
                            console.log('Navigate to teacher dashboard');
                        }}
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-sky-50/50 flex items-center justify-center p-4">
            <div className="
        bg-white 
        rounded-xl 
        shadow-lg 
        p-8 
        max-w-md 
        w-full
        border-t-4 
        border-sky-700
      ">
                <div className="flex items-center mb-6">
                    <Lock className="w-10 h-10 text-sky-700 mr-4" />
                    <h1 className="text-2xl font-bold text-gray-800">
                        Teacher Login
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-gray-600 mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={formState.password}
                            onChange={handlePasswordChange}
                            placeholder="Enter teacher password"
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

                    {formState.error && (
                        <div className="
              bg-red-50 
              border 
              border-red-200 
              text-red-700 
              p-3 
              rounded-lg 
              flex 
              items-center
            ">
                            <AlertTriangle className="w-6 h-6 mr-3" />
                            {formState.error}
                        </div>
                    )}

                    <div className="bg-sky-50 border border-sky-200 text-sky-700 p-3 rounded-lg flex items-start">
                        <Info className="w-6 h-6 mr-3 mt-1" />
                        <div>
                            <p className="font-semibold mb-2">Demo Authentication Notice</p>
                            <p className="text-sm">
                                This is a temporary login method. We will implement Firebase
                                Authentication soon for enhanced security.
                            </p>
                            <p className="text-sm mt-2">
                                Current Password: <code>teacher123</code>
                            </p>
                        </div>
                    </div>

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
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TeacherLogin;