'use client'
import { IoShareSocial } from 'react-icons/io5'
import { FaTwitter, FaFacebookF, FaLink } from 'react-icons/fa'
import { useState, useEffect } from 'react'

interface SocialShareProps {
  title: string
  url: string
  description?: string
}

const SocialShare = ({ title, url, description }: SocialShareProps) => {
  const [copied, setCopied] = useState(false)
  const [canShare, setCanShare] = useState(false)

  useEffect(() => {
    // Check if native sharing is available
    setCanShare(typeof navigator !== 'undefined' && 'share' in navigator)
  }, [])

  const shareData = {
    title,
    text: description || title,
    url: url
  }

  const handleNativeShare = async () => {
    if (canShare && navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        console.log('Error sharing:', error)
      }
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.log('Error copying to clipboard:', error)
    }
  }

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
    window.open(twitterUrl, '_blank', 'width=550,height=420')
  }

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    window.open(facebookUrl, '_blank', 'width=550,height=420')
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600 font-medium">Share:</span>
      
      {/* Native Share (mobile) */}
      {canShare && (
        <button
          onClick={handleNativeShare}
          className="flex items-center gap-1 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
        >
          <IoShareSocial className="w-4 h-4" />
          Share
        </button>
      )}

      {/* Twitter */}
      <button
        onClick={shareToTwitter}
        className="flex items-center gap-1 px-3 py-2 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors duration-200"
      >
        <FaTwitter className="w-4 h-4" />
        Twitter
      </button>

      {/* Facebook */}
      <button
        onClick={shareToFacebook}
        className="flex items-center gap-1 px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
      >
        <FaFacebookF className="w-4 h-4" />
        Facebook
      </button>

      {/* Copy Link */}
      <button
        onClick={copyToClipboard}
        className={`flex items-center gap-1 px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
          copied 
            ? 'bg-green-100 text-green-700' 
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        }`}
      >
        <FaLink className="w-4 h-4" />
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
  )
}

export default SocialShare
