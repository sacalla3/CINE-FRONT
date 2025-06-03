import { create } from "zustand";
import axios from "axios";
import { Ticket } from "../admin/tickets/interfaces/types";
import { useEffect, useState } from "react";

interface TicketStore {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
  getTickets: () => Promise<void>;
}

export const useTicketStore = create<TicketStore>((set) => ({
  tickets: [],
  loading: false,
  error: null,

  getTickets: async () => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem('token'); // si usas JWT
      const response = await axios.get('http://localhost:3000/api/tickets', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const transformedTickets: Ticket[] = response.data.map((ticket: any) => ({
        userName: ticket?.user?.name ?? "Desconocido",
        userEmail: ticket?.user?.email ?? "Desconocido",
        id: ticket.id,
        status: ticket.status,
        pricePaid: parseInt(ticket.pricePaid ?? '0', 10), 
        dateTime: ticket.function?.dateTime
          ? new Date(ticket.function.dateTime)
          : new Date(), // fallback actual
        roomNumber: ticket.function?.theatre?.roomNumber ?? 0,
        movieName: ticket.function?.movie?.title ?? "Desconocida",
        seatNumbers: Array.isArray(ticket.seats) 
        ? ticket.seats.map((seat: any) => seat.seatNumber) 
        : [],

      }));

      set({ tickets: transformedTickets, loading: false });
    } catch (error: any) {
    console.error("Error al cargar tickets:", error.response?.data || error.message);
    set({ error: 'No se pudieron cargar los boletos.', loading: false });
    }

  }
}));
