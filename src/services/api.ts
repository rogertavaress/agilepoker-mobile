import axios from 'axios';

const api = axios.create({
  baseURL: 'https://agilepoker-api.herokuapp.com',
});

export default api;
