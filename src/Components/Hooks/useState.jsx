import { useQuery } from '@tanstack/react-query';
import usePublic from './usePublic';
const useState = () => {
   const axiosSecure = usePublic()
    const { data: state,  refetch, isLoading} = useQuery({
        queryKey: [ "state" ],
        queryFn: async () => {
          const res = await axiosSecure.get("/admin-stats");
          return res.data;
        },
      });
      return [state,  refetch, isLoading];
}

export default useState