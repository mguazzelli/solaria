'use client';
import { useRouter } from 'next/navigation';
import { deleteArticle } from '@/lib/articles';

export default function ArticleListClient({ initialArticles }: { initialArticles: any[] }) {
  const router = useRouter();

  async function handleDelete(slug: string) {
    if (confirm('Tem certeza que deseja excluir este artigo?')) {
      await deleteArticle(slug);
      router.refresh();
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-4 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Título</th>
            <th className="py-4 px-6 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {initialArticles.map((article: any) => (
            <tr key={article.slug} className="hover:bg-gray-50 transition">
              <td className="py-4 px-6 text-sm font-medium text-gray-900">{article.title}</td>
              <td className="py-4 px-6 text-sm text-gray-500 text-right space-x-2">
                <button 
                    onClick={() => router.push(`/admin/new?edit=${article.slug}`)}
                    className="text-teal-900 hover:text-teal-700 font-medium">Editar</button>
                <button 
                    onClick={() => handleDelete(article.slug)}
                    className="text-red-600 hover:text-red-800 font-medium">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
