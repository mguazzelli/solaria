'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ArticleGrid({ initialArticles }: { initialArticles: any[] }) {
  const [search, setSearch] = useState('');
  
  const filtered = [...initialArticles].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  ).filter(a => 
    a.title?.toLowerCase().includes(search.toLowerCase()) || 
    a.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <header className="border-b bg-white py-6">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-3xl font-serif text-teal-800">Solaria Holding</h1>
          <input 
            type="text" 
            placeholder="Buscar assunto..." 
            className="border rounded-full px-4 py-2 text-sm focus:outline-teal-600"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>
      
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((article) => (
            <Link key={article.slug || 'slug'} href={`/blog/${article.slug || 'slug'}`} 
                  className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
              {article.mainImage && (
                <img src={article.mainImage} alt={article.title} className="w-full h-40 object-cover rounded-lg mb-4" />
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
