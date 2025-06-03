'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Ticket } from '../interfaces/types';
import { useClientTicketStore } from '../../../store/useClientTicketStore';


export default function MyTicketsClient() {
  const { getMyTickets, tickets, loading, error } = useClientTicketStore();

  useEffect(() => {
  const userId = localStorage.getItem('userId');
  if (userId) getMyTickets(userId);
}, []);


  if (loading) {
    return <p className="text-center py-8">Cargando tickets...</p>;
  }

  return (
    <div className="relative flex flex-col w-full h-full overflow-auto text-gray-700 bg-white shadow-md rounded-lg bg-clip-border px-4 py-4">
      <h2 className="text-xl font-bold mb-4 text-center">Mis Tickets</h2>
      <table className="w-full text-left table-auto min-w-full">
        <thead>
          <tr>
            <th className="p-4 border-b bg-slate-50">Película</th>
            <th className="p-4 border-b bg-slate-50">Sala</th>
            <th className="p-4 border-b bg-slate-50">Asiento</th>
            <th className="p-4 border-b bg-slate-50">Fecha y Hora</th>
            <th className="p-4 border-b bg-slate-50">Precio</th>
            <th className="p-4 border-b bg-slate-50">Estado</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id} className="hover:bg-slate-50 border-b">
              <td className="p-4 py-5">{ticket.movieName}</td>
              <td className="p-4 py-5">{ticket.roomNumber}</td>
              <td className="p-4 py-5">
                {ticket.seatNumbers?.length > 0
                  ? ticket.seatNumbers.join(', ')
                  : 'N/A'}
              </td>
              <td className="p-4 py-5">
                {new Date(ticket.dateTime).toLocaleString()}
              </td>
              <td className="p-4 py-5">
                ${ticket.pricePaid ?? '0.00'}
              </td>
              <td className="p-4 py-5 capitalize">{ticket.status}</td>
            </tr>
          ))}
          {tickets.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center text-gray-500 py-4">
                No tienes tickets registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
