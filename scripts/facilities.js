/**
 * Facilities Section Dynamic Functionality
 * This script handles all interactive features of the facilities section
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeFacilitiesSection();
});

/**
 * Initialize all functionality for the facilities section
 */
function initializeFacilitiesSection() {
    setupFilterButtons();
    setupExpandButtons();
    setupHoverEffects();
    setupInitialState();
    setupResponsiveLayout();
}

/**
 * Setup filter buttons functionality
 */
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const facilityCards = document.querySelectorAll('.facility-card');
    
    if (!filterButtons.length || !facilityCards.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Show/hide facility cards based on filter
            facilityCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    showFacilityCard(card);
                } else {
                    hideFacilityCard(card);
                }
            });
        });
    });
}

/**
 * Show a facility card with animation
 * @param {HTMLElement} card - The facility card element
 */
function showFacilityCard(card) {
    card.style.display = 'flex';
    
    // Add animation after a small delay to ensure display change is applied
    setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 50);
}

/**
 * Hide a facility card with animation
 * @param {HTMLElement} card - The facility card element
 */
function hideFacilityCard(card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    // Hide the card after animation completes
    setTimeout(() => {
        card.style.display = 'none';
    }, 300);
}

/**
 * Setup expand/collapse functionality for facility details
 */
function setupExpandButtons() {
    const expandButtons = document.querySelectorAll('.facility-expand-btn');
    
    if (!expandButtons.length) return;
    
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const detailsElement = this.previousElementSibling;
            
            if (detailsElement.style.maxHeight) {
                // Collapse
                collapseDetails(detailsElement, this);
            } else {
                // Expand
                expandDetails(detailsElement, this);
            }
        });
    });
}

/**
 * Expand facility details
 * @param {HTMLElement} detailsElement - The details container element
 * @param {HTMLElement} button - The expand/collapse button
 */
function expandDetails(detailsElement, button) {
    detailsElement.style.maxHeight = detailsElement.scrollHeight + 'px';
    button.innerHTML = 'عرض أقل <i class="material-icons">expand_less</i>';
    
    // Add expanded class for additional styling if needed
    detailsElement.classList.add('expanded');
}

/**
 * Collapse facility details
 * @param {HTMLElement} detailsElement - The details container element
 * @param {HTMLElement} button - The expand/collapse button
 */
function collapseDetails(detailsElement, button) {
    detailsElement.style.maxHeight = null;
    button.innerHTML = 'عرض المزيد <i class="material-icons">expand_more</i>';
    
    // Remove expanded class
    detailsElement.classList.remove('expanded');
}

/**
 * Setup hover effects for facility cards
 */
function setupHoverEffects() {
    const facilityCards = document.querySelectorAll('.facility-card');
    
    if (!facilityCards.length) return;
    
    facilityCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('facility-card-hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('facility-card-hover');
        });
    });
}

/**
 * Setup initial state of the facilities section
 */
function setupInitialState() {
    // Hide all facility details initially
    document.querySelectorAll('.facility-details').forEach(details => {
        details.style.maxHeight = null;
    });
    
    // Ensure all cards are visible initially
    document.querySelectorAll('.facility-card').forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        card.style.display = 'flex';
    });
    
    // Set first filter button as active
    const firstFilterBtn = document.querySelector('.filter-btn');
    if (firstFilterBtn) {
        firstFilterBtn.classList.add('active');
    }
}

/**
 * Setup responsive layout adjustments
 */
function setupResponsiveLayout() {
    // Handle window resize events if needed
    window.addEventListener('resize', function() {
        // Recalculate maxHeight for any expanded details
        document.querySelectorAll('.facility-details.expanded').forEach(details => {
            details.style.maxHeight = details.scrollHeight + 'px';
        });
    });
    
    // Add touch-friendly interactions for mobile
    if ('ontouchstart' in window) {
        document.querySelectorAll('.facility-card').forEach(card => {
            card.classList.add('touch-device');
        });
    }
}
