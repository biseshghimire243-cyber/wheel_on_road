const API_URL = "/api/journeys";


/* =========================
   DOM ELEMENTS
========================= */

const journeyForm =
    document.getElementById("journeyForm");

const distanceInput =
    document.getElementById("distance");

const latitudeInput =
    document.getElementById("latitude");

const longitudeInput =
    document.getElementById("longitude");

const locationBtn =
    document.getElementById("locationBtn");

const refreshBtn =
    document.getElementById("refreshBtn");

const tableBody =
    document.getElementById("journeyTableBody");

const message =
    document.getElementById("message");

const totalJourneys =
    document.getElementById("totalJourneys");

const totalDistance =
    document.getElementById("totalDistance");

const locationStatus =
    document.getElementById("locationStatus");


/* =========================
   LOAD JOURNEYS
========================= */

async function loadJourneys() {

    try {

        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="loading">
                    Loading journeys...
                </td>
            </tr>
        `;


        const response =
            await fetch(API_URL);


        const data =
            await response.json();


        if (!data.success) {

            throw new Error(
                data.message || "Failed to load journeys."
            );

        }


        displayJourneys(data.journeys);

        updateStatistics(data.journeys);


    } catch (error) {

        console.error(error);

        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="loading">
                    ❌ Failed to load journeys.
                </td>
            </tr>
        `;

    }

}


/* =========================
   DISPLAY JOURNEYS
========================= */

function displayJourneys(journeys) {

    if (!journeys || journeys.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="loading">
                    No journeys recorded yet.
                </td>
            </tr>
        `;

        return;
    }


    tableBody.innerHTML =
        journeys.map((journey, index) => {

            const date =
                formatDate(journey.created_at);


            return `
                <tr>

                    <td>
                        ${index + 1}
                    </td>

                    <td>
                        <strong>
                            ${Number(journey.distance).toFixed(2)}
                        </strong>
                        km
                    </td>

                    <td>
                        ${Number(journey.latitude).toFixed(6)}
                    </td>

                    <td>
                        ${Number(journey.longitude).toFixed(6)}
                    </td>

                    <td>
                        ${date}
                    </td>

                    <td>

                        <button
                            class="delete-btn"
                            onclick="deleteJourney(${journey.id})"
                        >
                            Delete
                        </button>

                    </td>

                </tr>
            `;

        }).join("");

}


/* =========================
   UPDATE STATISTICS
========================= */

function updateStatistics(journeys) {

    totalJourneys.textContent =
        journeys.length;


    const distance =
        journeys.reduce(
            (total, journey) =>
                total + Number(journey.distance),
            0
        );


    totalDistance.textContent =
        distance.toFixed(2);

}


/* =========================
   FORMAT DATE
========================= */

function formatDate(dateString) {

    if (!dateString) {
        return "N/A";
    }


    const date =
        new Date(dateString);


    return date.toLocaleString(
        "en-US",
        {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }
    );

}


/* =========================
   SAVE JOURNEY
========================= */

journeyForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const distance =
            distanceInput.value.trim();

        const latitude =
            latitudeInput.value.trim();

        const longitude =
            longitudeInput.value.trim();


        if (
            !distance ||
            !latitude ||
            !longitude
        ) {

            showMessage(
                "Please fill in all fields.",
                "error"
            );

            return;
        }


        try {

            const response =
                await fetch(
                    API_URL,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            distance:
                                Number(distance),

                            latitude:
                                Number(latitude),

                            longitude:
                                Number(longitude)

                        })

                    }
                );


            const data =
                await response.json();


            if (!response.ok || !data.success) {

                throw new Error(
                    data.message ||
                    "Failed to save journey."
                );

            }


            showMessage(
                "✓ Journey saved successfully!",
                "success"
            );


            journeyForm.reset();


            locationStatus.textContent =
                "Waiting";


            await loadJourneys();


        } catch (error) {

            console.error(error);

            showMessage(
                error.message ||
                "Failed to save journey.",
                "error"
            );

        }

    }
);


/* =========================
   DELETE JOURNEY
========================= */

async function deleteJourney(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this journey?"
        );


    if (!confirmed) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/${id}`,
                {
                    method: "DELETE"
                }
            );


        const data =
            await response.json();


        if (!response.ok || !data.success) {

            throw new Error(
                data.message ||
                "Failed to delete journey."
            );

        }


        showMessage(
            "Journey deleted successfully.",
            "success"
        );


        await loadJourneys();


    } catch (error) {

        console.error(error);

        showMessage(
            error.message ||
            "Failed to delete journey.",
            "error"
        );

    }

}


/* =========================
   GET GPS LOCATION
========================= */

locationBtn.addEventListener(
    "click",
    function () {

        if (!navigator.geolocation) {

            showMessage(
                "Geolocation is not supported by your browser.",
                "error"
            );

            return;
        }


        locationStatus.textContent =
            "Locating...";


        locationBtn.disabled = true;

        locationBtn.textContent =
            "📍 Locating...";


        navigator.geolocation.getCurrentPosition(

            function (position) {

                const latitude =
                    position.coords.latitude;

                const longitude =
                    position.coords.longitude;


                latitudeInput.value =
                    latitude.toFixed(8);

                longitudeInput.value =
                    longitude.toFixed(8);


                locationStatus.textContent =
                    "Located";


                locationBtn.disabled = false;

                locationBtn.textContent =
                    "📍 Get My Location";


                showMessage(
                    "✓ Your current location has been added.",
                    "success"
                );

            },


            function (error) {

                console.error(error);


                locationStatus.textContent =
                    "Unavailable";


                locationBtn.disabled = false;

                locationBtn.textContent =
                    "📍 Get My Location";


                showMessage(
                    "Unable to get your location. Please allow location access.",
                    "error"
                );

            },

            {
                enableHighAccuracy: true,

                timeout: 10000,

                maximumAge: 0
            }

        );

    }
);


/* =========================
   REFRESH
========================= */

refreshBtn.addEventListener(
    "click",
    loadJourneys
);


/* =========================
   SHOW MESSAGE
========================= */

function showMessage(
    text,
    type
) {

    message.textContent = text;

    message.className =
        type === "success"
            ? "message-success"
            : "message-error";


    setTimeout(
        function () {

            message.textContent = "";

            message.className = "";

        },
        4000
    );

}


/* =========================
   INITIAL LOAD
========================= */

loadJourneys();