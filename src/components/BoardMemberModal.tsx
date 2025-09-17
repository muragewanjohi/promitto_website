import React from 'react';
import Image from 'next/image';

interface BoardMember {
  name: string;
  title: string;
  image: string;
  about: string;
  careerHistory: string;
}

interface BoardMemberModalProps {
  member: BoardMember | null;
  isOpen: boolean;
  onClose: () => void;
}

const BoardMemberModal: React.FC<BoardMemberModalProps> = ({ member, isOpen, onClose }) => {
  if (!isOpen || !member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary p-8 text-white rounded-t-2xl">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white/30 flex-shrink-0">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2">{member.name}</h2>
              <p className="text-lg opacity-90">{member.title}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-3 flex items-center">
              <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
              About
            </h3>
            <p className="text-gray-700 leading-relaxed">{member.about}</p>
          </div>

          {/* Career History Section */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-3 flex items-center">
              <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
              Career History
            </h3>
            <p className="text-gray-700 leading-relaxed">{member.careerHistory}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 rounded-b-2xl">
          <button
            onClick={onClose}
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardMemberModal;
