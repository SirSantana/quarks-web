import Layout from "@/src/Components/Layout";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";

function readingTime(html) {
  const text = html.replace(/<[^>]+>/g, "");
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / 200);
}

function formatDate(dateStr) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ArticleIndex({ posts }) {
  return (
    <Layout
      title="Blog · Quarks"
      description="Expert guides, tips, and news about auto parts, vehicle maintenance, and the automotive world."
      navbarRepuestos={false}
      visibleNavbar={true}
    >
      <div className="min-h-screen bg-white">
        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="border-b border-gray-100">
          <div className="max-w-[1200px] mx-auto px-6 pt-12 pb-10 max-sm:px-4">
            <p className="text-[12px] font-semibold uppercase tracking-[1px] text-[#407BFF] mb-3">
              Quarks · Blog
            </p>
            <h1 className="text-[30px] sm:text-[36px] font-bold text-gray-950 tracking-tight leading-snug mb-2">
              Articles & Guides
            </h1>
            <p className="text-[16px] text-gray-400">
              Expert tips, technical guides, and the latest from the automotive
              world.
            </p>
          </div>
        </div>

        {/* ── Article list ─────────────────────────────────────────── */}
        <main className="max-w-[1200px] mx-auto px-6 py-12 max-sm:px-4">
          {posts.length === 0 ? (
            <div className="text-center py-28">
              <p className="text-[17px] font-semibold text-gray-900 mb-2">
                No articles yet
              </p>
              <p className="text-[15px] text-gray-400">
                Check back soon — new content is on the way.
              </p>
            </div>
          ) : (
            <>
              {/* Featured article — most recent */}
              <Link
                href={`/article/${posts[0].slug}`}
                className="group block mb-12"
                style={{ textDecoration: "none" }}
              >
                <div className="grid md:grid-cols-2 gap-0 rounded-2xl border border-gray-100 overflow-hidden hover:border-[#407BFF] transition-colors">
                  {/* Image */}
                  <div className="aspect-[16/9] md:aspect-auto bg-gray-100 overflow-hidden">
                    {posts[0].image ? (
                      <img
                        src={posts[0].image}
                        alt={posts[0].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full min-h-[240px] bg-[#eef2ff] flex items-center justify-center">
                        <span className="text-[#407BFF] text-[12px] font-bold uppercase tracking-widest">
                          Quarks
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-8 sm:p-10 flex flex-col justify-center">
                    <p className="text-[11px] font-bold uppercase tracking-[1px] text-[#407BFF] mb-3">
                      Featured
                    </p>
                    <h2 className="text-[22px] sm:text-[26px] font-bold text-gray-950 tracking-tight leading-snug mb-4 group-hover:text-[#407BFF] transition-colors">
                      {posts[0].title}
                    </h2>
                    {posts[0].description && (
                      <p className="text-[14px] text-gray-400 leading-relaxed mb-6 line-clamp-3">
                        {posts[0].description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-[12px] text-gray-400 mb-6 flex-wrap">
                      {posts[0].date && (
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(posts[0].date)}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {posts[0].readingTime} min read
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#407BFF]">
                      Read article
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>

              {/* Rest of articles */}
              {posts.length > 1 && (
                <>
                  <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-[18px] font-bold text-gray-950 tracking-tight shrink-0">
                      More articles
                    </h2>
                    <div className="flex-1 border-t border-gray-100" />
                  </div>

                  <ul className="list-none p-0 space-y-0">
                    {posts.slice(1).map((post, i, arr) => (
                      <li
                        key={post.slug}
                        className={
                          i < arr.length - 1 ? "border-b border-gray-100" : ""
                        }
                      >
                        <Link
                          href={`/article/${post.slug}`}
                          className="group flex items-center gap-6 py-6 hover:bg-gray-50 -mx-6 px-6 transition-colors max-sm:-mx-4 max-sm:px-4"
                          style={{ textDecoration: "none" }}
                        >
                          {/* Thumb */}
                          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                            {post.image ? (
                              <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-full h-full bg-[#eef2ff] flex items-center justify-center">
                                <span className="text-[#407BFF] text-[9px] font-bold uppercase tracking-widest">
                                  Blog
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-[15px] font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#407BFF] transition-colors mb-2">
                              {post.title}
                            </h3>
                            {post.description && (
                              <p className="text-[13px] text-gray-400 line-clamp-1 mb-2">
                                {post.description}
                              </p>
                            )}
                            <div className="flex items-center gap-4 text-[12px] text-gray-400 flex-wrap">
                              {post.date && (
                                <span className="flex items-center gap-1.5">
                                  <Calendar className="w-3 h-3" />
                                  {formatDate(post.date)}
                                </span>
                              )}
                              <span className="flex items-center gap-1.5">
                                <Clock className="w-3 h-3" />
                                {post.readingTime} min read
                              </span>
                            </div>
                          </div>

                          <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#407BFF] shrink-0 max-sm:hidden transition-colors" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </>
          )}
        </main>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const slugs = getAllPostSlugs();

  const posts = await Promise.all(
    slugs.map(async ({ params }) => {
      const post = await getPostBySlug(params.slug);
      return {
        slug: post.slug,
        title: post.title || params.slug,
        description: post.description || null,
        date: post.date || null,
        image: post.image || null,
        readingTime: readingTime(post.contentHtml),
      };
    }),
  );

  // Sort by date descending
  posts.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date) - new Date(a.date);
  });

  return { props: { posts } };
}
