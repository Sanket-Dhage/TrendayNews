import NewsContent from "@/components/news-content";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

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

const fetchCategoryNews = async (slug: string): Promise<Article[]> => {
  const res = await fetch(
    `https://api.nytimes.com/svc/topstories/v2/${slug}.json?api-key=S1n7RArUbF9iGy5eWptSvg0TbQp3r8uO`,
    {
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch news for slug: ${slug}`);
  }

  const data = await res.json();
  return data.results ?? [];
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const articles = await fetchCategoryNews(slug);
  const post = articles[0];

  return {
    title: post?.title ?? "News",
    description: post?.abstract ?? "Latest news",
    openGraph: {
      title: post?.title ?? "News",
      description: post?.abstract ?? "Latest news",
    },
  };
}

export default async function NewsPage({ params }: Props) {
  const { slug } = await params;
  const news = await fetchCategoryNews(slug);

  return (
    <div className="container mx-auto px-4 py-8">
      <NewsContent news={news} />
    </div>
  );
}
