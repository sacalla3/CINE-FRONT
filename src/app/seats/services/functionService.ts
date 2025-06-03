// src/services/functionService.ts
import axios from 'axios';

export const getFunctionById = async (id: string) => {
  const response = await axios.get(`https://cine-nest-production.up.railway.app/api/function/${id}`);
  return response.data;
};
