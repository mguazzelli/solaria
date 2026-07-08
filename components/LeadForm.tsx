'use client';
import { useState } from 'react';

export default function LeadForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Capturing lead:', email);
    alert('Obrigado! Em breve entraremos em contato.');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-4 font-serif">Receba novidades da Solaria</h3>
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Seu melhor e-mail" 
        required
        className="w-full p-3 border border-gray-200 rounded-lg mb-4 focus:ring-2 focus:ring-teal-500 outline-none"
      />
      <button 
        type="submit" 
        className="w-full bg-teal-900 text-white py-3 rounded-lg font-bold hover:bg-teal-800 transition"
      >
        Inscrever-se
      </button>
    </form>
  );
}
