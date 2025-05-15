export default function NgoForm({ editingNgo, setEditingNgo, onSubmit, submitting }) {
    const [ngoForm, setNgoForm] = useState({
      name: '',
      description: '',
      accountNumber: '',
      bankName: '',
      accountName: '',
      website: '',
      contactEmail: '',
      imageUrl: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setNgoForm(prev => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(ngoForm);
    };
  
    const cancelEdit = () => {
      setEditingNgo(null);
      setNgoForm({
        name: '',
        description: '',
        accountNumber: '',
        bankName: '',
        accountName: '',
        website: '',
        contactEmail: '',
        imageUrl: ''
      });
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">NGO Name*</label>
            <input
              type="text"
              name="name"
              value={ngoForm.name}
              onChange={handleChange}
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
              onChange={handleChange}
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
            onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#039994] focus:border-[#039994]"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={ngoForm.imageUrl}
              onChange={handleChange}
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
            {submitting ? 'Processing...' : editingNgo.id ? 'Update NGO' : 'Register NGO'}
          </button>
        </div>
      </form>
    );
  }