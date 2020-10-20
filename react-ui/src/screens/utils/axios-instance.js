import axios from 'axios'

//const baseURL = 'http://localhost:9000/'
const baseURL = 'http://3.133.94.170:9000/'

const instance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
})

instance.defaults.headers.post['Content-Type'] = 'application/json'
instance.defaults.headers.get['Content-Type'] = 'application/json';

instance.interceptors.response.use(
    function(response) {
        return response
    },
    function(error) {
        console.log('Axios error in axios-instance.js!')
        
        try {
            return error.response
        }   
        catch(e) {
            return Promise.reject(error)
        }
    }
)

export default instance