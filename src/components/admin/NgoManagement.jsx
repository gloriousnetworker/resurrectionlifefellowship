import { useState } from 'react';
import NgoModal from './NgoModal';

const NgoManagement = ({ 
  ngos, 
  pendingNgos,
  loading, 
  loadingPending,
  onVerifyNgo,
  onUpdateNgo,
  onDeleteNgo
}) => {
  const [activeTab, setActiveTab] = useState('verified');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedNgo, setSelectedNgo] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const openModal = (type, ngo) => {
    setModalType(type);
    setSelectedNgo(ngo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType('');
    setSelectedNgo(null);
  };

  const handleVerify = async (id) => {
    setIsVerifying(true);
    try {
      const success = await onVerifyNgo(id);
      if (success) {
        closeModal();
      }
    } catch (error) {
      console.error('Verification failed:', error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleUpdate = async (id, formData) => {
    const success = await onUpdateNgo(id, formData);
    if (success) {
      closeModal();
    }
  };

  const handleDelete = async (id) => {
    const success = await onDeleteNgo(id);
    if (success) {
      closeModal();
    }
  };

  const currentNgos = activeTab === 'verified' ? ngos : pendingNgos;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-[#039994]">Partner NGOs</h2>
        <div className="flex border-b border-gray-200">
          <button 
            className={`py-2 px-4 font-medium ${activeTab === 'verified' ? 'text-[#039994] border-b-2 border-[#039994]' : 'text-gray-500 hover:text-[#039994]'}`}
            onClick={() => setActiveTab('verified')}
          >
            Verified NGOs
          </button>
          <button 
            className={`py-2 px-4 font-medium ${activeTab === 'pending' ? 'text-[#039994] border-b-2 border-[#039994]' : 'text-gray-500 hover:text-[#039994]'}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending Verification
          </button>
        </div>
      </div>
      
      {(loading && activeTab === 'verified') || (loadingPending && activeTab === 'pending') ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#039994]"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Website
                </th>
                {activeTab === 'verified' && (
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Verification Status
                  </th>
                )}
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentNgos.length > 0 ? (
                currentNgos.map((ngo) => (
                  <tr key={ngo.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{ngo.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{ngo.contactEmail || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {ngo.website ? (
                        <a href={ngo.website} target="_blank" rel="noopener noreferrer" className="text-[#039994] hover:underline">
                          {ngo.website}
                        </a>
                      ) : (
                        <div className="text-sm text-gray-500">N/A</div>
                      )}
                    </td>
                    {activeTab === 'verified' && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ngo.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {ngo.isVerified ? 'Verified' : 'Not Verified'}
                        </span>
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button 
                        onClick={() => openModal('viewNgo', ngo)} 
                        className="text-[#039994] hover:text-[#02736f] px-3 py-1 rounded"
                      >
                        View
                      </button>
                      {activeTab === 'pending' ? (
                        <button 
                          onClick={() => handleVerify(ngo.id)}
                          disabled={isVerifying}
                          className="text-green-500 hover:text-green-600 px-3 py-1 rounded disabled:opacity-50"
                        >
                          {isVerifying ? 'Verifying...' : 'Verify'}
                        </button>
                      ) : (
                        <>
                          <button 
                            onClick={() => openModal('editNgo', ngo)} 
                            className="text-blue-500 hover:text-blue-600 px-3 py-1 rounded"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => openModal('deleteNgo', ngo)} 
                            className="text-red-500 hover:text-red-600 px-3 py-1 rounded"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={activeTab === 'verified' ? 5 : 4} className="px-6 py-4 text-center text-gray-500">
                    No {activeTab === 'verified' ? 'verified' : 'pending'} NGOs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <NgoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        type={modalType}
        ngo={selectedNgo}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default NgoManagement;