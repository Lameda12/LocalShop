// Enhanced LocalShop App with modern features
const API_BASE = (() => {
  if (typeof window !== 'undefined' && window.API_BASE) return window.API_BASE;
  const isLocal = ['localhost', '127.0.0.1'].includes(location.hostname);
  
  if (isLocal) {
    return 'http://localhost:4000';
  }
  
  // FIXED: Use the actual Railway backend URL
  return 'https://localshop-production-2285.up.railway.app';
})();

// DOM Elements
const listingsEl = document.getElementById('listings');
const loadingEl = document.getElementById('loading');
const endEl = document.getElementById('end');
const skeletonEl = document.getElementById('skeleton');

// Search & Filter Elements
const searchEl = document.getElementById('search');
const categoryEl = document.getElementById('category');
const minPriceEl = document.getElementById('minPrice');
const maxPriceEl = document.getElementById('maxPrice');
const locationEl = document.getElementById('location');
const sortEl = document.getElementById('sort');

// New UI Elements
const favoritesBtn = document.getElementById('favoritesBtn');
const profileBtn = document.getElementById('profileBtn');
const voiceSearchBtn = document.getElementById('voiceSearchBtn');
const useLocationBtn = document.getElementById('useLocationBtn');
const gridViewBtn = document.getElementById('gridViewBtn');
const listViewBtn = document.getElementById('listViewBtn');
const mapViewBtn = document.getElementById('mapViewBtn');
const resultsCount = document.getElementById('resultsCount');
const activeListings = document.getElementById('activeListings');

// State Management
let viewMode = 'grid';
let userLocation = null;
let favorites = JSON.parse(localStorage.getItem('localshop_favorites') || '[]');
let searchHistory = JSON.parse(localStorage.getItem('localshop_search_history') || '[]');

// Authentication State
let currentUser = JSON.parse(localStorage.getItem('localshop_user') || 'null');
let authToken = localStorage.getItem('localshop_token');
let pendingEmail = null;

let cursor = null;
let fetching = false;
let done = false;
let hasImages = false;

function php(n) { return `₱${Number(n).toLocaleString('en-PH')}`; }

function timeAgo(dateStr) {
  const s = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60); if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60); if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24); if (d < 7) return `${d}d ago`;
  const w = Math.floor(d / 7); if (w < 4) return `${w}w ago`;
  const mo = Math.floor(d / 30); if (mo < 12) return `${mo}mo ago`;
  const y = Math.floor(d / 365); return `${y}y ago`;
}
function qs(params) { return new URLSearchParams(params).toString(); }

const CAT_EMOJI = {
  Electronics: '📱',
  Furniture: '🛋️',
  Clothing: '👕',
  Books: '📚',
  Sports: '🏀',
  Other: '📦',
};

// Insert Cloudinary transforms for smaller, optimized images
function cld(url, transform = 'f_auto,q_auto,c_fill,w_600,h_400') {
  if (!url) return url;
  const marker = '/upload/';
  const idx = url.indexOf(marker);
  if (idx === -1) return url;
  return url.slice(0, idx + marker.length) + transform + '/' + url.slice(idx + marker.length);
}

