document.addEventListener('DOMContentLoaded', () => {
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // --- TAB SWITCHING LOGIC ---
    
    loginTab.addEventListener('click', () => {
        // Update Tabs
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        // Show/Hide Forms
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    });

    registerTab.addEventListener('click', () => {
        // Update Tabs
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        // Show/Hide Forms
        registerForm.style.display = 'block';
        loginForm.style.display = 'none';
    });

    // --- FORM SUBMISSION LOGIC ---

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        // For now, let's keep the redirect so you can see the dashboard
        // We will add the real database check in the next step!
        window.location.href = 'dashboard.html';
    });

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        alert('Registration feature coming up next!');
    });
});