// 1. Coordonnées de départ (Lévis)
const LEVIS = { lat: 46.8021, lng: -71.1753, name: "Siège - Lévis, QC" };

// 2. Exemple de destinations (ex: expéditions de motocross)
const destinations = [
    { lat: 43.6532, lng: -79.3832, name: "Toronto, ON" },
    { lat: 49.2827, lng: -123.1207, name: "Vancouver, BC" },
    { lat: 40.7128, lng: -74.0060, name: "New York, NY" },
    { lat: 25.7617, lng: -80.1918, name: "Miami, FL" },
    { lat: 34.0522, lng: -118.2437, name: "Los Angeles, CA" }
];

// 3. Préparation des arcs (vert néon vers vert foncé)
const arcsData = destinations.map(dest => ({
    startLat: LEVIS.lat,
    startLng: LEVIS.lng,
    endLat: dest.lat,
    endLng: dest.lng,
    color: ['#36f4a4', '#11352d'] 
}));

// 4. Préparation des points d'intérêt
const pointsData = [LEVIS, ...destinations].map(city => ({
    lat: city.lat,
    lng: city.lng,
    size: city.name.includes("Lévis") ? 1.5 : 0.5,
    color: city.name.includes("Lévis") ? '#ffffff' : '#36f4a4',
    label: city.name
}));

// 5. Initialisation du Globe
const myGlobe = Globe()
    (document.getElementById('globe-container'))
    
    // Chemin local vers l'image téléchargée
    .globeImageUrl('./assets/world-map.webp')
    
    .backgroundColor('rgba(0,0,0,0)')
    
    // Points
    .pointsData(pointsData)
    .pointAltitude(0.01)
    .pointColor('color')
    .pointRadius('size')
    .pointResolution(32)

    // Arcs
    .arcsData(arcsData)
    .arcColor('color')
    .arcDashLength(0.4)
    .arcDashGap(0.2)
    .arcDashInitialGap(() => Math.random()) 
    .arcDashAnimateTime(2000)
    .arcStroke(0.6);

// 6. Matériau Three.js pour le look sombre/vert
const globeMaterial = myGlobe.globeMaterial();
globeMaterial.color.set('#0a1914'); 
globeMaterial.emissive.set('#11352d');
globeMaterial.emissiveIntensity = 0.5;
globeMaterial.shininess = 0.7;

// 7. Caméra & Rotation
myGlobe.pointOfView({ lat: 40.0, lng: -95.0, altitude: 2.2 }, 1000);
myGlobe.controls().autoRotate = true;
myGlobe.controls().autoRotateSpeed = 0.8;