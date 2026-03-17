import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import html from 'remark-html';
import { visit } from 'unist-util-visit';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter(f => f.endsWith('.md'))
    .map(fileName => ({
      params: { slug: fileName.replace(/\.md$/, '') },
    }));
}

// Plugin: agrega id a los headings para la ToC
function remarkHeadingIds() {
  return (tree) => {
    visit(tree, 'heading', (node) => {
      const text = node.children
        .filter(n => n.type === 'text' || n.type === 'inlineCode')
        .map(n => n.value)
        .join('');

      const id = text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');

      node.data = node.data || {};
      node.data.hProperties = node.data.hProperties || {};
      node.data.hProperties.id = id;
    });
  };
}

export async function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(remarkGfm)          // ← habilita tablas, strikethrough, task lists
    .use(remarkHeadingIds)
    .use(html, { sanitize: false })
    .process(content);

  // Wrap tables en contenedor scrollable
  let contentHtml = processedContent.toString();
  contentHtml = contentHtml.replace(
    /<table>/g,
    '<div class="table-wrapper"><table class="prose-table">'
  );
  contentHtml = contentHtml.replace(/<\/table>/g, '</table></div>');

  return {
    slug,
    contentHtml,
    ...data,
  };
}