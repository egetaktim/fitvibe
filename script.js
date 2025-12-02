// FitVibe App Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('FitVibe App loaded');
    
    // Smooth scrolling
    const appContent = document.getElementById('appContent');
    if (appContent) {
        appContent.style.scrollBehavior = 'smooth';
    }

    // Page elements
    const homePage = document.getElementById('homePage');
    const profilePage = document.getElementById('profilePage');
    const mapPage = document.getElementById('mapPage');
    const messagesPage = document.getElementById('messagesPage');
    const teamPage = document.getElementById('teamPage');
    const appHeader = document.querySelector('.app-header');

    // Function to show a page
    function showPage(page) {
        // Hide all pages
        const allPages = [homePage, profilePage, mapPage, messagesPage, teamPage];
        allPages.forEach(p => {
            if (p) p.style.display = 'none';
        });

        // Show/hide header based on page
        if (appHeader) {
            if (page === 'home') {
                appHeader.style.display = 'block';
            } else {
                appHeader.style.display = 'none';
            }
        }

        // Show selected page
        switch(page) {
            case 'home':
                if (homePage) homePage.style.display = 'block';
                break;
            case 'profile':
                if (profilePage) profilePage.style.display = 'block';
                break;
            case 'map':
                if (mapPage) mapPage.style.display = 'block';
                break;
            case 'messages':
                if (messagesPage) messagesPage.style.display = 'block';
                break;
            case 'team':
                if (teamPage) teamPage.style.display = 'block';
                break;
        }
    }

    // Navigation handling
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
            
            const page = this.getAttribute('data-page');
            showPage(page);
        });
    });

    // Profile icon click
    const profileIcon = document.querySelector('.profile-icon-wrapper[data-action="profile"]');
    if (profileIcon) {
        profileIcon.addEventListener('click', function() {
            showPage('profile');
            // Update nav
            navItems.forEach(nav => nav.classList.remove('active'));
            const profileNav = document.querySelector('.nav-item[data-page="profile"]');
            if (profileNav) profileNav.classList.add('active');
        });
    }

    // Main action cards click handlers
    const actionCards = document.querySelectorAll('.main-action-card');
    actionCards.forEach(card => {
        card.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            console.log('Action clicked:', action);
            
            switch(action) {
                case 'reservation':
                    // Navigate to map page for reservations
                    showPage('map');
                    navItems.forEach(nav => nav.classList.remove('active'));
                    const mapNav = document.querySelector('.nav-item[data-page="map"]');
                    if (mapNav) mapNav.classList.add('active');
                    break;
                case 'find':
                    // Navigate to team page
                    showPage('team');
                    navItems.forEach(nav => nav.classList.remove('active'));
                    const teamNav = document.querySelector('.nav-item[data-page="team"]');
                    if (teamNav) teamNav.classList.add('active');
                    break;
                case 'equipment':
                    alert('Ekipman kiralama sayfası yakında eklenecek!');
                    break;
            }
        });
    });

    // Activity cards click handlers
    const activityCards = document.querySelectorAll('.activity-card');
    activityCards.forEach(card => {
        card.addEventListener('click', function() {
            console.log('Activity card clicked');
            // Could navigate to activity details
        });
    });
});


