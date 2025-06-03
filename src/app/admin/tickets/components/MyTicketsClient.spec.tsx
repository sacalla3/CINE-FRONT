import React from 'react';
import { render, screen } from '@testing-library/react';
import MyTicketsClient from './MyTicketsClient';
import { useClientTicketStore } from '../../../store/useClientTicketStore';

jest.mock('../../../store/useClientTicketStore');

const mockedUseClientTicketStore = useClientTicketStore as unknown as jest.Mock;

describe('MyTicketsClient', () => {
  beforeEach(() => {
    mockedUseClientTicketStore.mockReturnValue({
      getMyTickets: jest.fn(),
      tickets: [
        {
          id: '1',
          movieName: 'Película de Prueba',
          roomNumber: 2,
          seatNumbers: ['A1', 'A2'],
          dateTime: new Date().toISOString(),
          pricePaid: 8.5,
          status: 'activo',
        },
      ],
      loading: false,
      error: null,
    });

    localStorage.setItem('userId', '123'); // simula un usuario logueado
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renderiza correctamente el título y los tickets', () => {
    render(<MyTicketsClient />);
    expect(screen.getByText('Mis Tickets')).toBeInTheDocument();
    expect(screen.getByText('Película de Prueba')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('A1, A2')).toBeInTheDocument();
    expect(screen.getByText('$8.5')).toBeInTheDocument();
    expect(screen.getByText(/activo/i)).toBeInTheDocument();
  });

  it('muestra mensaje si no hay tickets', () => {
    mockedUseClientTicketStore.mockReturnValue({
      getMyTickets: jest.fn(),
      tickets: [],
      loading: false,
      error: null,
    });

    render(<MyTicketsClient />);
    expect(screen.getByText('No tienes tickets registrados.')).toBeInTheDocument();
  });

  it('muestra mensaje de carga mientras se cargan los tickets', () => {
    mockedUseClientTicketStore.mockReturnValue({
      getMyTickets: jest.fn(),
      tickets: [],
      loading: true,
      error: null,
    });

    render(<MyTicketsClient />);
    expect(screen.getByText('Cargando tickets...')).toBeInTheDocument();
  });
});
