import React from 'react';
import {
    Facebook,
    Twitter,
    Linkedin,
    Mail,
    Copyright
} from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-sky-800 to-sky-600 text-white py-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight">
                            AI Teacher Assistant
                        </h2>
                        <p className="text-sky-100 max-w-md">
                            Empowering educators and students through intelligent, personalized learning technologies.
                        </p>
                    </div>

                    {/* Social and Contact Section */}
                    <div className="flex flex-col space-y-6">
                        {/* Social Icons */}
                        <div className="flex space-x-6 justify-center md:justify-end">
                            {[
                                { Icon: Facebook, rotate: 6 },
                                { Icon: Twitter, rotate: -6 },
                                { Icon: Linkedin, rotate: 6 },
                                { Icon: Mail, rotate: -6 }
                            ].map(({ Icon, rotate }, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="
                                        bg-white/10 hover:bg-white/20 
                                        p-3 rounded-full 
                                        transition-all duration-300 
                                        flex items-center justify-center
                                        hover:scale-110 hover:rotate-6
                                    "
                                >
                                    <Icon className="text-white" size={24} />
                                </a>
                            ))}
                        </div>

                        {/* Copyright */}
                        <div className="flex items-center justify-center md:justify-end space-x-2 text-sky-100">
                            <Copyright size={16} />
                            <span>2025 AI Teacher Assistant. All Rights Reserved.</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;