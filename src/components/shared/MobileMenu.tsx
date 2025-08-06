'use client'
import React, { useState, useContext } from 'react'
import { Button } from '../ui/button'
import { Switch } from '../ui/switch'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeContext } from '@/app/context/themeContext';

const MobileMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const themeContext = useContext(ThemeContext);
    const isDarkMode = themeContext?.isDarkMode || false;
    const toggleTheme = themeContext?.toggleTheme || (() => {});
    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className="lg:hidden">
            <Button 
                onClick={toggleMenu} 
                variant="default" 
                className={`transition-colors duration-200 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
            >
                {isMenuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
            </Button>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
                        onClick={closeMenu}
                    ></div>
                    
                    {/* Menu Panel */}
                    <div className={`fixed top-0 right-0 h-full w-64 transform transition-transform duration-300 ease-in-out ${
                        isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
                    } shadow-xl`}>
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                                <h2 className="text-lg font-semibold">Menu</h2>
                                <Button 
                                    onClick={closeMenu} 
                                    variant="ghost" 
                                    size="sm"
                                    className={isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'}
                                >
                                    <AiOutlineClose size={20} />
                                </Button>
                            </div>

                            {/* Navigation Links */}
                            <nav className="flex-1 px-4 py-6 space-y-4">
                                <Link 
                                    href="/news" 
                                    onClick={closeMenu}
                                    className={`block px-3 py-2 rounded-lg transition-colors duration-200 ${
                                        pathname === "/news" 
                                            ? "text-red-700 font-semibold bg-red-50 dark:bg-red-900/20" 
                                            : isDarkMode 
                                                ? "text-white hover:bg-gray-700" 
                                                : "text-gray-800 hover:bg-gray-100"
                                    }`}
                                >
                                    FPL News
                                </Link>

                                <div className="space-y-2">
                                    <Link 
                                        href="/fplservices" 
                                        onClick={closeMenu}
                                        className={`block px-3 py-2 rounded-lg transition-colors duration-200 ${
                                            pathname === "/fplservices" 
                                                ? "text-red-700 font-semibold bg-red-50 dark:bg-red-900/20" 
                                                : isDarkMode 
                                                    ? "text-white hover:bg-gray-700" 
                                                    : "text-gray-800 hover:bg-gray-100"
                                        }`}
                                    >
                                        FPL Services
                                    </Link>
                                    <div className="pl-4 space-y-1">
                                        <Link 
                                            href="/fplservices/calculator" 
                                            onClick={closeMenu}
                                            className={`block px-3 py-2 rounded-lg transition-colors duration-200 ${
                                                isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'
                                            }`}
                                        >
                                            Points Calculator
                                        </Link>
                                        <Link 
                                            href="/fplservices/player-analysis" 
                                            onClick={closeMenu}
                                            className={`block px-3 py-2 rounded-lg transition-colors duration-200 ${
                                                isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'
                                            }`}
                                        >
                                            Player Analysis
                                        </Link>
                                        <Link 
                                            href="/fplservices/fixture-difficulty" 
                                            onClick={closeMenu}
                                            className={`block px-3 py-2 rounded-lg transition-colors duration-200 ${
                                                isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'
                                            }`}
                                        >
                                            Fixture Difficulty
                                        </Link>
                                    </div>
                                </div>

                                <Link 
                                    href="/aboutfpl" 
                                    onClick={closeMenu}
                                    className={`block px-3 py-2 rounded-lg transition-colors duration-200 ${
                                        pathname === "/aboutfpl" 
                                            ? "text-red-700 font-semibold bg-red-50 dark:bg-red-900/20" 
                                            : isDarkMode 
                                                ? "text-white hover:bg-gray-700" 
                                                : "text-gray-800 hover:bg-gray-100"
                                    }`}
                                >
                                    About FPL
                                </Link>

                                <Link 
                                    href="/contactfpl" 
                                    onClick={closeMenu}
                                    className={`block px-3 py-2 rounded-lg transition-colors duration-200 ${
                                        pathname === "/contactfpl" 
                                            ? "text-red-700 font-semibold bg-red-50 dark:bg-red-900/20" 
                                            : isDarkMode 
                                                ? "text-white hover:bg-gray-700" 
                                                : "text-gray-800 hover:bg-gray-100"
                                    }`}
                                >
                                    Contact FPL
                                </Link>
                            </nav>

                            {/* Footer */}
                            <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                        Color Mode
                                    </span>
                                    <Switch onClick={toggleTheme} />
                                </div>
                                <Button variant="default" className="w-full">
                                    Login
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MobileMenu