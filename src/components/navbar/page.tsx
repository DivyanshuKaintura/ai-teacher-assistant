'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const navRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Determine navbar visibility based on scroll direction
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down and past 100px
                setIsVisible(false);
            } else if (currentScrollY < lastScrollY) {
                // Scrolling up
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        // Close mobile menu when clicking outside
        const handleClickOutside = (event: { target: any; }) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [lastScrollY]);

    const NavLinks = [
        { href: "/features", label: "Features" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" }
    ];

    return (
        <nav
            ref={navRef}
            className={`
                fixed top-0 left-0 right-0 z-50 
                bg-white/90 backdrop-blur-md shadow-md 
                transition-all duration-300 ease-in-out
                ${isVisible ? 'translate-y-0' : '-translate-y-full'}
            `}
        >
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-sky-700 flex items-center">
                    <span className="hidden md:inline">AI Teacher Assistant</span>
                    <span className="md:hidden">ATA</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6">
                    {NavLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-gray-700 hover:text-sky-700 transition-colors duration-200 font-medium"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/signup"
                        className="
                            bg-sky-700 text-white 
                            px-4 py-2 rounded-lg 
                            hover:bg-sky-800 
                            transition-colors duration-200 
                            shadow-md hover:shadow-lg
                        "
                    >
                        Sign Up
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-gray-700 focus:outline-none"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg">
                    <div className="flex flex-col p-4 space-y-3">
                        {NavLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="
                                    text-gray-700 hover:text-sky-700 
                                    py-2 px-3 rounded 
                                    hover:bg-sky-50 
                                    transition-colors duration-200
                                "
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/signup"
                            className="
                                bg-sky-700 text-white 
                                px-4 py-2 rounded-lg 
                                hover:bg-sky-800 
                                transition-colors duration-200 
                                text-center
                            "
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;