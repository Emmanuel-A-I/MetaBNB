// script.js

// Mock data for places to stay
const mockPlaces = [
    {
        id: 1,
        name: "Desert King",
        price: "1MBT per night",
        distance: "2345km away",
        availability: "available for 2weeks stay",
        type: "Desert",
        image: "assets/box1.png",
        liked: false
    },
    {
        id: 2,
        name: "Ocean View Villa",
        price: "2MBT per night",
        distance: "1567km away",
        availability: "available for 3weeks stay",
        type: "Beach",
        image: "assets/box2.png",
        liked: false
    },
    {
        id: 3,
        name: "Mountain Cabin",
        price: "1.5MBT per night",
        distance: "3210km away",
        availability: "available for 1week stay",
        type: "Cottage",
        image: "assets/box3.png",
        liked: false
    },
    {
        id: 4,
        name: "Castle Retreat",
        price: "3MBT per night",
        distance: "890km away",
        availability: "available for 4weeks stay",
        type: "Castle",
        image: "assets/box4.png",
        liked: false
    },
    {
        id: 5,
        name: "Fantasy City Loft",
        price: "2.5MBT per night",
        distance: "1200km away",
        availability: "available for 2weeks stay",
        type: "fantast city",
        image: "assets/box5.png",
        liked: false
    },
    {
        id: 6,
        name: "Luxury Farmhouse",
        price: "1.8MBT per night",
        distance: "2100km away",
        availability: "available for 3weeks stay",
        type: "Farm",
        image: "assets/box6.png",
        liked: false
    },
    {
        id: 7,
        name: "Off-grid Haven",
        price: "0.8MBT per night",
        distance: "3400km away",
        availability: "available for 6weeks stay",
        type: "Off-grid",
        image: "assets/box7.png",
        liked: false
    },
    {
        id: 8,
        name: "Cozy Cabin",
        price: "1.2MBT per night",
        distance: "1750km away",
        availability: "available for 2weeks stay",
        type: "Carbins",
        image: "assets/box8.png",
        liked: false
    },
    {
        id: 9,
        name: "Desert Oasis",
        price: "1.3MBT per night",
        distance: "2450km away",
        availability: "available for 2weeks stay",
        type: "Desert",
        image: "assets/box9.png",
        liked: false
    },
    {
        id: 10,
        name: "Beachfront Paradise",
        price: "2.8MBT per night",
        distance: "980km away",
        availability: "available for 2weeks stay",
        type: "Beach",
        image: "assets/box10.png",
        liked: false
    },
    {
        id: 11,
        name: "Royal Castle",
        price: "3.5MBT per night",
        distance: "760km away",
        availability: "available for 3weeks stay",
        type: "Castle",
        image: "assets/box11.png",
        liked: false
    },
    {
        id: 12,
        name: "Modern Cottage",
        price: "1.4MBT per night",
        distance: "1890km away",
        availability: "available for 2weeks stay",
        type: "Cottage",
        image: "assets/box12.png",
        liked: false
    },
    {
        id: 13,
        name: "City Skyline Apartment",
        price: "2.2MBT per night",
        distance: "1100km away",
        availability: "available for 2weeks stay",
        type: "fantast city",
        image: "assets/box13.png",
        liked: false
    },
    {
        id: 14,
        name: "Rustic Farm",
        price: "1.1MBT per night",
        distance: "2300km away",
        availability: "available for 4weeks stay",
        type: "Farm",
        image: "assets/box14.png",
        liked: false
    },
    {
        id: 15,
        name: "Secluded Off-grid",
        price: "0.9MBT per night",
        distance: "3650km away",
        availability: "available for 8weeks stay",
        type: "Off-grid",
        image: "assets/box15.png",
        liked: false
    },
    {
        id: 16,
        name: "Mountain View Cabin",
        price: "1.6MBT per night",
        distance: "1980km away",
        availability: "available for 2weeks stay",
        type: "Carbins",
        image: "assets/box16.png",
        liked: false
    }
];

