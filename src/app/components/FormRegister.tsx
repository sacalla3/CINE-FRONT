'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

export default function RegisterUserForm({ 
    onSuccess,onClose,showLoginButton = false 
    }: { 
      onSuccess?: () => void, onClose?: () => void, showLoginButton?: boolean 
    }) {
  const [name, setName] = useState('');
  const [cedula, setCedula] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name || !cedula || !email || !password || !password2) {
      setError('Todos los campos son obligatorios');
      return;
    }
    if (password !== password2) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, cedula, password }),
      });
      if (!res.ok) {
        setError('Error al registrar usuario');
        return;
      }
      setSuccess('Usuario registrado correctamente');
      setName('');
      setCedula('');
      setEmail('');
      setPassword('');
      setPassword2('');
      if (onSuccess) onSuccess();
    } catch {
      setError('Error de red o del servidor');
    }
  };

 return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div className="relative bg-white rounded-3xl shadow-lg p-8 w-full max-w-md">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 z-10"
        onClick={() => onClose && onClose()}
      >
        ✕
      </button>
      <label className="block mt-3 text-xl text-gray-700 text-center font-semibold">
        Registrate
      </label>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <input
          type="text"
          placeholder="Nombres"
          value={name}
          onChange={e => setName(e.target.value)}
          className="block w-full border border-gray-300 bg-gray-100 h-11 rounded-xl shadow-lg px-4 focus:bg-blue-100 focus:ring-0"
        />
        <input
          type="text"
          placeholder="Cédula"
          value={cedula}
          onChange={e => setCedula(e.target.value)}
          className="block w-full border border-gray-300 bg-gray-100 h-11 rounded-xl shadow-lg px-4 focus:bg-blue-100 focus:ring-0"
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="block w-full border border-gray-300 bg-gray-100 h-11 rounded-xl shadow-lg px-4 focus:bg-blue-100 focus:ring-0"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="block w-full border border-gray-300 bg-gray-100 h-11 rounded-xl shadow-lg px-4 focus:bg-blue-100 focus:ring-0"
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={password2}
          onChange={e => setPassword2(e.target.value)}
          className="block w-full border border-gray-300 bg-gray-100 h-11 rounded-xl shadow-lg px-4 focus:bg-blue-100 focus:ring-0"
        />
        {error && <div className="text-red-500 text-center">{error}</div>}
        {success && <div className="text-green-600 text-center">{success}</div>}
        <button
          className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
          type="submit"
        >
          Registrar
        </button>
        {showLoginButton && (
          <div className="flex justify-center items-center mt-4">
            <label className="mr-2">¿Ya tienes una cuenta?</label>
            <button
              type="button"
              className="text-blue-500 transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
              onClick={() => onClose && onClose()}
            >
              Iniciar sesión
            </button>
          </div>
        )}
      </form>
    </div>
  </div>
);
}