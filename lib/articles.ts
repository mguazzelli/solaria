import fs from 'fs';
import path from 'path';

// O caminho corrigido para a pasta cms/migrated agora que estamos na raiz
const ARTICLES_PATH = path.join(process.cwd(), 'apps/cms/migrated');

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
