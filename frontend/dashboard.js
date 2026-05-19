document.addEventListener('DOMContentLoaded', async function() {
    console.log('Dashboard script initializing...');

    // Read stored user string metadata parameters to adjust layout greetings
    const loggedInUser = localStorage.getItem('userName');
    const welcomeHeading = document.getElementById('welcomeHeading');
    if (loggedInUser && welcomeHeading) {
        welcomeHeading.textContent = `Welcome Back, ${loggedInUser}`;
    }

    const STATS_URL = 'http://localhost:3000/dashboard/stats';
    const INVENTORY_URL = 'http://localhost:3000/dashboard/recent-inventory';
    const ALERTS_URL = 'http://localhost:3000/dashboard/alerts';

    // 1. Fetch Summary Statistics Metrics Payload Values
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

    // 2. Fetch System Core Operational Warning Alert Collections
    try {
        const alertsResponse = await fetch(ALERTS_URL, { method: 'GET' });
        if (alertsResponse.ok) {
            const alerts = await alertsResponse.json();
            const alertsContainer = document.getElementById('dynamicAlertsContainer');
            if (alertsContainer) {
                alertsContainer.innerHTML = ''; 
                alerts.forEach(alert => {
                    const alertHTML = `
                        <div class="alert-banner alert-${alert.type}">
                            <span class="alert-icon">⚠️</span>
                            <p class="alert-text" style="font-weight: 500; font-size: 0.95rem;">${alert.text}</p>
                        </div>
                    `;
                    alertsContainer.insertAdjacentHTML('beforeend', alertHTML);
                });
            }
        }
    } catch (alertsError) {
        console.error('Error fetching dashboard alerts layers:', alertsError);
    }

    // 3. Render Component Preview Elements Layer Loops
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
                // Maps status configuration profiles cleanly to our variables rules setup
                let statusClass = 'badge-good';
                if (item.statusClass === 'status-low' || item.statusClass === 'badge-low') statusClass = 'badge-low';
                if (item.statusClass === 'status-expiring' || item.statusClass === 'badge-expiring') statusClass = 'badge-expiring';

                const cardHTML = `
                    <div class="stock-card">
                        <span class="badge ${statusClass}" style="position: absolute; top: 12px; right: 12px;">${item.badgeText || 'In Stock'}</span>
                        <h3 class="stock-name" style="margin-top: 0.5rem; color: var(--text-muted);">${item.category || 'General'}</h3>
                        <p style="font-weight: 700; font-size: 1.15rem; color: var(--text-main); margin-bottom: 0.75rem;">${item.name}</p>
                        <div class="stock-quantity-wrapper">
                            <span class="stock-quantity" style="font-size: 1.75rem;">${item.quantity}</span>
                            <span class="stock-unit">units</span>
                        </div>
                    </div>
                `;
                stockGrid.insertAdjacentHTML('beforeend', cardHTML);
            });
        }
    } catch (inventoryError) {
        console.error('Error drawing dynamic stock interface layers:', inventoryError);
    }
});