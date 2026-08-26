/* ==================================================
   BMW JOURNEY
   Interactive Journey Dashboard
================================================== */


/* ==================================================
   API
================================================== */

const API_URL = "/api/journeys";


/* ==================================================
   DOM ELEMENTS
================================================== */

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

const centerMapBtn =
    document.getElementById("centerMapBtn");

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

const mapCount =
    document.getElementById("mapCount");


/* ==================================================
   MAP VARIABLES
================================================== */

let journeyMap = null;

let mapMarkers = [];

let journeys = [];


/* ==================================================
   INITIALIZE MAP
================================================== */

function initializeMap() {

    const mapElement =
        document.getElementById("journeyMap");


    if (!mapElement) {

        console.error(
            "Journey map element not found."
        );

        return;

    }


    journeyMap =
        L.map("journeyMap");


    /* =========================
       OPEN STREET MAP
    ========================== */

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {

            maxZoom: 19,

            attribution:
                "&copy; OpenStreetMap contributors"

        }
    ).addTo(journeyMap);


    /* =========================
       DEFAULT LOCATION
       Kathmandu
    ========================== */

    journeyMap.setView(
        [27.7172, 85.3240],
        7
    );

}


/* ==================================================
   CLEAR MAP
================================================== */

function clearMap() {

    mapMarkers.forEach(
        marker => {

            journeyMap.removeLayer(
                marker
            );

        }
    );


    mapMarkers = [];

}


/* ==================================================
   DISPLAY MAP MARKERS
================================================== */

