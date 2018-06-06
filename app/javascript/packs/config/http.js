import axios from 'axios';
import promise from 'promise';

let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var instance = axios.create({
  baseURL: '/',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-Token': csrfToken,
    'Content-Type': 'application/json'
  }
});

instance.interceptors.request.use(function (config) {
  let auth  = JSON.parse(localStorage.getItem('auth')).auth;
  config.headers['client'] = auth.client;
  config.headers['access-token'] = auth.accessToken;
  config.headers['uid'] = auth.uid;
  return config;
});

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (401 === error.response.status) {
        localStorage.clear();
    }
    return error;
});

export default instance;
