# Solaria Holding Platform

## Visão Geral
A Solaria atua como uma Holding de saúde integrativa, englobando produtos escaláveis de conteúdo, educação e nutracêuticos. A Tatibana Saúde Integrativa opera como braço clínico especializado, mantendo segregação estrita de dados e foco em pacientes locais (Mogi das Cruzes).

## Estrutura de Apps (Monorepo)
- **apps/solaria-portal**: Portal de notícias e autoridade (Invictus).
- **apps/solaria-academy**: Plataforma de educação e mentoria.
- **apps/solaria-store**: E-commerce de nutracêuticos.
- **apps/tatibana**: Sistema de gestão clínica e portal do paciente.

## Regras de Ouro
1. **Segregação de Dados**: Dados de pacientes da Tatibana (prontuários, dados sensíveis) nunca devem ser acessados pelos apps da Holding Solaria.
2. **Identidade**: Solaria foca em escala digital; Tatibana foca em atendimento clínico especializado e humanizado.
3. **Compartilhamento**: Apenas componentes de UI (`packages/ui`) e lógicas de autenticação comuns podem ser compartilhados. Lógicas de negócio são segregadas por app.

## Tecnologias
- Next.js 15, React 19, TypeScript, Tailwind CSS, PostgreSQL, Prisma, Clerk, Vercel, OpenAI.
EOF
