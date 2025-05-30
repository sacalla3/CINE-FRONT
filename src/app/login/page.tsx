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
      const res = await fetch('http://localhost:3000/api/auth/login', {
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
          src="https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-a7e0-61f7-bebd-850fb2006b41/raw?se=2025-05-27T22%3A56%3A09Z&sp=r&sv=2024-08-04&sr=b&scid=4b184b26-23c6-5610-8918-0c3ec1a33e57&skoid=732f244e-db13-47c3-bcc7-7ee02a9397bc&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-27T15%3A58%3A36Z&ske=2025-05-28T15%3A58%3A36Z&sks=b&skv=2024-08-04&sig=DgkWQGs/Dt5n7YJnIVAujUqe5oOfCsZYLmfmrFdtwU8%3D"
          alt="Banner login"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}