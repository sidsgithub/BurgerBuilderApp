import axios from 'axios'

const instance = axios.create({
    baseURL:"https://burger-65077.firebaseio.com/"
})

export default instance