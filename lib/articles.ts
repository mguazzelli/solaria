'use server';
import * as fs from 'fs';
import * as path from 'path';

const ARTICLES_PATH = path.join(process.cwd(), 'apps/cms/migrated');

export async function getArticleSlugs() {
  if (!fs.existsSync(ARTICLES_PATH)) return [];
  return fs.readdirSync(ARTICLES_PATH).map(file => file.replace('.json', ''));
}

export async function getArticleBySlug(slug: string) {
  const fullPath = path.join(ARTICLES_PATH, `${slug}.json`);
  const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  data.views = data.views || Math.floor(Math.random() * 1000);
  return data;
}

export async function incrementView(slug: string) {
  const fullPath = path.join(ARTICLES_PATH, `${slug}.json`);
  const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  data.views = (data.views || 0) + 1;
  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
}

export async function getAllArticles() {
  const slugs = await getArticleSlugs();
  return Promise.all(slugs.map(slug => getArticleBySlug(slug)));
}
