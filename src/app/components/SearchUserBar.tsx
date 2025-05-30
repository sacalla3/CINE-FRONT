'use client';

import { useState } from 'react';

interface User {
  id: string;
  cedula: string;
  name: string;
  email: string;
  nickname: string;
  role: string;
}

export function SearchUserBar({ onResult }: { onResult: (user: User | null) => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchError, setSearchError] = useState('');

  const handleSearch = async () => {
    setSearchError('');
    if (!searchTerm.trim()){
        onResult(null);
        return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/users/${searchTerm.trim()}`);
      if (!res.ok) {
        setSearchError('Usuario no encontrado');
        onResult(null);
        return;
      }
      const data = await res.json();
      onResult(data);
    } catch {
      setSearchError('Error de red o del servidor');
      onResult(null);
    }
  };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value.trim() === '') {
      onResult(null);
      setSearchError('');
    }
  };

  return (
    <div className="w-full max-w-sm min-w-[200px] relative">
      <div className="relative">
        <input
          className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
          placeholder="Buscar usuario..."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
        />
        <button
          className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded"
          type="button"
          onClick={handleSearch}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8 text-slate-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>
      </div>
      {searchError && <div className="text-red-500 px-4">{searchError}</div>}
    </div>
  );
}