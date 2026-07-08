'use client';
import { useState } from 'react';
import { getAllArticles } from '@/lib/articles';
import Link from 'next/link';

export default function Home() {
  const allArticles = getAllArticles();
  const [search, setSearch] = useState('');
  
  const filtered = allArticles.filter(a => 
    a.title.toLowerCase().includes(search.toLowerCase()) || 
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
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
            <Link key={article.slug.current} href={`/blog/${article.slug.current}`} 
                  className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <span className="text-xs font-bold text-teal-600 uppercase">{article.category}</span>
              <h2 className="text-lg font-bold mt-2 mb-4 font-serif">{article.title}</h2>
              <div className="text-sm text-gray-400 border-t pt-4">{article.author}</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
