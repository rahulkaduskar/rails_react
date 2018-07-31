import axios from 'axios';
import promise from 'promise';

let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var instance = axios.create({
  baseURL: '/'
});

instance.interceptors.request.use(function (config) {
  let auth  = JSON.parse(localStorage.getItem('auth')).auth;
  config.headers['client'] = auth.client;
  config.headers['access-token'] = auth.accessToken;
  config.headers['uid'] = auth.uid;
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  config.headers['X-CSRF-Token'] = csrfToken;
  config.headers['Content-Type'] = 'application/json';
  return config;
});

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (401 === error.response.status) {
        // localStorage.clear();
    }
    return Promise.reject(error);
});

export default instance;
