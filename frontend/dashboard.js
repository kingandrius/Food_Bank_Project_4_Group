/**
 * FRONTEND USER INTERACTION SCRIPT
 * File Placement: frontend/dashboard.js
 */

document.addEventListener('DOMContentLoaded', async function() {
    console.log('Dashboard script initializing...');

    // FIXED: Read user's name from storage and greet them dynamically right away
    const loggedInUser = localStorage.getItem('userName');
    const welcomeHeading = document.getElementById('welcomeHeading');
    if (loggedInUser && welcomeHeading) {
        welcomeHeading.textContent = `Welcome Back, ${loggedInUser}`;
    }

    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    const STATS_URL = 'http://localhost:3000/dashboard/stats';
    const INVENTORY_URL = 'http://localhost:3000/dashboard/recent-inventory';
    const ALERTS_URL = 'http://localhost:3000/dashboard/alerts';

    // 1. Manage Sidebar Selection Elements
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // 2. Fetch Top Grid Summary Metrics
    try {
        const statsResponse = await fetch(STATS_URL, { method: 'GET' });
        if (statsResponse.ok) {
            const stats = await statsResponse.json();
            if (document.getElementById('totalItems')) document.getElementById('totalItems').textContent = stats.totalItems;
            if (document.getElementById('lowStock')) document.getElementById('lowStock').textContent = stats.lowStock;
            if (document.getElementById('activeVolunteers')) document.getElementById('activeVolunteers').textContent = stats.activeVolunteers;
            if (document.getElementById('scheduledToday')) document.getElementById('scheduledToday').textContent = stats.scheduledToday;
        }
    } catch (statsError) {
        console.error('Error handling metrics display rendering layer:', statsError);
    }

    // 3. Fetch Alerts
    try {
        const alertsResponse = await fetch(ALERTS_URL, { method: 'GET' });
        if (alertsResponse.ok) {
            const alerts = await alertsResponse.json();
            const alertsContainer = document.getElementById('dynamicAlertsContainer');
            if (alertsContainer) {
                alertsContainer.innerHTML = ''; 
                alerts.forEach(alert => {
                    const alertHTML = `
                        <div class="alert-banner alert-${alert.type}" style="margin-bottom: 1rem;">
                            <span class="alert-icon">⚠️</span>
                            <p class="alert-text">${alert.text}</p>
                        </div>
                    `;
                    alertsContainer.insertAdjacentHTML('beforeend', alertHTML);
                });
            }
        }
    } catch (alertsError) {
        console.error('Error fetching dashboard alerts layers:', alertsError);
    }

    // 4. Fetch Stock Items
    try {
        const inventoryResponse = await fetch(INVENTORY_URL, { method: 'GET' });
        const stockGrid = document.getElementById('dynamicStockGrid');
        
        if (inventoryResponse.ok && stockGrid) {
            const items = await inventoryResponse.json();
            stockGrid.innerHTML = ''; 

            if (items.length === 0) {
                stockGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 2rem;">No inventory records available.</p>';
                return;
            }

            items.forEach(item => {
                const cardHTML = `
                    <div class="stock-card">
                        <div class="stock-icon-container">
                            <div class="stock-icon-wrapper ${item.statusClass}">
                                <svg class="stock-icon ${item.statusClass}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                                </svg>
                            </div>
                        </div>
                        <h3 class="stock-name">${item.name}</h3>
                        <div class="stock-quantity-wrapper">
                            <p class="stock-quantity">${item.quantity}</p>
                            <span class="stock-unit">${item.unit}</span>
                        </div>
                        <div>
                            <span class="badge badge-${item.statusClass}">${item.badgeText}</span>
                        </div>
                    </div>
                `;
                stockGrid.insertAdjacentHTML('beforeend', cardHTML);
            });
        }
    } catch (inventoryError) {
        console.error('Error drawing dynamic stock interface layers:', inventoryError);
        const stockGrid = document.getElementById('dynamicStockGrid');
        if (stockGrid) {
            stockGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #e53e3e; padding: 2rem;">Failed to render live stock preview layers.</p>`;
        }
    }
});