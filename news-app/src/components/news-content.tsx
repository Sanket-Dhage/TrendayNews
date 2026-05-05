import CardNews from "./card-news";
import HeroNews from "./hero-news";
interface Multimedia {
  url: string;
  format: string;
  height: number;
  width: number;
  caption: string;
}

interface Article {
  section: string;
  title: string;
  abstract: string;
  byline: string;
  url: string;
  multimedia: Multimedia[];
  published_date: string;
}

export default function NewsContent({ news }: { news: Article[] }) {
  if (!news || news.length === 0) return <p>No news available</p>;

  const heroNews = news[0];
  const otherNews = news.slice(1);

  return (
    <div className="flex flex-col items-center gap-12">
      <HeroNews news={heroNews} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {otherNews.map((item, index) => (
          <CardNews key={index} news={item} />
        ))}
      </div>
    </div>
  );
}
