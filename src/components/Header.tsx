// src/components/Header.tsx
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Blogify</h1>
        <nav>
          <Link href="/" className="mx-4 text-gray-600">Home</Link>
          <Link href="/blogs" className="mx-4 text-gray-600">Blogs</Link>
          <Link href="/about" className="mx-4 text-gray-600">About</Link>
          <Link href="/contact" className="mx-4 text-gray-600">Contact</Link>
          <Link href="/auth/sign-in" className="ml-4 px-4 py-2 bg-blue-600 text-white rounded">Login</Link>
        </nav>
      </div>
    </header>
  );
}
