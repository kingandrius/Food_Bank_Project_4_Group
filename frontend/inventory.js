const API_URL = 'http://localhost:3000/items';

const getToken = () => localStorage.getItem('token');

// Component helper to inject semantic, styled status badges based on inventory parameters
const buildStatusBadge = (item) => {
    const now = new Date();
    const expiration = item.expiration_date ? new Date(item.expiration_date) : null;

    if (item.quantity <= 10) {
        return '<span class="badge badge-low" style="background: #fff5f5; color: #e53e3e; padding: 4px 8px; border-radius: 4px; font-size: 0.85rem; font-weight: 600;">Low Stock</span>';
    }

    if (expiration) {
        const diffDays = Math.ceil((expiration - now) / (1000 * 60 * 60 * 24));
        if (diffDays <= 7) {
            return '<span class="badge badge-expiring" style="background: #fffaf0; color: #dd6b20; padding: 4px 8px; border-radius: 4px; font-size: 0.85rem; font-weight: 600;">Expiring Soon</span>';
        }
    }

    return '<span class="badge badge-good" style="background: #e6fffa; color: var(--primary-green, #10b981); padding: 4px 8px; border-radius: 4px; font-size: 0.85rem; font-weight: 600;">Good Stock</span>';
};

// Iterates through backend collections and builds individual data table rows
const renderInventory = (items) => {
    const tableBody = document.getElementById('inventoryTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    items.forEach((item) => {
        const row = document.createElement('tr');
        row.style.borderBottom = '1px solid var(--border-color)';

        const category = item.category || 'General';
        const statusHtml = buildStatusBadge(item);

        row.innerHTML = `
            <td style="padding: 1rem; font-weight: 500;">${item.name}</td>
            <td class="table-muted" style="padding: 1rem; color: var(--text-muted);">${category}</td>
            <td style="padding: 1rem; cursor: pointer; font-weight: 600; color: var(--primary-blue);" data-id="${item.id}" class="quantity-cell">${item.quantity}</td>
            <td style="padding: 1rem;">${item.expiration_date ? item.expiration_date.split('T')[0] : 'N/A'}</td>
            <td style="padding: 1rem;">${statusHtml}</td>
        `;

        tableBody.appendChild(row);
    });

    attachQuantityUpdateListeners();
};

// Click listeners for immediate inline quantity variations
const attachQuantityUpdateListeners = () => {
    const quantityCells = document.querySelectorAll('.quantity-cell');
    quantityCells.forEach(cell => {
        cell.addEventListener('click', async () => {
            const itemId = cell.dataset.id;
            const currentQuantity = parseInt(cell.textContent, 10);
            const newQuantity = prompt('Enter new quantity for this item:', currentQuantity);

            if (newQuantity === null) return;
            const parsed = parseInt(newQuantity, 10);
            if (Number.isNaN(parsed) || parsed < 0) {
                alert('Please enter a valid non-negative number.');
                return;
            }

            await updateItemQuantity(itemId, parsed);
        });
    });
};

// Requests core database data from base REST url matching the backend layout directly
const fetchInventory = async () => {
    const token = getToken();
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    try {
        const response = await fetch(API_URL, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = 'index.html';
            }
            throw new Error(data.message || 'Unable to load inventory.');
        }

        renderInventory(Array.isArray(data) ? data : (data.items || []));
    } catch (error) {
        console.error('Inventory load error:', error);
        alert('Failed to load inventory. Please ensure the backend is running and you are logged in.');
    }
};

// Handles quantity variations updates back up into database storage pipelines
const updateItemQuantity = async (id, quantity) => {
    const token = getToken();
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    try {
        const response = await fetch(`${API_URL}/update/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity })
        });

        const data = await response.json();

        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = 'index.html';
            }
            throw new Error(data.message || 'Update failed.');
        }

        fetchInventory();
    } catch (error) {
        console.error('Update error:', error);
        alert(error.message || 'Unable to update quantity.');
    }
};

// Initializes DOM elements, navigation context styles, and structural filters
const initializePage = () => {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const tableBody = document.getElementById('inventoryTableBody');
            if (!tableBody) return;

            const rows = tableBody.querySelectorAll('tr');
            rows.forEach(row => {
                const foodName = row.cells[0].textContent.toLowerCase();
                row.style.display = foodName.includes(searchTerm) ? '' : 'none';
            });
        });
    }

    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    fetchInventory();
};

document.addEventListener('DOMContentLoaded', initializePage);