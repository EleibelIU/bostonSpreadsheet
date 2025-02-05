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
    // The Palladium coordinates
    const palladiumCoords = [42.2634, -71.8022];

    const map = L.map('map').setView(palladiumCoords, 10);

    // CartoDB Dark Matter theme - no API key required
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
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