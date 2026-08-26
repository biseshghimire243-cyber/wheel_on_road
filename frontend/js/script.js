document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const startBtn = document.getElementById('startJourney');
    const distanceEl = document.getElementById('distance');
    const progressEl = document.getElementById('progress');
    const statusEl = document.getElementById('status');
    const completedSection = document.getElementById('completed');

    // Configuration
    const TARGET_DISTANCE = 5.00; // Total KM target
    const DURATION_MS = 6000;     // Animation duration (6 seconds)
    const FRAME_RATE_MS = 16;     // ~60 FPS update interval

    let animationInterval = null;
    let currentDistance = 0.00;

    // Start Tracker Animation
    function startTracking() {
        if (animationInterval) return; // Prevent multiple instances

        // Reset display state
        currentDistance = 0.00;
        updateUI(0, 'Driving in progress...');
        startBtn.disabled = true;
        startBtn.innerText = 'DRIVING...';
        completedSection.style.display = 'none';

        // Smooth scrolling to the tracking panel
        document.getElementById('journey').scrollIntoView({ behavior: 'smooth' });

        const incrementPerFrame = TARGET_DISTANCE / (DURATION_MS / FRAME_RATE_MS);

        animationInterval = setInterval(() => {
            currentDistance += incrementPerFrame;

            if (currentDistance >= TARGET_DISTANCE) {
                currentDistance = TARGET_DISTANCE;
                clearInterval(animationInterval);
                animationInterval = null;
                onJourneyComplete();
            } else {
                updateUI(currentDistance, 'Driving in progress...');
            }
        }, FRAME_RATE_MS);
    }

    // Update Text and Visual Indicators
    function updateUI(distance, statusText) {
        // Update numerical distance text
        distanceEl.innerHTML = `${distance.toFixed(2)} <small>KM</small>`;
        
        // Calculate dynamic width percentage
        const progressPercent = Math.min((distance / TARGET_DISTANCE) * 100, 100);
        progressEl.style.width = `${progressPercent}%`;
        
        // Update status text
        if (statusEl) {
            statusEl.innerText = statusText;
        }
    }

    // Handle Completion Sequence
    function onJourneyComplete() {
        updateUI(TARGET_DISTANCE, 'Destination Reached!');
        startBtn.disabled = false;
        startBtn.innerText = 'RESTART JOURNEY';

        // Reveal completed section smoothly
        completedSection.style.display = 'flex';
        setTimeout(() => {
            completedSection.scrollIntoView({ behavior: 'smooth' });
        }, 300);
    }

    // Event Listener
    if (startBtn) {
        startBtn.addEventListener('click', startTracking);
    }
});