// State management
let currentPlaces = [...mockPlaces];
let likedPlaces = JSON.parse(localStorage.getItem('likedPlaces')) || [];

// DOM Elements
let sections = document.querySelectorAll('section');

// ===== MOBILE MENU INTEGRATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Listen for mobile filter events
    window.addEventListener('mobileFilter', function(e) {
        const filterType = e.detail.filterType;
        filterByType(filterType);
    });
    
    // Ensure mobile Connect Wallet button works
    const connectWalletMobile = document.getElementById('connectWalletMobile');
    if (connectWalletMobile) {
        // Remove any existing listeners and add fresh one
        const newBtn = connectWalletMobile.cloneNode(true);
        connectWalletMobile.parentNode.replaceChild(newBtn, connectWalletMobile);
        
        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openWalletModal();
            if (typeof closeMobileMenu === 'function') {
                closeMobileMenu();
            }
        });
    }
    
    // Initialize page content and event listeners
    initializePage();
    setupEventListeners();
    
    // Check URL to determine which page we're on
    const isPlacePage = window.location.pathname.includes('place.html') || 
                       window.location.pathname.includes('place');
    
    if (isPlacePage) {
        setupLocationFilter();
    }
});

// Initialize page content
function initializePage() {
    // Update like icons based on saved likes
    updateLikeIcons();
    
    // If on homepage, load only first 8 places
    const isHomePage = !window.location.pathname.includes('place.html') && 
                      !window.location.pathname.includes('place');
    
    if (isHomePage) {
        currentPlaces = mockPlaces.slice(0, 8);
    } else {
        currentPlaces = [...mockPlaces];
    }
    
    // Populate places dynamically
    populatePlaces();
}

// Setup event listeners
function setupEventListeners() {
    // Connect Wallet buttons - both desktop and mobile
    const connectWalletBtns = document.querySelectorAll('.active');
    connectWalletBtns.forEach(btn => {
        // Remove any existing listeners
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openWalletModal();
        });
    });
    
    // Search functionality (homepage)
    const searchBtn = document.querySelector('.btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchInput = document.querySelector('input[type="text"]');
            if (searchInput) {
                filterByLocation(searchInput.value);
            }
        });
        
        // Also trigger on Enter key
        const searchInput = document.querySelector('input[type="text"]');
        if (searchInput) {
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    filterByLocation(this.value);
                }
            });
        }
    }
}

// Setup location filter for place.html
function setupLocationFilter() {
    const locationFilters = document.querySelectorAll('.active2');
    locationFilters.forEach(filter => {
        // Remove any existing listeners
        const newFilter = filter.cloneNode(true);
        filter.parentNode.replaceChild(newFilter, filter);
        
        newFilter.addEventListener('click', function(e) {
            e.preventDefault();
            openLocationFilterModal();
        });
    });
    
    // Also add click listeners to filter buttons in nav
    const filterButtons = document.querySelectorAll('.nav2 a');
    filterButtons.forEach(button => {
        // Remove any existing listeners
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        newButton.addEventListener('click', function(e) {
            e.preventDefault();
            const filterType = this.textContent.trim();
            filterByType(filterType);
        });
    });
}

// Populate places in sections
function populatePlaces() {
    sections.forEach(section => {
        // Clear existing boxes except the first template if it exists
        const existingBoxes = section.querySelectorAll('.box');
        if (existingBoxes.length > 0) {
            // Check if we should clear all or just some
            const firstBox = existingBoxes[0];
            const hasImage = firstBox.querySelector('.pix')?.getAttribute('src');
            
            if (hasImage && hasImage.includes('box')) {
                // Clear all boxes
                section.innerHTML = '';
            }
        }
        
        // Create and append place cards
        currentPlaces.forEach(place => {
            const placeCard = createPlaceCard(place);
            section.appendChild(placeCard);
        });
    });
    
    // Re-attach like button event listeners
    attachLikeButtonListeners();
}

