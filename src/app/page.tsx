import Banner from "@/components/shared/Banner";

import NewsCard from "@/components/shared/NewsCard";
import NewsLetter from "@/components/shared/NewsLetter";
import { NewsItem } from "@/types/newsitem";




export default async function Home() {
  let news = [];
  
  try {
    const data = await fetch("https://fpl-news-api.vercel.app/api/latest-news", {
      cache: "force-cache",
      next: { revalidate: 300 } // Revalidate every 5 minutes
    });
    
    if (!data.ok) {
      throw new Error(`HTTP error! status: ${data.status}`);
    }
    
    news = await data.json();
  } catch (error) {
    console.error('Error fetching news:', error);
    // Return empty array on error
    news = [];
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Banner></Banner>

      {/* latest news */}
      <div className="my-12">
        <h2 className="text-2xl font-bold mb-8">Latest News</h2>
        {news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {news.slice(0, 3).map((item: NewsItem) => (
              <NewsCard key={item?.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">
              Unable to load news at this time. Please try again later.
            </p>
          </div>
        )}
      </div>

      {/* newsletter */}
      <div className="my-1 items-center justify-center text-center">
        {/* <h2 className="text-2xl font-bold mb-8">Subscribe to our Newsletter</h2> */}
        <NewsLetter />
      </div>

      
    </div>
  );
}
