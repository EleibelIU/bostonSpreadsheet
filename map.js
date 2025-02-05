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
        return colors[rating] || '#808080';
    }

    initialize() {
        // Initialize map with dark mode style from CartoDB
        this.map = L.map('map').setView(this.palladiumCoords, 11);
        
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '©OpenStreetMap, ©CartoDB',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(this.map);

        // Add Palladium marker
        const venueIcon = L.divIcon({
            html: '<div style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden; border: 3px solid #fff; box-shadow: 0 0 10px rgba(0,0,0,0.5);"><img src="/assets/tarcil.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div>',
            className: 'venue-marker',
            iconSize: [40, 40],
            iconAnchor: [20, 20]
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
            // Create marker with random offset (but ensure they're all visible)
            const offsetLat = (Math.random() - 0.5) * 0.08;
            const offsetLng = (Math.random() - 0.5) * 0.08;
            const lat = this.palladiumCoords[0] + offsetLat;
            const lng = this.palladiumCoords[1] + offsetLng;
            
            // Create circle marker
            const marker = L.circleMarker([lat, lng], {
                radius: 8,
                fillColor: this.getColorForRating(listing.Viability),
                color: '#ffffff',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.8
            })
            .bindPopup(`
                <div style="color: #333;">
                    <strong>${listing["Name "]}</strong><br>
                    ${listing.Location}<br>
                    ${listing["Cost/Person (ENTIRE TRIP)"]} per person<br>
                    Rating: ${listing.Viability}/5
                </div>
            `)
            .addTo(this.map);
            
            // Add hover effect
            marker.on('mouseover', function() {
                this.setStyle({
                    radius: 10,
                    fillOpacity: 1,
                    weight: 3
                });
                this.bringToFront();
            });
            
            marker.on('mouseout', function() {
                this.setStyle({
                    radius: 8,
                    fillOpacity: 0.8,
                    weight: 2
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
    window.mapManager = mapManager;
});