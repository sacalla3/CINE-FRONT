import axios from 'axios';
import { getTickets } from './ticketService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getTickets', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'fake-token');
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('debería retornar los tickets cuando la petición es exitosa', async () => {
    const mockData = [{ id: '1', movieName: 'Matrix' }];
    mockedAxios.get.mockResolvedValue({ data: mockData });

    const result = await getTickets();

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://cine-nest-production.up.railway.app/api/tickets',
      {
        headers: {
          Authorization: 'Bearer fake-token',
        },
      }
    );

    expect(result).toEqual(mockData);
  });

  it('debería lanzar un error si la petición falla', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Error de red'));

    await expect(getTickets()).rejects.toThrow('Error de red');
  });
});
