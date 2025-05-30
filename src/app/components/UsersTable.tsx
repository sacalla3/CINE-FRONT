'use client';

interface User {
  id: string;
  cedula: string;
  name: string;
  email: string;
  nickname: string;
  role: string;
  activo: boolean;
}

interface UsersTableProps {
  users: User[];
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
}

export function UsersTable({ users, onEdit, onDelete }: UsersTableProps) {
  return (
    <div className="relative flex flex-col w-full h-full overflow-auto text-gray-700 bg-white shadow-md rounded-lg bg-clip-border px-4 py-4">
      <table className="w-full text-left table-auto min-w-full">
        <thead>
          <tr>
            <th className="p-4 border-b border-slate-200 bg-slate-50">Cédula</th>
            <th className="p-4 border-b border-slate-200 bg-slate-50">Nombre</th>
            <th className="p-4 border-b border-slate-200 bg-slate-50">Correo electrónico</th>
            <th className="p-4 border-b border-slate-200 bg-slate-50">Nickname</th>
            <th className="p-4 border-b border-slate-200 bg-slate-50">Rol</th>
            <th className="p-4 border-b border-slate-200 bg-slate-50">Activo</th>
            <th className="p-4 border-b border-slate-200 bg-slate-50">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-slate-50 border-b border-slate-200">
              <td className="p-4 py-5">{user.cedula}</td>
              <td className="p-4 py-5">{user.name}</td>
              <td className="p-4 py-5">{user.email}</td>
              <td className="p-4 py-5">{user.nickname}</td>
              <td className="p-4 py-5">{user.role}</td>
              <td className="p-4 py-5">
                {user.activo ? (
                  <span className="text-green-600 font-bold">Sí</span>
                ) : (
                  <span className="text-red-600 font-bold">No</span>
                )}
              </td>
              <td className="p-4 py-5">
                {onEdit && (
                  <button className="text-blue-600 hover:underline mr-2" onClick={() => onEdit(user)}>
                    Editar
                  </button>
                )}
                {onDelete && (
                  <button className="text-red-600 hover:underline" onClick={() => onDelete(user)}>
                    Eliminar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
