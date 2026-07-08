import React from 'react';

export default function UsersAdminPage() {
  const users = [
    { id: 1, name: 'Marcel Guazzelli', role: 'Dono' },
    { id: 2, name: 'Autor Exemplo', role: 'Autor' },
    { id: 3, name: 'Funcionário Exemplo', role: 'Funcionário' },
    { id: 4, name: 'Assinante Exemplo', role: 'Assinante' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-serif text-teal-900 mb-6">Gestão de Usuários</h1>
      <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Nome</th>
            <th className="p-4 text-left">Perfil</th>
            <th className="p-4 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-t">
              <td className="p-4">{user.name}</td>
              <td className="p-4">
                <span className={`px-2 py-1 rounded text-xs font-bold ${
                  user.role === 'Dono' ? 'bg-red-100 text-red-800' :
                  user.role === 'Assinante' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'
                }`}>
                  {user.role}
                </span>
              </td>
              <td className="p-4">
                <button className="text-teal-700 hover:underline">Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
