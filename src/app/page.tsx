import Banner from "@/components/shared/Banner";

import NewsCard from "@/components/shared/NewsCard";
import NewsLetter from "@/components/shared/NewsLetter";
import { News } from "@/types/news";



export default async function Home() {
  const data = await fetch("https://fpl-news-api.vercel.app/api/latest-news");
  const news = await data.json();
  // console.log(news);
  return (
    <div className="py-12">
      <Banner></Banner>

      {/* latest news */}
      <div className="my-12">
        <h2 className="text-2xl font-bold mb-8">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* <NewsCard /> */}
            {news.slice(0, 3).map((item: News) => (
              <NewsCard key={item?.id} item={item}  />
            ))}
        </div>
      </div>

      {/* newsletter */}
      <div className="my-1 items-center justify-center text-center">
        <h2 className="text-2xl font-bold mb-8">Subscribe to our Newsletter</h2>
        <NewsLetter />
      </div>

      
    </div>
  );
}
