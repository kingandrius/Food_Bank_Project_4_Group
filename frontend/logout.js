document.addEventListener('DOMContentLoaded', () => {
    const sidebarList = document.querySelector('.sidebar-nav .nav-list') || document.querySelector('.nav-list') || document.querySelector('.sidebar-nav');
    if (!sidebarList) return;

    const li = document.createElement('li');
    li.className = 'nav-item';
    li.innerHTML = `
        <button id="logoutBtn" class="nav-link" style="background:none;border:none;padding:12px;width:100%;text-align:left;cursor:pointer;">Logout</button>
    `;

    sidebarList.appendChild(li);

    const btn = document.getElementById('logoutBtn');
    if (!btn) return;
    btn.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = 'index.html';
    });
});
