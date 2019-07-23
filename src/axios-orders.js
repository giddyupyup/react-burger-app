import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-app-81c6b.firebaseio.com/'
});

export const firebaseInstance = axios.create({
  baseURL: 'https://www.googleapis.com/'
});

export default instance;
