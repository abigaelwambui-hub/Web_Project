// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('subscriptionForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Stop the form from submitting automatically
            e.preventDefault();
            
            // Get input fields
            const nameInput = document.getElementById('subName');
            const emailInput = document.getElementById('subEmail');
            const feedbackMsg = document.getElementById('formFeedback');
            
            let isValid = true;
            let errorMessage = "";
            
            // Reset previous validation states
            if (nameInput) nameInput.classList.remove('is-invalid', 'is-valid');
            if (emailInput) emailInput.classList.remove('is-invalid', 'is-valid');
            if (feedbackMsg) {
                feedbackMsg.classList.add('d-none');
                feedbackMsg.className = "alert mt-3 text-center";
            }
            
            // 1. Validate Name
            if (nameInput) {
                const nameValue = nameInput.value.trim();
                if (nameValue.length < 2) {
                    nameInput.classList.add('is-invalid');
                    errorMessage += "Please enter a valid name (at least 2 characters).<br>";
                    isValid = false;
                } else {
                    nameInput.classList.add('is-valid');
                }
            }
            
            // 2. Validate Email
            if (emailInput) {
                const emailValue = emailInput.value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailValue)) {
                    emailInput.classList.add('is-invalid');
                    errorMessage += "Please enter a valid email address.<br>";
                    isValid = false;
                } else {
                    emailInput.classList.add('is-valid');
                }
            }
            
            // 3. Render Custom Visual Feedback
            if (feedbackMsg) {
                feedbackMsg.classList.remove('d-none');
                if (isValid) {
                    feedbackMsg.classList.add('alert-success', 'bg-walnut', 'border-success', 'text-success');
                    feedbackMsg.innerHTML = `<strong>Success!</strong> Thank you for subscribing. Your letters will arrive soon.`;
                    contactForm.reset();
                    
                    // Clear visual checks after a brief delay
                    setTimeout(() => {
                        if (nameInput) nameInput.classList.remove('is-valid');
                        if (emailInput) emailInput.classList.remove('is-valid');
                        feedbackMsg.classList.add('d-none');
                    }, 5000);
                } else {
                    feedbackMsg.classList.add('alert-danger', 'bg-walnut', 'border-danger', 'text-danger');
                    feedbackMsg.innerHTML = `<strong>Submission paused:</strong><br>${errorMessage}`;
                }
            }
        });
    }
});