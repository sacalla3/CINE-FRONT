'use client';

import React, { useEffect } from "react";
import TicketTable from "./components/TicketTable";
import { useTicketStore } from "../../store/ticketStore";

const TicketsPage = () => {
  const { getTickets, tickets, loading, error } = useTicketStore();

  useEffect(() => {
    getTickets();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Boletos</h1>

      {loading && <p>Cargando boletos...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && tickets.length === 0 && <p>No hay boletos registrados.</p>}

      {!loading && tickets.length > 0 && (
        <TicketTable tickets={tickets} />
      )}
    </div>
  );
};

export default TicketsPage;
