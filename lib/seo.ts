export const generateArticleSchema = (article: any, url: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title,
  description: article.content?.[0]?.children?.[0]?.text?.substring(0, 160),
  url,
  author: {
    '@type': 'Organization',
    name: 'Solaria Saúde Integrativa',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Solaria Saúde Integrativa',
    logo: {
      '@type': 'ImageObject',
      url: 'https://solaria.com.br/logo.png',
    },
  },
  datePublished: article.publishedAt,
});
