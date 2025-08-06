'use client';

import { NewsItem } from "@/types/newsitem";
import Image from "next/image";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import SocialShare from "@/components/shared/SocialShare";
import { useContext } from 'react';
import { ThemeContext } from '@/app/context/themeContext';

interface NewsDetailsClientProps {
  post: NewsItem;
  relatedPosts: NewsItem[];
  id: string;
}

const NewsDetailsClient = ({ post, relatedPosts, id }: NewsDetailsClientProps) => {
  const themeContext = useContext(ThemeContext);
  const isDarkMode = themeContext?.isDarkMode || false;

  return (
    <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Link 
            href="/news" 
            className={`inline-flex items-center transition-colors duration-200 ${
              isDarkMode 
                ? 'text-blue-400 hover:text-blue-300' 
                : 'text-blue-600 hover:text-blue-800'
            }`}
          >
            <IoArrowBack className="w-4 h-4 mr-2" />
            Back to News
          </Link>
        </div>

        <article className={`shadow-lg border rounded-lg overflow-hidden transition-colors duration-200 ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          {post?.image && (
            <div className="relative h-64 md:h-96 w-full">
              <Image
                src={post?.image}
                alt={post?.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="p-6 md:p-8">
            {/* Article Header */}
            <header className="mb-6">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-blue-900 text-blue-200' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {post?.category}
                </span>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-green-900 text-green-200' 
                    : 'bg-green-100 text-green-700'
                }`}>
                  {post?.team}
                </span>
              </div>
              
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 leading-tight transition-colors duration-200 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {post?.title}
              </h1>

              <div className={`flex flex-wrap items-center gap-4 text-sm border-b pb-4 transition-colors duration-200 ${
                isDarkMode 
                  ? 'text-gray-400 border-gray-600' 
                  : 'text-gray-600 border-gray-200'
              }`}>
                <time dateTime={post?.date}>
                  Published: {new Date(post?.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <span>•</span>
                <span>Team: {post?.team}</span>
              </div>
            </header>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div className={`text-xl leading-relaxed mb-6 p-4 rounded-lg border-l-4 transition-colors duration-200 ${
                isDarkMode 
                  ? 'text-gray-300 bg-gray-700 border-blue-400' 
                  : 'text-gray-700 bg-gray-50 border-blue-500'
              }`}>
                <strong>Summary:</strong> {post?.summary}
              </div>
              
              <div className={`mt-8 p-4 rounded-lg transition-colors duration-200 ${
                isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50'
              }`}>
                <h3 className={`text-lg font-semibold mb-2 transition-colors duration-200 ${
                  isDarkMode ? 'text-blue-300' : 'text-blue-900'
                }`}>
                  About this Article
                </h3>
                <p className={`transition-colors duration-200 ${
                  isDarkMode ? 'text-blue-200' : 'text-blue-800'
                }`}>
                  This article covers the latest {post?.category.toLowerCase()} news for {post?.team}. 
                  Stay updated with the most recent developments in Fantasy Premier League.
                </p>
              </div>
            </div>

            {/* Article Footer */}
            <footer className={`mt-8 pt-6 border-t space-y-4 transition-colors duration-200 ${
              isDarkMode ? 'border-gray-600' : 'border-gray-200'
            }`}>
              {/* Social Share */}
              <SocialShare 
                title={post?.title || ''}
                url={`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}/news/${id}`}
                description={post?.summary}
              />
              
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <span className={`text-sm transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Categories:
                  </span>
                  <span className={`text-xs px-2 py-1 rounded transition-colors duration-200 ${
                    isDarkMode 
                      ? 'bg-gray-700 text-gray-300' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {post?.category}
                  </span>
                </div>
                
                <Link 
                  href="/news" 
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <IoArrowBack className="w-4 h-4 mr-2" />
                  More News
                </Link>
              </div>
            </footer>
          </div>
        </article>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section className="mt-12">
            <h2 className={`text-2xl font-bold mb-6 transition-colors duration-200 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.id} 
                  href={`/news/${relatedPost.id}`}
                  className="group"
                >
                  <article className={`border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}>
                    {relatedPost.image && (
                      <div className="relative h-40 w-full">
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs px-2 py-1 rounded transition-colors duration-200 ${
                          isDarkMode 
                            ? 'bg-blue-900 text-blue-200' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {relatedPost.category}
                        </span>
                        <span className={`text-xs transition-colors duration-200 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {relatedPost.team}
                        </span>
                      </div>
                      <h3 className={`font-semibold transition-colors duration-200 line-clamp-2 ${
                        isDarkMode 
                          ? 'text-white group-hover:text-blue-300' 
                          : 'text-gray-900 group-hover:text-blue-600'
                      }`}>
                        {relatedPost.title}
                      </h3>
                      <p className={`text-sm mt-2 line-clamp-2 transition-colors duration-200 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {relatedPost.summary}
                      </p>
                      <time className={`text-xs mt-2 block transition-colors duration-200 ${
                        isDarkMode ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        {new Date(relatedPost.date).toLocaleDateString()}
                      </time>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  );
};

export default NewsDetailsClient;
