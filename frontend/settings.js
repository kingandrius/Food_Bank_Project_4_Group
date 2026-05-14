document.addEventListener('DOMContentLoaded', function() {
    const toggles = [
        'emailNotificationsToggle',
        'lowStockAlertsToggle',
        'expiryAlertsToggle',
        'darkModeToggle'
    ];

    toggles.forEach(toggleId => {
        const toggle = document.getElementById(toggleId);
        if (toggle) {
            toggle.addEventListener('click', function() {
                this.classList.toggle('active');
            });
        }
    });

    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    console.log('Settings script loaded successfully!');
});