async function fetchListings(reset=false) {
  if (fetching || done) return;
  fetching = true;
  
  if (reset) {
    listingsEl.innerHTML = '';
    cursor = null;
    done = false;
    endEl.classList.add('hidden');
  }

  // Show loading state
  if (reset) {
    const loadingTpl = document.getElementById('loadingTpl');
    if (loadingTpl) {
      listingsEl.innerHTML = '';
      listingsEl.appendChild(loadingTpl.content.cloneNode(true));
    }
  }

  const params = {
    q: searchEl.value.trim() || '',
    category: categoryEl.value || '',
    minPrice: minPriceEl.value || '',
    maxPrice: maxPriceEl.value || '',
    city: locationEl ? locationEl.value.split(',')[0]?.trim() || '' : '',
    region: locationEl ? locationEl.value.split(',')[1]?.trim() || '' : '',
    sort: (sortEl && sortEl.value) || 'newest',
    hasImages: hasImages ? 'true' : '',
    cursor: cursor || '',
    limit: viewMode === 'grid' ? 12 : 8,
  };

  // Add location-based sorting if user location is available
  if (userLocation && sortEl?.value === 'distance') {
    params.lat = userLocation.lat;
    params.lng = userLocation.lng;
  }

  try {
    const res = await fetch(`${API_BASE}/api/listings?${qs(params)}`);
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    const items = data.items || data || [];

    if (reset) {
      listingsEl.innerHTML = '';
    }

    if (items.length === 0 && reset) {
      // Show empty state for production
      const emptyStateTpl = document.getElementById('emptyStateTpl');
      if (emptyStateTpl) {
        listingsEl.appendChild(emptyStateTpl.content.cloneNode(true));
      } else {
        // Fallback empty state
        listingsEl.innerHTML = `
          <div class="text-center py-16 px-4">
            <div class="text-8xl mb-6">🏪</div>
            <h3 class="text-2xl font-bold text-gray-700 mb-4">Welcome to LocalShop!</h3>
            <p class="text-gray-600 mb-8">Start by selling something you no longer need!</p>
            <button onclick="sellDialog.showModal()" class="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all">
              🛍️ Sell Something
            </button>
          </div>
        `;
      }
      return;
    }

    // Hide welcome section if there are items
    const welcomeSection = document.getElementById('welcomeSection');
    if (welcomeSection && items.length > 0) {
      welcomeSection.style.display = 'none';
    }

    items.forEach(renderCard);

    cursor = data.nextCursor || null;
    if (!cursor || items.length === 0) {
      done = true;
      endEl.classList.remove('hidden');
    }

  } catch (error) {
    console.error('Error fetching listings:', error);
    
    if (reset) {
      // Show error state for production
      const errorStateTpl = document.getElementById('errorStateTpl');
      if (errorStateTpl) {
        listingsEl.innerHTML = '';
        listingsEl.appendChild(errorStateTpl.content.cloneNode(true));
      } else {
        // Fallback error state
        listingsEl.innerHTML = `
          <div class="text-center py-16 px-4">
            <div class="text-6xl mb-4">⚠️</div>
            <h3 class="text-xl font-semibold text-gray-700 mb-4">Something went wrong</h3>
            <p class="text-gray-600 mb-6">We're having trouble loading items right now.</p>
            <button onclick="location.reload()" class="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all">
              Try Again
            </button>
          </div>
        `;
      }
    }
  } finally {
    loadingEl.classList.add('hidden');
    if (skeletonEl) skeletonEl.classList.add('hidden');
    fetching = false;
  }
}

// Enhanced card rendering with new features
function renderCard(item) {
  const tpl = document.getElementById('cardTpl');
  const node = tpl.content.firstElementChild.cloneNode(true);
  
  // Image elements
  const img = node.querySelector('img');
  const raw = (item.images && item.images[0] && item.images[0].url) || '';
  img.src = cld(raw) || 'https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=400&fit=crop';
  
  // Category badge
  const catEmoji = node.querySelector('.cat-emoji');
  const catText = node.querySelector('.cat-text');
  if (catEmoji && catText) {
    const emoji = CAT_EMOJI[item.category] || CAT_EMOJI.Other;
    catEmoji.textContent = emoji;
    catText.textContent = item.category || 'Other';
  }
  
  // Deal badge (show if price is under ₱1000)
  const dealBadge = node.querySelector('.deal-badge');
  if (item.price < 1000) {
    dealBadge.classList.remove('hidden');
  }
  
  // Content elements
  const title = node.querySelector('.item-title');
  const price = node.querySelector('.item-price');
  const locationText = node.querySelector('.location-text');
  const timeEl = node.querySelector('.item-time');
  
  title.textContent = item.title;
  price.textContent = php(item.price);
  
  const place = [item.location?.city, item.location?.region].filter(Boolean).join(', ') || 'Location not specified';
  locationText.textContent = place;
  timeEl.textContent = timeAgo(item.createdAt);
  
  // Seller info
  const sellerInitial = node.querySelector('.seller-initial');
  const sellerName = node.querySelector('.seller-name');
  const sellerRating = node.querySelector('.seller-rating');
  const ratingCount = node.querySelector('.rating-count');
  
  const sellerFirstName = item.seller?.name?.split(' ')[0] || 'Anonymous';
  sellerInitial.textContent = sellerFirstName.charAt(0).toUpperCase();
  sellerName.textContent = sellerFirstName;
  
  // Real rating data from API
  const rating = item.seller?.rating || 5;
  const reviewCount = item.seller?.reviewCount || 0;
  sellerRating.textContent = '⭐'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  ratingCount.textContent = `(${reviewCount})`;
  
  // Verified badge (show only if seller is actually verified)
  const verifiedBadge = node.querySelector('.verified-badge');
  if (item.seller?.verified) {
    verifiedBadge.classList.remove('hidden');
  }
  
  // Favorite button functionality
  const favBtn = node.querySelector('.fav-btn');
  const isFavorited = favorites.includes(item._id);
  if (isFavorited) {
    favBtn.querySelector('span').textContent = '♥';
    favBtn.querySelector('span').classList.add('text-red-500');
  }
  
  favBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(item._id, favBtn);
  });
  
  // Main link
  node.href = `./item.html?id=${item._id}`;
  
  // Add hover analytics
  node.addEventListener('mouseenter', () => {
    // Track view analytics
    analytics?.track('item_hover', { item_id: item._id, category: item.category });
  });

  listingsEl.appendChild(node);
}

