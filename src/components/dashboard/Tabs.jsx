'use client';

export default function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex border-b border-gray-200">
      <button 
        className={`py-3 px-6 font-medium ${activeTab === 'dashboard' ? 'text-[#039994] border-b-2 border-[#039994]' : 'text-gray-500 hover:text-[#039994]'}`}
        onClick={() => setActiveTab('dashboard')}
      >
        Dashboard
      </button>
      <button 
        className={`py-3 px-6 font-medium ${activeTab === 'ngos' ? 'text-[#039994] border-b-2 border-[#039994]' : 'text-gray-500 hover:text-[#039994]'}`}
        onClick={() => setActiveTab('ngos')}
      >
        My NGOs
      </button>
      <button 
        className={`py-3 px-6 font-medium ${activeTab === 'scholarships' ? 'text-[#039994] border-b-2 border-[#039994]' : 'text-gray-500 hover:text-[#039994]'}`}
        onClick={() => setActiveTab('scholarships')}
      >
        Scholarships
      </button>
    </div>
  );
}