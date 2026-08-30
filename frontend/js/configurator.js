document.addEventListener("DOMContentLoaded", () => {
    const car360Frame = document.getElementById("car360Frame");
    const carStage = document.getElementById("carStage");
    const angleValue = document.getElementById("angleValue");
    const colorSwatches = document.querySelectorAll(".color-swatch");
    const colorLabel = document.getElementById("colorLabel");
    const ambientGlow = document.getElementById("ambientGlow");
    const dragOverlay = document.getElementById("dragOverlay");

    // Sample multi-angle image frames per color option
    const carDatabase = {
        white: [
            "https://m.atcdn.co.uk/vms/res/028c792194d34bcfa8a0026e9ed3d1b7.jpg",
            "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=80"
        ],
        blue: [
            "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1000&q=80",
            "https://m.atcdn.co.uk/vms/res/028c792194d34bcfa8a0026e9ed3d1b7.jpg"
        ],
        black: [
            "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=80",
            "https://m.atcdn.co.uk/vms/res/028c792194d34bcfa8a0026e9ed3d1b7.jpg",
            "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80"
        ],
        red: [
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80"
        ],
        grey: [
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=80"
        ]
    };

    let currentColor = "white";
    let currentFrameIndex = 0;
    let isDragging = false;
    let startX = 0;

    // Preload image sets into cache for smooth frame swaps
    Object.values(carDatabase).forEach(colorSet => {
        colorSet.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    });

    // 1. Color Switch Logic
    colorSwatches.forEach(swatch => {
        swatch.addEventListener("click", () => {
            colorSwatches.forEach(s => s.classList.remove("active"));
            swatch.classList.add("active");

            currentColor = swatch.getAttribute("data-color");
            const name = swatch.getAttribute("data-name");
            const bgGlow = swatch.getAttribute("data-bg");

            // Update details and ambient light floor color
            colorLabel.textContent = name;
            ambientGlow.style.background = bgGlow;

            // Render updated color frame
            updateCarFrame();
        });
    });

    // 2. 360-Degree Mouse & Touch Drag Rotation
    const handleDragStart = (clientX) => {
        isDragging = true;
        startX = clientX;
        dragOverlay.style.opacity = "0.2";
    };

    const handleDragMove = (clientX) => {
        if (!isDragging) return;

        const deltaX = clientX - startX;
        const dragThreshold = 40; // Pixels moved to trigger frame step

        if (Math.abs(deltaX) > dragThreshold) {
            const framesCount = carDatabase[currentColor].length;

            if (deltaX < 0) {
                // Dragging Left -> Rotate Clockwise
                currentFrameIndex = (currentFrameIndex + 1) % framesCount;
            } else {
                // Dragging Right -> Rotate Counter-Clockwise
                currentFrameIndex = (currentFrameIndex - 1 + framesCount) % framesCount;
            }

            updateCarFrame();
            startX = clientX; // Reset anchor position for next frame transition
        }
    };

    const handleDragEnd = () => {
        isDragging = false;
        dragOverlay.style.opacity = "1";
    };

    // Mouse Listeners
    carStage.addEventListener("mousedown", (e) => handleDragStart(e.clientX));
    window.addEventListener("mousemove", (e) => handleDragMove(e.clientX));
    window.addEventListener("mouseup", handleDragEnd);

    // Touch Listeners for Mobile Compatibility
    carStage.addEventListener("touchstart", (e) => handleDragStart(e.touches[0].clientX));
    window.addEventListener("touchmove", (e) => handleDragMove(e.touches[0].clientX));
    window.addEventListener("touchend", handleDragEnd);

    // Render helper function
    function updateCarFrame() {
        const frameList = carDatabase[currentColor];
        car360Frame.src = frameList[currentFrameIndex];

        // Calculate virtual angle for angle indicator text
        const degrees = Math.round((currentFrameIndex / frameList.length) * 360);
        angleValue.textContent = `${degrees}°`;
    }
});