// Favorite management
function toggleFavorite(itemId, button) {
  const heart = button.querySelector('span');
  const isFavorited = favorites.includes(itemId);
  
  if (isFavorited) {
    favorites = favorites.filter(id => id !== itemId);
    heart.textContent = '♡';
    heart.classList.remove('text-red-500');
    showToast('Removed from favorites', 'info');
  } else {
    favorites.push(itemId);
    heart.textContent = '♥';
    heart.classList.add('text-red-500');
    showToast('Added to favorites!', 'success');
  }
  
  localStorage.setItem('localshop_favorites', JSON.stringify(favorites));
}

// Toast notification system
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-lg text-white font-medium transition-all transform translate-x-full ${
    type === 'success' ? 'bg-green-500' : 
    type === 'error' ? 'bg-red-500' : 
    'bg-blue-500'
  }`;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  // Animate in
  setTimeout(() => toast.classList.remove('translate-x-full'), 100);
  
  // Animate out and remove
  setTimeout(() => {
    toast.classList.add('translate-x-full');
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
}

// Infinite scroll
window.addEventListener('scroll', () => {
  const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;
  if (nearBottom) fetchListings();
});

// Enhanced Filters with new elements
[searchEl, categoryEl, minPriceEl, maxPriceEl, locationEl, sortEl].forEach(el => {
  if (el) {
  el.addEventListener('change', () => fetchListings(true));
    if (el === searchEl) {
      el.addEventListener('keyup', (e) => { 
        if (e.key === 'Enter') {
          addToSearchHistory(e.target.value);
          fetchListings(true);
        }
      });
    }
  }
});

// Search history management
function addToSearchHistory(query) {
  if (!query.trim() || searchHistory.includes(query)) return;
  
  searchHistory.unshift(query);
  searchHistory = searchHistory.slice(0, 10); // Keep last 10 searches
  localStorage.setItem('localshop_search_history', JSON.stringify(searchHistory));
}

// Voice search functionality
if (voiceSearchBtn && 'webkitSpeechRecognition' in window) {
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';
  
  voiceSearchBtn.addEventListener('click', () => {
    recognition.start();
    voiceSearchBtn.innerHTML = '<span class="animate-pulse text-red-500">🎤</span>';
  });
  
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    searchEl.value = transcript;
    addToSearchHistory(transcript);
    fetchListings(true);
    showToast(`Searching for "${transcript}"`, 'info');
  };
  
  recognition.onend = () => {
    voiceSearchBtn.innerHTML = '<span class="text-gray-400 hover:text-primary-500 transition-colors text-lg">🎤</span>';
  };
  
  recognition.onerror = () => {
    showToast('Voice search not available', 'error');
    voiceSearchBtn.innerHTML = '<span class="text-gray-400 hover:text-primary-500 transition-colors text-lg">🎤</span>';
  };
}

// Geolocation functionality
if (useLocationBtn) {
  useLocationBtn.addEventListener('click', () => {
    if ('geolocation' in navigator) {
      useLocationBtn.innerHTML = '<span class="animate-spin">🔄</span> Getting location...';
      
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          userLocation = { lat: latitude, lng: longitude };
          
          // Use reverse geocoding to get city name (simplified)
          try {
            const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
            const data = await response.json();
            locationEl.value = data.city || data.locality || 'Current Location';
            fetchListings(true);
            showToast('Location updated!', 'success');
          } catch (error) {
            locationEl.value = 'Current Location';
            showToast('Location detected', 'success');
          }
          
          useLocationBtn.innerHTML = '<span class="text-sm">📍</span>';
        },
        (error) => {
          showToast('Location access denied', 'error');
          useLocationBtn.innerHTML = '<span class="text-sm">📍</span>';
        }
      );
    } else {
      showToast('Geolocation not supported', 'error');
    }
  });
}

// View mode toggles
if (gridViewBtn && listViewBtn) {
  gridViewBtn.addEventListener('click', () => {
    viewMode = 'grid';
    updateViewMode();
  });
  
  listViewBtn.addEventListener('click', () => {
    viewMode = 'list';
    updateViewMode();
  });
}

function updateViewMode() {
  if (viewMode === 'grid') {
    listingsEl.className = 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4';
    gridViewBtn.className = 'p-2 bg-primary-500 text-white rounded-lg';
    listViewBtn.className = 'p-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300';
  } else {
    listingsEl.className = 'space-y-4';
    gridViewBtn.className = 'p-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300';
    listViewBtn.className = 'p-2 bg-primary-500 text-white rounded-lg';
  }
}

// Navigation buttons
if (favoritesBtn) {
  favoritesBtn.addEventListener('click', () => {
    // Show favorites modal or navigate to favorites page
    showFavorites();
  });
}

if (profileBtn) {
  profileBtn.addEventListener('click', () => {
    // Show profile modal or navigate to profile page
    showProfile();
  });
}

function showFavorites() {
  // Simple implementation - filter current results by favorites
  if (favorites.length === 0) {
    showToast('No favorites yet! ❤️ items to save them.', 'info');
    return;
  }
  
  // In a full implementation, this would fetch favorite items from the API
  showToast(`You have ${favorites.length} favorite items`, 'info');
}

function showProfile() {
  // Simple profile modal
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
  modal.innerHTML = `
    <div class="bg-white rounded-2xl p-6 m-4 max-w-md w-full">
      <h3 class="text-xl font-bold mb-4">👤 Profile</h3>
      <div class="space-y-3">
        <div class="p-3 bg-gray-50 rounded-xl">
          <div class="text-sm text-gray-600">Saved Items</div>
          <div class="text-lg font-semibold">${favorites.length} items</div>
        </div>
        <div class="p-3 bg-gray-50 rounded-xl">
          <div class="text-sm text-gray-600">Search History</div>
          <div class="text-lg font-semibold">${searchHistory.length} searches</div>
        </div>
        <button class="w-full px-4 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors">
          Sign In for More Features
        </button>
      </div>
      <button onclick="this.parentElement.parentElement.remove()" class="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200">×</button>
    </div>
  `;
  document.body.appendChild(modal);
  
  // Remove modal when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
}

// Enhanced quick chips handlers
document.addEventListener('click', (e) => {
  const t = e.target.closest('button');
  if (!t) return;
  
  // Category quick filters
  if (t.hasAttribute('data-cat')) {
    const category = t.getAttribute('data-cat');
    categoryEl.value = category;
    // Visual feedback
    document.querySelectorAll('[data-cat]').forEach(btn => btn.classList.remove('bg-primary-500', 'text-white'));
    t.classList.add('bg-primary-500', 'text-white');
    fetchListings(true);
    showToast(`Filtering by ${category}`, 'info');
  }
  
  // Location quick filters  
  if (t.hasAttribute('data-loc')) {
    const location = t.getAttribute('data-loc');
    if (locationEl) locationEl.value = location;
    fetchListings(true);
    showToast(`Showing items in ${location}`, 'info');
  }
  
  // Price range quick filters
  if (t.hasAttribute('data-price')) {
    const val = t.getAttribute('data-price');
    const [min, max] = val.split('-');
    minPriceEl.value = min || '';
    maxPriceEl.value = max || '';
    // Visual feedback
    document.querySelectorAll('[data-price]').forEach(btn => {
      btn.classList.remove('bg-primary-500', 'text-white');
      btn.classList.add('bg-white', 'border-2', 'border-gray-200');
    });
    t.classList.remove('bg-white', 'border-gray-200');
    t.classList.add('bg-primary-500', 'text-white');
    fetchListings(true);
    showToast(`Price range: ₱${min || '0'} - ₱${max || '∞'}`, 'info');
  }
  
  // Image filter toggle
  if (t.hasAttribute('data-hasimg')) {
    hasImages = !hasImages;
    t.classList.toggle('bg-primary-500');
    t.classList.toggle('text-white');
    t.classList.toggle('bg-white');
    fetchListings(true);
    showToast(hasImages ? 'Showing items with photos' : 'Showing all items', 'info');
  }
  
  // Hot deals filter
  if (t.hasAttribute('data-deals')) {
    minPriceEl.value = '';
    maxPriceEl.value = '1000';
    hasImages = true;
    sortEl.value = 'price_asc';
    // Reset other filters for deals view
    document.querySelectorAll('[data-price]').forEach(btn => {
      btn.classList.remove('bg-primary-500', 'text-white');
      btn.classList.add('bg-white');
    });
    fetchListings(true);
    showToast('🔥 Showing hot deals under ₱1,000!', 'success');
  }
  
  // Nearby filter (requires location)
  if (t.hasAttribute('data-nearby')) {
    if (userLocation) {
      sortEl.value = 'distance';
      fetchListings(true);
      showToast('📍 Showing items near you', 'success');
    } else {
      showToast('📍 Please allow location access first', 'info');
      useLocationBtn?.click();
    }
  }
  
  // Verified sellers filter
  if (t.hasAttribute('data-verified')) {
    // In a real app, this would filter by verified sellers
    t.classList.toggle('bg-primary-500');
    t.classList.toggle('text-white');
    showToast('✅ Filtering by verified sellers', 'info');
  }
});

// PWA Installation and Features
let deferredPrompt;
let isInstalled = false;

// PWA install prompt
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallPrompt();
});

// Check if already installed
window.addEventListener('appinstalled', () => {
  isInstalled = true;
  hideInstallPrompt();
  showToast('📱 LocalShop installed successfully!', 'success');
});

function showInstallPrompt() {
  if (isInstalled) return;
  
  // Create install banner
  const banner = document.createElement('div');
  banner.id = 'installBanner';
  banner.className = 'fixed top-0 left-0 right-0 bg-gradient-to-r from-primary-600 to-primary-700 text-white p-4 z-50 shadow-lg';
  banner.innerHTML = `
    <div class="max-w-6xl mx-auto flex items-center justify-between">
      <div class="flex items-center gap-3">
        <span class="text-2xl">📱</span>
        <div>
          <div class="font-semibold">Install LocalShop</div>
          <div class="text-sm text-white/80">Get the full app experience</div>
        </div>
      </div>
      <div class="flex gap-2">
        <button onclick="installApp()" class="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
          Install
        </button>
        <button onclick="hideInstallPrompt()" class="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
          ×
        </button>
      </div>
    </div>
  `;
  
  document.body.prepend(banner);
}

function hideInstallPrompt() {
  const banner = document.getElementById('installBanner');
  if (banner) banner.remove();
}

window.installApp = async () => {
  if (!deferredPrompt) return;
  
  deferredPrompt.prompt();
  const result = await deferredPrompt.userChoice;
  
  if (result.outcome === 'accepted') {
    showToast('📱 Installing LocalShop...', 'success');
  }
  
  deferredPrompt = null;
  hideInstallPrompt();
};

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered: ', registration);
    } catch (registrationError) {
      console.log('SW registration failed: ', registrationError);
    }
  });
}

// Analytics and Performance
const analytics = {
  track: (event, data) => {
    // Simple analytics tracking
    console.log('Analytics:', event, data);
    
    // Store analytics data locally for now
    const analyticsData = JSON.parse(localStorage.getItem('localshop_analytics') || '[]');
    analyticsData.push({
      event,
      data,
      timestamp: new Date().toISOString()
    });
    
    // Keep only last 100 events
    if (analyticsData.length > 100) {
      analyticsData.splice(0, analyticsData.length - 100);
    }
    
    localStorage.setItem('localshop_analytics', JSON.stringify(analyticsData));
  }
};

// Performance monitoring
const perf = {
  mark: (name) => {
    if ('performance' in window && performance.mark) {
      performance.mark(name);
    }
  },
  measure: (name, startMark, endMark) => {
    if ('performance' in window && performance.measure) {
      performance.measure(name, startMark, endMark);
      const measure = performance.getEntriesByName(name)[0];
      analytics.track('performance', { name, duration: measure.duration });
    }
  }
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  perf.mark('app-start');
  
  // Update result count periodically
  setInterval(() => {
    const count = listingsEl.children.length;
    if (resultsCount) {
      resultsCount.textContent = `${count.toLocaleString()} items`;
    }
  }, 5000);
  
  // Update active listings count
  if (activeListings) {
    const updateCount = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/listings`);
        if (response.ok) {
          const data = await response.json();
          const count = data.length || 0;
          activeListings.textContent = count > 1000 ? `${(count / 1000).toFixed(1)}k+` : `${count}+`;
        }
      } catch (error) {
        // Fallback to showing "Active" without count
        activeListings.textContent = 'Active';
      }
    };
    updateCount();
    setInterval(updateCount, 60000); // Update every minute instead of every 30 seconds
  }
  
  perf.mark('app-ready');
  perf.measure('app-load-time', 'app-start', 'app-ready');
});

