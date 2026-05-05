import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";

interface News {
  title: string;
  poster: string;
  publishedAt: string;
  description: string;
}

const fetchNewsById = async (id: string) => {
  const res = await fetch(
    `https://api.jsonbin.io/v3/b/689fbf5ad0ea881f405a4000/${id}`,
    { cache: "no-store"}
  );

  if(!res.ok) return null;

  // const news: News = await res.json();
  // return news;
  const data = await res.json();
  return data.record;
};

export default async function Detail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const news = await fetchNewsById(id);

  if (!news) {
    return notFound();
  }

  return (
    <div className="container mx-auto py-5">
      <div className="max-w-4xl mx-auto">
        <Image src={news.poster} alt={news.title} fill className="w-full object-cover rounded-lg" 
        />
        <div className="mt-6">
          <h1 className="text-4xl font-semibold">{news.title}</h1>
          <div className="flex items-center mt-4 text-gray-500">
            <span>Published on {news.publishedAt}</span>
          </div>
          <div className="mt-8 prose lg:prose-xl">
            <div className="text-lg leading-relaxed text-gray-500">
              {news.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
