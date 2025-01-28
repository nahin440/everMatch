import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useUser from "./useUser";
import Loading from "../Shared/Loading";

const useRole = () => {
  const [role, setRole] = useState(null); // Start with null to handle loading properly
  const { user } = useAuth();
  const [users, refetch, isLoading] = useUser();

  useEffect(() => {
    if (!isLoading && users.length > 0) {
      const currentUser = users.find((u) => u.email === user?.email);
      const isPremium = currentUser?.userRole === "premium";
      setRole(isPremium ); // Update role based on userRole
    }
  }, [isLoading, users, user]);

  if (isLoading) {
    return { role: null, loading: true }; // Return a loading state for consistency
  }

  return { role, loading: false }; // Return the role and loading state
};

export default useRole;
