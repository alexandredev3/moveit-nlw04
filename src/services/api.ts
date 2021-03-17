import axios from "axios";

const { NODE_ENV, URL } = process.env;

const baseURL = NODE_ENV === 'development' 
  ? 'http://localhost:3000/api/' 
  : `${URL}/api/`;

export const api = axios.create({
  baseURL,
});
