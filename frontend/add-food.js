document.addEventListener('DOMContentLoaded', function() {
    const addFoodForm = document.getElementById('addFoodForm');
    if (addFoodForm) {
        addFoodForm.addEventListener('submit', function(e) {
            if (!validateForm(addFoodForm)) {
                e.preventDefault();
                alert('Please fill in all required fields.');
                return;
            }

            e.preventDefault();

            const formData = new FormData(addFoodForm);
            const foodData = {
                foodName: formData.get('foodName'),
                quantity: formData.get('quantity'),
                expiryDate: formData.get('expiryDate'),
                category: formData.get('category')
            };

            console.log('Form submitted:', foodData);
            addFoodForm.reset();
            alert('Food item added successfully!');
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
