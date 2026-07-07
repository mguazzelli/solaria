import fs from 'fs';
import path from 'path';

// O caminho precisa ser ajustado para subir do app/web até a pasta apps/cms/migrated
const ARTICLES_PATH = path.join(process.cwd(), '../cms/migrated');

export function getArticleSlugs() {
  if (!fs.existsSync(ARTICLES_PATH)) return [];
  return fs.readdirSync(ARTICLES_PATH).map(file => file.replace('.json', ''));
}

export function getArticleBySlug(slug: string) {
  const fullPath = path.join(ARTICLES_PATH, `${slug}.json`);
  return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
}

export function getAllArticles() {
  return getArticleSlugs().map(slug => getArticleBySlug(slug));
}
