// components/admin/UserModal.jsx
import { useState, useEffect } from 'react';

const UserModal = ({ 
  isOpen, 
  onClose, 
  type, 
  user, 
  onPromote, 
  onUpdate,
  onDelete
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (user && (type === 'editUser' || type === 'viewUser')) {
      setFormData({
        name: user.name || '',
        email: user.email || ''
      });
    }
  }, [user, type]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      if (type === 'editUser') {
        await onUpdate(user.id, formData);
      } else if (type === 'promoteUser') {
        await onPromote(user.id);
      } else if (type === 'deleteUser') {
        await onDelete(user.id);
      }
      onClose();
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  const renderContent = () => {
    switch (type) {
      case 'viewUser':
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-500">ID: {user.id}</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-gray-900">{user.email}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Role</p>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                  {user.role}
                </span>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Joined</p>
                <p className="text-gray-900">{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        );
        
      case 'editUser':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#039994] focus:border-[#039994]"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#039994] focus:border-[#039994]"
                required
              />
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className="px-4 py-2 bg-[#039994] text-white rounded hover:bg-[#028885] transition disabled:opacity-50"
              >
                {isProcessing ? 'Updating...' : 'Update User'}
              </button>
            </div>
          </form>
        );
        
      case 'promoteUser':
        return (
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mt-4">Promote User</h3>
            <p className="text-sm text-gray-500 mt-2">
              Are you sure you want to promote <span className="font-medium">{user?.name}</span> to Admin?
              This will grant them full administrator privileges.
            </p>

            <div className="mt-6 flex justify-center space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isProcessing || user?.role === 'admin'}
                className={`px-4 py-2 ${user?.role === 'admin' 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600'} text-white rounded transition disabled:opacity-50`}
              >
                {isProcessing 
                  ? 'Promoting...' 
                  : user?.role === 'admin' 
                    ? 'Already Admin' 
                    : 'Promote to Admin'}
              </button>
            </div>
          </div>
        );
        
      case 'deleteUser':
        return (
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mt-4">Delete User</h3>
            <p className="text-sm text-gray-500 mt-2">
              Are you sure you want to delete <span className="font-medium">{user?.name}</span>?
              This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-center space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isProcessing}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition disabled:opacity-50"
              >
                {isProcessing ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#039994]">
            {type === 'viewUser' && 'User Details'}
            {type === 'editUser' && 'Edit User'}
            {type === 'promoteUser' && 'Promote User'}
            {type === 'deleteUser' && 'Delete User'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {isProcessing && type !== 'promoteUser' && type !== 'deleteUser' ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#039994]"></div>
          </div>
        ) : (
          renderContent()
        )}
      </div>
    </div>
  );
};

export default UserModal;