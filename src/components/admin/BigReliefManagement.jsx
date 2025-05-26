// components/admin/BannersManagement.jsx
import { useState, useEffect } from 'react';
import BannerModal from './BigReliefModal';

const BigReliefManagement = ({ 
  banners, 
  loading, 
  onCreateBanner,
  onUpdateBanner,
  onDeleteBanner
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBanners, setFilteredBanners] = useState([]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredBanners(banners);
    } else {
      const filtered = banners.filter(banner => 
        banner.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        banner.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBanners(filtered);
    }
  }, [searchTerm, banners]);

  const openModal = (type, banner = null) => {
    setModalType(type);
    setSelectedBanner(banner);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType('');
    setSelectedBanner(null);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
        <h2 className="text-2xl font-semibold text-[#039994]">Relief Center Management</h2>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search relief centers..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#039994] focus:border-[#039994]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button
            onClick={() => openModal('createBanner')}
            className="px-4 py-2 bg-[#039994] text-white rounded hover:bg-[#028885] transition whitespace-nowrap"
          >
            Create Relief Center
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#039994]"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBanners.length > 0 ? (
                filteredBanners.map((banner) => (
                  <tr key={banner.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{banner.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 line-clamp-2">{banner.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${banner.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {banner.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{formatDate(banner.createdAt)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button 
                        onClick={() => openModal('editBanner', banner)} 
                        className="text-blue-500 hover:text-blue-600 px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => openModal('deleteBanner', banner)} 
                        className="text-red-500 hover:text-red-600 px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    {searchTerm.trim() === '' ? 'No relief centers found' : 'No relief center match your search'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <BannerModal
        isOpen={isModalOpen}
        onClose={closeModal}
        type={modalType}
        banner={selectedBanner}
        onCreate={onCreateBanner}
        onUpdate={onUpdateBanner}
        onDelete={onDeleteBanner}
      />
    </div>
  );
};

export default BigReliefManagement;