// Sell dialog
const sellDialog = document.getElementById('sellDialog');
const openSell = document.getElementById('openSell');
const closeSell = document.getElementById('closeSell');
const sellForm = document.getElementById('sellForm');
openSell.addEventListener('click', () => sellDialog.showModal());
closeSell.addEventListener('click', () => sellDialog.close());

sellForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Check if user is logged in
  if (!authToken || !currentUser) {
    showToast('Please log in to sell items', 'warning');
    authDialog.showModal();
    return;
  }
  
  const form = new FormData(sellForm);
  
  // Show loading state
  const submitBtn = sellForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = '🔄 Posting Item...';
  submitBtn.disabled = true;
  
  try {
    const res = await fetch(`${API_BASE}/api/listings`, { 
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`
      },
      body: form 
    });
    
  if (res.ok) {
    sellForm.reset();
    sellDialog.close();
      showToast('✅ Item posted successfully!', 'success');
    fetchListings(true);
  } else {
    const err = await res.json().catch(() => ({}));
      if (err.message && err.message.includes('token')) {
        clearAuth();
        showToast('Session expired. Please login again.', 'warning');
        authDialog.showModal();
      } else {
        showToast(err.message || 'Failed to post item', 'error');
      }
    }
  } catch (error) {
    showToast('Network error. Please try again.', 'error');
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
});

// Authentication Functions
function saveAuth(token, user) {
  authToken = token;
  currentUser = user;
  localStorage.setItem('localshop_token', token);
  localStorage.setItem('localshop_user', JSON.stringify(user));
  updateAuthUI();
}

function clearAuth() {
  authToken = null;
  currentUser = null;
  localStorage.removeItem('localshop_token');
  localStorage.removeItem('localshop_user');
  updateAuthUI();
}

function updateAuthUI() {
  const sellBtns = document.querySelectorAll('button[onclick="sellDialog.showModal()"]');
  sellBtns.forEach(btn => {
    if (currentUser) {
      // User is logged in
      btn.innerHTML = `🛍️ Sell Something`;
      btn.classList.remove('bg-red-600', 'hover:bg-red-700');
      btn.classList.add('bg-blue-600', 'hover:bg-blue-700');
    } else {
      // User not logged in  
      btn.innerHTML = `🔐 Login to Sell`;
      btn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
      btn.classList.add('bg-red-600', 'hover:bg-red-700');
    }
  });
}

async function login(email, password) {
  try {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await res.json();
    
    if (data.success) {
      saveAuth(data.token, data.user);
      authDialog.close();
      showToast(`Welcome back, ${data.user.name}!`, 'success');
      return true;
    } else {
      showToast(data.message || 'Login failed', 'error');
      return false;
    }
  } catch (error) {
    showToast('Network error. Please try again.', 'error');
    return false;
  }
}

async function signup(name, email, phone, password) {
  try {
    const res = await fetch(`${API_BASE}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, password })
    });
    
    const data = await res.json();
    
    if (data.success) {
      saveAuth(data.token, data.user);
      showSuccessMessage();
      setTimeout(() => {
        authDialog.close();
        showToast(`Welcome to LocalShop, ${data.user.name}!`, 'success');
      }, 2000);
      return true;
    } else {
      showToast(data.message || 'Signup failed', 'error');
      return false;
    }
  } catch (error) {
    showToast('Network error. Please try again.', 'error');
    return false;
  }
}



