document.addEventListener('DOMContentLoaded', function() {
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

    console.log('Inventory script loaded successfully!');
});
