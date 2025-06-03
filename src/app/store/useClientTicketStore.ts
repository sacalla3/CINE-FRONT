import { create } from "zustand";
import axios from "axios";
import { Ticket } from "../admin/tickets/interfaces/types";

interface ClientTicketStore {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
  getMyTickets: (userId: string) => Promise<void>;
}

export const useClientTicketStore = create<ClientTicketStore>((set) => ({
  tickets: [],
  loading: false,
  error: null,

  getMyTickets: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/api/tickets/my-tickets',
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const transformedTickets: Ticket[] = response.data.map((ticket: any) => ({
        userName: ticket?.user?.name ?? "Desconocido",
        userEmail: ticket?.user?.email ?? "Desconocido",
        id: ticket.id,
        status: ticket.status,
        pricePaid: parseInt(ticket.pricePaid ?? '0', 10),
        dateTime: ticket.function?.dateTime
          ? new Date(ticket.function.dateTime)
          : new Date(),
        roomNumber: ticket.function?.theatre?.roomNumber ?? 0,
        movieName: ticket.function?.movie?.title ?? "Desconocida",
        seatNumbers: Array.isArray(ticket.seats)
          ? ticket.seats.map((seat: any) => seat.seatNumber)
          : [],
      }));

      set({ tickets: transformedTickets, loading: false });
    } catch (error: any) {
      console.error("Error al cargar tickets del cliente:", error.response?.data || error.message);
      set({ error: 'No se pudieron cargar los boletos del cliente.', loading: false });
    }
  },
}));
