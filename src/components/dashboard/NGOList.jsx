'use client';

export default function NGOList({ 
  userNgos, 
  deleteNgo, 
  userId 
}) {
  return (
    <div className="overflow-x-auto">
      {userNgos.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {userNgos.map(ngo => (
              <tr key={ngo.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {ngo.imageUrl && (
                      <img className="h-10 w-10 rounded-full object-cover mr-4" src={ngo.imageUrl} alt={ngo.name} />
                    )}
                    <div>
                      <div className="text-sm font-medium text-gray-900">{ngo.name}</div>
                      <div className="text-sm text-gray-500">{ngo.contactEmail}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ngo.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {ngo.isVerified ? 'Verified' : 'Pending Verification'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {ngo.createdBy === userId && (
                    <button 
                      onClick={() => deleteNgo(ngo.id)}
                      className="text-red-500 hover:text-red-600 px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-8 text-gray-500">
          You haven't registered any NGOs yet.
          <button
            onClick={() => setEditingNgo({})}
            className="mt-4 bg-[#039994] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#02736f] transition block mx-auto"
          >
            + Add NGO
          </button>
        </div>
      )}
    </div>
  );
}