function displayJourneyMarkers(
    journeyList
) {

    if (!journeyMap) {

        return;

    }


    clearMap();


    if (
        !journeyList ||
        journeyList.length === 0
    ) {

        mapCount.textContent =
            "0 locations";

        return;

    }


    const validJourneys =
        journeyList.filter(
            journey => {

                const latitude =
                    Number(
                        journey.latitude
                    );

                const longitude =
                    Number(
                        journey.longitude
                    );


                return (
                    Number.isFinite(
                        latitude
                    ) &&
                    Number.isFinite(
                        longitude
                    )
                );

            }
        );


    validJourneys.forEach(
        journey => {


            const latitude =
                Number(
                    journey.latitude
                );


            const longitude =
                Number(
                    journey.longitude
                );


            /* =========================
               CREATE MARKER
            ========================== */

            const marker =
                L.marker([
                    latitude,
                    longitude
                ]);


            marker.addTo(
                journeyMap
            );


            /* =========================
               FORMAT DATE
            ========================== */

            let dateText =
                "Unknown";


            if (
                journey.created_at
            ) {

                dateText =
                    new Date(
                        journey.created_at
                    ).toLocaleString(
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
               POPUP
            ========================== */

            marker.bindPopup(`

                <div class="map-popup">

                    <h3>
                        🚗 Journey #${journey.id}
                    </h3>


                    <p>
                        <strong>
                            Distance:
                        </strong>

                        ${Number(
                            journey.distance
                        ).toFixed(2)} KM
                    </p>


                    <p>
                        <strong>
                            Latitude:
                        </strong>

                        ${latitude.toFixed(6)}
                    </p>


                    <p>
                        <strong>
                            Longitude:
                        </strong>

                        ${longitude.toFixed(6)}
                    </p>


                    <p>
                        <strong>
                            Date:
                        </strong>

                        ${dateText}
                    </p>

                </div>

            `);


            mapMarkers.push(
                marker
            );

        }
    );


    /* =========================
       MAP COUNT
    ========================== */

    mapCount.textContent =
        `${validJourneys.length} location${
            validJourneys.length === 1
                ? ""
                : "s"
        }`;


    /* =========================
       FIT MAP TO MARKERS
    ========================== */

    if (
        mapMarkers.length > 0
    ) {

        const group =
            L.featureGroup(
                mapMarkers
            );


        journeyMap.fitBounds(
            group.getBounds(),
            {
                padding: [40, 40],

                maxZoom: 13
            }
        );

    }

}


/* ==================================================
   LOAD JOURNEYS
================================================== */

async function loadJourneys() {

    try {


        tableBody.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    class="loading"
                >
                    Loading journeys...
                </td>

            </tr>

        `;


        const response =
            await fetch(
                API_URL
            );


        if (!response.ok) {

            throw new Error(
                `Server returned ${response.status}`
            );

        }


        const data =
            await response.json();


        if (!data.success) {

            throw new Error(
                data.message ||
                "Unable to load journeys."
            );

        }


        journeys =
            data.journeys || [];


        /* =========================
           UPDATE TABLE
        ========================== */

        displayJourneys(
            journeys
        );


        /* =========================
           UPDATE STATISTICS
        ========================== */

        updateStatistics(
            journeys
        );


        /* =========================
           UPDATE MAP
        ========================== */

        displayJourneyMarkers(
            journeys
        );


    }

    catch (error) {


        console.error(
            "Load journeys error:",
            error
        );


        tableBody.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    class="loading"
                >
                    ❌ Failed to load journeys.
                </td>

            </tr>

        `;

    }

}


/* ==================================================
   DISPLAY JOURNEYS IN TABLE
================================================== */

function displayJourneys(
    journeyList
) {


    if (
        !journeyList ||
        journeyList.length === 0
    ) {


        tableBody.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    class="loading"
                >
                    No journeys recorded yet.
                </td>

            </tr>

        `;


        return;

    }


    tableBody.innerHTML =
        journeyList.map(
            (journey, index) => {


                const distance =
                    Number(
                        journey.distance
                    );


                const latitude =
                    Number(
                        journey.latitude
                    );


                const longitude =
                    Number(
                        journey.longitude
                    );


                return `

                    <tr>

                        <td>
                            ${index + 1}
                        </td>


                        <td>

                            <strong>
                                ${distance.toFixed(2)}
                            </strong>

                            KM

                        </td>


                        <td>
                            ${latitude.toFixed(6)}
                        </td>


                        <td>
                            ${longitude.toFixed(6)}
                        </td>


                        <td>
                            ${formatDate(
                                journey.created_at
                            )}
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

            }
        ).join("");

}


/* ==================================================
   UPDATE STATISTICS
================================================== */

function updateStatistics(
    journeyList
) {


    totalJourneys.textContent =
        journeyList.length;


    const total =
        journeyList.reduce(
            (
                sum,
                journey
            ) => {

                return (
                    sum +
                    Number(
                        journey.distance
                    )
                );

            },
            0
        );


    totalDistance.textContent =
        total.toFixed(2);


    if (
        journeyList.length > 0
    ) {

        locationStatus.textContent =
            `${journeyList.length} saved`;

    }

    else {

        locationStatus.textContent =
            "Standby";

    }

}


/* ==================================================
   FORMAT DATE
================================================== */

function formatDate(
    dateString
) {


    if (!dateString) {

        return "N/A";

    }


    const date =
        new Date(
            dateString
        );


    if (
        isNaN(
            date.getTime()
        )
    ) {

        return "N/A";

    }


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


/* ==================================================
   SAVE JOURNEY
================================================== */

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


        /* =========================
           VALIDATION
        ========================== */

        if (
            distance === "" ||
            latitude === "" ||
            longitude === ""
        ) {

            showMessage(
                "Please fill in all fields.",
                "error"
            );

            return;

        }


        if (
            Number(distance) < 0
        ) {

            showMessage(
                "Distance cannot be negative.",
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

                        body:
                            JSON.stringify({

                                distance:
                                    Number(
                                        distance
                                    ),

                                latitude:
                                    Number(
                                        latitude
                                    ),

                                longitude:
                                    Number(
                                        longitude
                                    )

                            })

                    }
                );


            const data =
                await response.json();


            if (
                !response.ok ||
                !data.success
            ) {

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


            await loadJourneys();

        }


        catch (error) {


            console.error(
                "Save journey error:",
                error
            );


            showMessage(
                error.message ||
                "Failed to save journey.",
                "error"
            );

        }

    }
);


/* ==================================================
   DELETE JOURNEY
================================================== */

async function deleteJourney(
    id
) {


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


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Failed to delete journey."
            );

        }


        showMessage(
            "✓ Journey deleted successfully.",
            "success"
        );


        await loadJourneys();

    }


    catch (error) {


        console.error(
            "Delete journey error:",
            error
        );


        showMessage(
            error.message ||
            "Failed to delete journey.",
            "error"
        );

    }

}


/* ==================================================
   GET CURRENT GPS LOCATION
================================================== */

