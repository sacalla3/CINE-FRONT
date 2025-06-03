'use client';

import React, { useEffect, useState } from 'react';
import TicketTable from './components/TicketTable';
import MyTicketsClient from './components/MyTicketsClient';
import { useTicketStore } from '../../store/ticketStore';
import { Ticket } from './interfaces/types';

const TicketsPage = () => {
  const { getTickets, tickets, loading, error } = useTicketStore();
  const [role, setRole] = useState<string | null>(null);

  const handleStatusChange = (ticket: Ticket) => {
    console.log("Estado cambiado para el ticket:", ticket);
  };

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    setRole(storedRole);

    if (storedRole !== 'client') {
      getTickets();
    }
  }, [getTickets]);

  if (role === 'client') {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Mis Boletos</h1>
        <MyTicketsClient />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Boletos</h1>

      {loading && <p>Cargando boletos...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && tickets.length === 0 && <p>No hay boletos registrados.</p>}
      {!loading && tickets.length > 0 && (
        <TicketTable tickets={tickets} onStatusChange={handleStatusChange} />
      )}
    </div>
  );
};

export default TicketsPage;
