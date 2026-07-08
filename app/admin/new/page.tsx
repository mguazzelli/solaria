'use client';
import { saveArticle, getArticleBySlug } from '@/lib/articles';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

function ArticleForm() {
  const searchParams = useSearchParams();
  const editSlug = searchParams.get('edit');
  const [article, setArticle] = useState<any>(null);

  useEffect(() => {
    if (editSlug) {
      getArticleBySlug(editSlug).then(setArticle);
    }
  }, [editSlug]);

  return (
      <form action={saveArticle} className="flex flex-col gap-4">
        {editSlug && <input type="hidden" name="edit" value={editSlug} />}
        <input 
          name="title" 
          placeholder="Título" 
          defaultValue={article?.title || ''}
          required 
          className="p-2 border rounded"
        />
        <div className="flex gap-2">
            <button type="button" className="p-2 border rounded text-xs bg-gray-100">+ Imagem</button>
            <button type="button" className="p-2 border rounded text-xs bg-gray-100">+ Lista</button>
            <button type="button" className="p-2 border rounded text-xs bg-gray-100">+ Separador</button>
        </div>
        <textarea 
          name="content" 
          placeholder="Conteúdo" 
          defaultValue={article ? JSON.stringify(article.content) : ''}
          required 
          className="p-2 border rounded h-64"
        />
        <button 
          type="submit" 
          className="p-2 bg-teal-900 text-white rounded"
        >
          {editSlug ? 'Atualizar' : 'Salvar'}
        </button>
      </form>
  );
}

export default function NewArticlePage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Suspense fallback={<div>Carregando...</div>}>
        <ArticleForm />
      </Suspense>
    </div>
  );
}