// Create a place card element
function createPlaceCard(place) {
    const box = document.createElement('div');
    box.className = 'box';
    box.dataset.id = place.id;
    box.dataset.type = place.type;
    
    // Create heart icon - FIXED: Use red.png for liked hearts
    const heart = document.createElement('img');
    heart.src = place.liked ? 'assets/red.png' : 'assets/heart.png';
    heart.alt = 'Like';
    heart.className = 'heart';
    heart.dataset.id = place.id;
    
    // Create image
    const pix = document.createElement('img');
    pix.src = place.image;
    pix.alt = place.name;
    pix.className = 'pix';
    
    // Create box text content
    const boxText = document.createElement('div');
    boxText.className = 'box-text';
    
    const flex1 = document.createElement('div');
    flex1.className = 'box-text flex';
    
    const nameSpan = document.createElement('span');
    nameSpan.textContent = place.name;
    
    const priceH4 = document.createElement('h4');
    priceH4.textContent = place.price;
    
    flex1.appendChild(nameSpan);
    flex1.appendChild(priceH4);
    
    const flex2 = document.createElement('div');
    flex2.className = 'box-text flex';
    
    const distanceSpan = document.createElement('span');
    distanceSpan.textContent = place.distance;
    
    const availabilitySpan = document.createElement('span');
    availabilitySpan.textContent = place.availability;
    
    flex2.appendChild(distanceSpan);
    flex2.appendChild(availabilitySpan);
    
    boxText.appendChild(flex1);
    boxText.appendChild(flex2);
    
    // Create stars
    const starDiv = document.createElement('div');
    starDiv.className = 'star';
    
    for (let i = 0; i < 5; i++) {
        const star = document.createElement('img');
        star.src = 'assets/star.png';
        star.alt = 'Star';
        starDiv.appendChild(star);
    }
    
    // Assemble the card
    box.appendChild(heart);
    box.appendChild(pix);
    box.appendChild(boxText);
    box.appendChild(starDiv);
    
    return box;
}

