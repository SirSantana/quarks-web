import Link from "next/link";


export default function BlogPage() {
  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-6 pt-16 md:pt-24 pb-8">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-7xl font-semibold text-gray-900 tracking-tight mb-6">
              Blog
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed">
              Discover our latest articles and insights on the latest developments in the industry.
            </p>
            <Link href="/blog/what-to-know-before-buying-an-ev" className="mt-8 text-base font-medium text-indigo-600 hover:text-indigo-500">
              Read our first post
            </Link>
          </div>

          {/* Hero Image for SEO */}
        
        </div>
        </div>
        </>
      );
}
