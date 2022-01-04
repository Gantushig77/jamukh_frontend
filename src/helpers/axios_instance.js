import { base_url } from '../constants/url';
import axios from 'axios';

const ax_instance = axios.create({
  baseURL: base_url,
  ...(localStorage.getItem('jamukh_token')?.length > 0 && {
    headers: { Authorization: `Bearer ${localStorage.getItem('jamukh_token')}` },
  }),
});

export default ax_instance;
