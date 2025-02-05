// map.js
class MapManager {
    constructor() {
        this.map = null;
        this.markers = [];
        this.palladiumCoords = [42.2634, -71.8022];
        this.setupFullscreenControls();
    }

    initialize() {
        this.map = L.map('map').setView(this.palladiumCoords, 11);
        
        // Use OpenStreetMap tiles with dark theme
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
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

    setupFullscreenControls() {
        const mapContainer = document.querySelector('.map-container');
        const fullscreenButton = document.getElementById('fullscreen-toggle');
        
        if (fullscreenButton) {
            fullscreenButton.addEventListener('click', () => {
                this.toggleFullscreen(mapContainer, fullscreenButton);
            });
        }

        // Handle ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mapContainer.classList.contains('fullscreen')) {
                this.toggleFullscreen(mapContainer, fullscreenButton, false);
            }
        });
    }

    toggleFullscreen(container, button, force = null) {
        const setFullscreen = force !== null ? force : !container.classList.contains('fullscreen');
        container.classList.toggle('fullscreen', setFullscreen);
        
        if (button) {
            button.querySelector('span').textContent = setFullscreen ? 'Exit Fullscreen' : 'Fullscreen';
        }

        // Trigger resize event for map
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
            if (this.map) {
                this.map.invalidateSize();
            }
        }, 300);
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