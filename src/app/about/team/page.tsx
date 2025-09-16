import React from 'react';
import Image from 'next/image';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

const TeamPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 font-sans">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/about_us_hero_image.jpeg"
            alt="About Promitto Limited"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent"></div>
        </div>
        <div className="relative z-10 h-full flex items-end pb-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Our Team
              </h1>
              <p className="text-xl text-white font-medium leading-relaxed">
                Meet the dedicated professionals behind Promitto's success
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Management Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center mb-12">
            <span className="inline-block bg-purple-100 p-3 rounded-full mr-3">
              <Image src="/hierarchical-structure_1042060.png" alt="Hierarchical Structure" width={32} height={32} className="w-8 h-8" />
            </span>
            <h2 className="text-3xl font-bold text-gray-900">Our Management Team</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Jimmy Kagoni', title: 'Chief Executive Officer', img: '/images/board/jimmy-kagoni.png' },
              { name: 'Machira Minyati', title: 'Project Manager' },
              { name: 'Steve Kihara', title: 'Chief Finance Officer' },
              { name: 'Anastaciah Wajohi', title: 'Head of Customer Service' },
              { name: 'David Mwangi', title: 'Risk Manager' },
              { name: 'Adreen Gichore', title: 'Chief of Staff & Head of Credit Management' },
            ].map((member, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                {member.img ? (
                  <div className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-200">
                    <Image
                      src={member.img}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-2xl text-white font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
                <h4 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h4>
                <p className="text-secondary text-base">{member.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Board Members Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Board Members</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Dr. Olufunso Somorin */}
            <div className="text-center bg-gray-50 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-secondary/30">
                <Image
                  src="/images/board/olufunso-somorin.png"
                  alt="Dr. Olufunso Somorin"
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Dr. Olufunso Somorin</h4>
              <p className="text-secondary font-semibold">Overall Chairman</p>
            </div>
            {/* Mark Muema */}
            <div className="text-center bg-gray-50 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/30">
                <Image
                  src="/images/board/mark-muema.png"
                  alt="Mark Muema"
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Mark Muema</h4>
              <p className="text-secondary font-semibold">Chairman, Finance and HR Subcommittee</p>
            </div>
            {/* Waceke Munene */}
            <div className="text-center bg-gray-50 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-secondary/30">
                <Image
                  src="/images/board/waceke-munene.png"
                  alt="Waceke Munene"
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Waceke Munene</h4>
              <p className="text-secondary font-semibold">IT & Operations Subcommittee</p>
            </div>
            {/* Jimmy Kagoni */}
            <div className="text-center bg-gray-50 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/30">
                <Image
                  src="/images/board/jimmy-kagoni.png"
                  alt="Jimmy Kagoni"
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Jimmy Kagoni</h4>
              <p className="text-secondary font-semibold">Secretary to the Board</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default TeamPage;
