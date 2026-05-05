import NewsContainer from "@/components/news-container";
import Link from "next/link";

const fetchNews = async () => {
  const res = await fetch(
    "https://api.nytimes.com/svc/topstories/v2/us.json?api-key=S1n7RArUbF9iGy5eWptSvg0TbQp3r8uO",
    {
      cache: "force-cache",
    }
  );
  const news = await res.json();
  return news.results as Article[];
};

export default async function Home() {
  const news = await fetchNews();

  return (
    <div className="container mx-auto px-2 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 px-4">
        <h1 className="text-4xl font-semibold text-center md:text-left flex-1">
          Daily New
        </h1>
        {/* <div className="flex justify-end">
          <Link
            href="/about"
            className="bg-black dark:bg-white dark:text-black text-white px-4 py-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            User Moment
          </Link>
        </div> */}
      </div>

      <NewsContainer news={news} />
    </div>
  );
}
