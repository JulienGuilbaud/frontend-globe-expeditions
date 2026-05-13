// 1. Coordonnées de départ (Mic Performance - Lévis)
const LEVIS = { lat: 46.8021, lng: -71.1753, name: "Siège - Lévis, QC" };

// 2. Destinations réelles de tes expéditions
const destinations = [
    { lat: 43.6532, lng: -79.3832, name: "Toronto, ON" },
    { lat: 49.2827, lng: -123.1207, name: "Vancouver, BC" },
    { lat: 40.7128, lng: -74.0060, name: "New York, NY" },
    { lat: 25.7617, lng: -80.1918, name: "Miami, FL" },
    { lat: 34.0522, lng: -118.2437, name: "Los Angeles, CA" },
    { lat: 51.0447, lng: -114.0719, name: "Calgary, AB" }
];

// 3. Génération de villes en arrière-plan (FINI LES VILLES DANS L'OCÉAN !)

// Tableau de vraies coordonnées de villes mondiales majeures [Lat, Lng]
const realWorldCities = [
    // Amérique du Nord
    [40.71, -74.00], [34.05, -118.24], [41.87, -87.62], [29.76, -95.36], [39.95, -75.16], [37.77, -122.41], [25.76, -80.19],
    [45.42, -75.69], [43.65, -79.38], [49.28, -123.12], [51.04, -114.07], [19.43, -99.13], [20.65, -103.34],
    // Europe
    [51.50, -0.12], [48.85, 2.35], [52.52, 13.40], [41.90, 12.49], [40.41, -3.70], [55.75, 37.61], [48.20, 16.37],
    [59.32, 18.06], [50.85, 4.35], [47.37, 8.54], [52.36, 4.90], [38.72, -9.13], [41.38, 2.15],
    // Asie
    [35.68, 139.69], [31.23, 121.47], [39.90, 116.40], [28.61, 77.20], [1.35, 103.81], [13.75, 100.50], [37.56, 126.97],
    [22.31, 114.16], [25.20, 55.27], [19.07, 72.87], [14.59, 120.98], [3.13, 101.68], [32.08, 34.78],
    // Amérique du Sud
    [-23.55, -46.63], [-34.60, -58.38], [-22.90, -43.20], [-12.04, -77.02], [-4.71, -74.07], [-33.44, -70.66],
    // Afrique
    [30.04, 31.23], [-26.20, 28.04], [6.52, 3.37], [-33.92, 18.42], [14.69, -17.44], [-1.29, 36.82], [33.57, -7.58],
    // Océanie
    [-33.86, 151.20], [-37.81, 144.96], [-27.46, 153.02], [-31.95, 115.86], [-36.84, 174.76], [-41.28, 174.77]
];

// On transforme ces vraies coordonnées en points pour le globe
const backgroundCities = realWorldCities.map(coords => ({
    lat: coords[0] + (Math.random() * 2 - 1), // Petit décalage aléatoire pour étaler les points
    lng: coords[1] + (Math.random() * 2 - 1), // autour de la zone de la ville
    size: Math.random() * 0.3 + 0.1,
    color: '#ffb670' // Couleur orange/or chaleureuse
}));

// On combine les fausses villes avec tes vraies destinations
const pointsData = [
    ...backgroundCities,
    ...destinations.map(dest => ({ lat: dest.lat, lng: dest.lng, size: 0.5, color: '#ffffff' })),
    { lat: LEVIS.lat, lng: LEVIS.lng, size: 1.2, color: '#ffffff' } // Lévis en gros et blanc
];

// 4. Préparation des arcs (Arcs blancs lumineux)
const arcsData = destinations.map(dest => ({
    startLat: LEVIS.lat,
    startLng: LEVIS.lng,
    endLat: dest.lat,
    endLng: dest.lng,
    color: ['#ffffff', '#ffffff'] // Blanc pur
}));

// 5. Initialisation du Globe
const myGlobe = Globe()
    (document.getElementById('globe-container'))
    
    // On utilise une texture sombre de haute qualité pour la Terre
    .globeImageUrl('assets/world-map.jpeg')
    
    
    .backgroundColor('#051014') // Fond très sombre (presque noir)
    
    // L'atmosphère (le halo autour de la planète)
    .showAtmosphere(true)
    .atmosphereColor('#2a9d8f') // Halo bleu/teal
    .atmosphereAltitude(0.35)
    
    // Configuration des Points
    .pointsData(pointsData)
    .pointAltitude(0.01)
    .pointColor('color')
    .pointRadius('size')
    .pointResolution(32)

    // Configuration des Arcs
    .arcsData(arcsData)
    .arcColor('color')
    .arcDashLength(0.4)
    .arcDashGap(0.2)
    .arcDashInitialGap(() => Math.random()) 
    .arcDashAnimateTime(2000)
    .arcStroke(0.5);

// 6. Matériau Three.js pour le look Océan Bleu/Teal
const globeMaterial = myGlobe.globeMaterial();
globeMaterial.color.set('#0d3b44'); // Teinte bleu/teal profonde
globeMaterial.emissive.set('#001111');
globeMaterial.emissiveIntensity = 0.2;
globeMaterial.shininess = 0.9;

// 7. Caméra & Rotation
myGlobe.pointOfView({ lat: 40.0, lng: -95.0, altitude: 2.2 }, 1000);
myGlobe.controls().autoRotate = true;
myGlobe.controls().autoRotateSpeed = 0.6;