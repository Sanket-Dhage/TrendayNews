interface SearchCardProps {
  article: ArticleSearch;
}

export default function SearchCard({ article }: SearchCardProps) {
  const imageUrl =
    article.multimedia?.default?.url ||
    article.multimedia?.thumbnail?.url ||
    "https://via.placeholder.com/400x250?text=No+Image";

  return (
    <a
      href={article.web_url}
      target="_blank"
      rel="noopener noreferrer"
      className="overflow-hidden shadow-lg hover:shadow-2xl w-full rounded-lg transition"
    >
      <div
        className="h-60 rounded-lg bg-gray-300 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />

      <div className="py-4 flex flex-col gap-2 px-3">
        <p className="text-sm text-gray-500">
          {article.byline?.original || "Unknown Author"}
        </p>
        <h2 className="text-lg font-bold">{article.headline.main}</h2>
        <p className="text-base text-gray-500">
          {article.abstract || "No description available."}
        </p>
      </div>
    </a>
  );
}
