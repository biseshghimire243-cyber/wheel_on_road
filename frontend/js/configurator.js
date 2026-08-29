document.addEventListener("DOMContentLoaded", () => {
    // --- DOM Elements ---
    const carImage = document.getElementById("carImage");
    const previewModel = document.getElementById("previewModel");
    const powerSpec = document.getElementById("power");
    const accelSpec = document.getElementById("acceleration");

    const summaryModel = document.getElementById("summaryModel");
    const summaryColor = document.getElementById("summaryColor");
    const summaryWheels = document.getElementById("summaryWheels");
    const summaryInterior = document.getElementById("summaryInterior");
    const totalPriceEl = document.getElementById("totalPrice");

    const modelBtns = document.querySelectorAll(".model-option");
    const colorBtns = document.querySelectorAll(".color-option");
    const wheelInputs = document.querySelectorAll('input[name="wheels"]');
    const interiorBtns = document.querySelectorAll(".interior-option");

    const bookButton = document.getElementById("bookButton");
    const resetButton = document.getElementById("resetButton");

    // --- Configurator State ---
    const state = {
        basePrice: 109900,
        colorPrice: 0,
        wheelPrice: 0,
        interiorPrice: 0
    };

    // --- Helper Functions ---
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0
        }).format(amount);
    };

    const updateTotalPrice = () => {
        const total = state.basePrice + state.colorPrice + state.wheelPrice + state.interiorPrice;
        totalPriceEl.textContent = formatCurrency(total);
    };

    // --- Event Handlers ---

    // 1. Model Selection
    modelBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            modelBtns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const modelName = btn.dataset.model;
            const price = parseInt(btn.dataset.price, 10);
            const imageSrc = btn.dataset.image;
            const power = btn.dataset.power;
            const accel = btn.dataset.acceleration;

            // Update UI
            previewModel.textContent = modelName;
            summaryModel.textContent = modelName;
            carImage.src = imageSrc;
            powerSpec.textContent = power;
            accelSpec.textContent = accel;

            // Update Price
            state.basePrice = price;
            updateTotalPrice();
        });
    });

    // 2. Color Selection
    colorBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            colorBtns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const colorName = btn.dataset.color;
            const addPrice = parseInt(btn.dataset.add, 10);

            summaryColor.textContent = colorName;
            state.colorPrice = addPrice;
            updateTotalPrice();
        });
    });

    // 3. Wheel Selection
    wheelInputs.forEach((input) => {
        input.addEventListener("change", (e) => {
            // Update active styling on cards
            document.querySelectorAll(".select-card").forEach((card) => {
                card.classList.remove("active");
            });
            e.target.closest(".select-card").classList.add("active");

            const wheelName = e.target.value;
            const price = parseInt(e.target.dataset.price, 10);

            summaryWheels.textContent = wheelName;
            state.wheelPrice = price;
            updateTotalPrice();
        });
    });

    // 4. Interior Selection
    interiorBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            interiorBtns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const interiorName = btn.dataset.interior;
            const price = parseInt(btn.dataset.price, 10);

            summaryInterior.textContent = interiorName;
            state.interiorPrice = price;
            updateTotalPrice();
        });
    });

    // 5. Booking Action
    bookButton.addEventListener("click", () => {
        const currentModel = summaryModel.textContent;
        const currentTotal = totalPriceEl.textContent;
        alert(`Proceeding to book ${currentModel} valued at ${currentTotal}!`);
    });

    // 6. Reset Configuration
    resetButton.addEventListener("click", () => {
        // Trigger click on first items of each group to reset to default
        modelBtns[0].click();
        colorBtns[0].click();
        wheelInputs[0].click();
        interiorBtns[0].click();
    });
});