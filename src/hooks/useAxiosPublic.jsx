import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://evermatch-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;