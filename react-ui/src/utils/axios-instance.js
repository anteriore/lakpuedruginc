/* eslint-disable func-names */
import axios from 'axios';

//local
let baseURL = 'http://localhost:9000/'

if(process.env.NODE_ENV === 'production'){
  baseURL = 'http://18.217.227.111:9000/'
}
else {
  //develop
  //baseURL = 'http://18.222.158.28:9000/'
  
  //production
  baseURL = 'http://18.217.227.111:9000/'
}

const instance = axios.create({
  baseURL,
});

instance.defaults.headers.post['Content-Type'] = 'application/json';
// instance.defaults.headers.get['Content-Type'] = 'application/json'
instance.defaults.withCredentials = true;

instance.interceptors.request.use((request) => {
  return request;
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    try {
      return error.response;
    } catch (e) {
      return Promise.reject(error);
    }
  }
);

export default instance;
