"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NavbarSearch() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/search?q=${encodeURIComponent(search)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search Article"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="dark:bg-gray-800 bg-gray-200 dark:text-white text-black placeholder:text-gray-400 py-2 px-4 rounded-md border-none outline-none text-sm w-full sm:w-auto"
        autoComplete="off"
      />
      <button
        type="submit"
        className="dark:bg-gray-800 bg-gray-200 dark:text-white text-black p-2.5 rounded-md text-gray-400 hover:text-white transition-colors"
        aria-label="Search"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </form>
  );
}
