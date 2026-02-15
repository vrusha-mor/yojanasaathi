// src/config.ts
const API_BASE_URL = import.meta.env.VITE_API_URL as string;

export const endpoints = {
  login: `${API_BASE_URL}/login`,
  signup: `${API_BASE_URL}/signup`,
};
