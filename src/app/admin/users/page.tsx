'use client';

import { useEffect, useState } from 'react';
import { UsersTable } from '../../components/UsersTable';
import RegisterUserForm from '../../components/FormRegister';

interface User {
  id: string;
  cedula: string;
  name: string;
  email: string;
  nickname: string;
  role: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  const fetchUsers = async () => {
    setError('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No autenticado. Inicie sesión como admin.');
        return;
      }
      const res = await fetch('http://localhost:3000/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        setError('No autorizado o error al obtener usuarios');
        return;
      }
      const data = await res.json();
      const filteredUsers = data.map((u: any) => ({
        id: u.id,
        cedula: u.cedula,
        name: u.name,
        email: u.email,
        nickname: u.nickname,
        role: u.role,
      }));
      setUsers(filteredUsers);
    } catch (err) {
      setError('Error de red o del servidor');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user: User) => {
    alert(`Editar usuario: ${user.name}`);
  };

  const handleDelete = (user: User) => {
    alert(`Eliminar usuario: ${user.name}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Gestión de usuarios</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <UsersTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => setShowRegister(true)}
      >
        Crear usuario
      </button>
      {showRegister && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setShowRegister(false)}
            >
              ✕
            </button>
            <RegisterUserForm
              onSuccess={() => {
                setShowRegister(false);
                fetchUsers();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}