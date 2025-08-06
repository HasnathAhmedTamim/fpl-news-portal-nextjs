'use client'

import { Button } from "@/components/ui/button";
import { AiOutlineTwitter, AiOutlineInstagram, AiOutlineGithub } from "react-icons/ai";
import { useContext } from "react";
import { ThemeContext } from "@/app/context/themeContext";

const Footer = () => {
    const themeContext = useContext(ThemeContext);
    const isDarkMode = themeContext?.isDarkMode || false;

    return (
        <footer className={`py-8 transition-colors duration-200 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                    {/* Logo and Description */}
                    <div className="text-center md:text-left">
                        <h2 className={`text-2xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            FPL News
                        </h2>
                        <p className={`mt-2 transition-colors duration-200 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Your go-to source for the latest Fantasy Premier League news and updates.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className={`flex space-x-6 transition-colors duration-200 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <a href="/aboutfpl" className={`transition-colors duration-200 ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'}`}>
                            About FPL
                        </a>
                        <a href="/fplservices" className={`transition-colors duration-200 ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'}`}>
                            Services
                        </a>
                        <a href="/contactfpl" className={`transition-colors duration-200 ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'}`}>
                            Contact FPL
                        </a>
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex space-x-4">
                        <a
                            href="https://twitter.com"
                            aria-label="Twitter"
                            className={`transition-colors duration-200 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                        >
                            <AiOutlineTwitter size={24} />
                        </a>
                        <a
                            href="https://instagram.com"
                            aria-label="Instagram"
                            className={`transition-colors duration-200 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                        >
                            <AiOutlineInstagram size={24} />
                        </a>
                        <a
                            href="https://github.com"
                            aria-label="Github"
                            className={`transition-colors duration-200 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                        >
                            <AiOutlineGithub size={24} />
                        </a>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-8 text-center md:flex md:justify-between md:items-center">
                    <p className={`transition-colors duration-200 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        &copy; 2024 FPL News. All rights reserved.
                    </p>

                    <Button variant="outline" className={`mt-4 md:mt-0 transition-colors duration-200 ${isDarkMode ? 'bg-gray-900 text-white border-gray-600 hover:bg-gray-700' : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'}`}>
                        Subscribe
                    </Button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;