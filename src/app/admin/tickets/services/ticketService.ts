import axios from 'axios';

export const getTickets = async () => {
  const token = localStorage.getItem('token'); // o donde guardes tu JWT

  const response = await axios.get('http://localhost:3000/api/tickets', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
