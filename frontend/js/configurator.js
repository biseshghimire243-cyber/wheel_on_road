document.addEventListener("DOMContentLoaded", () => {
    // 1. Core DOM Elements
    const car360Frame = document.getElementById("car360Frame");
    const carStage = document.getElementById("carStage");
    const angleValue = document.getElementById("angleValue");
    const colorSwatches = document.querySelectorAll(".color-swatch");
    const colorLabel = document.getElementById("colorLabel");
    const ambientGlow = document.getElementById("ambientGlow");
    const dragOverlay = document.getElementById("dragOverlay");
    const showcaseVideo = document.querySelector(".video-wrapper video");

    // 2. Multi-Angle Image Database Per Color
    const carDatabase = {
        white: [
            "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1000",
            "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1000",
            "https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg?auto=compress&cs=tinysrgb&w=1000",
            "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1000"
        ],
        blue: [
            "https://images.pexels.com/photos/1008659/pexels-photo-1008659.jpeg?auto=compress&cs=tinysrgb&w=1000",
            "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1000",
            "https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg?auto=compress&cs=tinysrgb&w=1000",
            "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1000"
        ],
        black: [
            "https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1000",
            "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1000",
            "https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg?auto=compress&cs=tinysrgb&w=1000",
            "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1000"
        ],
        red: [
            "https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=1000",
            "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1000",
            "https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg?auto=compress&cs=tinysrgb&w=1000",
            "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1000"
        ],
        grey: [
            "https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=1000",
            "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1000",
            "https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg?auto=compress&cs=tinysrgb&w=1000",
            "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1000"
        ]
    };

    let currentColor = "white";
    let currentFrameIndex = 0;
    let isDragging = false;
    let startX = 0;

    // Preload image cache for smooth frame switches
    Object.values(carDatabase).forEach(colorSet => {
        colorSet.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    });

    // 3. Color Selection Handler
    colorSwatches.forEach(swatch => {
        swatch.addEventListener("click", () => {
            colorSwatches.forEach(s => s.classList.remove("active"));
            swatch.classList.add("active");

            currentColor = swatch.getAttribute("data-color");
            const name = swatch.getAttribute("data-name");
            const bgGlow = swatch.getAttribute("data-bg");

            colorLabel.textContent = name;
            ambientGlow.style.background = bgGlow;

            updateCarFrame();
        });
    });

    // 4. 360-Degree Drag Controller
    const handleDragStart = (clientX) => {
        isDragging = true;
        startX = clientX;
        dragOverlay.style.opacity = "0.2";
    };

    const handleDragMove = (clientX) => {
        if (!isDragging) return;

        const deltaX = clientX - startX;
        const dragThreshold = 35; // Pixels required to step to the next frame

        if (Math.abs(deltaX) > dragThreshold) {
            const framesCount = carDatabase[currentColor].length;

            if (deltaX < 0) {
                currentFrameIndex = (currentFrameIndex + 1) % framesCount;
            } else {
                currentFrameIndex = (currentFrameIndex - 1 + framesCount) % framesCount;
            }

            updateCarFrame();
            startX = clientX;
        }
    };

    const handleDragEnd = () => {
        isDragging = false;
        dragOverlay.style.opacity = "1";
    };

    // Mouse Drag Listeners
    carStage.addEventListener("mousedown", (e) => handleDragStart(e.clientX));
    window.addEventListener("mousemove", (e) => handleDragMove(e.clientX));
    window.addEventListener("mouseup", handleDragEnd);

    // Touch Drag Listeners (Mobile / Tablet)
    carStage.addEventListener("touchstart", (e) => handleDragStart(e.touches[0].clientX));
    window.addEventListener("touchmove", (e) => handleDragMove(e.touches[0].clientX));
    window.addEventListener("touchend", handleDragEnd);

    // Render Update Function
    function updateCarFrame() {
        const frameList = carDatabase[currentColor];
        car360Frame.src = frameList[currentFrameIndex];

        const degrees = Math.round((currentFrameIndex / frameList.length) * 360);
        angleValue.textContent = `${degrees}°`;
    }

    // 5. Video Autoplay Fallback & Policy Handling
    if (showcaseVideo) {
        showcaseVideo.muted = true;
        const playPromise = showcaseVideo.play();

        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Handle autoplay block gracefully if triggered by browser security restrictions
                console.warn("Autoplay blocked by browser. User interaction required.");
            });
        }
    }
});