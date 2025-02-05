// map.js
class MapManager {
    constructor() {
        this.map = null;
        this.markers = [];
        this.palladiumCoords = [42.2634, -71.8022];
    }

    getColorForRating(rating) {
        // Color scale from red (1) to green (5)
        const colors = {
            1: '#ff4444',
            2: '#ffaa33',
            3: '#ffdd33',
            4: '#99cc00',
            5: '#44bb44'
        };
        return colors[rating] || '#gray';
    }

    initialize() {
        this.map = L.map('map').setView(this.palladiumCoords, 11);
        
        // Use OpenStreetMap tiles with dark theme
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19,
            className: 'dark-themed-map' // This class will be affected by our CSS filters
        }).addTo(this.map);

        // Add Palladium marker
        const venueIcon = L.divIcon({
            html: '<div style="width: 32px; height: 32px; border-radius: 50%; overflow: hidden; border: 2px solid #fff;"><img src="/assets/tarcil.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div>',
            className: 'venue-marker',
            iconSize: [32, 32],
            iconAnchor: [16, 16]
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
            
            // Create circle marker
            const marker = L.circleMarker([lat, lng], {
                radius: 10,
                fillColor: this.getColorForRating(listing.Viability),
                color: '#ffffff',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.8
            })
            .bindPopup(`
                <strong>${listing["Name "]}</strong><br>
                ${listing.Location}<br>
                ${listing["Cost/Person (ENTIRE TRIP)"]} per person<br>
                Rating: ${listing.Viability}/5
            `)
            .addTo(this.map);
            
            // Add hover effect
            marker.on('mouseover', function() {
                this.setStyle({
                    radius: 12,
                    fillOpacity: 1
                });
            });
            
            marker.on('mouseout', function() {
                this.setStyle({
                    radius: 10,
                    fillOpacity: 0.8
                });
            });
            
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