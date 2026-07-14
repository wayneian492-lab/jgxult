/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Garage {
  id: string;
  name: string;
  location: string;
  city: 'Nairobi' | 'Mombasa' | 'Kisumu' | 'Nakuru' | 'Eldoret';
  rating: number;
  reviewsCount: number;
  services: string[];
  isVerified: boolean;
  phone: string;
  distance: string;
  address: string;
  latitude: number; // For plotting on a clean map canvas
  longitude: number; // For plotting on a clean map canvas
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  role: string;
  avatarSeed: string;
  avatarUrl?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  iconName: string;
  popular: boolean;
}

export interface PricingEstimate {
  id: string;
  serviceName: string;
  carType: string;
  minPrice: number;
  maxPrice: number;
  duration: string;
  recommendation: string;
}

export const KENYAN_CITIES = ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'] as const;

export const POPULAR_SERVICES: ServiceItem[] = [
  {
    id: 'mech',
    name: 'General Mechanics',
    description: 'Engine tune-ups, oil change, brake adjustments, and general mechanical repairs.',
    iconName: 'Wrench',
    popular: true,
  },
  {
    id: 'roadside',
    name: 'Roadside Assistance',
    description: '24/7 emergency response for dead batteries, flat tires, and running out of fuel.',
    iconName: 'ShieldAlert',
    popular: true,
  },
  {
    id: 'towing',
    name: 'Professional Towing',
    description: 'Safe flatbed towing of broken down or accident vehicles to your preferred garage.',
    iconName: 'Truck',
    popular: true,
  },
  {
    id: 'diag',
    name: 'Computer Diagnostics',
    description: 'Advanced OBD-II scanning to trace electrical faults and check engine warnings.',
    iconName: 'Activity',
    popular: false,
  },
  {
    id: 'parts',
    name: 'Genuine Spare Parts',
    description: 'Verified dealers offering original OEM parts with manufacturer warranty.',
    iconName: 'Cpu',
    popular: true,
  },
  {
    id: 'tyres',
    name: 'Tyre & Battery Center',
    description: 'Wheel alignment, tyre balancing, battery replacement, and pressure checks.',
    iconName: 'Disc',
    popular: false,
  },
  {
    id: 'wash',
    name: 'Premium Car Wash',
    description: 'Thorough interior and exterior auto-detailing, vacuuming, and body waxing.',
    iconName: 'Droplets',
    popular: false,
  },
  {
    id: 'insurance',
    name: 'Motor Insurance',
    description: 'Compare comprehensive policies and process instant certificates.',
    iconName: 'FileText',
    popular: false,
  },
];

