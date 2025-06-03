import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SelectFunctionButton from './SelectFunctionButton';
import { useSelectionStore } from '../../../store/useSelectionStore';
import axios from 'axios';
import { useRouter } from 'next/navigation';

jest.mock('axios');
jest.mock('../../../store/useSelectionStore');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockedUseSelectionStore = useSelectionStore as unknown as jest.Mock;
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockPush = jest.fn();

describe('SelectFunctionButton', () => {
  beforeEach(() => {
    mockedUseSelectionStore.mockReturnValue({
      setSelectedFunctionId: jest.fn(),
    });

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    localStorage.setItem('token', 'fake-token');

    mockedAxios.get.mockResolvedValue({
      data: [
        {
          id: '1',
          movie: { title: 'Inception' },
          theatre: { roomNumber: 5 },
          dateTime: new Date('2025-06-03T18:00:00Z').toISOString(),
          availableSeats: 10,
        },
      ],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renderiza el botón y abre el modal con funciones al hacer clic', async () => {
    render(<SelectFunctionButton />);
    
    const button = screen.getByText('Crear ticket');
    fireEvent.click(button);

    await waitFor(() =>
      expect(screen.getByText('Funciones disponibles')).toBeInTheDocument()
    );

    expect(await screen.findByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('Sala: 5')).toBeInTheDocument();
    expect(screen.getByText('Sillas disponibles: 10')).toBeInTheDocument();
  });

  it('selecciona una función al hacer clic y redirige', async () => {
    const mockSetSelectedFunctionId = jest.fn();

    mockedUseSelectionStore.mockReturnValue({
      setSelectedFunctionId: mockSetSelectedFunctionId,
    });

    render(<SelectFunctionButton />);

    fireEvent.click(screen.getByText('Crear ticket'));

    await waitFor(() => screen.getByText('Inception'));

    fireEvent.click(screen.getByText('Inception'));

    expect(mockSetSelectedFunctionId).toHaveBeenCalledWith('1');
    expect(mockPush).toHaveBeenCalledWith('/seats');
  });

  it('cierra el modal al hacer clic en "Cancelar"', async () => {
    render(<SelectFunctionButton />);
    fireEvent.click(screen.getByText('Crear ticket'));

    await waitFor(() => screen.getByText('Cancelar'));
    fireEvent.click(screen.getByText('Cancelar'));

    expect(screen.queryByText('Funciones disponibles')).not.toBeInTheDocument();
  });
});
