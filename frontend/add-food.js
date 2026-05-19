document.addEventListener('DOMContentLoaded', function() {
    const addFoodForm = document.getElementById('addFoodForm');
    
    // BACKEND CONFIGURATION
    const API_URL = 'http://localhost:3000/items/addnew';
    const getToken = () => localStorage.getItem('token');

    if (addFoodForm) {
        addFoodForm.addEventListener('submit', async function(e) {
            e.preventDefault(); // Stop the page from reloading on form submit

            // 1. Run basic field validations
            if (!validateForm(addFoodForm)) {
                alert('Please fill in all required fields.');
                return;
            }

            // 2. Check for the security pass token
            const token = getToken();
            if (!token) {
                alert('You are not authorized. Please log in again.');
                window.location.href = 'index.html';
                return;
            }

            // 3. Collect the data from HTML Form inputs
            const formData = new FormData(addFoodForm);
            
            // FIXED: Added 'category' so the dropdown choice is sent to the backend!
            const foodData = {
                name: formData.get('foodName'),
                quantity: parseInt(formData.get('quantity'), 10),
                expiration_date: formData.get('expiryDate'),
                category: formData.get('category') 
            };

            try {
                // 4. Dispatch data to backend API
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Passes secure token verification
                    },
                    body: JSON.stringify(foodData)
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Server rejected food entry submission request.');
                }

                // 5. Notify the user
                console.log('Food added to database:', data);
                addFoodForm.reset();
                alert('Food item added successfully to database inventory!');
                
                // Optional: Send them to the inventory overview page to see it live
                window.location.href = 'inventory.html';

            } catch (error) {
                console.error('Submission error:', error);
                alert(error.message || 'Unable to connect to server.');
            }
        });
    }

    // Sidebar navigation highlighting logic
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Simple red-border highlighting helper for empty inputs
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#ef4444';
                isValid = false;
            } else {
                input.style.borderColor = '#d1d5db';
            }
        });

        return isValid;
    }

    console.log('Add Food script loaded successfully!');
});