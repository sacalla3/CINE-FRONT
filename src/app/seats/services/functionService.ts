// src/services/functionService.ts
import axios from 'axios';

export const getFunctionById = async (id: string) => {
  const response = await axios.get(`http://localhost:3000/api/function/${id}`);
  return response.data;
};
