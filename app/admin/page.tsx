import { getAllArticles, deleteArticle } from '@/lib/articles';
import Link from 'next/link';
import ArticleListClient from './ArticleListClient';

export default async function AdminDashboard() {
  const articles = await getAllArticles();

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-serif">Painel Administrativo</h1>
          <nav className="flex gap-4">
             <Link href="/admin/posts" className="text-gray-600 hover:text-teal-900">Posts</Link>
             <Link href="/admin/media" className="text-gray-600 hover:text-teal-900">Mídia</Link>
             <Link href="/admin/users" className="text-gray-600 hover:text-teal-900">Usuários</Link>
             <Link href="/admin/settings" className="text-gray-600 hover:text-teal-900">Configurações</Link>
          </nav>
          <Link href="/admin/new" className="bg-teal-900 text-white px-6 py-2 rounded-lg hover:bg-teal-800 transition">
            Novo Artigo
          </Link>
        </header>

        <ArticleListClient initialArticles={articles} />
      </div>
    </main>
  );
}
