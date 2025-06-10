import React from 'react';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const AboutUs = () => {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-16">
        {/* Hero Section */}
        

        {/* Company Story */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  Founded with a vision to revolutionize the real estate industry, Promitto has grown from a small startup to a leading property management platform. Our journey began with a simple idea: to make property ownership and management accessible, efficient, and rewarding for everyone.
                </p>
                <p className="text-gray-600 mb-4">
                  Today, we're proud to serve thousands of clients across the region, helping them find their dream properties, manage their investments, and build sustainable communities.
                </p>
              </div>
              <div className="relative h-[400px] rounded-xl overflow-hidden flex items-center justify-center bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/FMRvwAfwk48"
                  title="Promitto Story Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Mission & Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm flex flex-col items-center">
                {/* Mission Icon */}
                <svg className="w-12 h-12 text-[#1E40AF] mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Mission</h3>
                <p className="text-gray-600 text-center">
                  To empower individuals and businesses with innovative property solutions that create lasting value and foster community growth.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm flex flex-col items-center">
                {/* Vision Icon */}
                <svg className="w-12 h-12 text-[#F59E0B] mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Vision</h3>
                <p className="text-gray-600 text-center">
                  To be the leading platform for property management and real estate services, setting new standards for excellence and innovation.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm flex flex-col items-center">
                {/* Values Icon */}
                <svg className="w-12 h-12 text-[#D97706] mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Values</h3>
                <ul className="text-gray-600 space-y-2 text-center">
                  <li>• Integrity and Transparency</li>
                  <li>• Innovation and Excellence</li>
                  <li>• Customer-Centric Approach</li>
                  <li>• Sustainable Growth</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        {/* <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((member) => (
                <div key={member} className="text-center">
                  <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src={`/images/team/member-${member}.jpg`}
                      alt={`Team Member ${member}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Team Member {member}</h3>
                  <p className="text-[#F59E0B] mb-2">Position</p>
                  <p className="text-gray-600">
                    Brief description of the team member's role and expertise.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Board Members Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Board Members</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {/* Dr. Olufunso Somorin */}
              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src="/images/board/olufunso-somorin.png"
                    alt="Dr. Olufunso Somorin"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Dr. Olufunso Somorin</h3>
                <p className="text-[#F59E0B] mb-2">Overall Chairman</p>
              </div>

              {/* Mark Muema */}
              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src="/images/board/mark-muema.png"
                    alt="Mark Muema"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Mark Muema</h3>
                <p className="text-[#F59E0B] mb-2">Chairman, Finance and HR Subcommittee</p>
              </div>

              {/* Waceke Munene */}
              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src="/images/board/waceke-munene.png"
                    alt="Waceke Munene"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Waceke Munene</h3>
                <p className="text-[#F59E0B] mb-2">IT & Operations Subcommittee</p>
              </div>

              {/* Jimmy Kagoni */}
              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src="/images/board/jimmy-kagoni.png"
                    alt="Jimmy Kagoni"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Jimmy Kagoni</h3>
                <p className="text-[#F59E0B] mb-2">Secretary to the Board</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default AboutUs; 