# Portal Solaria - Documentação Técnica

## Capítulo 1: Arquitetura e Configurações do Portal
Este capítulo descreve a estrutura de infraestrutura, roteamento e integração de dados do portal principal.

### 1.1 Visão Geral
Portal de conteúdo da Solaria, construído com **Next.js** (App Router) e CMS baseado em arquivos JSON locais.

### 1.2 Configurações de Dados
Os artigos são processados a partir da unidade `D:`, garantindo separação entre código (C:) e conteúdo (D:).

- **Caminho dos Dados:** `/d/Solaria_Data/migrated_articles/`
- **Frontend:** Next.js (Server Components)
- **Integração:** `lib/articles.ts` realiza a leitura, parse e incremento de visualizações dos arquivos JSON.

### 1.3 Guia de Manutenção
- Se o portal não carregar artigos, verificar a existência e permissão da pasta de dados em `D:`.
- Logs de erro são injetados em `lib/` para facilitar o diagnóstico de falhas de I/O.

---

## Próximas Tarefas (Log)
- [ ] Implementar logs robustos em `lib/articles.ts`.
- [ ] Ajustar `ARTICLES_PATH` para o caminho correto em `D:`.
- [ ] Segregar documentação de outros módulos (ex: Clínica Tatibana, Sistema de CRM) em novos capítulos conforme forem desenvolvidos.
