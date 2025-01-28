import axios from "axios"

const axiosMine = axios.create({
    baseURL: 'http://localhost:5000'
})

const usePublic = () => {
   return axiosMine
}

export default usePublic