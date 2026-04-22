const lifeItems = [
  {
    title: 'Flexible, Contemporary Spaces',
    description:
      'Offering residents an active lifestyle, a strong sense of community and neighborliness in daily living.',
  },
  {
    title: 'Well-Developed Infrastructure',
    description:
      'A wide boulevard network with thoughtful pedestrian paths, greenery buffers, and practical access planning.',
  },
  {
    title: 'Nature-Inspired Design',
    description:
      'Homes that blend seamlessly with natural surroundings, featuring efficient layouts and open visual flow.',
  },
  {
    title: 'Expansive Green Spaces',
    description:
      'Lush parks, nature walkways, and tree-lined boulevards providing opportunities for relaxation and recreation.',
  },
  {
    title: 'Sports & Recreational Facilities',
    description:
      'Access to modern recreational facilities and active-lifestyle spaces within and around the development.',
  },
  {
    title: 'World-Class Amenities',
    description:
      'High-standard resident amenities designed to support convenience, comfort, and community events.',
  },
];

export default function RoyalHeightsLifeSection() {
  return (
    <section
      className="py-16 lg:py-20 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "linear-gradient(rgba(250,250,250,0.92), rgba(250,250,250,0.92)), url('/hierarchical-structure_1042060.png')",
      }}
    >
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8 lg:mb-10">
          <span className="text-secondary mr-3 text-base">••</span>
          <h2 className="text-[26px] sm:text-[30px] lg:text-[34px] font-medium tracking-wide text-gray-900">
            LIFE AT ROYAL HEIGHTS RESIDENCES
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {lifeItems.map((item) => (
            <article
              key={item.title}
              className="group bg-white/95 border border-gray-200 px-6 py-6 min-h-[170px] lg:min-h-[182px] transition-all duration-300 hover:bg-primary hover:text-white"
            >
              <h3 className="text-[16px] uppercase tracking-wide font-medium text-gray-900 mb-3 transition-colors duration-300 group-hover:text-white">
                {item.title}
              </h3>
              <p className="text-sm leading-7 text-gray-600 transition-colors duration-300 group-hover:text-white/90 max-w-[95%]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
