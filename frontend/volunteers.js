document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    const tbody = document.getElementById('volunteerTableBody');
    
    try {
        const response = await fetch('http://localhost:3000/volunteers', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const volunteers = await response.json();
        
        tbody.innerHTML = volunteers.map(v => `
            <tr>
                <td style="font-weight:600">${v.name}</td>
                <td>${v.email}</td>
                <td><span class="badge badge-good">${v.role_name}</span></td>
            </tr>
        `).join('');
    } catch (err) {
        console.error('Failed to load volunteers', err);
    }
});