'use server';
import * as fs from 'fs';
import * as path from 'path';

const ARTICLES_PATH = 'D:\\\\Solaria_Data\\\\migrated_articles';

export async function getArticleSlugs() {
  try {
    if (!fs.existsSync(ARTICLES_PATH)) {
      console.error(`[LOG] Erro: Pasta de artigos não encontrada em ${ARTICLES_PATH}`);
      return [];
    }
    const files = fs.readdirSync(ARTICLES_PATH).filter(file => file.endsWith('.json'));
    console.log(`[LOG] Sucesso: Encontrados ${files.length} artigos.`);
    return files.map(file => file.replace('.json', ''));
  } catch (error) {
    console.error(`[LOG] Erro ao ler slugs:`, error);
    return [];
  }
}

export async function getArticleBySlug(slug: string) {
  try {
    const fullPath = path.join(ARTICLES_PATH, `${slug}.json`);
    const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    data.views = data.views || Math.floor(Math.random() * 1000);
    return data;
  } catch (error) {
    console.error(`[LOG] Erro ao carregar artigo ${slug}:`, error);
    return null;
  }
}

export async function incrementView(slug: string) {
  const fullPath = path.join(ARTICLES_PATH, `${slug}.json`);
  const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  data.views = (data.views || 0) + 1;
  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
}

export async function getAllArticles() {
  const slugs = await getArticleSlugs();
  const articles = await Promise.all(slugs.map(slug => getArticleBySlug(slug)));
  return articles.filter(a => a !== null); // Filtra erros
}
