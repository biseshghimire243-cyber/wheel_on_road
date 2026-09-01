document.addEventListener('DOMContentLoaded', () => {
    const basePrice = 78100;

    // DOM Elements
    const totalPriceEl = document.getElementById('totalPrice');
    const basePriceEl = document.getElementById('basePrice');
    const optionsPriceEl = document.getElementById('optionsPrice');
    const summaryTotalEl = document.getElementById('summaryTotal');
    const colorLabel = document.getElementById('colorLabel');
    const ambientGlow = document.getElementById('ambientGlow');

    // Spec Elements
    const horsepowerEl = document.getElementById('horsepower');
    const accelerationEl = document.getElementById('acceleration');
    const engineNameEl = document.getElementById('engineName');

    // Summary Display Elements
    const summaryColor = document.getElementById('summaryColor');
    const summaryEngine = document.getElementById('summaryEngine');
    const summaryWheels = document.getElementById('summaryWheels');
    const summaryInterior = document.getElementById('summaryInterior');
    const summaryPackages = document.getElementById('summaryPackages');

    // Interactive Controls
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const engineInputs = document.querySelectorAll('input[name="engine"]');
    const wheelInputs = document.querySelectorAll('input[name="wheels"]');
    const interiorInputs = document.querySelectorAll('input[name="interior"]');
    const packageInputs = document.querySelectorAll('.package');

    // 360 Viewer Controls
    const carStage = document.getElementById('carStage');
    const car360Frame = document.getElementById('car360Frame');
    const angleValue = document.getElementById('angleValue');
    let currentAngle = 0;
    let isDragging = false;
    let startX = 0;

    // Calculate Dynamic Prices & Features
    function updateConfiguration() {
        let optionsTotal = 0;

        // Color
        const selectedColor = document.querySelector('.color-swatch.active');
        const colorPrice = parseInt(selectedColor.dataset.price);
        const colorHex = selectedColor.dataset.hex;
        colorLabel.textContent = selectedColor.dataset.name;
        summaryColor.textContent = selectedColor.dataset.name;
        ambientGlow.style.background = colorHex;
        optionsTotal += colorPrice;

        // Engine
        const selectedEngine = document.querySelector('input[name="engine"]:checked');
        const enginePrice = parseInt(selectedEngine.dataset.price);
        optionsTotal += enginePrice;
        summaryEngine.textContent = selectedEngine.value;
        horsepowerEl.textContent = selectedEngine.dataset.hp;
        accelerationEl.textContent = selectedEngine.dataset.acceleration;
        engineNameEl.textContent = selectedEngine.value.split(' ')[1]?.toUpperCase() || 'TURBO';

        // Wheels
        const selectedWheels = document.querySelector('input[name="wheels"]:checked');
        optionsTotal += parseInt(selectedWheels.dataset.price);
        summaryWheels.textContent = selectedWheels.value;

        // Interior
        const selectedInterior = document.querySelector('input[name="interior"]:checked');
        optionsTotal += parseInt(selectedInterior.dataset.price);
        summaryInterior.textContent = selectedInterior.value;

        // Packages
        const selectedPackages = [];
        packageInputs.forEach(pkg => {
            if (pkg.checked) {
                optionsTotal += parseInt(pkg.dataset.price);
                selectedPackages.push(pkg.value);
            }
        });
        summaryPackages.textContent = selectedPackages.length > 0 ? selectedPackages.join(', ') : 'None';

        // Update Totals
        const finalPrice = basePrice + optionsTotal;
        const formattedTotal = `$${finalPrice.toLocaleString()}`;
        
        totalPriceEl.textContent = formattedTotal;
        optionsPriceEl.textContent = `$${optionsTotal.toLocaleString()}`;
        summaryTotalEl.textContent = formattedTotal;
    }

    // Radio Card Activation State UI
    function handleOptionCardSelection(inputs) {
        inputs.forEach(input => {
            input.addEventListener('change', (e) => {
                inputs.forEach(i => i.closest('.option')?.classList.remove('active'));
                if (e.target.checked) {
                    e.target.closest('.option')?.classList.add('active');
                }
                updateConfiguration();
            });
        });
    }

    handleOptionCardSelection(engineInputs);
    handleOptionCardSelection(wheelInputs);
    handleOptionCardSelection(interiorInputs);

    packageInputs.forEach(pkg => pkg.addEventListener('change', updateConfiguration));

    // Color Swatch Selection
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            colorSwatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
            updateConfiguration();
        });
    });

    // Interactive 360 Drag rotation simulator
    carStage.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
    });

    window.addEventListener('mouseup', () => isDragging = false);

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - startX;
        currentAngle = (currentAngle + Math.round(deltaX / 5)) % 360;
        if (currentAngle < 0) currentAngle += 360;
        
        angleValue.textContent = `${currentAngle}°`;
        car360Frame.style.transform = `rotateY(${currentAngle / 10}deg)`; // Subtle visual feedback
        startX = e.clientX;
    });

    // Control Buttons
    document.getElementById('rotateLeft').addEventListener('click', () => {
        currentAngle = (currentAngle - 15 + 360) % 360;
        angleValue.textContent = `${currentAngle}°`;
    });

    document.getElementById('rotateRight').addEventListener('click', () => {
        currentAngle = (currentAngle + 15) % 360;
        angleValue.textContent = `${currentAngle}°`;
    });

    document.getElementById('resetRotation').addEventListener('click', () => {
        currentAngle = 0;
        angleValue.textContent = `0°`;
        car360Frame.style.transform = `rotateY(0deg)`;
    });

    // Initial calculation initialization
    updateConfiguration();
});