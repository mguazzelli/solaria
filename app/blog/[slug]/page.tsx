import { generateArticleSchema } from '@/lib/seo';
import { getArticleBySlug, incrementView } from '@/lib/articles';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  
  if (!article) {
    return {
      title: 'Artigo não encontrado',
    };
  }
  
  const url = `https://solaria.com.br/blog/${slug}`;
  return {
    title: article.title,
    description: article.content?.[0]?.children?.[0]?.text?.substring(0, 160) || 'Artigo do blog Solaria',
    openGraph: {
      title: article.title,
      description: article.content?.[0]?.children?.[0]?.text?.substring(0, 160) || 'Artigo do blog Solaria',
      url,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.content?.[0]?.children?.[0]?.text?.substring(0, 160) || 'Artigo do blog Solaria',
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  await incrementView(slug);

  if (!article) {
    notFound();
  }

  const url = `https://solaria.com.br/blog/${slug}`;
  const jsonLd = generateArticleSchema(article, url);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-white text-gray-900">
        <article className="max-w-3xl mx-auto px-6 py-16">
          <header className="mb-8">
            <Link href="/" className="text-teal-700 hover:underline mb-8 block">&larr; Voltar ao portal</Link>
            <h1 className="text-4xl font-serif font-bold mb-6">{article.title}</h1>
          </header>
          
          <section className="prose prose-lg prose-teal max-w-none text-gray-700">
            {article.content?.map((block: { children?: { text: string }[] }, i: number) => (
                      <p key={i} className="mb-6">{block.children?.[0]?.text}</p>
                    ))}
          </section>

          <footer className="mt-8 flex gap-4">
            <button 
              onClick={() => navigator.clipboard.writeText(window.location.href)}
              className="text-sm text-teal-700 font-bold hover:underline"
            >
              Compartilhar link
            </button>
          </footer>

          <section className="mt-16 p-8 bg-gray-50 rounded-2xl border border-gray-100">
            <h2 className="text-xl font-serif font-bold text-teal-800 mb-4">Deseja um acompanhamento personalizado?</h2>
            <p className="text-gray-600 mb-6">Deixe sua dúvida abaixo e entraremos em contato.</p>
            <form className="flex flex-col gap-4">
              <input type="email" placeholder="Seu melhor e-mail" className="p-3 border rounded-lg"/>
              <textarea placeholder="Como posso te ajudar?" className="p-3 border rounded-lg h-32"></textarea>
              <button className="bg-teal-800 text-white py-3 rounded-lg font-bold hover:bg-teal-900 transition">Enviar Mensagem</button>
            </form>
          </section>
        </article>
      </main>
    </>
  );
}
