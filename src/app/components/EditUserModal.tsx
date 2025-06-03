import React, { useState } from 'react';

interface EditUserModalProps {
  user: { cedula: string; name: string; email: string; role: string };
  onClose: () => void;
  onUpdated: () => void;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({ user, onClose, onUpdated }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(
  typeof user.role === "string" && ["admin", "seller", "client"].includes(user.role)
    ? user.role
    : "client"
);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      // Actualizar nombre y email
      const res = await fetch(`https://cine-nest-production.up.railway.app/api/users/${user.cedula}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email }),
      });
      if (!res.ok) {
        setError('No se pudo actualizar el usuario');
        setLoading(false);
        return;
      }
      // Actualizar rol si cambió
      if (role !== user.role) {
        const resRole = await fetch(`https://cine-nest-production.up.railway.app/api/auth/${user.cedula}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ roles:[role] }),
        });
        if (!resRole.ok) {
          setError('No se pudo actualizar el rol');
          setLoading(false);
          return;
        }
      }
      onUpdated();
      onClose();
    } catch {
      setError('Error de red');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 relative w-full max-w-md">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4 text-center text-black">Editar usuario</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full p-2 rounded border border-gray-300"
            name="name"
            placeholder="Nombre"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            className="w-full p-2 rounded border border-gray-300"
            name="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <select
            className="w-full p-2 rounded border border-gray-300"
            name="role"
            value={role}
            onChange={e => setRole(e.target.value)}
            required
            >
            <option value="admin">Administrador</option>
            <option value="seller">Vendedor</option>
            <option value="client">Cliente</option>
        </select>
          {error && <div className="text-red-500 text-center">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded mt-2"
            disabled={loading}
          >
            {loading ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </form>
      </div>
    </div>
  );
};