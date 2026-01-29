import React from 'react';
import useRole from './Hooks/useRole';
import useRoleAdvanced from './Hooks/useRoleAdvanced';

const RoleExample = () => {
  // Basic usage
  const { role, loading, error, isAdmin, isModerator, updateRole } = useRole();
  
  // Advanced usage with options
  const {
    role: advancedRole,
    permissions,
    hasPermission,
    hasAnyPermission,
    refresh,
    clearCache
  } = useRoleAdvanced({
    enableCache: true,
    cacheTimeout: 10 * 60 * 1000, // 10 minutes
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        <span className="ml-2 text-white">Loading user role...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500/30 rounded p-4 m-4">
        <p className="text-red-400">Error: {error}</p>
        <button 
          onClick={refresh}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg">
      <h2 className="text-2xl font-bold mb-4">User Role Information</h2>
      
      {/* Basic Role Info */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Basic Role</h3>
        <p className="mb-2">Current Role: <span className="font-mono bg-gray-800 px-2 py-1 rounded">{role}</span></p>
        
        <div className="flex gap-2 mb-4">
          {isAdmin() && <span className="bg-red-600 px-2 py-1 rounded text-xs">Admin</span>}
          {isModerator() && <span className="bg-yellow-600 px-2 py-1 rounded text-xs">Moderator</span>}
        </div>
      </div>

      {/* Advanced Role Info */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Advanced Role & Permissions</h3>
        <p className="mb-2">Role: <span className="font-mono bg-gray-800 px-2 py-1 rounded">{advancedRole}</span></p>
        
        {permissions.length > 0 && (
          <div className="mb-4">
            <p className="mb-2">Permissions:</p>
            <div className="flex flex-wrap gap-1">
              {permissions.map((permission, index) => (
                <span key={index} className="bg-blue-600 px-2 py-1 rounded text-xs">
                  {permission}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Permission Checks */}
        <div className="space-y-2 text-sm">
          <p>Can Edit Posts: {hasPermission('edit_posts') ? '✅' : '❌'}</p>
          <p>Can Delete Users: {hasPermission('delete_users') ? '✅' : '❌'}</p>
          <p>Has Admin Permissions: {hasAnyPermission(['admin', 'super_admin']) ? '✅' : '❌'}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button 
          onClick={refresh}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Refresh Role
        </button>
        
        <button 
          onClick={clearCache}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
        >
          Clear Cache
        </button>
        
        {isAdmin() && (
          <button 
            onClick={() => updateRole('moderator')}
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
          >
            Demote to Moderator
          </button>
        )}
      </div>
    </div>
  );
};

export default RoleExample;