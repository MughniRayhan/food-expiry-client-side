import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from './UseAxiosSecure';
import UseAuth from './UseAuth';

const useUserRole = () => {
  const { user, loading } = UseAuth(); 
  const axiosSecure = UseAxiosSecure();

  const { data: role, isLoading: roleLoading, refetch } = useQuery({
    enabled: !loading && !!user?.email, // only run when user is loaded and email exists
    queryKey: ['userRole', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data.role;
    },
  });

  return {role, roleLoading, refetch};
};

export default useUserRole;
