import axios from "axios";

const environment = process.env.NODE_ENV;
const vercelURL = process.env.NEXT_PUBLIC_VERCEL_URL

const baseURL = environment === 'development' 
  ? 'http://localhost:3000/api/' 
  : `https://${vercelURL}/api/`;

export const api = axios.create({
  baseURL,
});