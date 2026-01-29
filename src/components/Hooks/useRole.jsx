import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import UseAuth from "./UseAuth";

const useRole = () => {
    const { user } = UseAuth();
    
    // Only fetch role if user is authenticated
    const { data: roleData, isLoading, error } = useQuery({
        queryKey: ['userRole', user?.email],
        queryFn: async () => {
            if (!user?.email) return null;
            
            try {
                // Try to fetch user-specific role first
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/role/${user.email}`);
                return res.data;
            } catch (err) {
                // If specific endpoint fails, try the general customer endpoint
                if (err.response?.status === 404) {
                    const res = await axios.get(`${import.meta.env.VITE_API_URL}/Customer`);
                    // Find user by email or return first user as fallback
                    const userData = res.data.find(u => u.email === user.email) || res.data[0];
                    return userData;
                }
                throw err;
            }
        },
        enabled: !!user?.email, // Only run query if user email exists
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
    });

    const role = roleData?.role || 'user'; // Default to 'user' if no role found

    return {
        role,
        loading: isLoading,
        error,
        isOwner: role === 'owner',
        isAdmin: role === 'admin', 
        isModerator: role === 'moderator',
        isUser: role === 'user',
        isPremium: role === 'premium',
        user: roleData, // Full user data
        
        // Helper function to update role (if needed)
        updateRole: async (newRole) => {
            if (!user?.email) return false;
            try {
                await axios.put(`${import.meta.env.VITE_API_URL}/api/users/role`, {
                    email: user.email,
                    role: newRole,
                });
                return true;
            } catch (err) {
                console.error('Error updating role:', err);
                return false;
            }
        }
    };
};

export default useRole;