import axios from 'axios';

export const getTickets = async () => {
  const token = localStorage.getItem('token'); // o donde guardes tu JWT

  const response = await axios.get('https://cine-nest-production.up.railway.app/api/tickets', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
