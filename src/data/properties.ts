interface PropertyDetails {
  id: string;
  name: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  description: string;
  features: string[];
  roofType: 'Flatroofed' | 'Pitch Roofed' | 'Hybrid Pitch Roof' | 'Hidden Roof';
  status: 'completed' | 'ongoing';
  type: 'House' | 'Apartment' | 'Villa' | 'Commercial';
}

export const propertyDetails: Record<string, PropertyDetails> = {
  'Agnes': {
    id: 'Agnes',
    name: 'Flat-Roofed 4 Bedroom Mansion',
    location: 'Juja',
    price: '25,000,000',
    bedrooms: 4,
    bathrooms: 3,
    area: '300 sq.m',
    description: 'A stunning modern villa featuring spacious living areas, a gourmet kitchen, and a beautiful garden. Perfect for family living with excellent security and amenities.',
    features: [
      'Modern Kitchen',
      'Garden',
      'Security System',
      'Parking Space',
      'Master En-suite',
      'Swimming Pool'
    ],
    roofType: 'Flatroofed',
    status: 'completed',
    type: 'Villa'
  },
  'LydiaNgugi': {
    id: 'LydiaNgugi',
    name: '4-bedroom mansion',
    location: 'Naivasha',
    price: '45,000,000',
    bedrooms: 5,
    bathrooms: 4,
    area: '450 sq.m',
    description: 'An elegant mansion with luxurious finishes, featuring a grand entrance, spacious rooms, and beautiful landscaping. Includes staff quarters and a large entertainment area.',
    features: [
      'Staff Quarters',
      'Entertainment Area',
      'Landscaped Garden',
      'Double Garage',
      'CCTV System',
      'Solar Water Heating'
    ],
    roofType: 'Pitch Roofed',
    status: 'completed',
    type: 'House'
  },
  'RoseLandis': {
    id: 'RoseLandis',
    name: '3-bedroom Bungalow',
    location: 'Juja',
    price: '35,000,000',
    bedrooms: 4,
    bathrooms: 3,
    area: '350 sq.m',
    description: 'A contemporary estate offering modern luxury living with high-end finishes. Features include a home office, gym, and smart home technology.',
    features: [
      'Smart Home System',
      'Home Office',
      'Private Gym',
      'Walk-in Closets',
      'Outdoor Kitchen',
      'Electric Fence'
    ],
    roofType: 'Hybrid Pitch Roof',
    status: 'ongoing',
    type: 'House'
  },
  'RosemaryMulwa': {
    id: 'RosemaryMulwa',
    name: 'Hybrid 4-Bedroom Mansion',
    location: 'Juja Farm',
    price: '30,000,000',
    bedrooms: 4,
    bathrooms: 3,
    area: '320 sq.m',
    description: 'A beautiful family home with modern amenities and excellent security. Features spacious rooms and a well-designed outdoor space.',
    features: [
      'Modern Design',
      'Family Room',
      'Backup Generator',
      'Security System',
      'Servant Quarter',
      'Balcony Views'
    ],
    roofType: 'Hidden Roof',
    status: 'completed',
    type: 'House'
  },
  'GeorgeKimani': {
    id: 'GeorgeKimani',
    name: '4 bedroomed maisonette',
    location: 'Gatundu',
    price: '40,000,000',
    bedrooms: 5,
    bathrooms: 4,
    area: '400 sq.m',
    description: 'An exquisite villa with premium finishes and modern amenities. Perfect for luxury living with excellent security and privacy.',
    features: [
      'Premium Finishes',
      'Wine Cellar',
      'Home Theater',
      'Infinity Pool',
      'Guest House',
      'Mature Garden'
    ],
    roofType: 'Pitch Roofed',
    status: 'ongoing',
    type: 'Villa'
  },
  'PeterMagondu': {
    id: 'PeterMagondu',
    name: '4 Bedroom Bungalow',
    location: 'Mugutha',
    price: '50,000,000',
    bedrooms: 6,
    bathrooms: 5,
    area: '500 sq.m',
    description: 'A grand estate offering the ultimate in luxury living. Features include high ceilings, premium materials, and extensive outdoor spaces.',
    features: [
      'Grand Entrance',
      'Library',
      'Games Room',
      'Staff Quarters',
      'Multiple Garages',
      'Gazebo'
    ],
    roofType: 'Hybrid Pitch Roof',
    status: 'completed',
    type: 'House'
  },
  'Rahab': {
    id: 'Rahab',
    name: 'Hybrid 4-Bedroom Mansion',
    location: 'Juja',
    price: '28,000,000',
    bedrooms: 4,
    bathrooms: 3,
    area: '280 sq.m',
    description: 'A modern home with contemporary design and excellent amenities. Perfect for urban living with great accessibility.',
    features: [
      'Modern Architecture',
      'Rooftop Terrace',
      'Smart Security',
      'Underground Parking',
      'Gym Room',
      'BBQ Area'
    ],
    roofType: 'Flatroofed',
    status: 'ongoing',
    type: 'House'
  }
}; 