// Filter by location/search term
function filterByLocation(searchTerm) {
    if (!searchTerm.trim()) {
        // If search is empty, show all places
        currentPlaces = window.location.pathname.includes('place.html') ? 
                       [...mockPlaces] : mockPlaces.slice(0, 8);
    } else {
        // Filter places based on search term
        currentPlaces = mockPlaces.filter(place => 
            place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            place.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            place.distance.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        // On homepage, limit to 8 results
        if (!window.location.pathname.includes('place.html')) {
            currentPlaces = currentPlaces.slice(0, 8);
        }
    }
    
    populatePlaces();
    
    // Show message if no results
    if (currentPlaces.length === 0) {
        sections.forEach(section => {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML = `<p>No places found for "${searchTerm}". Try a different search term.</p>`;
            section.appendChild(noResults);
        });
    }
}

// Filter by type (for place.html)
function filterByType(type) {
    if (type === 'Resturant' || type === 'Home') {
        // Show all places
        currentPlaces = [...mockPlaces];
    } else {
        // Filter by type
        currentPlaces = mockPlaces.filter(place => 
            place.type.toLowerCase() === type.toLowerCase()
        );
    }
    
    populatePlaces();
    
    // Update active filter button visually
    const filterButtons = document.querySelectorAll('.nav2 a');
    filterButtons.forEach(btn => {
        if (btn.textContent.trim() === type) {
            btn.style.color = '#A02279';
            btn.style.fontWeight = 'bold';
        } else {
            btn.style.color = '';
            btn.style.fontWeight = '';
        }
    });
}

// Open wallet modal
function openWalletModal() {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 10px;
        width: 90%;
        max-width: 500px;
        text-align: center;
    `;
    
    modalContent.innerHTML = `
        <h2 style="color: #A02279; margin-bottom: 20px;">Connect Wallet</h2>
        <p style="margin-bottom: 20px; color: #666;">Enter your wallet address to connect to MetaBNB</p>
        <input type="text" id="walletAddress" placeholder="Enter wallet address (e.g., 0x...)" 
               style="width: 100%; padding: 12px; margin-bottom: 20px; border: 1px solid #ddd; border-radius: 5px;">
        <div style="display: flex; gap: 10px;">
            <button id="connectBtn" style="flex: 1; padding: 12px; background: #A02279; color: white; border: none; border-radius: 5px; cursor: pointer;">
                Connect
            </button>
            <button id="cancelBtn" style="flex: 1; padding: 12px; background: #666; color: white; border: none; border-radius: 5px; cursor: pointer;">
                Cancel
            </button>
        </div>
    `;
    
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    // Add event listeners for modal buttons
    modalOverlay.querySelector('#connectBtn').addEventListener('click', function() {
        const walletAddress = document.getElementById('walletAddress').value;
        if (walletAddress.trim()) {
            alert(`Wallet connected!\nAddress: ${walletAddress}\n(connected to cowrywise wallet address.)`);
            document.body.removeChild(modalOverlay);
            
            // Update button text on ALL Connect Wallet buttons
            const connectBtns = document.querySelectorAll('.active');
            connectBtns.forEach(btn => {
                btn.textContent = 'Connected';
                btn.style.backgroundColor = '#4CAF50';
            });
        } else {
            alert('Please enter a wallet address');
        }
    });
    
    modalOverlay.querySelector('#cancelBtn').addEventListener('click', function() {
        document.body.removeChild(modalOverlay);
    });
    
    // Close modal when clicking outside
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            document.body.removeChild(modalOverlay);
        }
    });
}

// Open location filter modal
function openLocationFilterModal() {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'filter-modal-overlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'filter-modal-content';
    modalContent.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 10px;
        width: 90%;
        max-width: 400px;
    `;
    
    modalContent.innerHTML = `
        <h2 style="color: #A02279; margin-bottom: 20px;">Filter by Location</h2>
        <div style="margin-bottom: 20px;">
            <input type="text" id="locationSearch" placeholder="Search location..." 
                   style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 5px;">
        </div>
        <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">
            <button class="filter-option" data-type="all">All Locations</button>
            <button class="filter-option" data-type="Desert">Desert</button>
            <button class="filter-option" data-type="Beach">Beach</button>
            <button class="filter-option" data-type="Castle">Castle</button>
            <button class="filter-option" data-type="Cottage">Cottage</button>
            <button class="filter-option" data-type="Farm">Farm</button>
            <button class="filter-option" data-type="fantast city">Fantast City</button>
            <button class="filter-option" data-type="Carbins">Carbins</button>
            <button class="filter-option" data-type="Off-grid">Off-grid</button>
        </div>
        <button id="closeFilterBtn" style="width: 100%; padding: 12px; background: #666; color: white; border: none; border-radius: 5px; cursor: pointer;">
            Close
        </button>
    `;
    
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    // Add event listeners for filter options
    modalContent.querySelectorAll('.filter-option').forEach(btn => {
        btn.addEventListener('click', function() {
            const type = this.dataset.type;
            if (type === 'all') {
                currentPlaces = [...mockPlaces];
            } else {
                currentPlaces = mockPlaces.filter(place => place.type === type);
            }
            populatePlaces();
            document.body.removeChild(modalOverlay);
        });
        
        // Style the buttons
        btn.style.cssText = `
            padding: 10px;
            background: #f5f5f5;
            border: 1px solid #ddd;
            border-radius: 5px;
            cursor: pointer;
            text-align: left;
        `;
        
        btn.addEventListener('mouseover', () => {
            btn.style.background = '#A02279';
            btn.style.color = 'white';
        });
        
        btn.addEventListener('mouseout', () => {
            btn.style.background = '#f5f5f5';
            btn.style.color = 'black';
        });
    });
    
    // Add search functionality within modal
    modalContent.querySelector('#locationSearch').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filterOptions = modalContent.querySelectorAll('.filter-option');
        
        filterOptions.forEach(option => {
            const text = option.textContent.toLowerCase();
            if (text.includes(searchTerm) || searchTerm === '') {
                option.style.display = 'block';
            } else {
                option.style.display = 'none';
            }
        });
    });
    
    // Close button
    modalContent.querySelector('#closeFilterBtn').addEventListener('click', function() {
        document.body.removeChild(modalOverlay);
    });
    
    // Close modal when clicking outside
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            document.body.removeChild(modalOverlay);
        }
    });
}

