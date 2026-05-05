import SearchCard from "./search-card";

interface SearchContentProps {
  articles: ArticleSearch[];
}

export default function SearchContent({ articles }: SearchContentProps) {
  if (!articles || articles.length === 0) {
    return <p className="mt-6 text-neutral-400">No articles found.</p>;
  }

  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <SearchCard key={article._id} article={article} />
      ))}
    </div>
  );
}
