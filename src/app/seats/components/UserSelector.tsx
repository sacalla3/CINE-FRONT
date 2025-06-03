'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelectionStore } from '../../store/useSelectionStore';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserSelectorProps {
  onSelectUser: (userId: string) => void;
  onClose: () => void;
}

export function UserSelector({ onSelectUser, onClose }: UserSelectorProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const selectedSeatIds = useSelectionStore((state) => state.selectedSeatIds);
  const [showUserSelector, setShowUserSelector] = useState(false);
    const functionId = useSelectionStore((state) => state.selectedFunctionId);
    const clearSelection = useSelectionStore((state) => state.clearSelection);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://cine-nest-production.up.railway.app/api/users/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [search, users]);

  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative">
        <h2 className="text-lg font-bold mb-4 text-center">Seleccionar Usuario Comprador</h2>

        <input
          type="text"
          placeholder="Buscar por nombre o correo..."
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="max-h-60 overflow-y-auto mb-4">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`p-2 cursor-pointer rounded hover:bg-blue-100 ${
                selectedUserId === user.id ? 'bg-blue-200' : ''
              }`}
              onClick={() => setSelectedUserId(user.id)}
            >
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          ))}
          {filteredUsers.length === 0 && (
            <p className="text-gray-500 text-sm text-center">No se encontraron usuarios.</p>
          )}
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:underline"
          >
            Cancelar
          </button>
          <button
            disabled={!selectedUserId}
            className={`px-4 py-2 rounded text-white font-bold ${
              selectedUserId
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            onClick={() => selectedUserId && onSelectUser(selectedUserId)}
          >
            Pagar ahora
          </button>
        </div>
      </div>
    </div>
  );
}
