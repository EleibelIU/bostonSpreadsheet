// map.js
class MapManager {
    constructor() {
        this.map = null;
        this.markers = [];
        this.palladiumCoords = [42.2634, -71.8022];
    }

    initialize() {
        this.map = L.map('map').setView(this.palladiumCoords, 11);
        
        // Use OpenStreetMap tiles with dark theme
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19,
            className: 'dark-themed-map' // This class will be affected by our CSS filters
        }).addTo(this.map);

        // Add Palladium marker with custom style
        const venueIcon = L.divIcon({
            html: '🎸',
            className: 'venue-marker',
            iconSize: [24, 24]
        });

        L.marker(this.palladiumCoords, { icon: venueIcon })
            .bindPopup('<strong>The Palladium</strong>')
            .addTo(this.map);
    }

    addListingMarkers(listings) {
        // Clear existing markers
        this.markers.forEach(marker => marker.remove());
        this.markers = [];

        listings.forEach(listing => {
            // Create marker with random offset (you should replace this with actual coordinates)
            const lat = this.palladiumCoords[0] + (Math.random() - 0.5) * 0.1;
            const lng = this.palladiumCoords[1] + (Math.random() - 0.5) * 0.1;
            
            const marker = L.marker([lat, lng])
                .bindPopup(`
                    <strong>${listing["Name "]}</strong><br>
                    ${listing.Location}<br>
                    ${listing["Cost/Person (ENTIRE TRIP)"]} per person
                `)
                .addTo(this.map);
            
            this.markers.push(marker);
        });
    }
}

// Initialize map when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    const mapManager = new MapManager();
    mapManager.initialize();

    // Make mapManager available globally for other scripts
    window.mapManager = mapManager;
});