locationBtn.addEventListener(
    "click",
    function () {


        if (
            !navigator.geolocation
        ) {


            showMessage(
                "Geolocation is not supported by your browser.",
                "error"
            );


            return;

        }


        locationBtn.disabled =
            true;


        locationBtn.textContent =
            "📍 Locating...";


        locationStatus.textContent =
            "Locating...";


        navigator.geolocation.getCurrentPosition(

            function (position) {


                const latitude =
                    position.coords.latitude;


                const longitude =
                    position.coords.longitude;


                /* =========================
                   PUT GPS INTO FORM
                ========================== */

                latitudeInput.value =
                    latitude.toFixed(8);


                longitudeInput.value =
                    longitude.toFixed(8);


                /* =========================
                   UPDATE STATUS
                ========================== */

                locationStatus.textContent =
                    "Located";


                /* =========================
                   MOVE MAP
                ========================== */

                if (
                    journeyMap
                ) {


                    journeyMap.setView(
                        [
                            latitude,
                            longitude
                        ],
                        15
                    );


                    /*
                     * Temporary current
                     * location marker
                     */

                    const currentMarker =
                        L.marker([
                            latitude,
                            longitude
                        ]).addTo(
                            journeyMap
                        );


                    currentMarker.bindPopup(`

                        <div class="map-popup">

                            <h3>
                                📍 Your Location
                            </h3>

                            <p>
                                <strong>
                                    Latitude:
                                </strong>

                                ${latitude.toFixed(6)}
                            </p>

                            <p>
                                <strong>
                                    Longitude:
                                </strong>

                                ${longitude.toFixed(6)}
                            </p>

                        </div>

                    `);


                    currentMarker.openPopup();


                    setTimeout(
                        function () {

                            if (
                                journeyMap.hasLayer(
                                    currentMarker
                                )
                            ) {

                                journeyMap.removeLayer(
                                    currentMarker
                                );

                            }

                        },
                        10000
                    );

                }


                locationBtn.disabled =
                    false;


                locationBtn.textContent =
                    "📍 Get My Location";


                showMessage(
                    "✓ Your current location has been detected.",
                    "success"
                );

            },


            function (error) {


                console.error(
                    "GPS error:",
                    error
                );


                locationBtn.disabled =
                    false;


                locationBtn.textContent =
                    "📍 Get My Location";


                locationStatus.textContent =
                    "Unavailable";


                let errorMessage =
                    "Unable to get your location.";


                if (
                    error.code ===
                    error.PERMISSION_DENIED
                ) {

                    errorMessage =
                        "Location permission was denied.";

                }


                else if (
                    error.code ===
                    error.POSITION_UNAVAILABLE
                ) {

                    errorMessage =
                        "Your location is currently unavailable.";

                }


                else if (
                    error.code ===
                    error.TIMEOUT
                ) {

                    errorMessage =
                        "Location request timed out.";

                }


                showMessage(
                    errorMessage,
                    "error"
                );

            },


            {

                enableHighAccuracy:
                    true,

                timeout:
                    10000,

                maximumAge:
                    0

            }

        );

    }
);


/* ==================================================
   SHOW ALL JOURNEYS
================================================== */

centerMapBtn.addEventListener(
    "click",
    function () {


        if (
            !journeyMap ||
            mapMarkers.length === 0
        ) {


            showMessage(
                "There are no journey locations to display.",
                "error"
            );


            return;

        }


        const group =
            L.featureGroup(
                mapMarkers
            );


        journeyMap.fitBounds(
            group.getBounds(),
            {

                padding: [
                    40,
                    40
                ],

                maxZoom: 13

            }
        );

    }
);


/* ==================================================
   REFRESH BUTTON
================================================== */

refreshBtn.addEventListener(
    "click",
    async function () {


        refreshBtn.disabled =
            true;


        refreshBtn.textContent =
            "↻ Loading...";


        await loadJourneys();


        refreshBtn.disabled =
            false;


        refreshBtn.textContent =
            "↻ Refresh";

    }
);


/* ==================================================
   SHOW MESSAGE
================================================== */

function showMessage(
    text,
    type
) {


    message.textContent =
        text;


    message.className =
        type === "success"
            ? "message-success"
            : "message-error";


    setTimeout(
        function () {

            message.textContent =
                "";

            message.className =
                "";

        },
        4000
    );

}


/* ==================================================
   START APPLICATION
================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =========================
           START MAP
        ========================== */

        initializeMap();


        /* =========================
           LOAD DATABASE JOURNEYS
        ========================== */

        loadJourneys();

    }
);