// Authentication UI Functions
function showLoginForm() {
  document.getElementById('loginForm').classList.remove('hidden');
  document.getElementById('signupForm').classList.add('hidden');
  document.getElementById('authSuccess').classList.add('hidden');
  document.getElementById('authTitle').textContent = '🔐 Login';
  document.getElementById('toggleAuth').textContent = "Don't have an account? Sign up free!";
  document.getElementById('toggleAuth').classList.remove('hidden');
}

function showSignupForm() {
  document.getElementById('loginForm').classList.add('hidden');
  document.getElementById('signupForm').classList.remove('hidden');
  document.getElementById('authSuccess').classList.add('hidden');
  document.getElementById('authTitle').textContent = '🚀 Join LocalShop';
  document.getElementById('toggleAuth').textContent = "Already have an account? Login";
  document.getElementById('toggleAuth').classList.remove('hidden');
}

function showSuccessMessage() {
  document.getElementById('loginForm').classList.add('hidden');
  document.getElementById('signupForm').classList.add('hidden');
  document.getElementById('authSuccess').classList.remove('hidden');
  document.getElementById('authTitle').textContent = '🎉 Success!';
  document.getElementById('toggleAuth').classList.add('hidden');
}

// Authentication Event Listeners
const authDialog = document.getElementById('authDialog');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const closeAuth = document.getElementById('closeAuth');
const toggleAuth = document.getElementById('toggleAuth');

