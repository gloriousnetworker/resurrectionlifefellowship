'use client';

export default function DashboardWelcome({ user, setActiveTab }) {
  return (
    <div className="bg-[#039994] bg-opacity-10 p-6 rounded-xl border-l-4 border-[#039994]">
      <h2 className="text-xl font-semibold text-[#039994] mb-3">Partner with Us</h2>
      <p className="text-gray-700 mb-4">
        Register and participate as an individual or corporate entities.
      </p>
      <button
        onClick={() => setActiveTab('ngos')}
        className="bg-[#039994] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#02736f] transition"
      >
        Register NGO
      </button>
    </div>
  );
}