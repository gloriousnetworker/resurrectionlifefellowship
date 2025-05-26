'use client';

export default function NGOForm({ 
  ngoForm, 
  handleNgoChange, 
  handleNgoSubmit, 
  submitting, 
  editingNgo, 
  cancelEdit 
}) {
  return (
    <form onSubmit={handleNgoSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-1">NGO Name*</label>
          <input
            type="text"
            name="name"
            value={ngoForm.name}
            onChange={handleNgoChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#039994] focus:border-[#039994]"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Contact Email*</label>
          <input
            type="email"
            name="contactEmail"
            value={ngoForm.contactEmail}
            onChange={handleNgoChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#039994] focus:border-[#039994]"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-gray-700 mb-1">Description*</label>
        <textarea
          name="description"
          value={ngoForm.description}
          onChange={handleNgoChange}
          required
          rows="3"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#039994] focus:border-[#039994]"
        ></textarea>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-700 mb-1">Bank Name*</label>
          <input
            type="text"
            name="bankName"
            value={ngoForm.bankName}
            onChange={handleNgoChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#039994] focus:border-[#039994]"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Account Number*</label>
          <input
            type="text"
            name="accountNumber"
            value={ngoForm.accountNumber}
            onChange={handleNgoChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#039994] focus:border-[#039994]"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Account Name*</label>
          <input
            type="text"
            name="accountName"
            value={ngoForm.accountName}
            onChange={handleNgoChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#039994] focus:border-[#039994]"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-1">Website</label>
          <input
            type="url"
            name="website"
            value={ngoForm.website}
            onChange={handleNgoChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#039994] focus:border-[#039994]"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={ngoForm.imageUrl}
            onChange={handleNgoChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#039994] focus:border-[#039994]"
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={cancelEdit}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className={`bg-[#039994] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#02736f] transition ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {submitting ? 'Processing...' : 'Register NGO'}
        </button>
      </div>
    </form>
  );
}