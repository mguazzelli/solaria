'use server';
import * as fs from 'fs';
import * as path from 'path';

const ARTICLES_PATH = 'D:\\\\Solaria_Data\\\\migrated_articles';

export async function getArticleSlugs() {
  try {
    if (!fs.existsSync(ARTICLES_PATH)) {
      return [];
    }
    const files = fs.readdirSync(ARTICLES_PATH).filter(file => file.endsWith('.json'));
    return files.map(file => file.replace('.json', ''));
  } catch (_error) {
    return [];
  }
}

export async function getArticleBySlug(slug: string) {
  try {
    const fullPath = path.join(ARTICLES_PATH, `${slug}.json`);
    const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    if (typeof data.views === 'undefined') {
      data.views = 0;
      fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
    }
    return data;
  } catch (_error) {
    return null;
  }
}
export async function deleteArticle(slug: string) {
  'use server';
  try {
    const fullPath = path.join(ARTICLES_PATH, `${slug}.json`);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  } catch (_error) {
    throw new Error('Falha ao excluir o artigo.');
  }
}

export async function incrementView(slug: string) {
  'use server';
  try {
    const fullPath = path.join(ARTICLES_PATH, `${slug}.json`);
    const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    data.views = (data.views || 0) + 1;
    fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
  } catch (_error) {
    // Ignore
  }
}

import { checkEthics } from './ethics-check';

export async function saveArticle(formData: FormData) {
  'use server';
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const author = formData.get('author') as string || 'Solaria';
  const category = formData.get('category') as string || 'Sem Categoria';
  const mainImage = formData.get('mainImage') as string || '';
  const date = formData.get('date') as string || new Date().toISOString();

  const ethics = checkEthics(title, content);
  if (!ethics.isEthical) {
    throw new Error(`Artigo bloqueado pela Blindagem Ética: ${ethics.violations.join(', ')}`);
  }
  
  const slug = formData.get('edit') as string || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const fullPath = path.join(ARTICLES_PATH, `${slug}.json`);
  
  const article = {
    title,
    content: [{ children: [{ text: content }] }],
    slug,
    author,
    category,
    mainImage,
    date,
    views: 0,
    isHighlighted: false,
  };

  fs.writeFileSync(fullPath, JSON.stringify(article, null, 2));
}

export async function getAllArticles() {
  try {
    const slugs = await getArticleSlugs();
    const articles = await Promise.all(slugs.map(async (slug) => {
      const article = await getArticleBySlug(slug);
      return article ? { ...article, slug } : null;
    }));
    return articles.filter(a => a !== null);
  } catch (error) {
    return [];
  }
}
