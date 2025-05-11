'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#039994] to-[#02736f] py-24">
        <div className="absolute inset-0 bg-[url('/images/about-bg.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Story</h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Empowering communities through sustainable solutions
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        {/* Mission Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#039994] mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-6 text-lg">
                At BigRelief, we are committed to eradicating poverty and improving wellbeing through innovative social enterprise models. We believe in creating sustainable change by addressing root causes rather than just symptoms.
              </p>
              <p className="text-gray-600 mb-6">
                Our mission is to bridge the gap between those who want to help and those who need help, creating a cycle of empowerment that benefits entire communities.
              </p>
              <div className="bg-[#039994] bg-opacity-10 p-6 rounded-xl border-l-4 border-[#039994]">
                <p className="text-gray-800 italic">
                  "We don't just give handouts - we create opportunities for lasting change through education, resources, and community development."
                </p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-2xl overflow-hidden h-96">
              <img src="/images/mission.jpg" alt="Our Mission" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>
        
        {/* History Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-[#039994] mb-6 text-center">Our Journey</h2>
          <div className="relative">
            {/* Timeline */}
            <div className="border-l-2 border-[#039994] pl-8 space-y-12">
              <div className="relative">
                <div className="absolute -left-11 top-0 w-8 h-8 rounded-full bg-[#039994] flex items-center justify-center text-white font-bold">1</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">2015 - Foundation</h3>
                <p className="text-gray-600">
                  Founded as a small community initiative in Lagos, Nigeria, with the goal of providing basic necessities to underprivileged families.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -left-11 top-0 w-8 h-8 rounded-full bg-[#039994] flex items-center justify-center text-white font-bold">2</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">2017 - First Major Project</h3>
                <p className="text-gray-600">
                  Launched our "Back to School" initiative, providing school supplies to over 500 children in rural communities.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -left-11 top-0 w-8 h-8 rounded-full bg-[#039994] flex items-center justify-center text-white font-bold">3</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">2019 - Social Enterprise Model</h3>
                <p className="text-gray-600">
                  Transitioned to a social enterprise model where product sales fund our charitable programs, creating sustainable impact.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -left-11 top-0 w-8 h-8 rounded-full bg-[#039994] flex items-center justify-center text-white font-bold">4</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">2022 - National Expansion</h3>
                <p className="text-gray-600">
                  Expanded operations to 5 states in Nigeria, impacting over 10,000 lives through our various programs.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -left-11 top-0 w-8 h-8 rounded-full bg-[#039994] flex items-center justify-center text-white font-bold">5</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">2023 - Digital Platform</h3>
                <p className="text-gray-600">
                  Launched our e-commerce platform to reach more supporters and scale our impact through technology.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Impact Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-[#039994] mb-12 text-center">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="text-5xl font-bold text-[#039994] mb-4">12,500+</div>
              <h3 className="text-xl font-semibold mb-3">Products Donated</h3>
              <p className="text-gray-600">
                Essential items distributed to families in need across Nigeria
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="text-5xl font-bold text-[#039994] mb-4">8,500+</div>
              <h3 className="text-xl font-semibold mb-3">Lives Impacted</h3>
              <p className="text-gray-600">
                Children, women and men who have benefited from our programs
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="text-5xl font-bold text-[#039994] mb-4">85%</div>
              <h3 className="text-xl font-semibold mb-3">Profits Donated</h3>
              <p className="text-gray-600">
                Of our annual profits go directly to our charitable initiatives
              </p>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-[#039994] mb-12 text-center">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Amina Bello', role: 'Founder & CEO', bio: 'Social entrepreneur with 10+ years experience in community development', img: '/images/team1.jpg' },
              { name: 'Chike Obi', role: 'Programs Director', bio: 'Expert in sustainable development and NGO management', img: '/images/team2.jpg' },
              { name: 'Fatima Yusuf', role: 'Operations Manager', bio: 'Logistics specialist ensuring efficient distribution', img: '/images/team3.jpg' },
              { name: 'Emeka Okoro', role: 'Tech Lead', bio: 'Develops our digital platforms to maximize reach', img: '/images/team4.jpg' }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden transition transform hover:scale-105">
                <div className="h-64 bg-gray-100">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-[#039994] mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Partners Section */}
        <section>
          <h2 className="text-3xl font-bold text-[#039994] mb-12 text-center">Our Partners</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-md flex items-center justify-center h-24 w-48">
                <img src={`/images/partner${i}.png`} alt={`Partner ${i}`} className="h-full object-contain" />
              </div>
            ))}
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
}