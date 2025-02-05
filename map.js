// map.js

// Custom icon for the Palladium
const palladiumIcon = L.divIcon({
    className: 'custom-pin',
    html: `<div style="
        background-color: var(--danger);
        width: 25px;
        height: 25px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 2px solid var(--secondary);
        position: relative;
    ">
        <div style="
            content: '';
            width: 8px;
            height: 8px;
            background: var(--secondary);
            position: absolute;
            border-radius: 50%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(45deg);
        "></div>
    </div>`,
    iconSize: [25, 25],
    iconAnchor: [12, 24],
    popupAnchor: [0, -20]
});

// Custom circle icon for listings
const createListingIcon = (color) => {
    return L.divIcon({
        className: 'custom-circle',
        html: `<div style="
            background-color: ${color};
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: 2px solid var(--secondary);
        "></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
        popupAnchor: [0, -8]
    });
};

function initMap() {
    const palladiumCoords = [42.2634, -71.8022];
    const map = L.map('map').setView(palladiumCoords, 10);

    // Stadia.AlidadeSmoothDark theme - no API key required
    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add Palladium marker
    L.marker(palladiumCoords, { icon: palladiumIcon })
        .bindPopup('<strong>The Palladium</strong><br>Worcester Venue')
        .addTo(map);

    return map;
}

function addListingMarkers(map, listings) {
    listings.forEach(listing => {
        if (listing.Coordinates) {
            const markerColor = listing.Viability >= 4 ? 'var(--success)' : 'var(--warning)';
            const listingIcon = createListingIcon(markerColor);

            L.marker(listing.Coordinates, { icon: listingIcon })
                .bindPopup(`
                    <strong>${listing["Name "]}</strong><br>
                    ${listing.Location}<br>
                    ${listing["Cost/Person (ENTIRE TRIP)"]} per person
                `)
                .addTo(map);
        }
    });
}

// Export functions to make them available globally
window.initMap = initMap;
window.addListingMarkers = addListingMarkers;