import { NewsItem } from "@/types/newsitem";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { Metadata } from "next";
import NewsDetailsClient from "@/components/news/NewsDetailsClient";
import NotFoundClient from "@/components/news/NotFoundClient";

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
    return <NotFoundClient />;
  }

  return (
    <NewsDetailsClient 
      post={post}
      relatedPosts={relatedPosts}
      id={id}
    />
  );
}

export default NewsDetailsPage