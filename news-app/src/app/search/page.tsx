"use client";

import SearchCard from "@/components/search-card";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "../spinner";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("q") || "";
  const [articles, setArticles] = useState<ArticleSearch[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!search) return;

    const fetchArticles = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${search}&api-key=S1n7RArUbF9iGy5eWptSvg0TbQp3r8uO`
        );

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data: Responsesearch = await res.json();
        setArticles(data.response.docs);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [search]);

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-xl font-normal mb-4">Search results for: {search}</h1>

      {loading && <Spinner />}

      {!loading && articles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <SearchCard key={article._id} article={article} />
          ))}
        </div>
      )}

      {!loading && articles.length === 0 && search && <p>No articles found.</p>}
    </section>
  );
}
