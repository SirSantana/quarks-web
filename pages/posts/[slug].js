import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ArticlePage from "@/src/Components/ArticlePage";

// Carpeta donde viven los .md
const ARTICLES_DIR = path.join(process.cwd(), "postsmd");

export async function getStaticPaths() {
  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".md"));
  return {
    paths: files.map((f) => ({
      params: { slug: f.replace(".md", "") },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(ARTICLES_DIR, `${params.slug}.md`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data: frontmatter, content } = matter(raw);

  // ── Artículos relacionados ──────────────────────────────────────────────────
  const allFiles = fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".md") && f !== `${params.slug}.md`);

  const allArticles = allFiles.map((f) => {
    const raw = fs.readFileSync(path.join(ARTICLES_DIR, f), "utf-8");
    const { data } = matter(raw);
    return {
      slug: f.replace(".md", ""),
      title: data.title || "",
      subtitle: data.subtitle || "",
      badge: data.badge || null,
      readTime: data.readTime || null,
      publishDate: data.publishDate || null,
      image: data.image || null,
      imageAlt: data.imageAlt || null,
    };
  });

  // Prioridad: mismo badge → misma categoría → el resto. Toma 3 máximo.
  const currentBadge = (frontmatter.badge || "").toLowerCase();

  const scored = allArticles
    .map((a) => ({
      ...a,
      score: (a.badge || "").toLowerCase() === currentBadge ? 2 : 1,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ score, ...rest }) => rest); // quitar el campo score del prop final

  return {
    props: {
      frontmatter,
      content,
      relatedArticles: scored,
    },
  };
}

export default function ArticuloPage({ frontmatter, content, relatedArticles }) {
  return (
    <ArticlePage
      frontmatter={frontmatter}
      content={content}
      relatedArticles={relatedArticles}
    />
  );
}