export const MOCK_GARAGES: Garage[] = [
  {
    id: 'g1',
    name: 'Apex Auto Care Westlands',
    location: 'Mvuli Road, Westlands',
    city: 'Nairobi',
    rating: 4.9,
    reviewsCount: 184,
    services: ['General Mechanics', 'Computer Diagnostics', 'Tyre & Battery Center'],
    isVerified: true,
    phone: '+254 712 345 678',
    distance: '1.2 km away',
    address: 'Plot 45, Mvuli Road, Westlands, Nairobi',
    latitude: -1.2635,
    longitude: 36.8041,
  },
  {
    id: 'g2',
    name: 'Kilimani Elite Garages',
    location: 'Chania Avenue, Kilimani',
    city: 'Nairobi',
    rating: 4.8,
    reviewsCount: 142,
    services: ['General Mechanics', 'Computer Diagnostics', 'Premium Car Wash'],
    isVerified: true,
    phone: '+254 722 987 654',
    distance: '3.4 km away',
    address: 'Chania Ave, Off Ring Road Kilimani, Nairobi',
    latitude: -1.2915,
    longitude: 36.7972,
  },
  {
    id: 'g3',
    name: 'Nairobi Auto Experts',
    location: 'Commercial Street, Industrial Area',
    city: 'Nairobi',
    rating: 4.7,
    reviewsCount: 310,
    services: ['General Mechanics', 'Professional Towing', 'Genuine Spare Parts'],
    isVerified: true,
    phone: '+254 733 555 111',
    distance: '5.8 km away',
    address: 'Commercial Street, Block G, Industrial Area, Nairobi',
    latitude: -1.3061,
    longitude: 36.8398,
  },
  {
    id: 'g4',
    name: 'Karen Luxury Autos',
    location: 'Ngong Road, Karen',
    city: 'Nairobi',
    rating: 4.9,
    reviewsCount: 89,
    services: ['Computer Diagnostics', 'Genuine Spare Parts', 'Motor Insurance'],
    isVerified: true,
    phone: '+254 711 222 333',
    distance: '9.1 km away',
    address: 'Karen Triangle Mall, Ngong Road, Karen',
    latitude: -1.3204,
    longitude: 36.7042,
  },
  {
    id: 'g5',
    name: 'Coastal Car Masters Nyali',
    location: 'Links Road, Nyali',
    city: 'Mombasa',
    rating: 4.8,
    reviewsCount: 115,
    services: ['General Mechanics', 'Tyre & Battery Center', 'Premium Car Wash'],
    isVerified: true,
    phone: '+254 701 444 888',
    distance: '2.1 km away',
    address: 'Opposite Nyali Plaza, Links Road, Mombasa',
    latitude: -4.0298,
    longitude: 39.7045,
  },
  {
    id: 'g6',
    name: 'Ganjoni Towing & Auto repairs',
    location: 'Archbishop Makarios Road, Ganjoni',
    city: 'Mombasa',
    rating: 4.6,
    reviewsCount: 76,
    services: ['Professional Towing', 'Roadside Assistance', 'General Mechanics'],
    isVerified: true,
    phone: '+254 724 666 999',
    distance: '4.5 km away',
    address: 'Archbishop Makarios Rd, Ganjoni, Mombasa',
    latitude: -4.0672,
    longitude: 39.6644,
  },
  {
    id: 'g7',
    name: 'Victoria Auto Works Kisumu',
    location: 'Milimani Estate, Kisumu',
    city: 'Kisumu',
    rating: 4.9,
    reviewsCount: 94,
    services: ['General Mechanics', 'Computer Diagnostics', 'Roadside Assistance'],
    isVerified: true,
    phone: '+254 732 121 212',
    distance: '1.8 km away',
    address: 'Milimani Road, Behind Kisumu State House, Kisumu',
    latitude: -0.1082,
    longitude: 34.7505,
  },
  {
    id: 'g8',
    name: 'Rift Valley Garage Nakuru',
    location: 'Geoffrey Kamau Way, CBD',
    city: 'Nakuru',
    rating: 4.7,
    reviewsCount: 128,
    services: ['General Mechanics', 'Genuine Spare Parts', 'Tyre & Battery Center'],
    isVerified: true,
    phone: '+254 715 909 090',
    distance: '0.9 km away',
    address: 'Geoffrey Kamau Way, Near Nakuru Athletics Club, Nakuru',
    latitude: -0.2872,
    longitude: 36.0622,
  },
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Jane Wambui',
    location: 'Nairobi',
    role: 'Subaru Forester Owner',
    text: 'My check engine light was on for weeks and two garages couldn\'t fix it. Found Apex Auto Care on mCarFix—they diagnosed and fixed a faulty oxygen sensor within 2 hours. Professional and transparent!',
    rating: 5,
    avatarSeed: 'jane',
    avatarUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=120&h=120&crop=faces',
  },
  {
    id: 't2',
    name: 'Brian Kiprop',
    location: 'Mombasa',
    role: 'Toyota Fielder Owner',
    text: 'I was skeptical about finding genuine brake pads in Nyali, but mCarFix connected me with a certified parts dealer who delivered right to my garage. Saved me at least KES 4,000!',
    rating: 5,
    avatarSeed: 'brian',
    avatarUrl: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80&w=120&h=120&crop=faces',
  },
  {
    id: 't3',
    name: 'Dennis Ochieng',
    location: 'Kisumu',
    role: 'Mazda Demio Owner',
    text: 'Got a puncture and dead battery near Kisian late at night. Requested roadside assistance on the mCarFix app—the response team arrived with a jumpstarter and tyre jack in 25 minutes. Lifesavers!',
    rating: 5,
    avatarSeed: 'dennis',
    avatarUrl: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&q=80&w=120&h=120&crop=faces',
  },
  {
    id: 't4',
    name: 'Mercy Cherotich',
    location: 'Nakuru',
    role: 'Nissan X-Trail Owner',
    text: 'I love the cost estimator tool! Now I can check approximately how much a suspension service costs in Nakuru before driving to the garage. No more being overcharged.',
    rating: 4.8,
    avatarSeed: 'mercy',
    avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=120&h=120&crop=faces',
  },
];

