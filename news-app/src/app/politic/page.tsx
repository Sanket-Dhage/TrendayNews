import NewsContent from "@/components/news-content";

interface Multimedia {
  url: string;
  format: string;
  height: number;
  width: number;
  caption: string;
}

export interface Article {
  section: string;
  title: string;
  abstract: string;
  byline: string;
  url: string;
  multimedia: Multimedia[];
  published_date: string;
}

const fetchNews = async (): Promise<Article[]> => {
  const res = await fetch(
    "https://api.nytimes.com/svc/topstories/v2/politics.json?api-key=S1n7RArUbF9iGy5eWptSvg0TbQp3r8uO",
    { cache: "force-cache" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch news");
  }

  const data = await res.json();
  return data.results as Article[];
};

export default async function NewsPage() {
  let news: Article[] = [];

  try {
    news = await fetchNews();
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        Failed to load news
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <NewsContent news={news} />
    </div>
  );
}
