import axios from 'axios';

const api = axios.create({
    baseURL: 'https://jasytc4q25.execute-api.sa-east-1.amazonaws.com/prod',
});

api.interceptors.request.use((config) => {
    config.headers['x-api-key'] = 'qXwXZQRFos4u22WRuArph8OschFrZDkK23J0MpQQ';
    return config;
});

export default api;
