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

// 3. Génération de villes en arrière-plan pour l'effet visuel (Points oranges)
const backgroundCities = [...Array(300).keys()].map(() => ({
    lat: (Math.random() - 0.5) * 140, // Limite un peu pour éviter les pôles
    lng: (Math.random() - 0.5) * 360,
    size: Math.random() * 0.3 + 0.1,
    color: '#ffb670' // Couleur orange/or chaleureuse comme sur ton image
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
    .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
    
    .backgroundColor('#051014') // Fond très sombre (presque noir)
    
    // L'atmosphère (le halo autour de la planète)
    .showAtmosphere(true)
    .atmosphereColor('#2a9d8f') // Halo bleu/teal
    .atmosphereAltitude(0.15)
    
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