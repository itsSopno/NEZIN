import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import UseAuth from '../Hooks/UseAuth';

const useRoleAdvanced = (options = {}) => {
  const {
    enableCache = true,
    cacheTimeout = 5 * 60 * 1000, // 5 minutes
    retryAttempts = 3,
    retryDelay = 1000,
  } = options;

  const [role, setRole] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);
  
  const { user } = UseAuth();

  // Cache key for localStorage
  const cacheKey = `user_role_${user?.email}`;

  // Get cached data
  const getCachedData = useCallback(() => {
    if (!enableCache || !user?.email) return null;
    
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < cacheTimeout) {
          return data;
        }
      }
    } catch (err) {
      console.warn('Error reading cache:', err);
    }
    return null;
  }, [cacheKey, cacheTimeout, enableCache, user?.email]);

  // Set cached data
  const setCachedData = useCallback((data) => {
    if (!enableCache || !user?.email) return;
    
    try {
      localStorage.setItem(cacheKey, JSON.stringify({
        data,
        timestamp: Date.now(),
      }));
    } catch (err) {
      console.warn('Error setting cache:', err);
    }
  }, [cacheKey, enableCache, user?.email]);

  // Retry logic
  const fetchWithRetry = useCallback(async (url, config, attempts = retryAttempts) => {
    try {
      return await axios.get(url, config);
    } catch (err) {
      if (attempts > 1 && err.response?.status >= 500) {
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        return fetchWithRetry(url, config, attempts - 1);
      }
      throw err;
    }
  }, [retryAttempts, retryDelay]);

  // Fetch user role and permissions
  const fetchUserRole = useCallback(async (forceRefresh = false) => {
    if (!user?.email) {
      setRole(null);
      setPermissions([]);
      setLoading(false);
      return;
    }

    // Check cache first
    if (!forceRefresh) {
      const cached = getCachedData();
      if (cached) {
        setRole(cached.role);
        setPermissions(cached.permissions || []);
        setLoading(false);
        setLastFetch(cached.timestamp);
        return;
      }
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetchWithRetry(
        `${import.meta.env.VITE_API_URL}/api/users/profile/${user.email}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.accessToken || ''}`,
          },
        }
      );

      const userData = response.data;
      const userRole = userData.role || 'user';
      const userPermissions = userData.permissions || [];

      setRole(userRole);
      setPermissions(userPermissions);
      setLastFetch(Date.now());

      // Cache the data
      setCachedData({
        role: userRole,
        permissions: userPermissions,
        timestamp: Date.now(),
      });

    } catch (err) {
      console.error('Error fetching user role:', err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch user role');
      
      // Set default values on error
      setRole('user');
      setPermissions([]);
    } finally {
      setLoading(false);
    }
  }, [user?.email, user?.accessToken, getCachedData, setCachedData, fetchWithRetry]);

  // Update role function
  const updateRole = useCallback(async (newRole, newPermissions = []) => {
    if (!user?.email) return { success: false, error: 'No user logged in' };

    try {
      setLoading(true);
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/users/role`,
        {
          email: user.email,
          role: newRole,
          permissions: newPermissions,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.accessToken || ''}`,
          },
        }
      );

      const updatedData = response.data;
      setRole(updatedData.role);
      setPermissions(updatedData.permissions || []);

      // Update cache
      setCachedData({
        role: updatedData.role,
        permissions: updatedData.permissions || [],
        timestamp: Date.now(),
      });

      return { success: true, data: updatedData };
    } catch (err) {
      console.error('Error updating user role:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to update user role';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [user?.email, user?.accessToken, setCachedData]);

  // Clear cache
  const clearCache = useCallback(() => {
    if (user?.email) {
      localStorage.removeItem(cacheKey);
    }
  }, [cacheKey, user?.email]);

  // Refresh data
  const refresh = useCallback(() => {
    return fetchUserRole(true);
  }, [fetchUserRole]);

  // Role checking functions
  const hasRole = useCallback((targetRole) => role === targetRole, [role]);
  const hasPermission = useCallback((permission) => permissions.includes(permission), [permissions]);
  const hasAnyPermission = useCallback((permissionList) => 
    permissionList.some(permission => permissions.includes(permission)), [permissions]);
  const hasAllPermissions = useCallback((permissionList) => 
    permissionList.every(permission => permissions.includes(permission)), [permissions]);

  // Predefined role checks
  const isOwner = useCallback(() => role === 'owner', [role]);
  const isModerator = useCallback(() => role === 'moderator', [role]);
  const isUser = useCallback(() => role === 'user', [role]);
  const isPremium = useCallback(() => role === 'premium', [role]);
  const isGuest = useCallback(() => !role || role === 'guest', [role]);

  // Initial fetch
  useEffect(() => {
    fetchUserRole();
  }, [fetchUserRole]);

  return {
    // Data
    role,
    permissions,
    loading,
    error,
    lastFetch,
    
    // Actions
    updateRole,
    refresh,
    clearCache,
    
    // Role checks
    hasRole,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    isOwner,
    isModerator,
    isUser,
    isPremium,
    isGuest,
  };
};

export default useRoleAdvanced;