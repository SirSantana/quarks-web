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
 
  return {
    props: { frontmatter, content },
  };
}
 
export default function ArticuloPage({ frontmatter, content }) {
  return <ArticlePage frontmatter={frontmatter} content={content} />;
}