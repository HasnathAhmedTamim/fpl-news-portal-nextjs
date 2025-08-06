'use client'

import React, { useContext, useState } from 'react'
import { ThemeContext } from '../context/themeContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MdEmail, MdPhone, MdLocationOn, MdSend } from 'react-icons/md'

const ContactFpl = () => {
    const themeContext = useContext(ThemeContext)
    const isDarkMode = themeContext?.isDarkMode || false
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission here
        console.log('Form submitted:', formData)
        alert('Thank you for your message! We\'ll get back to you soon.')
        setFormData({ name: '', email: '', subject: '', message: '' })
    }

    return (
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen transition-colors duration-200 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <div className="max-w-6xl mx-auto">
                <h1 className={`text-4xl font-bold text-center mb-8 transition-colors duration-200 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Contact FPL News Portal
                </h1>
                
                <p className={`text-lg text-center mb-12 max-w-2xl mx-auto transition-colors duration-200 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Have questions, suggestions, or feedback? We'd love to hear from you! 
                    Get in touch and let us know how we can help improve your FPL experience.
                </p>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className={`p-8 rounded-lg shadow-lg transition-colors duration-200 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                        <h2 className={`text-2xl font-semibold mb-6 transition-colors duration-200 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Send us a Message
                        </h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className={`block text-sm font-medium mb-2 transition-colors duration-200 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Name
                                </label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className={`w-full transition-colors duration-200 ${
                                        isDarkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    }`}
                                    placeholder="Your full name"
                                />
                            </div>
                            
                            <div>
                                <label className={`block text-sm font-medium mb-2 transition-colors duration-200 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Email
                                </label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className={`w-full transition-colors duration-200 ${
                                        isDarkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    }`}
                                    placeholder="your.email@example.com"
                                />
                            </div>
                            
                            <div>
                                <label className={`block text-sm font-medium mb-2 transition-colors duration-200 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Subject
                                </label>
                                <Input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    required
                                    className={`w-full transition-colors duration-200 ${
                                        isDarkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    }`}
                                    placeholder="What's this about?"
                                />
                            </div>
                            
                            <div>
                                <label className={`block text-sm font-medium mb-2 transition-colors duration-200 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    rows={6}
                                    className={`w-full p-3 rounded-md border transition-colors duration-200 ${
                                        isDarkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500' 
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500'
                                    } focus:ring-2 focus:border-transparent`}
                                    placeholder="Tell us more about your inquiry..."
                                />
                            </div>
                            
                            <Button 
                                type="submit" 
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                <MdSend className="w-4 h-4 mr-2" />
                                Send Message
                            </Button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div className={`p-8 rounded-lg shadow-lg transition-colors duration-200 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                            <h2 className={`text-2xl font-semibold mb-6 transition-colors duration-200 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                Get in Touch
                            </h2>
                            
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <MdEmail className={`w-6 h-6 mr-4 transition-colors duration-200 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                                    <div>
                                        <p className={`font-medium transition-colors duration-200 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                            Email
                                        </p>
                                        <p className={`transition-colors duration-200 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                            contact@fplnews.com
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center">
                                    <MdPhone className={`w-6 h-6 mr-4 transition-colors duration-200 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                                    <div>
                                        <p className={`font-medium transition-colors duration-200 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                            Phone
                                        </p>
                                        <p className={`transition-colors duration-200 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                            +1 (555) 123-4567
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center">
                                    <MdLocationOn className={`w-6 h-6 mr-4 transition-colors duration-200 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
                                    <div>
                                        <p className={`font-medium transition-colors duration-200 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                            Location
                                        </p>
                                        <p className={`transition-colors duration-200 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                            London, United Kingdom
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`p-8 rounded-lg shadow-lg transition-colors duration-200 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                            <h3 className={`text-xl font-semibold mb-4 transition-colors duration-200 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                Quick Response
                            </h3>
                            <p className={`transition-colors duration-200 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                We typically respond to all inquiries within 24 hours during business days. 
                                For urgent matters, please use our priority contact methods.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactFpl