import { useState } from 'react';
import NgoForm from './NgoForm';
import NgoList from './NgoList';

export default function NgoTab({ userNgos }) {
  const [editingNgo, setEditingNgo] = useState(null);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#039994]">
          {editingNgo ? 'Edit NGO' : 'My NGOs'}
        </h2>
        {!editingNgo && (
          <button
            onClick={() => setEditingNgo({})}
            className="bg-[#039994] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#02736f] transition"
          >
            + Add NGO
          </button>
        )}
      </div>

      {editingNgo ? (
        <NgoForm 
          editingNgo={editingNgo} 
          setEditingNgo={setEditingNgo}
        />
      ) : (
        <NgoList 
          userNgos={userNgos} 
          setEditingNgo={setEditingNgo}
        />
      )}
    </div>
  );
}