export default function DashboardTab({ user, userNgos, scholarships, setActiveTab }) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-[#039994] mb-4">Welcome, {user?.name}</h1>
        <p className="text-gray-600 mb-6">
          Thank you for being part of Big Relief. Together we can make a difference.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#039994] bg-opacity-10 p-6 rounded-xl border-l-4 border-[#039994]">
            <h3 className="text-xl font-semibold text-[#039994] mb-2">NGOs</h3>
            <p className="text-3xl font-bold">{userNgos.length}</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Active Scholarships</h3>
            <p className="text-3xl font-bold">{scholarships.length}</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
            <h3 className="text-xl font-semibold text-purple-600 mb-2">Messages</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
        </div>
  
        <div className="bg-[#039994] bg-opacity-10 p-6 rounded-xl border-l-4 border-[#039994]">
          <h2 className="text-xl font-semibold text-[#039994] mb-3">Partner with Us</h2>
          <p className="text-gray-700 mb-4">
            Register your NGO to become an official partner and enjoy exclusive benefits.
          </p>
          <button
            onClick={() => setActiveTab('ngos')}
            className="bg-[#039994] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#02736f] transition"
          >
            Register NGO
          </button>
        </div>
      </div>
    );
  }