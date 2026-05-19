document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
    const navItems = [
        {
            href: 'dashboard.html',
            label: 'Dashboard',
            svg: '<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"/></svg>'
        },
        {
            href: 'add-food.html',
            label: 'Add Food',
            svg: '<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>'
        },
        {
            href: 'inventory.html',
            label: 'Inventory',
            svg: '<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>'
        },
        {
            href: 'volunteers.html',
            label: 'Volunteers',
            svg: '<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/></svg>'
        }
    ];

    const navList = sidebar.querySelector('.sidebar-nav .nav-list');
    if (navList) {
        navList.innerHTML = navItems.map(item => {
            const activeClass = item.href === currentPage ? ' active' : '';
            return `
                <li class="nav-item">
                    <a href="${item.href}" class="nav-link${activeClass}">
                        ${item.svg}
                        <span>${item.label}</span>
                    </a>
                </li>`;
        }).join('');
    }

    // Remove any existing legacy logout button before injecting the new one.
    const existingLogout = sidebar.querySelector('#logoutBtn');
    if (existingLogout) {
        const parent = existingLogout.closest('.nav-item');
        parent?.remove();
    }

    const logoutItem = document.createElement('div');
    logoutItem.className = 'nav-item';
    logoutItem.style.marginTop = 'auto';
    logoutItem.innerHTML = `
        <a href="#" id="logoutBtn" class="nav-link btn-logout">
            <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            <span>Log Out</span>
        </a>`;

    sidebar.appendChild(logoutItem);

    const btn = document.getElementById('logoutBtn');
    if (!btn) return;
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        window.location.href = 'index.html';
    });
});
