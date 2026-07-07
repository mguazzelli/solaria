export default {
  name: 'article',
  title: 'Artigo',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL amigável)',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Autor',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Conteúdo',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: ['Bem-Estar', 'Nutrição', 'Plantas Medicinais', 'Terapias', 'Florais'],
      },
    },
    {
      name: 'publishedAt',
      title: 'Data de Publicação',
      type: 'datetime',
    },
  ],
}
