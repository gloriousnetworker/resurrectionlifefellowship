'use client';

import { useState } from 'react';
import ScholarshipModal from './ScholarshipModal';

const ScholarshipsManagement = ({ 
  scholarships, 
  loading, 
  onDeleteScholarship
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedScholarship, setSelectedScholarship] = useState(null);

  const openModal = (type, scholarship) => {
    setModalType(type);
    setSelectedScholarship(scholarship);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType('');
    setSelectedScholarship(null);
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.error("No scholarship ID provided for deletion");
      return false;
    }
    
    console.log("ScholarshipsManagement - Deleting scholarship with ID:", id);
    
    try {
      const success = await onDeleteScholarship(id);
      console.log("ScholarshipsManagement - Delete result:", success);
      return success;
    } catch (error) {
      console.error("Error in ScholarshipsManagement.handleDelete:", error);
      return false;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-[#039994]">Scholarships</h2>
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
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deadline
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {scholarships.length > 0 ? (
                scholarships.map((scholarship) => (
                  <tr key={scholarship.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{scholarship.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{scholarship.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{scholarship.amount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(scholarship.deadline)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button 
                        onClick={() => openModal('viewScholarship', scholarship)} 
                        className="text-[#039994] hover:text-[#02736f] px-3 py-1 rounded"
                      >
                        View
                      </button>
                      <button 
                        onClick={() => openModal('deleteScholarship', scholarship)} 
                        className="text-red-500 hover:text-red-600 px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                    No scholarships found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <ScholarshipModal
        isOpen={isModalOpen}
        onClose={closeModal}
        type={modalType}
        scholarship={selectedScholarship}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ScholarshipsManagement;