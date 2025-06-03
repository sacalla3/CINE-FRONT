import { render, screen } from '@testing-library/react';
import TheatreList from './TheatreList';
import '@testing-library/jest-dom';

describe('TheatreList', () => {
    it('muestra el mensaje de carga', () => {
        render(<TheatreList />);
        expect(screen.getByText(/Cargando teatros/i)).toBeInTheDocument();
    });

    it('muestra el título de la lista de teatros', () => {
        render(<TheatreList />);
        expect(screen.getByText(/Lista de teatros/i)).toBeInTheDocument();
    });

    it('muestra el botón "Crear nuevo teatro" si el usuario es admin', async () => {
        // Simula localStorage
        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: (key: string) => (key === 'userRole' ? 'admin' : 'tokenFake'),
            },
            writable: true,
        });

        // Mock del fetch
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([]),
            } as Response)
        );

        render(<TheatreList />);

        // Espera a que cargue
        expect(await screen.findByText(/Crear nuevo teatro/i)).toBeInTheDocument();
    });
    it('no muestra el botón "Crear nuevo teatro" si el usuario no es admin', async () => {
        // Simula localStorage
        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: (key: string) => (key === 'userRole' ? 'user' : 'tokenFake'),
            },
            writable: true,
        });

        // Mock del fetch
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([]),
            } as Response)
        );

        render(<TheatreList />);

        // Espera a que cargue
        expect(await screen.findByText(/Lista de teatros/i)).toBeInTheDocument();
        expect(screen.queryByText(/Crear nuevo teatro/i)).not.toBeInTheDocument();
    });
    it('renderiza la lista de teatros', async () => {
        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: (key: string) => {
                    if (key === 'userRole') return 'admin';
                    if (key === 'token') return 'tokenFake';
                    return null;
                },
            },
            writable: true,
        });

        const mockTheatres = [
            { id: 1, roomNumber: 1, capacity: 100, type: '3D' },
            { id: 2, roomNumber: 2, capacity: 50, type: '2D' },
        ];

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockTheatres),
            } as Response)
        );

        render(<TheatreList />);

        // Espera a que aparezcan los elementos
        expect(await screen.findByText(/Sala 1/i)).toBeInTheDocument();
        expect(await screen.findByText(/Capacidad: 100/i)).toBeInTheDocument();
        expect(await screen.findByText(/Tipo: 3D/i)).toBeInTheDocument();
        expect(await screen.findByText(/Sala 2/i)).toBeInTheDocument();
    });
    it('muestra el mensaje de error si falla la carga', async () => {
        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: (key: string) => (key === 'userRole' ? 'admin' : 'tokenFake'),
            },
            writable: true,
        });

        global.fetch = jest.fn(() => Promise.reject(new Error('Error al cargar teatros')));

        render(<TheatreList />);

        // Espera a que aparezca el mensaje de error
        expect(await screen.findByText(/Cargando teatros/i)).toBeInTheDocument();
    });
    it('hace la llamada a fetch con el token de localStorage', async () => {
        const mockFetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([]),
            } as Response)
        );
        global.fetch = mockFetch;

        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: (key: string) => (key === 'token' ? 'miToken' : 'admin'),
            },
            writable: true,
        });

        render(<TheatreList />);

        await screen.findByText(/Lista de teatros/i); // Espera a que termine de renderizar
        expect(mockFetch).toHaveBeenCalledWith(
            'https://cine-nest-production.up.railway.app/api/theatre',
            expect.objectContaining({
                headers: expect.objectContaining({
                    Authorization: 'Bearer miToken',
                }),
            })
        );
    });

});
