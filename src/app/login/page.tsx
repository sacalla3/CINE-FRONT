'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RegisterUserForm from '../components/FormRegister';

export default function Login() {
  const [email, setEmail] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('https://cine-nest-production.up.railway.app/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setError('Correo o contraseña incorrectos');
        return;
      }

      const data = await res.json();
      const token = data?.accessToken?.accessToken?.[0];
      if (!token) {
        setError('No se recibió el token de acceso');
        return;
      }

      localStorage.setItem('token', token);
      localStorage.setItem('userId', data.id);
      localStorage.setItem('userRole', Array.isArray(data.role) ? data.role[0] : undefined);
      router.push('/dashboard');
    } catch (err) {
      setError('Error de red o del servidor');
    }
  };

  // Mostrar el formulario de registro como modal
  if (showRegister) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            onClick={() => setShowRegister(false)}
          >
            ✕
          </button>
          <RegisterUserForm
            onSuccess={() => setShowRegister(false)}
            onClose={() => setShowRegister(false)}
            showLoginButton={true}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 font-sans min-h-screen">
      {/* Columna del formulario */}
      <div className="col-span-4 text-white bg-black pl-7 flex items-center">
        <div className="w-full pr-10">
          <h2 className="text-4xl font-bold mb-10">Iniciar Sesión</h2>
          <form onSubmit={handleLogin} className="text-base font-medium w-full">
            <div className="mb-6">
              <label className="text-sm block mb-1">Correo</label>
              <input
                type="email"
                name="email"
                placeholder="Escribe tu correo"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full bg-black py-3 px-5 border border-gray-700 hover:border-blue-400 rounded shadow outline-none transition duration-300"
              />
            </div>
            <div className="mb-4">
              <label className="text-sm block mb-1">Contraseña</label>
              <input
                type="password"
                name="password"
                placeholder="Escribe tu contraseña"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full bg-black py-3 px-5 border border-gray-700 hover:border-blue-400 rounded shadow outline-none transition duration-300"
              />
            </div>
            <div className="pt-10">
              <button
                type="submit"
                className="w-full py-3 bg-blue-700 hover:bg-blue-500 rounded-md text-white transition duration-300 transform hover:scale-105 shadow-md"
              >
                Iniciar sesión
              </button>
              {error && <p className="text-red-500 mt-3">{error}</p>}
            </div>
          </form>
          {/* Texto adicional */}
          <div className="mt-6">
            <button
              type="button"
              className="text-sm text-gray-400 underline"
              onClick={() => setShowRegister(true)}
            >
              ¿No tienes una cuenta? Regístrate
            </button>
          </div>
        </div>
      </div>
      {/* Imagen lateral derecha */}
      <div className="relative col-span-8 h-screen">
        <Image
        src="/alpha-movie-logo.webp"
         alt="Banner login"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}