export const DIAGNOSTIC_DECISION_TREE = [
  {
    id: 'd1',
    symptom: 'Squeaking / grinding sound when braking',
    diagnosis: 'Worn-out brake pads or brake rotor scoring.',
    urgency: 'High - Neglecting can lead to brake failure or expensive rotor damage.',
    estCostRange: 'KES 3,500 - KES 8,000',
    iconName: 'Disc',
  },
  {
    id: 'd2',
    symptom: 'Engine crank but won\'t start',
    diagnosis: 'Dead or weak 12V battery, faulty starter motor, or fuel pump issue.',
    urgency: 'Medium - Requires a jumpstart or professional inspection.',
    estCostRange: 'KES 6,500 - KES 15,000 (Battery or Starter)',
    iconName: 'Zap',
  },
  {
    id: 'd3',
    symptom: 'Heavy white smoke from exhaust',
    diagnosis: 'Coolant leaking into the engine combustion chamber, likely a blown head gasket.',
    urgency: 'Critical - Do not drive the vehicle. Turn off engine to prevent complete failure.',
    estCostRange: 'KES 25,000 - KES 65,000',
    iconName: 'Flame',
  },
  {
    id: 'd4',
    symptom: 'Car pulling to one side while driving',
    diagnosis: 'Improper wheel alignment, unbalanced tyres, or worn steering suspension bushings.',
    urgency: 'Medium - Causes uneven tyre wear and poor fuel economy over time.',
    estCostRange: 'KES 2,000 - KES 6,000',
    iconName: 'Compass',
  },
  {
    id: 'd5',
    symptom: 'Check Engine light is blinking/flashing',
    diagnosis: 'Severe engine misfire. Fuel is entering the exhaust unburnt, which can melt the catalytic converter.',
    urgency: 'Critical - Pull over safely and call for a flatbed tow immediately.',
    estCostRange: 'Diagnostics: KES 1,500 - Repairs vary',
    iconName: 'Activity',
  },
];

export const MOCK_PRICING_ESTIMATES: PricingEstimate[] = [
  {
    id: 'p1',
    serviceName: 'Full Engine Service (Oil, Spark plugs, Filters)',
    carType: 'Sedan / Hatchback (e.g. Vitz, Demio, Axio)',
    minPrice: 6500,
    maxPrice: 11000,
    duration: '2 - 3 Hours',
    recommendation: 'Recommended every 5,000 km to maintain engine efficiency.',
  },
  {
    id: 'p2',
    serviceName: 'Full Engine Service (Oil, Spark plugs, Filters)',
    carType: 'Mid-size SUV (e.g. Forester, RAV4, X-Trail)',
    minPrice: 10000,
    maxPrice: 16500,
    duration: '3 - 4 Hours',
    recommendation: 'Ensure high quality synthetic 5W-30 or 0W-20 oil is used.',
  },
  {
    id: 'p3',
    serviceName: 'Front Brake Pad Replacement (Genuine Parts)',
    carType: 'All Vehicle Classes',
    minPrice: 4500,
    maxPrice: 9000,
    duration: '1 Hour',
    recommendation: 'Includes cleaning and lubricating calipers. Replace rotors if deeply grooved.',
  },
  {
    id: 'p4',
    serviceName: 'Computerized Wheel Alignment & Balancing',
    carType: 'All Vehicle Classes',
    minPrice: 2500,
    maxPrice: 4500,
    duration: '45 Mins',
    recommendation: 'Highly recommended after hitting deep potholes or every 10,000 km.',
  },
  {
    id: 'p5',
    serviceName: 'Automatic Gearbox Fluid Flush (ATF)',
    carType: 'All Vehicle Classes',
    minPrice: 12000,
    maxPrice: 22000,
    duration: '2 Hours',
    recommendation: 'Replace fluid every 40,000 km to prevent gear slipping and gearbox wear.',
  },
];
