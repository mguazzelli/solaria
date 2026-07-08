'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ArticleGrid({ initialArticles }: { initialArticles: { slug: string, title: string, category: string, mainImage: string, author: string, isHighlighted: boolean, date?: string }[] }) {
  const [search, setSearch] = useState('');
  
  const filtered = [...initialArticles].sort((a, b) => 
    new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
  ).filter(a => 
    a.title?.toLowerCase().includes(search.toLowerCase()) || 
    a.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <header className="border-b bg-white py-6">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-3xl font-serif text-teal-800">
            <Link href="/">Solaria Holding</Link>
          </h1>
          <div className="flex gap-4 items-center">
            <Link href="/admin" className="px-4 py-2 bg-teal-800 text-white rounded-lg text-sm font-bold hover:bg-teal-900 transition">
              Painel Admin
            </Link>
            <input 
              type="text" 
              placeholder="Buscar assunto..." 
              className="border rounded-full px-4 py-2 text-sm focus:outline-teal-600"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </header>
      
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero Section */}
        {initialArticles.some(a => a.isHighlighted) && (
          <section className="bg-teal-900 text-white py-16 mb-12">
            <div className="max-w-5xl mx-auto px-6">
              {initialArticles.filter(a => a.isHighlighted).map((article) => (
                <div key={article.slug}>
                  <span className="text-sm uppercase tracking-widest text-teal-300">Destaque</span>
                  <h1 className="text-4xl font-serif mt-2 mb-6">{article.title}</h1>
                  <Link href={`/blog/${article.slug}`} className="bg-white text-teal-900 px-6 py-3 rounded-lg font-bold">
                    Ler artigo
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((article) => (
            <Link href={`/blog/${article.slug || 'slug'}`} 
                  className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all block">
              {article.mainImage && (
                <Image src={article.mainImage} alt={`Capa do artigo: ${article.title}`} width={400} height={160} className="w-full h-40 object-cover rounded-lg mb-4" />
              )}
              <span className="text-xs font-bold text-teal-600 uppercase">{article.category}</span>
              <h2 className="text-lg font-bold mt-2 mb-4 font-serif">{article.title}</h2>
              <div className="text-sm text-gray-400 border-t pt-4">{article.author}</div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
