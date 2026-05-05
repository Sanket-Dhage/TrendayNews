import CardCategoryNews from "./card-category";
import HeroCategoryNews from "./hero-category";

export default function NewsCategoryContent({ news }: { news: Category[] }) {
  if (!news || news.length === 0) return <p>No news available</p>;

  const heroNews = news[0];
  const otherNews = news.slice(1);

  return (
    <div className="flex flex-col items-center gap-12">
      <HeroCategoryNews news={heroNews} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {otherNews.map((item, index) => (
          <CardCategoryNews key={index} news={item} />
        ))}
      </div>
    </div>
  );
}
