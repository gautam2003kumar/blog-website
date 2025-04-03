import { Card } from "@/components/ui/card";
import { Instagram, Facebook ,Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-8 md:px-20">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
        <div>
          <h3 className="font-semibold text-lg">Home</h3>
          <ul className="mt-6 text-gray-400">
            <li className="mt-3">Features</li>
            <li className="mt-3">Blogs</li>
            <li className="mt-3">Resources <span className="bg-yellow-500 text-black px-2 py-0.5 text-xs rounded">New</span></li>
            <li className="mt-3">Testimonials</li>
            <li className="mt-3">Contact Us</li>
            <li className="mt-3">Newsletter</li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg">News</h3>
          <ul className="mt-6 text-gray-400">
            <li className="mt-3">Trending Stories</li>
            <li className="mt-3">Featured Videos</li>
            <li className="mt-3">Technology</li>
            <li className="mt-3">Health</li>
            <li className="mt-3">Politics</li>
            <li className="mt-3">Environment</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg">Blogs</h3>
          <ul className="mt-6 text-gray-400">
            <li className="mt-3">Quantum Computing</li>
            <li className="mt-3">AI Ethics</li>
            <li className="mt-3">Space Exploration</li>
            <li className="mt-3">Biotechnology <span className="bg-yellow-500 text-black px-2 py-0.5 text-xs rounded">New</span></li>
            <li className="mt-3">Renewable Energy</li>
            <li className="mt-3">Biohacking</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg">Podcasts</h3>
          <ul className="mt-6 text-gray-400">
            <li className="mt-3">AI Revolution</li>
            <li className="mt-3">AI Revolution <span className="bg-yellow-500 text-black px-2 py-0.5 text-xs rounded">New</span></li>
            <li className="mt-3">TechTalk AI</li>
            <li className="mt-3">AI Conversations</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg">Resources</h3>
          <div className="mt-6 space-y-2">
            <Card className="p-3 bg-black text-white rounded-lg">Whitepapers ↗</Card>
            <Card className="p-3 bg-black text-white rounded-lg">Ebooks ↗</Card>
            <Card className="p-3 bg-black text-white rounded-lg">Reports ↗</Card>
            <Card className="p-3 bg-black text-white rounded-lg">Research Papers ↗</Card>
          </div>
        </div>
      </div>
      
      <div className="mt-10 border-t border-gray-700 pt-4 flex justify-between items-center">
        <p className="text-gray-500">© 2025 Blogify. All rights reserved.</p>
        <div className="flex space-x-4">
          <Link href={`https://x.com`}><Twitter className="text-gray-100 cursor-pointer hover:text-gray-500" /></Link>
          <Link href={`https://linkedin.com`}><Linkedin className="text-gray-100 cursor-pointer hover:text-gray-500" /></Link>
          <Link href={`https://instagram.com`}><Instagram className="text-gray-100 cursor-pointer hover:text-gray-500" /></Link>
          <Link href={`https://facebook.com`}><Facebook className="text-gray-100 cursor-pointer hover:text-gray-500" /></Link>
        </div>
      </div>
    </footer>
  );
}
