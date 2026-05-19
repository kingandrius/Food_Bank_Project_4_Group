document.addEventListener('DOMContentLoaded', function() {
    const addFoodForm = document.getElementById('addFoodForm');
    const API_URL = 'http://localhost:3000/items/addnew';
    const getToken = () => localStorage.getItem('token');

    if (addFoodForm) {
        addFoodForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            if (!validateForm(addFoodForm)) return alert('Please fill in all required fields.');

            const token = getToken();
            if (!token) { alert('Unauthorized.'); window.location.href = 'index.html'; return; }

            const formData = new FormData(addFoodForm);
            const foodData = {
                name: formData.get('foodName'),
                quantity: parseInt(formData.get('quantity'), 10),
                expiration_date: formData.get('expiryDate'),
                category: formData.get('category')
            };

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify(foodData)
                });
                if (!response.ok) throw new Error('Failed to insert item.');
                alert('Food item added successfully!');
                window.location.href = 'inventory.html';
            } catch (error) {
                alert(error.message || 'Unable to connect to server.');
            }
        });
    }

    function validateForm(form) {
        let isValid = true;
        form.querySelectorAll('input[required], select[required]').forEach(i => {
            if (!i.value.trim()) { i.style.borderColor = 'var(--color-low-stock)'; isValid = false; }
            else i.style.borderColor = 'var(--border-color)';
        });
        return isValid;
    }
});