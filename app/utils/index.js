import * as axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:5000',
    // baseURL: 'http://clikasia-001-site2.btempurl.com',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': 'Bearer '
    }
});
const baseURL = 'http://localhost:5000';

export default axios;
export { request, baseURL };