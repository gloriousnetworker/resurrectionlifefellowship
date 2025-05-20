'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ReliefCenterPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#039994] to-[#02736f] py-24">
        <div className="absolute inset-0 bg-[url('/images/relief-bg.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Relief Center</h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Collaborative efforts for humanitarian aid and disaster response
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        {/* Introduction Section */}
        <section className="mb-20 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#039994] mb-6">Our Relief Network</h2>
          <p className="text-gray-600 text-lg mb-8">
            At BigRelief, we coordinate with national and international organizations to provide effective disaster response and humanitarian aid. Our relief center serves as a hub for collaboration between government agencies, international organizations, and private sector partners.
          </p>
          <div className="bg-[#039994] bg-opacity-10 p-6 rounded-xl border-l-4 border-[#039994]">
            <p className="text-gray-800 italic">
              "In times of crisis, coordinated action saves lives. Our relief center brings together the best resources and expertise to maximize impact."
            </p>
          </div>
        </section>
        
        {/* Partners Sections */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-[#039994] mb-12 text-center">Our Relief Partners</h2>
          
          {/* Government Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="bg-gray-100 rounded-2xl overflow-hidden h-80 order-last lg:order-first">
              <img src="/images/government-partners.jpg" alt="Government Partners" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#039994] mb-4">Government Partnerships</h3>
              <p className="text-gray-600 mb-4">
                We work closely with national and local government agencies to align our relief efforts with official disaster response plans. Our partnerships ensure:
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Coordinated resource allocation during emergencies</li>
                <li>Access to affected areas with proper authorization</li>
                <li>Compliance with national relief protocols</li>
                <li>Integration with long-term recovery plans</li>
              </ul>
            </div>
          </div>
          
          {/* UN Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-[#039994] mb-4">United Nations Collaboration</h3>
              <p className="text-gray-600 mb-4">
                As an implementing partner with various UN agencies, we participate in global humanitarian initiatives and adhere to international standards.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-[#039994] text-white p-2 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-600 flex-1">Coordination with UNOCHA for emergency response</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#039994] text-white p-2 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-600 flex-1">Partnership with UNHCR for refugee support</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#039994] text-white p-2 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-600 flex-1">Implementation of UNICEF child protection programs</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 rounded-2xl overflow-hidden h-80">
              <img src="/images/un-partners.jpg" alt="UN Partners" className="w-full h-full object-cover" />
            </div>
          </div>
          
          {/* WHO Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="bg-gray-100 rounded-2xl overflow-hidden h-80 order-last lg:order-first">
              <img src="/images/who-partners.jpg" alt="WHO Partners" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#039994] mb-4">World Health Organization</h3>
              <p className="text-gray-600 mb-4">
                Our health-related relief efforts are conducted in accordance with WHO guidelines and often in direct collaboration with their experts.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-[#039994] mb-2">Medical Supplies</h4>
                  <p className="text-gray-600 text-sm">Distribution of WHO-approved medicines and equipment</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-[#039994] mb-2">Disease Control</h4>
                  <p className="text-gray-600 text-sm">Implementation of outbreak prevention protocols</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-[#039994] mb-2">Training</h4>
                  <p className="text-gray-600 text-sm">Capacity building for local health workers</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-[#039994] mb-2">Emergency Response</h4>
                  <p className="text-gray-600 text-sm">Rapid deployment of health teams in crises</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Private Companies Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-[#039994] mb-4">Private Sector Engagement</h3>
              <p className="text-gray-600 mb-4">
                Corporate partners provide critical resources, expertise, and funding to amplify our relief efforts. Our private sector collaborations include:
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#039994] rounded-full mr-3"></div>
                  <p className="text-gray-600">In-kind donations from manufacturing companies</p>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#039994] rounded-full mr-3"></div>
                  <p className="text-gray-600">Logistics support from transportation firms</p>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#039994] rounded-full mr-3"></div>
                  <p className="text-gray-600">Employee volunteer programs</p>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#039994] rounded-full mr-3"></div>
                  <p className="text-gray-600">Matching gift programs</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 rounded-2xl overflow-hidden h-80">
              <img src="/images/corporate-partners.jpg" alt="Corporate Partners" className="w-full h-full object-cover" />
            </div>
          </div>
          
          {/* CO Relief Section */}
          <div className="bg-white p-8 rounded-2xl shadow-lg mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-[#039994] mb-2">CO Relief Initiatives</h3>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our community-organized relief programs empower local leaders to identify and address needs in their areas.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="text-[#039994] text-2xl mb-3">01</div>
                <h4 className="font-semibold text-lg mb-2">Community Needs Assessment</h4>
                <p className="text-gray-600 text-sm">Training local volunteers to conduct rapid needs assessments after disasters</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="text-[#039994] text-2xl mb-3">02</div>
                <h4 className="font-semibold text-lg mb-2">Local Resource Mapping</h4>
                <p className="text-gray-600 text-sm">Identifying available resources within communities before crises hit</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="text-[#039994] text-2xl mb-3">03</div>
                <h4 className="font-semibold text-lg mb-2">Response Coordination</h4>
                <p className="text-gray-600 text-sm">Establishing community-led emergency response teams</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Partner Logos Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-[#039994] mb-12 text-center">Our Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm flex items-center justify-center h-32">
              <img src="/images/partner1.png" alt="Partner 1" className="max-h-16 max-w-full" />
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="bg-gradient-to-r from-[#039994] to-[#02736f] rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Relief Network</h2>
          <p className="max-w-2xl mx-auto mb-6 text-white text-opacity-90">
            Whether you're a government agency, international organization, or private company, we can achieve more together.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-[#039994] font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
              Become a Partner
            </button>
            <button className="border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition">
              Contact Our Team
            </button>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
}