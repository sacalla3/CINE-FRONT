import axios from 'axios';

export const getSeatsByFunctionId = async (functionId: string) => {
  const token = localStorage.getItem('token');

  const response = await axios.get(`http://localhost:3000/api/function/${functionId}/seats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

