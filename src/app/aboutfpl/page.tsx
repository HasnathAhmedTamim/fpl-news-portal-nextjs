'use client'

import React, { useContext } from 'react'
import { ThemeContext } from '../context/themeContext'

const AboutFpl = () => {
    const themeContext = useContext(ThemeContext)
    const isDarkMode = themeContext?.isDarkMode || false

    return (
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen transition-colors duration-200 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <div className="max-w-4xl mx-auto">
                <h1 className={`text-4xl font-bold mb-8 transition-colors duration-200 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    About Fantasy Premier League
                </h1>
                
                <div className={`prose lg:prose-xl transition-colors duration-200 ${isDarkMode ? 'prose-invert' : ''}`}>
                    <p className={`text-lg mb-6 transition-colors duration-200 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Fantasy Premier League (FPL) is the official fantasy football game of the Premier League. 
                        It's free to play and allows football fans to create their own virtual team of real Premier League players.
                    </p>
                    
                    <section className="mb-8">
                        <h2 className={`text-2xl font-semibold mb-4 transition-colors duration-200 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            How It Works
                        </h2>
                        <ul className={`list-disc pl-6 space-y-2 transition-colors duration-200 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            <li>Pick a squad of 15 players within a £100.0m budget</li>
                            <li>Select a captain who scores double points</li>
                            <li>Make transfers and tactical changes throughout the season</li>
                            <li>Compete with friends and millions of other managers worldwide</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className={`text-2xl font-semibold mb-4 transition-colors duration-200 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Our Mission
                        </h2>
                        <p className={`transition-colors duration-200 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            FPL News Portal is your go-to source for the latest Fantasy Premier League news, 
                            player updates, injury reports, and strategic insights to help you dominate your mini-leagues.
                        </p>
                    </section>

                    <section className={`p-6 rounded-lg mb-8 transition-colors duration-200 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        <h2 className={`text-2xl font-semibold mb-4 transition-colors duration-200 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Why Choose Us?
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <h3 className={`font-semibold mb-2 transition-colors duration-200 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                                    🔄 Real-time Updates
                                </h3>
                                <p className={`text-sm transition-colors duration-200 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    Get the latest news as it happens
                                </p>
                            </div>
                            <div>
                                <h3 className={`font-semibold mb-2 transition-colors duration-200 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                                    📊 Expert Analysis
                                </h3>
                                <p className={`text-sm transition-colors duration-200 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    In-depth player and team analysis
                                </p>
                            </div>
                            <div>
                                <h3 className={`font-semibold mb-2 transition-colors duration-200 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                                    🎯 Strategic Tips
                                </h3>
                                <p className={`text-sm transition-colors duration-200 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    Winning strategies from FPL veterans
                                </p>
                            </div>
                            <div>
                                <h3 className={`font-semibold mb-2 transition-colors duration-200 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                                    ⚡ Fast Performance
                                </h3>
                                <p className={`text-sm transition-colors duration-200 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    Quick access to all the info you need
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default AboutFpl