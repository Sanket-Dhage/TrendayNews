"use client";

import { useState } from "react";

export default function Search() {
  const [search, setSearch] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${search}&api-key=S1n7RArUbF9iGy5eWptSvg0TbQp3r8uO`,
      {
        cache: "force-cache",
      }
    );
    const article = await res.json();

    console.log(article.response.docs);
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name=""
          id=""
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-3"
        />
        <input type="Submit" value="Search" />
      </form>
    </section>
  );
}
