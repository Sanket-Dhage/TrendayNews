import Image from "next/image";

export default function Footer() {
  const categories = [
    "Category",
    "Technology",
    "Business",
    "Fashion",
    "Health",
    "Politic",
    "News",
    "Moment",
    "Lifestyle",
    "Science",
    "Food",
    "World",
  ];

  const socialMedia = [
    "Social Media",
    "Youtube",
    "Instagram",
    "Facebook",
    "Twitter",
  ];

  return (
    <footer className="bg-white dark:bg-zinc-950 dark:text-white text-black py-10">
      <div className="container mx-auto px-4 flex flex-col items-center gap-12">
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-20">
          <div className="flex-shrink-0">
            <Image
              src="/images/logo-trenday-black.png"
              alt="Trenday Logo"
              width={170}
              height={90}
              className="dark:hidden w-auto h-auto"
            />
            <Image
              src="/images/logo-trenday.png"
              alt="Trenday Logo"
              width={170}
              height={90}
              className="hidden dark:block w-auto h-auto"
            />
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm md:text-base">
            {categories.map((cat, idx) => (
              <span
                key={idx}
                className={`${
                  cat === "News" || cat === "Category"
                    ? "font-bold"
                    : "font-normal"
                } cursor-pointer hover:text-black dark:hover:text-white`}
              >
                {cat}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm md:text-base">
            {socialMedia.map((sm, idx) => (
              <span
                key={idx}
                className={`${
                  sm === "Social Media" ? "font-bold" : "font-normal"
                } cursor-pointer hover:text-black dark:hover:text-white`}
              >
                {sm}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-stone-300" />

        {/* Copyright */}
        <div className="text-center text-sm md:text-base font-bold">
          © {new Date().getFullYear()} Dwarka Group
        </div>
      </div>
    </footer>
  );
}
