const startButton =
    document.getElementById("startJourney");

const distanceDisplay =
    document.getElementById("distance");

const statusDisplay =
    document.getElementById("status");

const progress =
    document.getElementById("progress");

const completedMessage =
    document.getElementById("completedMessage");


/*
    Distance required to complete journey
*/
const DISTANCE_LIMIT = 5;


/*
    Current journey information
*/
let previousPosition = null;

let totalDistance = 0;

let journeyStarted = false;

let journeyCompleted = false;


/* ==============================
   CALCULATE DISTANCE
================================ */

function calculateDistance(
    lat1,
    lon1,
    lat2,
    lon2
) {

    const earthRadius = 6371;

    const dLat =
        (lat2 - lat1) *
        Math.PI / 180;

    const dLon =
        (lon2 - lon1) *
        Math.PI / 180;


    const a =
        Math.sin(dLat / 2) *
        Math.sin(dLat / 2)

        +

        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *

        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);


    const c =
        2 *
        Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );


    return earthRadius * c;
}


/* ==============================
   START JOURNEY
================================ */

startButton.addEventListener(
    "click",
    startJourney
);


function startJourney() {

    if (journeyStarted) {
        return;
    }


    if (!navigator.geolocation) {

        statusDisplay.textContent =
            "GPS is not supported by your browser.";

        return;
    }


    journeyStarted = true;

    startButton.disabled = true;

    startButton.textContent =
        "JOURNEY IN PROGRESS";


    statusDisplay.textContent =
        "Tracking your journey...";


    navigator.geolocation.watchPosition(

        handlePosition,

        handleLocationError,

        {
            enableHighAccuracy: true,

            maximumAge: 0,

            timeout: 10000
        }

    );
}


/* ==============================
   HANDLE GPS POSITION
================================ */

function handlePosition(position) {

    const latitude =
        position.coords.latitude;

    const longitude =
        position.coords.longitude;


    if (previousPosition !== null) {

        const distance =
            calculateDistance(

                previousPosition.latitude,

                previousPosition.longitude,

                latitude,

                longitude

            );


        /*
            Ignore large GPS jumps.
            This prevents incorrect distance
            calculations.
        */

        if (distance < 1) {

            totalDistance += distance;
        }
    }


    previousPosition = {

        latitude: latitude,

        longitude: longitude

    };


    updateDistance();


    if (
        totalDistance >= DISTANCE_LIMIT
        &&
        !journeyCompleted
    ) {

        completeJourney();
    }
}


/* ==============================
   UPDATE DISTANCE
================================ */

function updateDistance() {

    distanceDisplay.textContent =
        totalDistance.toFixed(2) + " KM";


    let percentage =
        (totalDistance / DISTANCE_LIMIT) * 100;


    if (percentage > 100) {
        percentage = 100;
    }


    progress.style.width =
        percentage + "%";
}


/* ==============================
   JOURNEY COMPLETE
================================ */

function completeJourney() {

    journeyCompleted = true;


    statusDisplay.textContent =
        "Journey completed successfully!";


    startButton.textContent =
        "JOURNEY COMPLETED";


    completedMessage.textContent =
        "You have completed your 5 KM journey. Enjoy the road!";


    document
        .getElementById("completed")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* ==============================
   LOCATION ERROR
================================ */

function handleLocationError(error) {

    if (error.code === 1) {

        statusDisplay.textContent =
            "Please allow location access to track your journey.";

    }

    else if (error.code === 2) {

        statusDisplay.textContent =
            "Unable to determine your location.";

    }

    else if (error.code === 3) {

        statusDisplay.textContent =
            "Location request timed out.";

    }

    else {

        statusDisplay.textContent =
            "Unable to track your journey.";
    }


    startButton.disabled = false;

    startButton.textContent =
        "START JOURNEY";

    journeyStarted = false;
}


/* ==============================
   TESTING MODE
================================ */

/*
    During development, you can use:

    const DISTANCE_LIMIT = 0.01;

    instead of:

    const DISTANCE_LIMIT = 5;

    This allows you to test the completion
    without actually travelling 5 KM.
*/