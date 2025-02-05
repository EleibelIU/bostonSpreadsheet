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
        // Initialize map with dark mode style
        this.map = L.map('map').setView(this.palladiumCoords, 11);
        
        // Add dark mode tiles
        L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
            maxZoom: 20,
            attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
        }).addTo(this.map);

        // Create custom icon for Palladium using the tarcil image
        const venueIcon = L.divIcon({
            html: '<img src="/assets/tarcil.jpg" style="width: 32px; height: 32px; border-radius: 50%; border: 2px solid #fff;">',
            className: 'venue-marker',
            iconSize: [36, 36],
            iconAnchor: [18, 18]
        });

        // Add Palladium marker
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
            
            // Create circle marker with color based on viability rating
            const marker = L.circleMarker([lat, lng], {
                radius: 12,
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
                    radius: 15,
                    fillOpacity: 1
                });
            });
            
            marker.on('mouseout', function() {
                this.setStyle({
                    radius: 12,
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