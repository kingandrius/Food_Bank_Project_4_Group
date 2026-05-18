document.addEventListener('DOMContentLoaded', async function() {
    const volunteerGrid = document.getElementById('volunteerGrid');
    const API_URL = 'http://localhost:3000/volunteers';
    const token = localStorage.getItem('token');

    // 1. Sidebar tab navigation active link checking loop
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // 2. Token Security validation checking
    if (!token) {
        alert('Access denied. Missing validation token. Redirecting...');
        window.location.href = 'index.html';
        return;
    }

    // 3. Request Team Members from Backend Api
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.message || 'Unable to download information from backend.');
        }

        const volunteers = await response.json();
        
        // Remove loading state element text
        if (volunteerGrid) {
            volunteerGrid.innerHTML = '';
        }

        if (volunteers.length === 0) {
            volunteerGrid.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1; text-align: center;">No active volunteers found in the system.</p>`;
            return;
        }

        // 4. Generate visual UI element templates loop
        volunteers.forEach(volunteer => {
            const initial = volunteer.name ? volunteer.name.charAt(0).toUpperCase() : '?';
            
            const cardMarkup = `
                <div class="volunteer-card" data-id="${volunteer.id}">
                    <div>
                        <div class="volunteer-header">
                            <div class="volunteer-info">
                                <div class="volunteer-avatar">${initial}</div>
                                <div>
                                    <h3 class="volunteer-name">${volunteer.name}</h3>
                                    <p class="volunteer-role">${volunteer.role_name || 'Volunteer'}</p>
                                </div>
                            </div>
                            <span class="badge badge-active" style="background-color: rgba(16, 185, 129, 0.1); color: #10b981; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">Active</span>
                        </div>
                        
                        <div class="volunteer-availability">
                            <svg class="availability-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                            <div>
                                <p class="availability-label">Availability</p>
                                <p class="availability-text">Flexible Shifts</p>
                            </div>
                        </div>
                        
                        <div class="volunteer-contact">
                            <div class="contact-item">
                                <svg class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width: 16px; height: 16px;">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                </svg>
                                <p class="contact-text">${volunteer.email}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 1rem;">
                        <button class="btn btn-secondary promote-btn" style="width: 100%; padding: 0.5rem; cursor: pointer;" data-user-id="${volunteer.id}">
                            Promote to Manager
                        </button>
                    </div>
                </div>
            `;
            volunteerGrid.insertAdjacentHTML('beforeend', cardMarkup);
        });

    } catch (err) {
        console.error('Render failure:', err);
        if (volunteerGrid) {
            volunteerGrid.innerHTML = `<p style="color: #ef4444; grid-column: 1/-1; text-align: center;">Error linking to directory API. Verify server connection status.</p>`;
        }
    }
});