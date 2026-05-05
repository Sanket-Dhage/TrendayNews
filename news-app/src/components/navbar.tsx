"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import NavbarSearch from "./navbar-search";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setIsScrolled(currentScrollPos > 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const navLinks = [
    { href: "/politic", label: "Politic" },
    { href: "/news/health", label: "Health" },
    { href: "/news/business", label: "Business" },
    { href: "/news/technology", label: "Technology" },
    { href: "/news/fashion", label: "Fashion" },
    { href: "/category/world", label: "World" },
    { href: "/category/food", label: "Food" },
    { href: "/category/science", label: "Science" },
    { href: "/category/arts", label: "Lifestyle" },
  ];

  const getLinkClass = (path: string, isMobile = false) => {
    const baseStyle = isMobile
      ? "px-4 py-3 text-left w-full"
      : "px-3 py-2 text-base";

    const active = pathname === path;

    if (isMobile) {
      return `font-normal rounded-md transition-colors ${baseStyle} ${
        active
          ? "bg-black text-white dark:bg-white dark:text-black"
          : "text-zinc-400 hover:bg-zinc-800/60 dark:hover:bg-zinc-800/60"
      }`;
    }

    return `font-normal rounded-md transition-colors ${baseStyle} border-b-2 ${
      active
        ? "text-black dark:text-white border-black dark:border-white rounded-b-none"
        : "text-zinc-700 dark:text-zinc-300 border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-white"
    }`;
  };

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 w-full z-50 shadow-md transition-all duration-300 border-b dark:border-zinc-800 border-gray-100
          ${
            isScrolled
              ? "dark:bg-zinc-900/90 bg-white/95 text-black dark:text-white backdrop-blur-sm"
              : "dark:bg-zinc-900 bg-white text-black dark:text-white"
          }
          ${visible ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="container mx-auto px-4 py-3 md:py-4 flex flex-row items-center justify-between gap-8">
          <div className="flex-1 flex justify-start">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo-trenday-black.png"
                alt="Trenday Logo"
                width={170}
                height={90}
                className="dark:hidden w-auto h-auto"
                priority
              />
              <Image
                src="/images/logo-trenday.png"
                alt="Trenday Logo"
                width={170}
                height={90}
                className="hidden dark:block w-auto h-auto"
                priority
              />
            </Link>
          </div>

          <div className="hidden md:flex flex-1 justify-center items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={getLinkClass(link.href)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex-1 flex items-center justify-end gap-4">
            <div className="hidden sm:block">
              <NavbarSearch />
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-zinc-600 dark:text-zinc-300 hover:text-white hover:bg-zinc-800/60 dark:hover:bg-zinc-800/40 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-zinc-950 shadow-lg py-2 border-t border-gray-200 dark:border-zinc-800">
            <div className="container mx-auto px-4 flex flex-col gap-1">
              <div className="p-2 sm:hidden">
                <NavbarSearch />
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={getLinkClass(link.href, true)}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      <div className="h-16 md:h-20" aria-hidden="true" />
    </>
  );
}
