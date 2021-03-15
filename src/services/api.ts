import axios from "axios";

const { NODE_ENV, NEXT_PUBLIC_VERCEL_URL } = process.env;

const baseURL = NODE_ENV === 'development' 
  ? 'http://localhost:3000/api/' 
  : `https://${NEXT_PUBLIC_VERCEL_URL}/api/`;

export const api = axios.create({
  baseURL,
});
