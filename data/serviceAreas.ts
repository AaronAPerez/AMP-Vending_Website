// export interface ServiceLocation {
//     lng: number | (() => number);
//     lat: number | (() => number);
//     id: string;
//     name: string;
//     county: string;
//     coordinates: {
//       lat: number;
//       lng: number;
//     };
//     radius: number; // in miles
//     description: string;
//   }
  
//   export const serviceLocations: ServiceLocation[] = [
//     {
//       id: 'modesto',
//       name: 'Modesto',
//       county: 'Stanislaus',
//       coordinates: { lat: 37.6393, lng: -120.9970 },
//       radius: 15,
//       description: 'Primary service hub covering Modesto and immediate surroundings'
//     },
//     {
//       id: 'stockton',
//       name: 'Stockton',
//       county: 'San Joaquin',
//       coordinates: { lat: 37.9577, lng: -121.2908 },
//       radius: 15,
//       description: 'Servicing Stockton metropolitan area'
//     },
//     {
//       id: 'tracy',
//       name: 'Tracy',
//       county: 'San Joaquin',
//       coordinates: { lat: 37.7397, lng: -121.4252 },
//       radius: 10,
//       description: 'Serving Tracy and surrounding communities'
//     },
//     {
//       id: 'turlock',
//       name: 'Turlock',
//       county: 'Stanislaus',
//       coordinates: { lat: 37.4946, lng: -120.8465 },
//       radius: 10,
//       description: 'Covering Turlock area businesses'
//     },
//     {
//       id: 'merced',
//       name: 'Merced',
//       county: 'Merced',
//       coordinates: { lat: 37.3022, lng: -120.4829 },
//       radius: 12,
//       description: 'Serving the Merced region'
//     },
//     {
//       id: 'manteca',
//       name: 'Manteca',
//       county: 'San Joaquin',
//       coordinates: { lat: 37.7983, lng: -121.2163 },
//       radius: 8,
//       description: 'Coverage for Manteca businesses'
//     },
//     {
//       id: 'lodi',
//       name: 'Lodi',
//       county: 'San Joaquin',
//       coordinates: { lat: 38.1302, lng: -121.2724 },
//       radius: 10,
//       description: 'Service area including Lodi and vicinity'
//     }
//   ];
  
//   export const counties = Array.from(new Set(serviceLocations.map(loc => loc.county)));