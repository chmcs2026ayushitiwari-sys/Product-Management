import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://product-management-backend-c74z.onrender.com/',
});

export default instance;
