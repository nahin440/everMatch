import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useFav = () => {
  // const axiosSecure = useAxios();
  // const { data: favourate,  refetch, isLoading} = useQuery({
  //   queryKey: ["favourate"],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get("/favourate");
  //     return res.data;
  //   },
  // });
  // return [favourate,  refetch, isLoading];

  const axiosSecure = useAxios();
  const {data: favourate, refetch , isLoading} = useQuery({
    queryKey: ['favourate'],
    queryFn: async ()=> {
      const res = await axiosSecure('/favourate')
      // const res = await axiosSecure.get("/favourate");
      return res.data;
    },
    onError: (err) => {
      console.error('Error fetching data:', err.message);
    },
  })
  return [favourate,  refetch, isLoading];
  
};

export default useFav;
