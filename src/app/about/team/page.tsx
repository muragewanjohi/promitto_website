'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import MediaSidebar from '../../../components/MediaSidebar';
import BoardMemberModal from '../../../components/BoardMemberModal';

interface BoardMember {
  name: string;
  title: string;
  image: string;
  about: string;
  careerHistory: string;
}

const TeamPage = () => {
  const [selectedMember, setSelectedMember] = useState<BoardMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const boardMembers = [
    {
      name: 'Dr. Olufunso Somorin',
      title: 'Overall Chairman',
      image: '/images/board/olufunso-somorin.png',
      about: 'Dr. Olufunso Somorin is a Regional Principal Officer at the African Development Bank.',
      careerHistory: 'He leads the Bank\'s work on climate change and green growth in the 13 countries of the Bank\'s East African region. This includes supporting countries\' access to climate finance for implementing their climate actions, and mainstreaming climate change in all Bank policies and programs.'
    },
    {
      name: 'Mark Muema',
      title: 'Chairman, Finance and HR Subcommittee',
      image: '/images/board/mark-muema.png',
      about: 'Mark Muema is the CEO of Selfund.',
      careerHistory: 'Mark employs design thinking to develop economic and financial models that drive growth in the markets we operate in, including global markets. With a Bachelor\'s degree in Economics and Mathematics from Egerton University, he is passionate about applying best practices in economics and financial modeling locally and on an international scale.'
    },
    {
      name: 'Waceke Munene',
      title: 'IT & Operations Subcommittee',
      image: '/images/board/waceke-munene.png',
      about: 'Waceke Munene is a database developer at Apple Inc.',
      careerHistory: 'She is versatile Business Data Analyst with Over 4 years\' experience in interpreting, analyzing and visualization data to help business make informed data-backed decisions and solutions. She has excellent understanding of business operations & analytics tools such as Tableau Business intelligence solutions (Virtual Studio), Power BI, Microsoft SQL Server, and a host of other analytical tools to help businesses make important decisions that adds value. She is an alumni of JKUAT & Grand Canyon University with Master\'s of Science in Business Analytics.'
    },
    {
      name: 'Jimmy Kagoni',
      title: 'Secretary to the Board',
      image: '/images/board/jimmy-kagoni.png',
      about: 'Jimmy Kagoni is a thought leader in building Africa Home grown solutions.He posses great innovative and analytical skills that enables him to build block by block design thinking strategies.',
      careerHistory: 'As a former Investment Banker with a Bachelor of Commerce in Finance and pursuing a Masters of business Administration at Strathmore University. He has served as an Investment Banker, Portfolio Manager and Investments Advisor with some of the leading investment banks as well as Stockbridge Investments where he managed Billions of shillings worth of portfolio with clear growth trajectory'
    },
    {
      name: 'Innocent Ongeri',
      title: 'Technical Committee',
      image: '/images/board/innocent_ongeri.png',
      about: 'Innocent Ongeri brings over five years of expertise in project management and architecture, with a strong focus on client satisfaction and practical design solutions.',
      careerHistory: 'With a proven track record of successfully managing large-scale construction projects, Innocent has consistently delivered projects with high standards of quality, efficiency, and precision. His expertise lies in coordinating technical teams, overseeing project execution, and ensuring alignment with client expectations. He plays a vital role in turning concepts into well-executed, lasting structures.'
    }
  ];

  const handleMemberClick = (member: BoardMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

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

      {/* Board Members Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-center mb-12">
                <h2 className="site-title text-primary">Board Members</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {boardMembers.map((member, idx) => (
              <div 
                key={idx}
                className="text-center bg-gray-50 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
                onClick={() => handleMemberClick(member)}
              >
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="128px"
                    loading={idx < 4 ? undefined : 'lazy'}
                    priority={idx < 4}
                    quality={85}
                  />
                </div>
                <h4 className="text-xl font-bold text-primary mb-2">{member.name}</h4>
                <p className="text-secondary font-semibold">{member.title}</p>
                <div className="mt-3 text-sm text-gray-500">
                  Click to learn more
                </div>
              </div>
            ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <MediaSidebar />
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

      {/* Board Member Modal */}
      <BoardMemberModal
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <Footer />
    </main>
  );
};

export default TeamPage;
