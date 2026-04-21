import {
  Dumbbell,
  ShieldCheck,
  ParkingCircle,
  ArrowUpDown,
  BatteryCharging,
  Waves,
  Trees,
  Wifi,
} from 'lucide-react';

const amenities = [
  {
    title: 'Fully Equipped Gym',
    description: 'State-of-the-art fitness center with steam room',
    icon: Dumbbell,
  },
  {
    title: '24/7 Security',
    description: 'Round-the-clock security with CCTV surveillance',
    icon: ShieldCheck,
  },
  {
    title: 'Secure Parking',
    description: 'Ample basement and visitor parking spaces',
    icon: ParkingCircle,
  },
  {
    title: 'High-Speed Lifts',
    description: 'Modern elevators for quick access',
    icon: ArrowUpDown,
  },
  {
    title: 'Backup Power',
    description: '24/7 power backup for uninterrupted living',
    icon: BatteryCharging,
  },
  {
    title: 'Water Backup',
    description: 'Continuous water supply with borehole',
    icon: Waves,
  },
  {
    title: 'Landscaped Gardens',
    description: 'Beautiful green spaces for relaxation',
    icon: Trees,
  },
  {
    title: 'High-Speed Internet',
    description: 'Fiber optic ready throughout the building',
    icon: Wifi,
  },
];

export default function RoyalHeightsAmenitiesSection() {
  return (
    <section id="apartments" className="py-16 bg-gradient-to-br from-primary/5 via-white to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="uppercase tracking-[0.2em] text-xs font-semibold text-secondary">Premium Amenities</p>
          <h2 className="site-title mt-3 text-gray-900">Unmatched Luxury & Comfort</h2>
          <p className="mt-4 text-gray-600">Experience world-class amenities designed for your ultimate comfort</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {amenities.map((amenity) => {
            const Icon = amenity.icon;
            return (
              <article
                key={amenity.title}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-3xl font-semibold text-gray-900">{amenity.title}</h3>
                <p className="mt-2 text-gray-500 leading-6">{amenity.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
