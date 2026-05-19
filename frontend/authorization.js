/**
 * ROLE PERMISSION HIERARCHY
 * -------------------------
 * Role 1 (Admin): Full system access. Can promote Volunteers to Managers.
 * Role 2 (Volunteer): Default role assigned when creating an account.
 * Role 3 (Manager): Handles scheduling, inventory, and volunteer coordination.
 * * Logic: Use these IDs to toggle the 'hidden' attribute on sidebar links.
 */
document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const formTitle = document.getElementById('formTitle');

    const API_URL = 'http://localhost:3000/auth';

    // --- TAB SWITCHING ---
    loginTab.addEventListener('click', () => {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        formTitle.textContent = 'Welcome Back';
    });

    registerTab.addEventListener('click', () => {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.style.display = 'block';
        loginForm.style.display = 'none';
        formTitle.textContent = 'Create Account';
    });

    // --- LOGIN LOGIC ---
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // 1. Save authentication token
                localStorage.setItem('token', data.token);

                // 2. Save the username so the dashboard can greet them by name!
                localStorage.setItem('userName', data.user.name);

                // 3. Forward the user to the main layout dashboard
                window.location.href = 'dashboard.html';
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Cannot connect to server. Ensure backend is running.');
        }
    });

    // --- REGISTER LOGIC ---
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Collect new split name fields
        const fName = document.getElementById('firstName').value;
        const lName = document.getElementById('lastName').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;

        // Combine for the database
        const fullName = `${fName} ${lName}`;

        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    name: fullName, 
                    email: email, 
                    password: password 
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Account created! You can now log in.');
                loginTab.click(); // Switch back to login
            } else {
                alert(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Registration error. Check console.');
        }
    });
});