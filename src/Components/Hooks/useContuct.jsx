
import useAxios from './useAxios';
import { useQuery } from '@tanstack/react-query';

const useContuct = () => {
    const axiosSecure = useAxios();
    const { data: contuct,  refetch, isLoading} = useQuery({
      queryKey: ["contuct"],
      queryFn: async () => {
        const res = await axiosSecure.get('/payments');
        return res.data;
      },
    });
    return [contuct,  refetch, isLoading];
}

export default useContuct