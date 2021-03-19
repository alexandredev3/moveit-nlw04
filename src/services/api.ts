import axios from "axios";

const ENVIRONMENT = process.env.NODE_ENV;
const API_URL = process.env.API_URL

const baseURL = ENVIRONMENT === 'development' 
  ? 'http://localhost:3000/api/' 
  : API_URL;

export const api = axios.create({
  baseURL,
});