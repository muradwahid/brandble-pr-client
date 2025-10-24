export const getBaseUrl = () => {
  return import.meta.env.VITE_API_BASE_URL || "http://localhost:5050/api/v1";
};
