const bookingForm = document.getElementById("bookingForm");

const bookingMessage =
    document.getElementById("bookingMessage");


// ==============================
// SET MINIMUM DATE
// ==============================

const dateInput =
    document.getElementById("bookingDate");

const today = new Date();

const year = today.getFullYear();

const month =
    String(today.getMonth() + 1).padStart(2, "0");

const day =
    String(today.getDate()).padStart(2, "0");

dateInput.min =
    `${year}-${month}-${day}`;


// ==============================
// BOOKING FORM
// ==============================

bookingForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        // Get values

        const model =
            document.getElementById("model").value;

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const date =
            document.getElementById("bookingDate").value;

        const time =
            document.getElementById("bookingTime").value;

        const driveType =
            document.getElementById("driveType").value;


        // Basic validation

        if (
            !model ||
            !name ||
            !email ||
            !phone ||
            !date ||
            !time ||
            !driveType
        ) {

            bookingMessage.textContent =
                "Please complete all required fields.";

            bookingMessage.className =
                "error-message";

            return;

        }


        // Show loading

        const button =
            bookingForm.querySelector(".book-button");

        const originalText =
            button.innerHTML;

        button.innerHTML =
            `<span>PROCESSING...</span><strong>...</strong>`;

        button.disabled = true;


        // Simulate request

        setTimeout(() => {

            bookingMessage.innerHTML = `
                ✓ Your test-drive request has been
                received successfully.
                <br>
                <small>
                    ${model} • ${date} • ${time}
                </small>
            `;

            bookingMessage.className =
                "success-message";


            bookingForm.reset();

            dateInput.min =
                `${year}-${month}-${day}`;


            button.innerHTML =
                originalText;

            button.disabled = false;


        }, 1200);

    }
);