const API_URL = 'http://localhost:3000/items';
const getToken = () => localStorage.getItem('token');

const buildStatusBadge = (item) => {
    const now = new Date();
    const expiration = item.expiration_date ? new Date(item.expiration_date) : null;
    if (item.quantity <= 10) return '<span class="badge badge-low">Low Stock</span>';
    if (expiration && Math.ceil((expiration - now) / (1000 * 60 * 60 * 24)) <= 7) return '<span class="badge badge-expiring">Expiring Soon</span>';
    return '<span class="badge badge-good">Healthy</span>';
};

const fetchInventory = async () => {
    const tableBody = document.getElementById('inventoryTableBody');
    if (!tableBody) return;
    try {
        const response = await fetch(API_URL, { method: 'GET' });
        const items = await response.json();
        tableBody.innerHTML = '';
        if (items.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 3rem; color: var(--text-muted);">No records found.</td></tr>`;
            return;
        }
        items.forEach(item => {
            tableBody.insertAdjacentHTML('beforeend', `
                <tr>
                    <td style="font-weight: 600; color: var(--text-main);">${item.name}</td>
                    <td><span style="background: #edf2f7; color: #4a5568; padding: 4px 10px; border-radius: 6px; font-size: 0.85rem; font-weight: 500;">${item.category || 'General'}</span></td>
                    <td style="font-weight: 700;">${item.quantity} units</td>
                    <td style="color: var(--text-muted); font-size: 0.9rem;">${item.expiration_date ? item.expiration_date.split('T')[0] : 'N/A'}</td>
                    <td>${buildStatusBadge(item)}</td>
                    <td style="text-align: center;">
                        <button onclick="updateQuantity(${item.id}, ${item.quantity + 5})" class="btn btn-secondary" style="padding: 4px 10px; font-size: 0.8rem; margin-right: 4px;">+5</button>
                        <button onclick="updateQuantity(${item.id}, ${Math.max(0, item.quantity - 5)})" class="btn btn-secondary" style="padding: 4px 10px; font-size: 0.8rem; background: #fff5f5; color: #e53e3e;">-5</button>
                    </td>
                </tr>
            `);
        });
    } catch (err) { tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #e53e3e; padding: 2rem;">Failed to load backend.</td></tr>`; }
};

window.updateQuantity = async (id, q) => {
    const token = getToken();
    if (!token) { window.location.href = 'index.html'; return; }
    try {
        const response = await fetch(`${API_URL}/update/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ quantity: q })
        });
        if (!response.ok) throw new Error('Failed.');
        fetchInventory();
    } catch (error) { alert('Could not change asset levels.'); }
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchInput')?.addEventListener('input', function() {
        const term = this.value.toLowerCase();
        document.querySelectorAll('#inventoryTableBody tr').forEach(row => {
            row.style.display = row.cells[0].textContent.toLowerCase().includes(term) ? '' : 'none';
        });
    });
    fetchInventory();
});