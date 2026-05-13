// script.js - JavaScript functionality for the Food Bank Management System

// Login form handler
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real app, this would validate credentials
            // For demo purposes, just redirect to dashboard
            window.location.href = 'dashboard.html';
        });
    }

    console.log('Should be loaded successfully!');
});