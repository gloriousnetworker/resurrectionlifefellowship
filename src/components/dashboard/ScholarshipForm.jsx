export default function ScholarshipForm({ 
    editingScholarship, 
    setEditingScholarship, 
    onSubmit, 
    submitting,
    userNgos 
  }) {
    const [scholarshipForm, setScholarshipForm] = useState({
      title: '',
      description: '',
      ngoId: '',
      deadline: '',
      eligibility: '',
      applicationUrl: '',
      amount: '',
      imageUrl: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setScholarshipForm(prev => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit({
        ...scholarshipForm,
        deadline: new Date(scholarshipForm.deadline).toISOString()
      });
    };
  
    const cancelEdit = () => {
      setEditingScholarship(null);
      setScholarshipForm({
        title: '',
        description: '',
        ngoId: '',
        deadline: '',
        eligibility: '',
        applicationUrl: '',
        amount: '',
        imageUrl: ''
      });
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Title*</label>
            <input
              type="text"
              name="title"
              value={scholarshipForm.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#039994] focus:border-[#039994]"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">NGO*</label>
            <select
              name="ngoId"
              value={scholarshipForm.ngoId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#039994] focus:border-[#039994]"
            >
              <option value="">Select NGO</option>
              {userNgos.map(ngo => (
                <option key={ngo.id} value={ngo.id}>{ngo.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 mb-1">Description*</label>
          <textarea
            name="description"
            value={scholarshipForm.description}
            onChange={handleChange}
            required
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#039994] focus:border-[#039994]"
          ></textarea>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Deadline*</label>
            <input
              type="date"
              name="deadline"
              value={scholarshipForm.deadline}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#039994] focus:border-[#039994]"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Amount*</label>
            <input
              type="text"
              name="amount"
              value={scholarshipForm.amount}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#039994] focus:border-[#039994]"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Application URL*</label>
            <input
              type="url"
              name="applicationUrl"
              value={scholarshipForm.applicationUrl}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#039994] focus:border-[#039994]"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 mb-1">Eligibility Criteria*</label>
          <textarea
            name="eligibility"
            value={scholarshipForm.eligibility}
            onChange={handleChange}
            required
            rows="2"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#039994] focus:border-[#039994]"
          ></textarea>
        </div>
        
        <div>
          <label className="block text-gray-700 mb-1">Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={scholarshipForm.imageUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#039994] focus:border-[#039994]"
          />
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
            {submitting ? 'Processing...' : editingScholarship.id ? 'Update Scholarship' : 'Create Scholarship'}
          </button>
        </div>
      </form>
    );
  }