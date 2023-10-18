// src/api.js
import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8000', // Change to your JSON server URL
});
