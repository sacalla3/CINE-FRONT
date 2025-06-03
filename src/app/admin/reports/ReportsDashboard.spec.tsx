import { render, screen, waitFor } from '@testing-library/react';
import ReportsDashboard from './page';
import '@testing-library/jest-dom';
import axios from 'axios';

jest.mock('axios');
jest.mock('html2canvas', () => jest.fn(() => Promise.resolve({
  toDataURL: () => 'data:image/png;base64,mock',
  width: 100,
  height: 200
})));

describe('ReportsDashboard', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: (key: string) => {
          if (key === 'token') return 'fakeToken';
          return null;
        },
      },
      writable: true,
    });

    mockedAxios.get.mockImplementation((url: string) => {
      if (url.includes('/sales')) return Promise.resolve({ data: [{ title: 'Película A', totalSalesValue: 1000 }] });
      if (url.includes('/top-viewed')) return Promise.resolve({ data: [{ title: 'Película B', views: '300' }] });
      if (url.includes('/top-selling')) return Promise.resolve({ data: [{ title: 'Película C', totalSales: 500 }] });
      if (url.includes('/top-selling-timeslots')) return Promise.resolve({ data: [{ timeSlot: '18:00', ticketsSold: 50 }] });
      return Promise.reject(new Error('Unknown endpoint'));
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza correctamente el título del panel', async () => {
    render(<ReportsDashboard />);
    expect(await screen.findByText('Panel de Reportes')).toBeInTheDocument();
  });

  it('renderiza la sección "Ventas por Película"', async () => {
    render(<ReportsDashboard />);
    expect(await screen.findByText(/Ventas por Película/i)).toBeInTheDocument();
    expect(await screen.findByText(/Película A/i)).toBeInTheDocument();
  });

  it('renderiza la sección "Películas más Vistas"', async () => {
    render(<ReportsDashboard />);
    expect(await screen.findByText(/Películas más Vistas/i)).toBeInTheDocument();
    expect(await screen.findByText(/Película B/i)).toBeInTheDocument();
  });

  it('renderiza la sección "Películas con Más Ingresos"', async () => {
    render(<ReportsDashboard />);
    expect(await screen.findByText(/Películas con Más Ingresos/i)).toBeInTheDocument();
    expect(await screen.findByText(/Película C/i)).toBeInTheDocument();
  });

  it('renderiza la sección "Horarios con Más Ventas"', async () => {
    render(<ReportsDashboard />);
    expect(await screen.findByText(/Horarios con Más Ventas/i)).toBeInTheDocument();
    expect(await screen.findByText(/18:00/i)).toBeInTheDocument();
  });

  it('muestra error en consola si falta el token', async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: () => null,
      },
      writable: true,
    });

    render(<ReportsDashboard />);
    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith('Token no encontrado');
    });
    spy.mockRestore();
  });

  it('muestra mensaje en consola si no se puede generar el PDF', async () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<ReportsDashboard />);
    const button = await screen.findByText(/Exportar PDF/i);
    button.click();
    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith('Intentando generar PDF...');
    });
    spy.mockRestore();
  });
});
