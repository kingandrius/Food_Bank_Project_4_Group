// script.js - JavaScript functionality for the Food Bank Management System

// Login form handler
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        window.location.href = 'dashboard.html';
    });

    console.log('Should be loaded successfully!');
});