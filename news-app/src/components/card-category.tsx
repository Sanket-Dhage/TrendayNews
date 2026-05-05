const getCardImageUrl = (news: Category) => {
  const media = news.multimedia;
  if (!media || media.length === 0) return "/placeholder-image.jpg";
  const medium = media.find((m) => m.format === "mediumThreeByTwo210");
  return medium ? medium.url : media[0].url;
};

export default function CardCategoryNews({ news }: { news: Category }) {
  return (
    <a
      href={news.url}
      target="_blank"
      className="overflow-hidden shadow-lg hover:shadow-2xl w-full"
    >
      <div
        className="h-60 rounded-lg bg-gray-300 bg-cover bg-center"
        style={{ backgroundImage: `url(${getCardImageUrl(news)})` }}
      />
      <div className="py-4 flex flex-col gap-2">
        <p className="text-sm text-gray-500 px-4">{news.byline}</p>
        <h2 className="text-xl font-bold px-4">{news.title}</h2>
        <p className="text-sm text-gray-500 px-4">{news.abstract}</p>
      </div>
    </a>
  );
}
