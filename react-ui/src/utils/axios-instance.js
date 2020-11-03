import axios from 'axios'

<<<<<<< Updated upstream
const baseURL = 'http://localhost:9000/'
//const baseURL = 'http://3.133.94.170:9000/'
=======
//const baseURL = 'http://localhost:9000/'
const baseURL = 'http://18.222.158.28:9000/'
>>>>>>> Stashed changes

const instance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
})

instance.defaults.headers.post['Content-Type'] = 'application/json'
//instance.defaults.headers.get['Content-Type'] = 'application/json'
instance.defaults.withCredentials = true

instance.interceptors.request.use(request => {
    console.log('Starting Request', JSON.stringify(request, null, 2))
    return request
})

instance.interceptors.response.use(
    function(response) {
        return response
    },
    function(error) {
        console.log('Axios error in axios-instance.js!')
        console.log(error)
        
        try {
            return error.response
        }   
        catch(e) {
            return Promise.reject(error)
        }
    }
)

export default instance