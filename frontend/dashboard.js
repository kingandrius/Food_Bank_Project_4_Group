/**
 * FRONTEND USER INTERACTION SCRIPT
 * File Placement: frontend/dashboard.js
 */

document.addEventListener('DOMContentLoaded', async function() {
    console.log('Dashboard script initializing...');

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
    } catch (err) {
        console.error('Failed to link live server summary statistics:', err);
    }

    // 3. Fetch and Render Live Alerts Banners
    const alertsContainer = document.getElementById('dynamicAlertsContainer');
    if (alertsContainer) {
        try {
            const alertsResponse = await fetch(ALERTS_URL, { method: 'GET' });
            if (alertsResponse.ok) {
                const alerts = await alertsResponse.json();
                alertsContainer.innerHTML = ''; // Clear hardcoded banners

                alerts.forEach(alert => {
                    // Match icons with correct styling wrappers from dashboard.css
                    const iconPath = alert.type === 'warning' 
                        ? 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
                        : 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z';

                    const alertHTML = `
                        <div class="notification notification-${alert.type}">
                            <svg class="notification-icon ${alert.type}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${iconPath}"/>
                            </svg>
                            <p class="notification-text">${alert.text}</p>
                        </div>
                    `;
                    alertsContainer.insertAdjacentHTML('beforeend', alertHTML);
                });
            }
        } catch (alertErr) {
            console.error('Failed to sync dynamic layout notification states:', alertErr);
        }
    }

    // 4. Fetch and Loop Live Stock Overview Inventory Cards
    const stockGrid = document.getElementById('dynamicStockGrid');
    if (stockGrid) {
        try {
            const inventoryResponse = await fetch(INVENTORY_URL, { method: 'GET' });
            if (!inventoryResponse.ok) throw new Error('Could not load inventory database streams.');
            
            const items = await inventoryResponse.json();
            stockGrid.innerHTML = ''; 

            if (items.length === 0) {
                stockGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #718096; padding: 2rem;">No inventory records found in the system database.</p>`;
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
        } catch (inventoryError) {
            console.error('Error drawing dynamic stock interface layers:', inventoryError);
            stockGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #e53e3e; padding: 2rem;">Failed to render live stock preview layers.</p>`;
        }
    }
});