import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import UseAuth from './UseAuth';

const useRole = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = UseAuth();

  const fetchUserRole = useCallback(async () => {
    if (!user?.email) {
      setRole(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // শুধুমাত্র Customer রাউট থেকে ডাটা আনা হচ্ছে
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/Customer`
      );
      
      const userRole = response.data?.role || 'user';
      setRole(userRole.toLowerCase()); 
    } catch (err) {
      console.error('Error fetching role:', err);
      setError(err.response?.data?.message || 'Failed to fetch role');
      setRole('user'); 
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  useEffect(() => {
    fetchUserRole();
  }, [fetchUserRole]);

  // Update Function - এখন সরাসরি Customer রাউটে হিট করবে
  const updateRole = async (newRole) => {
    if (!user?.email) return false;

    try {
      setLoading(true);
      // এখানেও Customer/${user.email} ব্যবহার করা হয়েছে যাতে ব্যাকএন্ড বুঝতে পারে কার রোল আপডেট হচ্ছে
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/Customer/${user.email}`,
        {
          role: newRole, // বডিতে শুধু নতুন রোল পাঠানো হচ্ছে
        }
      );

      if (response.data) {
        setRole(newRole.toLowerCase());
        return true;
      }
    } catch (err) {
      console.error('Error updating user role:', err);
      setError(err.response?.data?.message || 'Failed to update user role');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Helper variables (Boolean)
  const isOwner = role === "owner";
  const isModerator = role === 'moderator';
  const isUser = role === 'user';
  const isPremium = role === 'premium';

  return {
    role,
    loading,
    error,
    updateRole,
    isOwner, 
    isModerator,
    isUser,
    isPremium,
    refreshRole: fetchUserRole
  };
};

export default useRole;