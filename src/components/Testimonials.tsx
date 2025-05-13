import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Irene Krauser',
      role: 'Rental Units Client',
      quote: 'I\'m very happy because this is not what I expected; I never thought I could get help like this with my construction. I was stranded, with lots of thoughts on how to do my rentals, but when I discovered Promitto, it was like they were God sent to help me.',
    },
    {
      id: 2,
      name: 'Lydia Ngugi',
      role: 'Residential House Client',
      quote: 'I got exactly what I had asked Promitto to build for me: a beautiful 4-bedroom mansion within the agreed time. They also did some extra landscaping finishes from their pocket. They are the best partners to engage in hassle-free construction.',
    },
    {
      id: 3,
      name: 'George Muroki',
      role: 'Residential House Client',
      quote: 'As you handover my house, we are going to broadcast that so that those who are in doubts, wherever they are, will not be in doubts anymore, and I believe I have convincing evidence that you are doing a good job and you will do a good job to many people who have cried over and over.',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-600">Hear from our satisfied customers about their experience with Promitto</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[#1E40AF] flex items-center justify-center mr-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-[#F59E0B]">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              <div className="mt-4 flex text-[#F59E0B]">
                <span className="text-sm font-medium">Excellent</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 