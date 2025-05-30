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
        </div>
        <div className="ml-3">
          <div className="w-full max-w-sm min-w-[200px] relative">
            <div className="relative">
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