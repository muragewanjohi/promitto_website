import Image from 'next/image';

const units = [
  {
    name: '1 Bedroom Apartment',
    price: 'KES 4.5M',
    badge: 'Best Value',
    image: '/4brm/4br_standard_flat_roof_2.png',
    details: ['1 Bedroom', '1 Bathroom', '650 sqft'],
    description:
      'Spacious 1-bedroom apartment with modern kitchen and quality finishes. Perfect for individuals and couples.',
  },
  {
    name: '2 Bedroom Apartment',
    price: 'KES 8.5M',
    badge: 'Popular',
    image: '/house_designs/3BR FLAT ROOF MANSIONETTE/3BR FLAT ROOF PRODUCT (1)._3 - Photo.webp',
    details: ['2 Beds', '2 Baths', '1,050 sqft'],
    description:
      'Elegant 2-bedroom apartment featuring open-plan living, premium finishes, and practical storage spaces.',
  },
  {
    name: '3 Bedroom Apartment',
    price: 'KES 13M',
    badge: 'Family Choice',
    image: '/hero-house.jpg',
    details: ['3 Beds', '3 Baths', '1,550 sqft'],
    description:
      'Spacious 3-bedroom family apartment with ensuite master, large living areas, and premium finishing.',
  },
  {
    name: 'Studio Apartment',
    price: 'KES 3.2M',
    badge: 'Starter',
    image: '/hero-house.jpg',
    details: ['Studio', '1 Bathroom', '480 sqft'],
    description:
      'Compact and efficient studio unit ideal for first-time homeowners and investors.',
  },
  {
    name: '2 Bedroom Superior',
    price: 'KES 9.8M',
    badge: 'Premium',
    image: '/4brm/4br_standard_flat_roof_2.png',
    details: ['2 Beds', '2 Baths', '1,220 sqft'],
    description:
      'Enhanced 2-bedroom layout with larger living spaces, premium finishes, and balcony views.',
  },
  {
    name: '3 Bedroom Penthouse',
    price: 'KES 16.5M',
    badge: 'Signature',
    image: '/house_designs/3BR FLAT ROOF MANSIONETTE/3BR FLAT ROOF PRODUCT (1)._3 - Photo.webp',
    details: ['3 Beds', '3 Baths', '1,900 sqft'],
    description:
      'Top-floor 3-bedroom penthouse with expansive spaces and elevated views for modern family living.',
  },
];

const WHATSAPP_NUMBER = '254729506506';
const EMAIL_RECIPIENT = 'info@promittoltd.com';

export default function RoyalHeightsUnitsSection() {
  return (
    <section id="units" className="py-16 bg-gradient-to-br from-primary/5 via-white to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="uppercase tracking-[0.2em] text-xs font-semibold text-secondary">Our Premium Units</p>
          <h2 className="site-title mt-3 text-gray-900">Choose Your Perfect Home</h2>
          <p className="mt-4 text-gray-600">Select from our range of thoughtfully designed apartments</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {units.map((unit) => (
            (() => {
              const message = `Hello, I'm interested in the ${unit.name} at Royal Heights Sukari (${unit.price}). Please share more details.`;
              const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
              const emailHref = `mailto:${EMAIL_RECIPIENT}?subject=${encodeURIComponent(`Inquiry: ${unit.name} at Royal Heights Sukari`)}&body=${encodeURIComponent(message)}`;

              return (
            <article key={unit.name} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
              <div className="relative h-52">
                <Image src={unit.image} alt={unit.name} fill className="object-cover" />
                <span className="absolute top-3 left-3 rounded-full bg-secondary text-white text-xs px-3 py-1 font-semibold">
                  {unit.badge}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-3xl font-semibold text-gray-900">{unit.name}</h3>
                <p className="text-4xl text-secondary font-bold mt-2">{unit.price}</p>

                <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-500 border-t border-gray-200 pt-4">
                  {unit.details.map((detail) => (
                    <span key={detail}>{detail}</span>
                  ))}
                </div>

                <p className="mt-4 text-gray-600 leading-7">{unit.description}</p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 transition-colors"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={emailHref}
                    className="inline-flex items-center justify-center rounded-full bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 transition-colors"
                  >
                    Email
                  </a>
                </div>
              </div>
            </article>
              );
            })()
          ))}
        </div>
      </div>
    </section>
  );
}
