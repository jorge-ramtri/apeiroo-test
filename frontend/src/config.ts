const API_URL = process.env.REACT_APP_BACKEND_URL;

if (!API_URL) {
  throw new Error('REACT_APP_BACKEND_URL is not defined');
}

export const config = {
  API_URL,
};
