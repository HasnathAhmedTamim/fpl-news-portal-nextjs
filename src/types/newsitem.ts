// const news = {

//     "id": 101,
//     "title": "Haaland Fit for Gameweek 1",
//     "date": "2025-08-03",
//     "summary": "Erling Haaland is confirmed fit and will start for Man City against Burnley.",
//     "team": "Manchester City",
//     "category": "Injury Update",
//     "image": "https://via.placeholder.com/300x200/87CEEB/000000?text=Haaland+Fit"

// };
export interface NewsItem {
  id: number;
  title: string;
  date: string;
  summary: string;
  team: string;
  category: string;
  image: string;
}

export interface NewsCardProps {
  item: NewsItem;
}
