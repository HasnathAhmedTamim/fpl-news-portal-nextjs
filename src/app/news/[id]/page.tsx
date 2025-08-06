import { NewsItem } from "@/types/newsitem";
import Image from "next/image";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { Metadata } from "next";
import SocialShare from "@/components/shared/SocialShare";

// Generate metadata for each news article
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  try {
    const { id } = await params;
    const response = await fetch("https://fpl-news-api.vercel.app/api/latest-news", {
      next: { revalidate: 60 }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const allPosts: NewsItem[] = await response.json();
    const post = allPosts.find(p => String(p.id) === id);
    
    if (!post) {
      return {
        title: 'News Article Not Found',
        description: 'The requested news article could not be found.'
      };
    }

    return {
      title: `${post.title} | FPL News Portal`,
      description: post.summary,
      openGraph: {
        title: post.title,
        description: post.summary,
        images: post.image ? [post.image] : [],
        type: 'article',
        publishedTime: post.date,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.summary,
        images: post.image ? [post.image] : [],
      }
    };
  } catch (error) {
    console.error('Error in generateMetadata:', error);
    return {
      title: 'FPL News Portal',
      description: 'Latest Fantasy Premier League news and updates.'
    };
  }
}

export const revalidate = 60; // Revalidate every 60 seconds
export const dynamicParams = true; // Enable dynamic params


export async function generateStaticParams() {
  try {
    const response = await fetch("https://fpl-news-api.vercel.app/api/latest-news", {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const posts: NewsItem[] = await response.json();

    return posts.slice(0, 10).map((post) => ({
      id: String(post.id), // Ensure id is a string
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}



const NewsDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  let post: NewsItem | undefined;
  let relatedPosts: NewsItem[] = [];
  
  try {
    // Fetch all news items and find the specific one
    const response = await fetch("https://fpl-news-api.vercel.app/api/latest-news", {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
      cache: 'force-cache'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const allPosts: NewsItem[] = await response.json();
    
    if (!Array.isArray(allPosts)) {
      throw new Error('Invalid API response: Expected array');
    }
    
    // Find the specific post by ID
    post = allPosts.find(p => String(p.id) === id);
    
    // Find related posts (same team or category, excluding current post)
    if (post) {
      relatedPosts = allPosts
        .filter(p => 
          String(p.id) !== id && 
          (p.team === post!.team || p.category === post!.category)
        )
        .slice(0, 3);
    }
  } catch (error) {
    console.error('Error fetching news details:', error);
    // Return 404-like response but don't throw to avoid server error
  }
  
  // If post not found, return a not found message
  if (!post) {
    return (
      <section className="py-12">
        <div className="max-w-4xl mx-auto p-6 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">News Article Not Found</h1>
          <p className="text-gray-600 mb-6">The news article you're looking for could not be found or may have been removed.</p>
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
  }
  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Link 
            href="/news" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            <IoArrowBack className="w-4 h-4 mr-2" />
            Back to News
          </Link>
        </div>

        <article className="bg-white shadow-lg border rounded-lg overflow-hidden">
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
                <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {post?.category}
                </span>
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {post?.team}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {post?.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 border-b border-gray-200 pb-4">
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
              <div className="text-xl text-gray-700 leading-relaxed mb-6 bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                <strong>Summary:</strong> {post?.summary}
              </div>
              
              {/* You can add more content sections here if the API provides them */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">About this Article</h3>
                <p className="text-blue-800">
                  This article covers the latest {post?.category.toLowerCase()} news for {post?.team}. 
                  Stay updated with the most recent developments in Fantasy Premier League.
                </p>
              </div>
            </div>

            {/* Article Footer */}
            <footer className="mt-8 pt-6 border-t border-gray-200 space-y-4">
              {/* Social Share */}
              <SocialShare 
                title={post?.title || ''}
                url={`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}/news/${id}`}
                description={post?.summary}
              />
              
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">Categories:</span>
                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.id} 
                  href={`/news/${relatedPost.id}`}
                  className="group"
                >
                  <article className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
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
                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                          {relatedPost.category}
                        </span>
                        <span className="text-xs text-gray-500">
                          {relatedPost.team}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {relatedPost.summary}
                      </p>
                      <time className="text-xs text-gray-500 mt-2 block">
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
  )
}

export default NewsDetailsPage