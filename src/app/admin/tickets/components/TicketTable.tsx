'use client';

import { Ticket } from "../interfaces/types"; // Asegúrate de que esta ruta sea correcta

interface TicketsTableProps {
  tickets: Ticket[];
  onDelete?: (ticket: Ticket) => void;
}

export default function TicketsTable({ tickets, onDelete }: TicketsTableProps) {
  return (
    <div className="relative flex flex-col w-full h-full overflow-auto text-gray-700 bg-white shadow-md rounded-lg bg-clip-border px-4 py-4">
      <table className="w-full text-left table-auto min-w-full">
        <thead>
          <tr>
            <th className="p-4 border-b border-slate-200 bg-slate-50">Película</th>
            <th className="p-4 border-b border-slate-200 bg-slate-50">Sala</th>
            <th className="p-4 border-b border-slate-200 bg-slate-50">Asiento</th>
            <th className="p-4 border-b border-slate-200 bg-slate-50">Fecha y Hora</th>
            <th className="p-4 border-b border-slate-200 bg-slate-50">Precio</th>
            <th className="p-4 border-b border-slate-200 bg-slate-50">Estado</th>
            <th className="p-4 border-b border-slate-200 bg-slate-50">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id} className="hover:bg-slate-50 border-b border-slate-200">
              <td className="p-4 py-5">{ticket.movieName}</td>
              <td className="p-4 py-5">{ticket.roomNumber}</td>
              <td className="p-4 py-5">{ticket.seatNumber}</td>
              <td className="p-4 py-5">{new Date(ticket.dateTime).toLocaleString()}</td>
              <td className="p-4 py-5">${ticket.pricePaid.toFixed(2)}</td>
              <td className="p-4 py-5">
                {ticket.status ? (
                  <span className="text-green-600 font-bold">Pagado</span>
                ) : (
                  <span className="text-yellow-600 font-bold">Pendiente</span>
                )}
              </td>
              <td className="p-4 py-5">
                {onDelete && (
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => onDelete(ticket)}
                  >
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
