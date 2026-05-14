/**
 * UI ACCESS CONTROL
 * Handles what the user sees based on their role_id:
 * - Admin: Sees 'Settings' and 'Volunteers' management.
 * - Manager: Sees 'Reports' and scheduling tools.
 * - Volunteer: Only sees 'Dashboard', 'Add Food', and 'Inventory'.
 * * Note: Everyone starts as Role 3 (Volunteer) by default.
 */

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    console.log('Dashboard script loaded successfully!');
});
