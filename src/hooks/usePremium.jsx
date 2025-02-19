import React, { useContext } from 'react';
import { AuthContext } from '../components/provider/AuthProvider';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const usePremium = () => {
    const { user } = useContext(AuthContext);  // Get user from AuthContext
    const axiosSecure = useAxiosSecure();

    // Fetch premium status using React Query
    const { data: isPremium, isLoading: isPremiumLoading } = useQuery({
        queryKey: [user?.email, 'isPremium'],
        queryFn: async () => {
            if (!user?.email) return false;  // Early return if email is not available

            const res = await axiosSecure.get(`/users/Premium/${user.email}`);
            
            return res.data?.premium || false; // Default to false if Premium is not available
        },
        enabled: !!user?.email,  // Only fetch if user email is available
    });

    return [isPremium, isPremiumLoading];
};

export default usePremium;
