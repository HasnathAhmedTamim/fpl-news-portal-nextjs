'use client';

import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { useContext } from 'react';
import { ThemeContext } from '@/app/context/themeContext';

const NotFoundClient = () => {
  const themeContext = useContext(ThemeContext);
  const isDarkMode = themeContext?.isDarkMode || false;

  return (
    <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className={`text-2xl font-bold mb-4 transition-colors duration-200 ${
          isDarkMode ? 'text-red-400' : 'text-red-600'
        }`}>
          News Article Not Found
        </h1>
        <p className={`mb-6 transition-colors duration-200 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          The news article you're looking for could not be found or may have been removed.
        </p>
        <Link 
          href="/news" 
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <IoArrowBack className="w-4 h-4 mr-2" />
          Back to News
        </Link>
      </div>
    </section>
  );
};

export default NotFoundClient;
