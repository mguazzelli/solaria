import React from 'react';
import Link from 'next/link';

export default function AdminPage() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-serif text-teal-900 mb-6">Painel Administrativo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Gestão de Posts */}
        <section className="p-6 border rounded-xl bg-white shadow-sm">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Posts</h2>
          <div className="flex flex-col gap-3">
            <Link href="/admin/new" className="text-teal-700 font-bold hover:underline">
              + Adicionar Novo
            </Link>
            <Link href="/admin/posts" className="text-teal-700 font-bold hover:underline">
              Todos os Posts
            </Link>
          </div>
        </section>

        {/* Gestão de Configurações */}
        <section className="p-6 border rounded-xl bg-white shadow-sm">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Configurações</h2>
          <div className="flex flex-col gap-3">
            <Link href="/admin/users" className="text-teal-700 font-bold hover:underline">
              Usuários (Autores/Funcionários)
            </Link>
            <Link href="/admin/ads" className="text-teal-700 font-bold hover:underline">
              Anúncios
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
