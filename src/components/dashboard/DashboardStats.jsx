'use client';

export default function DashboardStats({ userNgos, scholarships }) {
  return (
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
  );
}