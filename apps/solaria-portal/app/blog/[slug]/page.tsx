import { getArticleBySlug, incrementView } from '@/lib/articles';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  return { title: article?.title || 'Artigo' };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();
  await incrementView(slug);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="text-teal-700 hover:underline mb-8 block">&larr; Voltar ao portal</Link>
        <h1 className="text-4xl font-serif font-bold mb-6">{article.title}</h1>
        
        <div className="prose prose-lg prose-teal max-w-none text-gray-700">
          {typeof article.content === 'string' ? (
            <p>{article.content}</p>
          ) : Array.isArray(article.content) ? (
            article.content.map((block: any, i: number) => (
              <p key={i} className="mb-6">{block.children?.[0]?.text || block.text || ''}</p>
            ))
          ) : (
            <p>{String(article.content || '')}</p>
          )}
        </div>
      </div>
    </main>
  );
}
