'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

export default function RegisterUserForm({ onSuccess,onClose }: { onSuccess?: () => void, onClose?: () => void }) {
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
    <div className="font-sans">
      <div className="relative flex flex-col sm:justify-center items-center bg-gray-100">
        <div className="relative sm:max-w-sm w-full">
          <div className="card bg-blue-400 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6"></div>
          <div className="card bg-red-400 shadow-lg w-full h-full rounded-3xl absolute transform rotate-6"></div>
          <div className="relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow-md">
            <label className="block mt-3 text-sm text-gray-700 text-center font-semibold">
              Registrate
            </label>
            <form onSubmit={handleSubmit} className="mt-10">
              <div>
                <input
                  type="text"
                  placeholder="Nombres"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>
              <div className="mt-7">
                <input
                  type="text"
                  placeholder="Cédula"
                  value={cedula}
                  onChange={e => setCedula(e.target.value)}
                  className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>
              <div className="mt-7">
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>
              <div className="mt-7">
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>
              <div className="mt-7">
                <input
                  type="password"
                  placeholder="Confirmar contraseña"
                  value={password2}
                  onChange={e => setPassword2(e.target.value)}
                  className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>
              {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
              {success && <div className="mt-4 text-green-600 text-center">{success}</div>}
              <div className="mt-7">
                <button
                  className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                  type="submit"
                >
                  Registrar
                </button>
              </div>
              <div className="mt-7">
                <div className="flex justify-center items-center">
                  <label className="mr-2">¿Ya tienes una cuenta?</label>
                  <button
                    type="button"
                    className="text-blue-500 transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                    onClick={() => onClose ? onClose() : null}
                  >
                    Iniciar sesión
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}