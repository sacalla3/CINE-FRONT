import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Ticket } from '../interfaces/types';

import TicketsTable from './TicketTable';
import '@testing-library/jest-dom/extend-expect';

const mockTickets: Ticket[] = [
  {
    id: '1',
    userName: 'Juan Pérez',
    userEmail: 'juan@example.com',
    movieName: 'Avengers',
    roomNumber: 3,
    seatNumbers: [1, 2],
    dateTime: new Date(),
    pricePaid: 10.5,
    status: 'pendiente',
  },
  {
    id: '2',
    userName: 'Ana Gómez',
    userEmail: 'ana@example.com',
    movieName: 'Matrix',
    roomNumber: 2,
    seatNumbers: [1],
    dateTime: new Date(),
    pricePaid: 8.75,
    status: 'valido',
  },
];

describe('TicketsTable', () => {
  it('renderiza la tabla con los tickets', () => {
    render(<TicketsTable tickets={mockTickets} />);
    expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
    expect(screen.getByText('Ana Gómez')).toBeInTheDocument();
    expect(screen.getByText('Avengers')).toBeInTheDocument();
    expect(screen.getByText('Matrix')).toBeInTheDocument();
  });

  it('filtra los tickets por búsqueda', () => {
    render(<TicketsTable tickets={mockTickets} />);
    const searchInput = screen.getByPlaceholderText('Buscar por nombre, correo o película');
    fireEvent.change(searchInput, { target: { value: 'matrix' } });
    expect(screen.getByText('Matrix')).toBeInTheDocument();
    expect(screen.queryByText('Avengers')).toBeNull();
  });

  it('abre y cierra el modal de estado', () => {
    render(<TicketsTable tickets={mockTickets} />);
    fireEvent.click(screen.getAllByText('Editar estado')[0]);
    expect(screen.getByText('Cambiar estado del ticket')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Cancelar'));
    expect(screen.queryByText('Cambiar estado del ticket')).not.toBeInTheDocument();
  });

  it('llama a onDelete cuando se hace clic en eliminar', () => {
    const onDelete = jest.fn();
    render(<TicketsTable tickets={mockTickets} onDelete={onDelete} />);
    fireEvent.click(screen.getAllByText('Eliminar')[0]);
    expect(onDelete).toHaveBeenCalledWith(mockTickets[0]);
  });

  it('cambia el estado y llama a onStatusChange', async () => {
    const onStatusChange = jest.fn();
    window.alert = jest.fn();
    window.confirm = jest.fn(() => true);
    render(<TicketsTable tickets={mockTickets} onStatusChange={onStatusChange} />);
    
    fireEvent.click(screen.getAllByText('Editar estado')[0]);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'valido' } });

    // Mock el fetch (POST)
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ ...mockTickets[0], status: 'valido' }),
      })
    ) as jest.Mock;

    fireEvent.click(screen.getByText('Guardar'));

    await waitFor(() => {
      expect(onStatusChange).toHaveBeenCalled();
    });
  });
});
