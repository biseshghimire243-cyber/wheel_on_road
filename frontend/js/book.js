document.addEventListener("DOMContentLoaded", () => {
    const bookingForm = document.getElementById("bookingForm");
    const bookingMessage = document.getElementById("bookingMessage");
    const dateInput = document.getElementById("bookingDate");
    const phoneInput = document.getElementById("phone");

    // 1. Restrict past dates in the calendar picker
    const today = new Date().toISOString().split("T")[0];
    if (dateInput) {
        dateInput.setAttribute("min", today);
    }

    // 2. Form submission event listener
    bookingForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Clear previous alert messages
        bookingMessage.className = "";
        bookingMessage.textContent = "";

        // Collect field values
        const model = document.getElementById("model").value;
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = phoneInput.value.trim();
        const bookingDate = dateInput.value;
        const bookingTime = document.getElementById("bookingTime").value;
        const driveType = document.getElementById("driveType").value;

        // Validation Regex Patterns
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{9,12}$/; // Fits local and international numbers

        // Execute validations
        if (!model) {
            showFeedback("Please select a BMW model.", "error");
            return;
        }

        if (name.length < 3) {
            showFeedback("Please enter your full name (minimum 3 characters).", "error");
            return;
        }

        if (!emailRegex.test(email)) {
            showFeedback("Please enter a valid email address.", "error");
            return;
        }

        if (!phoneRegex.test(phone)) {
            showFeedback("Please enter a valid phone number.", "error");
            return;
        }

        if (!bookingDate) {
            showFeedback("Please select a preferred date for your test drive.", "error");
            return;
        }

        if (!bookingTime) {
            showFeedback("Please select a preferred time slot.", "error");
            return;
        }

        if (!driveType) {
            showFeedback("Please select an experience type.", "error");
            return;
        }

        // Disable button during network simulation
        const submitBtn = bookingForm.querySelector('button[type="submit"]');
        const originalBtnContent = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.7";
        submitBtn.innerHTML = "<span>PROCESSING REQUEST...</span>";

        // Simulate AJAX request payload submission
        setTimeout(() => {
            const formData = {
                model,
                name,
                email,
                phone,
                bookingDate,
                bookingTime,
                driveType,
                message: document.getElementById("message").value.trim()
            };

            console.log("Form Data Submitted Successfully:", formData);

            // Display success message and reset form inputs
            showFeedback(`Thank you, ${name}! Your test drive request for the ${model} has been received. We will contact you shortly to confirm.`, "success");
            bookingForm.reset();

            // Re-apply date constraint after reset
            dateInput.setAttribute("min", today);

            // Restore submit button state
            submitBtn.disabled = false;
            submitBtn.style.opacity = "1";
            submitBtn.innerHTML = originalBtnContent;
        }, 1500);
    });

    // Helper function to render UI messaging
    function showFeedback(message, type) {
        bookingMessage.textContent = message;
        bookingMessage.className = `feedback-message ${type}`;
    }
});