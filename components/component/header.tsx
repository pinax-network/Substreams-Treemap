"use client"
import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-black text-white py-4">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold">Subtivity</h1>
        <nav className="flex gap-4">
          <Link className="text-sm hover:underline" href="/">
            Home
          </Link>
          <Link className="text-sm hover:underline" href="/about">
            About
          </Link>
          <Link className="text-sm hover:underline" href="/services">
            Services
          </Link>
          <Link className="text-sm hover:underline" href="/contact">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
