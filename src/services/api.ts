import axios from "axios";

const ENVIRONMENT = process.env.NODE_ENV;

const baseURL = ENVIRONMENT === 'development' 
  ? 'http://localhost:3000/api/' 
  : "https://moveit-alexandredev3.vercel.app/api/";

export const api = axios.create({
  baseURL,
});