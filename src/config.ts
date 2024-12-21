export const reservUrl = import.meta.env.VITE_APP_TABLES_URL;
export const contactUrl = import.meta.env.VITE_APP_CUSTOMER_REQUEST_URL;
export const mealsUrl = import.meta.env.VITE_APP_MEALS_URL;
export const apiKey = import.meta.env.VITE_APP_API_KEY;

export const headers = {
  apiKey: apiKey,
  Authorization: `Bearer ${apiKey}`,
};
