"use client"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bottom-0 w-full py-6 bg-black text-white">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col md:flex-row gap-4">
          <Link className="text-sm hover:underline" href="#">
            Terms of Service
          </Link>
          <Link className="text-sm hover:underline" href="#">
            Privacy Policy
          </Link>
          <Link className="text-sm hover:underline" href="#">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  )
}
