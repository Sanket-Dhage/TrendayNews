import { News } from "@/types/type";
import Link from "next/link";
import Image from "next/image";

const getCardImageUrl = (news: News) => news.poster ?? "/placeholder-image.jpg";

const fetchNews = async (): Promise<News[]> => {
  try {
    const res = await fetch(
      "https://api.jsonbin.io/v3/b/689fbf5ad0ea881f405a4000",
      { next: { revalidate: 1 } } // ISR 1 detik aja
    );

    if (!res.ok) throw new Error("Failed to fetch news");

    const data = await res.json();
    return data.record?.news ?? [];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};

export default async function About() {
  const news = await fetchNews();

  if (news.length === 0) {
    return (
      <div className="container mx-auto py-8 px-4">
        <p className="text-center text-gray-500">No news available.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-end mb-6">
        <Link
          href="/add-client"
          className="bg-black dark:bg-white dark:text-black text-white px-4 py-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          + Add Moment
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item, index) => (
          <Link key={`${item.id}-${index}`} href={`/detail/${item.id}`}>
            <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="relative h-60 rounded-t-lg">
                <Image
                  src={getCardImageUrl(item)}
                  alt={item.title}
                  fill
                  className="object-cover rounded-t-lg"
                  priority
                />
              </div>
              <div className="p-4 flex flex-col gap-2">
                <h2 className="text-xl font-bold">{item.title}</h2>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
