import { getAllArticles } from '@/lib/articles';
import ArticleGrid from './ArticleGrid';

export default async function Home() {
  const allArticles = await getAllArticles();

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <ArticleGrid initialArticles={allArticles} />
    </main>
  );
}
