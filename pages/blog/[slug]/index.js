import matter from "gray-matter";
import path from "path";
import fs from "fs";
import MarkdownViewer from "@/src/Components/Blog/MarkdownVisualizer";

export function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), "posts");
  const files = fs.readdirSync(postsDirectory);

  const slugs = files.map((file) => file.replace(/\.md$/, ""));

  return {
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const postsDirectory = path.join(process.cwd(), "posts");
  const fullPath = path.join(postsDirectory, `${params.slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  return {
    props: {
      post: {
        slug: params.slug,
        meta: data,
        content,
      },
    },
  };
}

export default function BlogPostPage({ post }) {
  return <MarkdownViewer content={post.content} meta={post.meta} />;
}
