import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
      <Image
        src="/images/not-founda.png"
        alt="Not Found"
        width={200}
        height={200}
        className="mb-6"
        priority
      />
      <h1 className="text-2xl font-semibold mb-4">Oops! Page Not Found</h1>
      <p className="text-gray-600 mb-6">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
