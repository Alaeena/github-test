import axios from 'axios';

const baseURL = 'https://m10xs.site/api/service/run-script';
const request = axios.create({
    baseURL,
    headers: { Authorization: '' },
});
request.interceptors.request.use((config) => {
    config.params = {
        token: '73d715e32eff0617eabfdebcc9e5a296',
        ...config.params,
    };
    return config;
});
request.interceptors.response.use((res) => {
    res.data.data = JSON.parse(res.data.data);
    return res;
});

export const post = async (url, config = {}) => {
    const response = await request.post(url, config);
    return response.data;
};
export default request;
