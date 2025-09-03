import axios from 'axios';
import { API_URL } from './env';

const unauthenticatedRequest = axios.create({
  baseURL: API_URL,
});

export default unauthenticatedRequest;