closeAuth.addEventListener('click', () => authDialog.close());

toggleAuth.addEventListener('click', () => {
  if (document.getElementById('loginForm').classList.contains('hidden')) {
    showLoginForm();
  } else {
    showSignupForm();
  }
});

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = new FormData(loginForm);
  const email = form.get('email');
  const password = form.get('password');
  
  const button = loginForm.querySelector('button[type="submit"]');
  button.textContent = '🔄 Logging in...';
  button.disabled = true;
  
  const success = await login(email, password);
  
  button.textContent = 'Login to LocalShop';
  button.disabled = false;
  
  if (success) {
    loginForm.reset();
  }
});

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = new FormData(signupForm);
  const name = form.get('name');
  const email = form.get('email');
  const phone = form.get('phone');
  const password = form.get('password');
  
  const button = signupForm.querySelector('button[type="submit"]');
  button.textContent = '🔄 Creating account...';
  button.disabled = true;
  
  const success = await signup(name, email, phone, password);
  
  button.textContent = 'Create Account';
  button.disabled = false;
  
  if (success) {
    signupForm.reset();
  }
});



// Sell button click handlers - requires authentication
document.querySelectorAll('button[onclick="sellDialog.showModal()"]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the onclick from firing
    
    if (!authToken || !currentUser) {
      authDialog.showModal();
      showToast('Please log in to sell items', 'info');
    } else {
      sellDialog.showModal();
    }
  });
});

// Initialize authentication UI
updateAuthUI();

// Initial load
fetchListings(true);
