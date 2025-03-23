// src/components/HeroSection.tsx
export default function HeroSection() {
    return (
      <section className="bg-blue-100 py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-blue-700 mb-4">Welcome to Blogify!</h1>
          <p className="text-gray-600 mb-8">Explore stories, ideas, and experiences from across the world.</p>
          <a href="/blogs" className="px-6 py-3 bg-blue-600 text-white rounded-lg">Explore Blogs</a>
        </div>
      </section>
    );
  }
  