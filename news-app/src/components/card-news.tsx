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

const getCardImageUrl = (news: Article) => {
  const media = news.multimedia;
  if (!media || media.length === 0) return "/placeholder-image.jpg";
  const medium = media.find((m) => m.format === "mediumThreeByTwo210");
  return medium ? medium.url : media[0].url;
};

export default function CardNews({ news }: { news: Article }) {
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
