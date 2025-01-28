import { useEffect, useState } from "react";
import usePublic from "./usePublic";
import { useQuery } from "@tanstack/react-query";


const usePremiumBiodata = () => {
  const axiosSecure = usePublic()
  const { data: premiumbiodata,  refetch, isLoading} = useQuery({
      queryKey: [ "premiumbiodata" ],
      queryFn: async () => {
        const res = await axiosSecure.get("/premium-biodata");
        return res.data;
      },
    });
    return [premiumbiodata,  refetch, isLoading];
}

export default usePremiumBiodata