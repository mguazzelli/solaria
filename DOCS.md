# Portal Solaria - Documentação Técnica

## Capítulo 1: Arquitetura e Configurações
- **Frontend:** Next.js 16 (Turbopack).
- **Backend:** CMS de arquivos JSON em D:/Solaria_Data/migrated_articles/.

## Capítulo 2: Painel Administrativo (/admin)
- **Criação de Posts:** Rota /admin/new disponível.
- **Estrutura:** Usa Server Actions para persistência direta em JSON.

## Capítulo 3: Mensuração e Métricas
- **Views:** Incremento automático via lib/articles.ts.
- **Admin Dashboard:** Exibe total de acessos por post.

## Capítulo 4: Design e Identidade (Premium Revista)
- **Tipografia:** Serif para títulos (Autoridade), Sans-Serif para leitura.
- **Paleta:** Tons de Teal (Confiança/Saúde).

## Capítulo 5: Newsletter e Automação
- **Lead Capture:** CSV em D:/Solaria_Data/CRM/leads.csv.
- **Invictus Editor:** Cronjob agendado (09:00, Ter/Qui) para drafts em D:/Solaria_Data/newsletter_drafts/.

## Capítulo 6: Manual de Uso do Administrador
1. **Publicar Artigo:** Acesse /admin/new, preencha os campos e salve. O sistema gera o JSON na pasta de dados.
2. **Consultar Leads:** Verifique o arquivo /d/Solaria_Data/CRM/leads.csv periodicamente.
