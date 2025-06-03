'use client';

import { useState } from "react";
import axios from "axios";
import { Ticket } from "../interfaces/types";
import SelectFunctionButton from '../components/SelectFunctionButton'; 



interface TicketsTableProps {
  tickets: Ticket[];
  onDelete?: (ticket: Ticket) => void;
  onStatusChange?: (ticket: Ticket) => void;

}

const statusOptions = ['pendiente', 'valido', 'canjeado', 'caducado'];

export default function TicketsTable({ tickets, onDelete, onStatusChange  }: TicketsTableProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [newStatus, setNewStatus] = useState<string>('');

  const openStatusModal = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setNewStatus(ticket.status || 'pendiente');
    setShowModal(true);
  };

  const handleStatusUpdate = async () => {
    if (!selectedTicket) return;

    const normalizedStatus = (newStatus ?? '').toLowerCase().trim();


    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:3000/api/tickets/${selectedTicket.id}/status`,
        { status: normalizedStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Estado actualizado');
      setShowModal(false);
          // ✅ Notifica al componente padre (si se desea actualizar lista global)
        if (onStatusChange) {
      onStatusChange(response.data);
    }


    } catch (error) {
      console.error('Error al actualizar estado:', error);
      alert('No se pudo actualizar el estado');
    }
  };

  const handleDelete = async (ticketId: string) => {
  if (!confirm('¿Estás seguro de que deseas eliminar este ticket?')) return;

  try {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:3000/api/tickets/${ticketId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert('Ticket eliminado exitosamente');
    // Opcional: recargar la lista o eliminar el ticket localmente
  } catch (error) {
    console.error('Error al eliminar ticket:', error);
    alert('No se pudo eliminar el ticket');
  }
};


  return (
    <div className="relative flex flex-col w-full h-full overflow-auto text-gray-700 bg-white shadow-md rounded-lg bg-clip-border px-4 py-4">
      <div className="mb-4">
        <SelectFunctionButton />
      </div>

      <table className="w-full text-left table-auto min-w-full">
        <thead>
          <tr>
            <th className="p-4 border-b bg-slate-50">Película</th>
            <th className="p-4 border-b bg-slate-50">Sala</th>
            <th className="p-4 border-b bg-slate-50">Asiento</th>
            <th className="p-4 border-b bg-slate-50">Fecha y Hora</th>
            <th className="p-4 border-b bg-slate-50">Precio</th>
            <th className="p-4 border-b bg-slate-50">Estado</th>
            <th className="p-4 border-b bg-slate-50">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id} className="hover:bg-slate-50 border-b">
              <td className="p-4 py-5">{ticket.movieName}</td>
              <td className="p-4 py-5">{ticket.roomNumber}</td>
              <td className="p-4 py-5">
                {ticket.seatNumbers.length > 0 ? ticket.seatNumbers.join(', ') : 'N/A'}
              </td>
              <td className="p-4 py-5">{new Date(ticket.dateTime).toLocaleString()}</td>
              <td className="p-4 py-5">${(ticket.pricePaid ?? 0).toFixed(2)}</td>
              <td className="p-4 py-5 capitalize">{ticket.status}</td>
              <td className="p-4 py-5 flex gap-4">
                <button
                  onClick={() => openStatusModal(ticket)}
                  className="text-blue-600 hover:underline"
                >
                  Editar estado
                </button>
                <button
                onClick={() => handleDelete(ticket.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 ml-2"
              >
                Eliminar
              </button>

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

      {showModal && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-lg">
            <h2 className="text-lg font-bold mb-4 text-center">
              Cambiar estado del ticket
            </h2>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:underline"
              >
                Cancelar
              </button>
              <button
                onClick={handleStatusUpdate}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
