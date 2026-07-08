import { getArticleSlugs, getArticleBySlug } from '@/lib/articles';
import Link from 'next/link';

export default async function AllPostsPage() {
  const slugs = await getArticleSlugs();
  const articles = await Promise.all(slugs.map(getArticleBySlug));

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-teal-900">Todos os Posts</h1>
        <Link href="/admin/new" className="bg-teal-800 text-white px-4 py-2 rounded-lg font-bold">
          Adicionar Novo
        </Link>
      </div>
      
      <div className="bg-white rounded-lg border shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-left">Título</th>
              <th className="p-4 text-left">Autor</th>
              <th className="p-4 text-left">Data</th>
              <th className="p-4 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((art: any, i: number) => (
              <tr key={i} className="border-t">
                <td className="p-4">{art.title}</td>
                <td className="p-4">{art.author}</td>
                <td className="p-4">{new Date(art.date).toLocaleDateString()}</td>
                <td className="p-4 flex gap-2">
                  <button className="text-blue-600 hover:underline">Editar</button>
                  <button className="text-red-600 hover:underline">Lixo</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
