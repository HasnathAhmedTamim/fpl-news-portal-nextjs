'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Mail, CheckCircle, AlertCircle } from 'lucide-react'
import { Input } from '../ui/input'

interface NewsLetterProps {
  className?: string
}

const NewsLetter: React.FC<NewsLetterProps> = ({ className = '' }) => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setStatus('error')
      setMessage('Please enter your email address')
      return
    }

    if (!validateEmail(email)) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Simulate API call - replace with actual newsletter subscription logic
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setStatus('success')
      setMessage('Successfully subscribed! Welcome to FPL News.')
      setEmail('')
    } catch (error) {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
      
      // Clear status after 5 seconds
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 5000)
    }
  }

  return (
    <section className={`bg-gradient-to-r from-gray-800 to-blue-800 py-16 px-4 ${className}`}>
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated with FPL News
          </h2>
          
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Get the latest Fantasy Premier League news, player updates, fixture analysis, 
            and expert tips delivered straight to your inbox. Never miss crucial information 
            that could make or break your game week!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col md:flex-row gap-3 items-center">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg font-semibold text-gray-300 placeholder-gray-400 
                       border-1 focus:outline-none focus:ring-2 focus:ring-white/30 
                       transition-all duration-200 "
              disabled={isSubmitting}
            />
            
            <Button
              variant="default"
              type="submit"
              disabled={isSubmitting}
              className=" px-6 py-3 
                       font-semibold rounded-lg transition-all duration-200 
                       disabled:opacity-50 whitespace-nowrap"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-green-600/30 border-t-green-600 
                               rounded-full animate-spin" />
                  Subscribing...
                </div>
              ) : (
                'Subscribe Now'
              )}
            </Button>
          </div>

          {/* Status Messages */}
          {status !== 'idle' && (
            <div className={`mt-4 p-3 rounded-lg flex items-center gap-2 text-sm
                          ${status === 'success' 
                            ? 'bg-green-500/20 text-green-100 border border-green-400/30' 
                            : 'bg-red-500/20 text-red-100 border border-red-400/30'
                          }`}>
              {status === 'success' ? (
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
              )}
              <span>{message}</span>
            </div>
          )}
        </form>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-white/80">
          <div className="text-center">
            <div className="w-8 h-8 mx-auto mb-3">
              📊
            </div>
            <h3 className="font-semibold mb-2">Player Analysis</h3>
            <p className="text-sm">In-depth stats and performance insights</p>
          </div>
          
          <div className="text-center">
            <div className="w-8 h-8 mx-auto mb-3">
              ⚡
            </div>
            <h3 className="font-semibold mb-2">Breaking News</h3>
            <p className="text-sm">Real-time updates on injuries and transfers</p>
          </div>
          
          <div className="text-center">
            <div className="w-8 h-8 mx-auto mb-3">
              🎯
            </div>
            <h3 className="font-semibold mb-2">Expert Tips</h3>
            <p className="text-sm">Weekly strategies from FPL veterans</p>
          </div>
        </div>

        {/* Privacy Notice */}
        <p className="mt-8 text-xs text-white/60 max-w-lg mx-auto">
          We respect your privacy. Unsubscribe at any time. 
          By subscribing, you agree to receive email communications from FPL News Portal.
        </p>
      </div>
    </section>
  )
}

export default NewsLetter