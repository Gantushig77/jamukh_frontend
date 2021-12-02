import { API_ORIGIN } from '../constants/url';
import axios from 'axios';

const ax_instance = axios.create({
  baseURL: API_ORIGIN,
  timeout: 2000,
  ...(localStorage.getItem('jamukh_token')?.length > 0 && {
    headers: { Authorization: `Bearer ${localStorage.getItem('jamukh_token')}` },
  }),
});

export default ax_instance;
