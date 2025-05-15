import { useState } from 'react';
import ScholarshipForm from './ScholarshipForm';
import ScholarshipList from './ScholarshipList';

export default function ScholarshipTab({ userNgos, scholarships }) {
  const [editingScholarship, setEditingScholarship] = useState(null);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#039994]">
          {editingScholarship ? (editingScholarship.id ? 'Edit Scholarship' : 'Create Scholarship') : 'My Scholarships'}
        </h2>
        {!editingScholarship && userNgos.length > 0 && (
          <button
            onClick={() => setEditingScholarship({})}
            className="bg-[#039994] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#02736f] transition"
          >
            + Add Scholarship
          </button>
        )}
      </div>

      {editingScholarship ? (
        <ScholarshipForm 
          editingScholarship={editingScholarship} 
          setEditingScholarship={setEditingScholarship}
          userNgos={userNgos}
        />
      ) : (
        <ScholarshipList 
          userNgos={userNgos}
          scholarships={scholarships}
          setEditingScholarship={setEditingScholarship}
        />
      )}
    </div>
  );
}