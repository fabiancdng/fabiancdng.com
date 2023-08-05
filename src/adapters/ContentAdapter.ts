import matter from 'gray-matter';
import { readFile } from 'fs/promises';

export async function getIntroduction() {
  const absPath = process.cwd();

  const markdown = await readFile(`${absPath}/content/pages/homepage/introduction.md`).catch((err) => null);

  if (!markdown) return null;

  const introductionMatter = matter(markdown, {
    excerpt: false,
  });

  const content = introductionMatter.content;

  return content;
}
