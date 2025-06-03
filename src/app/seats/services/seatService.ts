import axios from 'axios';

export const getSeatsByFunctionId = async (functionId: string) => {
  const token = localStorage.getItem('token');

  const response = await axios.get(`https://cine-nest-production.up.railway.app/api/function/${functionId}/seats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

