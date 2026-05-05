import Link from "next/link";

const getCardImageUrl = (news: Article) => {
  const media = news.multimedia;
  if (!media || media.length === 0) return "/placeholder-image.jpg";

  const medium = media.find((m) => m.format === "mediumThreeByTwo210");
  return medium ? medium.url : media[0].url;
};

export default function NewsContainer({ news }: { news: Article[] }) {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item, index) => (
          <Link
            key={item.url || index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col bg-white dark:bg-zinc-900 border"
          >
            {/* Image hanya untuk 6 item pertama */}
            {index < 6 && item.multimedia?.length > 0 && (
              <div
                className="h-60 bg-cover bg-center rounded-t-lg"
                style={{ backgroundImage: `url(${getCardImageUrl(item)})` }}
              />
            )}

            <div className="p-4 flex flex-col gap-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {item.byline}
              </p>
              <h2 className="text-xl font-bold">{item.title}</h2>
              <p className="text-sm text-gray-500">{item.abstract}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
