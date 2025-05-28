'use client';

interface User {
  id: string;
  cedula: string;
  name: string;
  email: string;
  nickname: string;
  role: string;
}

interface UsersTableProps {
  users: User[];
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
}

export function UsersTable({ users, onEdit, onDelete }: UsersTableProps) {
  return (
    <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
      <div className="w-full flex justify-between items-center mb-3 mt-1 pl-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Usuarios</h3>
          <p className="text-slate-500">Listado de usuarios registrados.</p>
        </div>
        <div className="ml-3">
          <div className="w-full max-w-sm min-w-[200px] relative">
            <div className="relative">
              <input
                className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                placeholder="Buscar usuario..."
              />
              <button
                className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8 text-slate-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <table className="w-full text-left table-auto min-w-max">
        <thead>
          <tr>
            <th className="p-4 border-b border-slate-200 bg-slate-50">
              <p className="text-sm font-normal leading-none text-slate-500">Cédula</p>
            </th>
            <th className="p-4 border-b border-slate-200 bg-slate-50">
              <p className="text-sm font-normal leading-none text-slate-500">Nombre</p>
            </th>
            <th className="p-4 border-b border-slate-200 bg-slate-50">
              <p className="text-sm font-normal leading-none text-slate-500">Correo electrónico</p>
            </th>
            <th className="p-4 border-b border-slate-200 bg-slate-50">
              <p className="text-sm font-normal leading-none text-slate-500">Nickname</p>
            </th>
            <th className="p-4 border-b border-slate-200 bg-slate-50">
              <p className="text-sm font-normal leading-none text-slate-500">Rol</p>
            </th>
            <th className="p-4 border-b border-slate-200 bg-slate-50">
              <p className="text-sm font-normal leading-none text-slate-500">Acciones</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="hover:bg-slate-50 border-b border-slate-200">
              <td className="p-4 py-5">
                <p className="block font-semibold text-sm text-slate-800">{user.cedula}</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">{user.name}</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">{user.email}</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">{user.nickname}</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">{user.role}</p>
              </td>
              <td className="p-4 py-5">
                {onEdit && (
                  <button
                    className="text-blue-600 hover:underline mr-2"
                    onClick={() => onEdit(user)}
                  >
                    Editar
                  </button>
                )}
                {onDelete && (
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => onDelete(user)}
                  >
                    Eliminar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Puedes agregar paginación aquí si lo necesitas */}
    </div>
  );
}