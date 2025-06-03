import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import TicketsPage from './page';

// Mock de los componentes hijos para aislar la prueba
jest.mock('./components/MyTicketsClient', () => () => <div data-testid="my-tickets-client" />);
jest.mock('./components/TicketTable', () => (props: any) => (
  <div data-testid="ticket-table" data-props={JSON.stringify(props)} />
));

// Mock del hook useTicketStore
const mockGetTickets = jest.fn();
const mockUseTicketStore = {
  getTickets: mockGetTickets,
  tickets: [
    { id: '1', status: 'valido' }, 
    { id: '2', status: 'pendiente' }
  ],
  loading: false,
  error: null,
};

jest.mock('../../store/ticketStore', () => ({
  useTicketStore: () => mockUseTicketStore,
}));

describe('TicketsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renderiza MyTicketsClient si el role es client', async () => {
    localStorage.setItem('userRole', 'client');
    render(<TicketsPage />);

    expect(await screen.findByTestId('my-tickets-client')).toBeInTheDocument();
    expect(screen.queryByTestId('ticket-table')).not.toBeInTheDocument();
  });

  it('renderiza TicketTable si el role NO es client y llama getTickets', async () => {
    localStorage.setItem('userRole', 'admin'); // Cualquier rol que no sea client
    render(<TicketsPage />);

    await waitFor(() => {
      expect(mockGetTickets).toHaveBeenCalled();
    });

    expect(await screen.findByTestId('ticket-table')).toBeInTheDocument();
    expect(screen.queryByTestId('my-tickets-client')).not.toBeInTheDocument();
  });

  it('muestra mensaje de carga mientras loading es true', () => {
    (mockUseTicketStore.loading as boolean) = true;
    (mockUseTicketStore.tickets as any[]) = [];
    (mockUseTicketStore.error as any) = null;

    render(<TicketsPage />);

    expect(screen.getByText(/Cargando boletos.../i)).toBeInTheDocument();
  });

  it('muestra mensaje de error si hay error', () => {
    (mockUseTicketStore.loading as boolean) = false;
    (mockUseTicketStore.error as any) = 'Error al cargar';

    render(<TicketsPage />);

    expect(screen.getByText(/Error al cargar/i)).toBeInTheDocument();
  });

  it('muestra mensaje si no hay tickets', () => {
    (mockUseTicketStore.loading as boolean) = false;
    (mockUseTicketStore.tickets as any[]) = [];

    render(<TicketsPage />);

    expect(screen.getByText(/No hay boletos registrados/i)).toBeInTheDocument();
  });
});
