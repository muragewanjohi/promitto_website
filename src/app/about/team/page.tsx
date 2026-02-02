'use client';

import React from 'react';
import Image from 'next/image';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

const TeamPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 font-sans">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[300px] sm:h-[350px] lg:h-[400px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/about_us_hero_image.jpeg"
            alt="About Promitto Limited"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent"></div>
        </div>
        <div className="relative z-10 h-full flex items-end pb-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <div className="flex items-center mb-4">
                <div className="w-1 h-16 bg-secondary mr-6"></div>
                <h1 className="hero-title text-white">
                  Our Team
                </h1>
              </div>
              <p className="text-xl text-white font-medium leading-relaxed">
                Meet the dedicated professionals behind Promitto's success
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Management Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-12">
            <span className="inline-block bg-secondary/20 p-3 rounded-full mr-3">
              <Image 
              src="/hierarchical-structure_1042060.png" 
              alt="Hierarchical Structure" 
              width={32} 
              height={32} 
              className="w-8 h-8" 
              quality={75}
            />
            </span>
            <h2 className="site-title text-primary">Our Management Team</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Jimmy Kagoni', title: 'Chief Executive Officer', img: '/images/board/jimmy-kagoni.png' },
              { name: 'Machira Minyati', title: 'Project Manager', img: '/machira.jpg' },
              { name: 'Steve Kihara', title: 'Chief Finance Officer', img: '/steve.jpeg' },
              { name: 'Anastaciah Wajohi', title: 'Head of Customer Service', img: '/anastaciah.jpg' },
              { name: 'David Mwangi', title: 'Risk Manager', img: '/david.png' },
              { name: 'Adreen Gichore', title: 'Chief of Staff & Head of Credit Management', img: '/adreen.jpeg' },
            ].map((member, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                {member.img ? (
                  <div className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100">
                    <Image
                      src={member.img}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                      loading={idx < 3 ? undefined : 'lazy'}
                      priority={idx < 3}
                      quality={80}
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-2xl text-white font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
                <h4 className="text-xl font-bold text-primary mb-2">{member.name}</h4>
                <p className="text-secondary font-semibold">{member.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default TeamPage;
