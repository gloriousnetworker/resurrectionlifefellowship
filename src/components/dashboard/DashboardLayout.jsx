'use client';
import { useState } from 'react';
import BannerCarousel from './BannerCarousel';
import DashboardTab from './DashboardTab';
import NgoTab from './NgoTab';
import ScholarshipTab from './ScholarshipTab';

export default function DashboardLayout({ 
  user, 
  banners, 
  currentBannerIndex, 
  setCurrentBannerIndex,
  userNgos,
  scholarships,
  activeTab,
  setActiveTab
}) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        {/* Banner Carousel */}
        <BannerCarousel 
          banners={banners} 
          currentBannerIndex={currentBannerIndex}
          setCurrentBannerIndex={setCurrentBannerIndex}
        />

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          {/* Navigation Tabs */}
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
              NGOs
            </button>
            <button 
              className={`py-3 px-6 font-medium ${activeTab === 'scholarships' ? 'text-[#039994] border-b-2 border-[#039994]' : 'text-gray-500 hover:text-[#039994]'}`}
              onClick={() => setActiveTab('scholarships')}
            >
              Scholarships
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'dashboard' && (
            <DashboardTab user={user} userNgos={userNgos} scholarships={scholarships} setActiveTab={setActiveTab} />
          )}
          {activeTab === 'ngos' && (
            <NgoTab 
              userNgos={userNgos} 
            />
          )}
          {activeTab === 'scholarships' && (
            <ScholarshipTab 
              userNgos={userNgos} 
              scholarships={scholarships} 
            />
          )}
        </div>
      </div>
    </div>
  );
}