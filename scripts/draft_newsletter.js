const fs = require('fs');
const path = require('path');

// Configuração atual - Migração para Google Sheets no futuro
const ARTICLES_DIR = 'D:\\Solaria_Data\\migrated_articles';
const DRAFT_DIR = 'D:\\Solaria_Data\\newsletter_drafts';

/**
 * SCHEMA de Dados (para referência na migração ao Google Sheets)
 * {
 *   "id": string, // Identificador único (slug)
 *   "title": string,
 *   "content": string,
 *   "status": "draft" | "review" | "published",
 *   "published_at": timestamp,
 *   "category": string,
 *   "tags": string[]
 * }
 */

if (!fs.existsSync(DRAFT_DIR)) fs.mkdirSync(DRAFT_DIR, { recursive: true });

const getArticles = () => {
    return fs.readdirSync(ARTICLES_DIR)
        .filter(f => f.endsWith('.json'))
        .map(f => {
            const data = JSON.parse(fs.readFileSync(path.join(ARTICLES_DIR, f), 'utf8'));
            return {
                ...data,
                id: f.replace('.json', ''),
                status: data.status || 'draft'
            };
        });
};

const articles = getArticles();

const newsletter = `# Newsletter Solaria - Edição Semanal
## Artigos em Destaque:
${articles.map(a => `- **${a.title}** (Status: ${a.status})`).join('\n')}

---
*Este é um rascunho automático consolidado pelo agente Invictus.*
`;

fs.writeFileSync(path.join(DRAFT_DIR, `newsletter_${new Date().toISOString().split('T')[0]}.md`), newsletter);
console.log(`Newsletter gerada em ${DRAFT_DIR}`);
