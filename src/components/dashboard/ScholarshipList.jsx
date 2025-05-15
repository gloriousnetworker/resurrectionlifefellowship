export default function ScholarshipList({ userNgos, scholarships, setEditingScholarship, onDelete }) {
    return (
      <div className="overflow-x-auto">
        {userNgos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            You need to register an NGO before creating scholarships.
          </div>
        ) : scholarships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scholarships.map(scholarship => (
              <div key={scholarship.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition">
                {scholarship.imageUrl && (
                  <img 
                    src={scholarship.imageUrl} 
                    alt={scholarship.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#039994] mb-2">{scholarship.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{scholarship.description}</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-gray-500">Amount: {scholarship.amount}</span>
                    <span className="text-sm font-medium text-gray-500">Deadline: {new Date(scholarship.deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button 
                      onClick={() => setEditingScholarship(scholarship)}
                      className="text-blue-500 hover:text-blue-600 px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => onDelete(scholarship.id)}
                      className="text-red-500 hover:text-red-600 px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            You haven't created any scholarships yet.
          </div>
        )}
      </div>
    );
  }