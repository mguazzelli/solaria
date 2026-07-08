import { getArticleBySlug } from '@/lib/articles';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="text-teal-700 hover:underline mb-8 block">&larr; Voltar ao portal</Link>
        <h1 className="text-4xl font-serif font-bold mb-6">{article.title}</h1>
        
        <div className="prose prose-lg prose-teal max-w-none text-gray-700">
          {article.content?.map((block: any, i: number) => (
            <p key={i} className="mb-6">{block.children?.[0]?.text}</p>
          ))}
        </div>

        <section className="mt-16 p-8 bg-gray-50 rounded-2xl border border-gray-100">
          <h3 className="text-xl font-serif font-bold text-teal-800 mb-4">Deseja um acompanhamento personalizado?</h3>
          <p className="text-gray-600 mb-6">Deixe sua dúvida abaixo e entraremos em contato.</p>
          <form className="flex flex-col gap-4">
            <input type="email" placeholder="Seu melhor e-mail" className="p-3 border rounded-lg"/>
            <textarea placeholder="Como posso te ajudar?" className="p-3 border rounded-lg h-32"></textarea>
            <button className="bg-teal-800 text-white py-3 rounded-lg font-bold hover:bg-teal-900 transition">Enviar Mensagem</button>
          </form>
        </section>
      </div>
    </main>
  );
}
