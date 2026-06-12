import CodePresentation from "@/src/Components/Obd/Presentation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "utils/content/codes/en");

// ─── SSG ─────────────────────────────────────────────────────────────────────
export async function getStaticPaths() {
  // Create the folder if it doesn't exist (prevents crash on first build)
  if (!fs.existsSync(CONTENT_DIR)) {
    return { paths: [], fallback: false };
  }

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));

  return {
    paths: files.map((f) => ({
      params: { slug: f.replace(".md", "") }, // "P0300" → /obd2/P0300
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(CONTENT_DIR, `${params.slug.toUpperCase()}.md`);

  if (!fs.existsSync(filePath)) {
    return { notFound: true };
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data: frontmatter, content } = matter(raw);

  return {
    props: { frontmatter, content },
  };
}
export default function PresentationPage({ frontmatter, content }) {
  return <CodePresentation frontmatter={frontmatter} content={content} />;
}