// Attach like button event listeners
function attachLikeButtonListeners() {
    const heartIcons = document.querySelectorAll('.heart');
    heartIcons.forEach(heart => {
        // Remove any existing listeners
        const newHeart = heart.cloneNode(true);
        heart.parentNode.replaceChild(newHeart, heart);
        
        newHeart.addEventListener('click', function() {
            const placeId = parseInt(this.dataset.id);
            toggleLike(placeId, this);
        });
    });
}

// Toggle like status - FIXED: Immediately update heart icon
function toggleLike(placeId, heartElement) {
    const placeIndex = mockPlaces.findIndex(p => p.id === placeId);
    
    if (placeIndex !== -1) {
        // Toggle the liked status
        mockPlaces[placeIndex].liked = !mockPlaces[placeIndex].liked;
        
        // IMMEDIATELY update the heart icon
        if (mockPlaces[placeIndex].liked) {
            heartElement.src = 'assets/red.png'; // Red heart for liked
            if (!likedPlaces.includes(placeId)) {
                likedPlaces.push(placeId);
            }
        } else {
            heartElement.src = 'assets/heart.png'; // Regular heart for unliked
            likedPlaces = likedPlaces.filter(id => id !== placeId);
        }
        
        // Save to localStorage
        localStorage.setItem('likedPlaces', JSON.stringify(likedPlaces));
        
        // Update currentPlaces to reflect like status
        const currentPlaceIndex = currentPlaces.findIndex(p => p.id === placeId);
        if (currentPlaceIndex !== -1) {
            currentPlaces[currentPlaceIndex].liked = mockPlaces[placeIndex].liked;
        }
        
        // Add a visual feedback animation
        heartElement.style.transform = 'scale(1.3)';
        setTimeout(() => {
            heartElement.style.transform = 'scale(1)';
        }, 200);
    }
}

// Update like icons based on saved likes
function updateLikeIcons() {
    // Load liked places from localStorage
    likedPlaces = JSON.parse(localStorage.getItem('likedPlaces')) || [];
    
    // Update mockPlaces with liked status
    mockPlaces.forEach(place => {
        place.liked = likedPlaces.includes(place.id);
    });
}

// Optional: Add some CSS for the modal (could also be added to style.css)
const modalStyles = `
    .modal-overlay, .filter-modal-overlay {
        font-family: "Merriweather", serif;
    }
    
    .modal-content h2, .filter-modal-content h2 {
        font-family: "Merriweather", serif;
        font-weight: bold;
    }
    
    .filter-option:hover {
        transition: all 0.3s ease;
    }
    
    .no-results {
        grid-column: 1 / -1;
        text-align: center;
        padding: 40px;
        font-size: 18px;
        color: #666;
    }
    
    /* Heart icon animation */
    .heart {
        cursor: pointer;
        transition: transform 0.2s;
    }
    
    .heart:hover {
        transform: scale(1.2);
    }
    
    /* Mobile menu styles */
    @media (max-width: 768px) {
        .modal-overlay, .filter-modal-overlay {
            z-index: 2000 !important;
        }
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);
