'use client';
import { useState } from 'react';
import { saveArticle } from '@/lib/articles';
import MediaSelector from '../../../components/MediaSelector';

export default function NewArticlePage() {
  const [blocks, setBlocks] = useState([{ type: 'paragraph', content: '' }]);
  const [mainImageUrl, setMainImageUrl] = useState('');

  const addBlock = (type: string) => {
    setBlocks([...blocks, { type, content: '' }]);
  };

  const updateBlock = (index: number, content: string) => {
    const newBlocks = [...blocks];
    newBlocks[index].content = content;
    setBlocks(newBlocks);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
      {/* WP-Style Admin Header */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Adicionar novo post</h1>
        <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50">Visualizar</button>
            <button type="submit" form="post-form" className="px-4 py-2 bg-teal-800 text-white rounded shadow-sm hover:bg-teal-900 font-bold">Publicar</button>
        </div>
      </div>

      <form id="post-form" action={saveArticle} className="max-w-6xl mx-auto grid grid-cols-12 gap-8">
        {/* Main Editor Column (Simulando o layout de artigo) */}
        <div className="col-span-9 flex flex-col gap-4">
          <input 
            type="text" 
            name="title" 
            placeholder="Título do Artigo" 
            className="text-5xl font-serif font-bold p-4 border-none bg-transparent focus:ring-0 outline-none w-full" 
            required 
          />
          
          <div className="bg-white p-12 rounded shadow-sm border border-gray-200 min-h-[600px] font-serif text-lg leading-relaxed text-gray-800">
            {blocks.map((block, i) => (
              <div key={i} className="mb-6 group relative">
                {block.type === 'heading' ? (
                  <input 
                    type="text" 
                    className="text-4xl font-bold w-full outline-none border-b border-transparent focus:border-gray-200 mb-2" 
                    placeholder="Título (H2)..." 
                    onChange={(e) => updateBlock(i, e.target.value)} 
                  />
                ) : (
                  <textarea 
                    className="w-full resize-none outline-none text-xl leading-relaxed" 
                    placeholder="Comece a escrever..." 
                    rows={1}
                    onChange={(e) => {
                        e.target.style.height = 'auto';
                        e.target.style.height = e.target.scrollHeight + 'px';
                        updateBlock(i, e.target.value);
                    }}
                  />
                )}
                {/* Botões de controle de bloco */}
                <div className="absolute -left-12 top-0 opacity-0 group-hover:opacity-100 flex flex-col gap-1 bg-white border rounded p-1 shadow-sm">
                    <button type="button" onClick={() => addBlock('heading')} className="p-1 hover:bg-gray-100 rounded text-xs font-bold text-gray-500">H</button>
                    <button type="button" onClick={() => addBlock('paragraph')} className="p-1 hover:bg-gray-100 rounded text-xs font-bold text-gray-500">P</button>
                </div>
              </div>
            ))}
          </div>
          <input type="hidden" name="content" value={JSON.stringify(blocks)} />
        </div>
        
        {/* Sidebar de Configurações */}
        <aside className="col-span-3 flex flex-col gap-6">
          <div className="bg-white border border-gray-200 rounded shadow-sm p-4">
            <h2 className="font-bold text-sm mb-4 border-b pb-2">Status e visibilidade</h2>
            <div className="text-sm text-gray-600 mb-2">Publicar: Imediatamente</div>
            <div className="text-sm text-gray-600">Status: Rascunho</div>
          </div>

          <div className="bg-white border border-gray-200 rounded shadow-sm p-4">
            <h2 className="font-bold text-sm mb-4 border-b pb-2">Categoria</h2>
            <input type="text" name="category" placeholder="Escolha a categoria" className="w-full p-2 border border-gray-300 rounded text-sm" />
          </div>

          <div className="bg-white border border-gray-200 rounded shadow-sm p-4">
            <h2 className="font-bold text-sm mb-4 border-b pb-2">Imagem destacada</h2>
            <MediaSelector onUpload={setMainImageUrl} />
            <input type="text" name="mainImage" value={mainImageUrl} onChange={(e) => setMainImageUrl(e.target.value)} placeholder="URL Imagem" className="w-full p-2 border border-gray-300 rounded mt-2 text-sm" />
          </div>
        </aside>
      </form>
    </div>
  );
}
