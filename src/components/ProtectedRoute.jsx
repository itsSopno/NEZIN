import React from 'react';
import { Navigate } from 'react-router-dom';
import useRole from './Hooks/useRole';
import UseAuth from './Hooks/UseAuth';

const ProtectedRoute = ({ 
  children, 
  requiredRole = null, 
  requiredPermissions = [], 
  fallbackPath = '/login',
  loadingComponent = null 
}) => {
  const { user, loading: authLoading } = UseAuth();
  const { 
    role, 
    loading: roleLoading, 
    isAdmin, 
    isModerator, 
    isPremium 
  } = useRole();

  // Show loading while checking authentication and role
  if (authLoading || roleLoading) {
    return loadingComponent || (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white/60 text-sm tracking-wider">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to={fallbackPath} replace />;
  }

  // Check role-based access
  if (requiredRole) {
    const hasRequiredRole = () => {
      switch (requiredRole) {
        case 'admin':
          return isAdmin();
        case 'moderator':
          return isModerator() || isAdmin();
        case 'premium':
          return isPremium() || isAdmin();
        case 'user':
          return role !== null; // Any authenticated user
        default:
          return role === requiredRole;
      }
    };

    if (!hasRequiredRole()) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-black">
          <div className="text-center max-w-md mx-auto p-8">
            <div className="text-6xl mb-4">🔒</div>
            <h1 className="text-2xl font-light text-white mb-4">Access Denied</h1>
            <p className="text-white/60 mb-6">
              You don't have the required permissions to access this area.
            </p>
            <p className="text-white/40 text-sm mb-6">
              Required role: <span className="font-mono bg-gray-800 px-2 py-1 rounded">{requiredRole}</span><br />
              Your role: <span className="font-mono bg-gray-800 px-2 py-1 rounded">{role || 'none'}</span>
            </p>
            <button 
              onClick={() => window.history.back()}
              className="px-6 py-2 bg-white/10 text-white rounded border border-white/20 hover:bg-white/20 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      );
    }
  }

  // TODO: Add permission-based checks if needed
  // This would require the advanced useRole hook with permissions

  return children;
};

// Higher-order component for easier usage
export const withRoleProtection = (Component, options = {}) => {
  return (props) => (
    <ProtectedRoute {...options}>
      <Component {...props} />
    </ProtectedRoute>
  );
};

// Specific role protection components
export const AdminRoute = ({ children, ...props }) => (
  <ProtectedRoute requiredRole="admin" {...props}>
    {children}
  </ProtectedRoute>
);

export const ModeratorRoute = ({ children, ...props }) => (
  <ProtectedRoute requiredRole="moderator" {...props}>
    {children}
  </ProtectedRoute>
);

export const PremiumRoute = ({ children, ...props }) => (
  <ProtectedRoute requiredRole="premium" {...props}>
    {children}
  </ProtectedRoute>
);

export default ProtectedRoute;