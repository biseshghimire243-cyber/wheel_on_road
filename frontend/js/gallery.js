/* ==========================================
   BMW JOURNEY - GALLERY
   ========================================== */


/* ==========================================
   BMW MODEL DATABASE
   ========================================== */

const bmwModels = [

    {
        name: "BMW M3",
        series: "M SERIES",
        year: "2025",
        type: "Performance Sedan",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=85",
        description: "A legendary high-performance sedan combining everyday usability with serious M performance."
    },

    {
        name: "BMW M4",
        series: "M SERIES",
        year: "2025",
        type: "Performance Coupe",
        image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=900&q=85",
        description: "A striking performance coupe engineered for precision, speed and aggressive driving."
    },

    {
        name: "BMW M5",
        series: "M SERIES",
        year: "2025",
        type: "Performance Sedan",
        image: "https://images.unsplash.com/photo-1523983302122-73e869e1f850?auto=format&fit=crop&w=900&q=85",
        description: "Executive luxury meets extraordinary performance in BMW's iconic M5."
    },

    {
        name: "BMW M8",
        series: "M SERIES",
        year: "2025",
        type: "Luxury Performance",
        image: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=900&q=85",
        description: "A premium grand tourer delivering dramatic design and exceptional performance."
    },

    {
        name: "BMW X3",
        series: "X SERIES",
        year: "2025",
        type: "Luxury SUV",
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=85",
        description: "A versatile premium SUV designed for both urban adventures and long journeys."
    },

    {
        name: "BMW X5",
        series: "X SERIES",
        year: "2025",
        type: "Luxury SUV",
        image: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=900&q=85",
        description: "One of BMW's most iconic SUVs combining luxury, comfort and confident road presence."
    },

    {
        name: "BMW X6",
        series: "X SERIES",
        year: "2025",
        type: "Sports Activity Coupe",
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=85",
        description: "Bold coupe-inspired styling combined with the versatility of an SUV."
    },

    {
        name: "BMW X7",
        series: "X SERIES",
        year: "2025",
        type: "Luxury SUV",
        image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=900&q=85",
        description: "BMW's flagship SUV offering three-row luxury and commanding road presence."
    },

    {
        name: "BMW i4",
        series: "BMW i",
        year: "2025",
        type: "Electric Gran Coupe",
        image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=900&q=85",
        description: "Electric performance with the unmistakable character of a BMW Gran Coupe."
    },

    {
        name: "BMW i5",
        series: "BMW i",
        year: "2025",
        type: "Electric Sedan",
        image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=900&q=85",
        description: "A premium electric sedan combining advanced technology with executive comfort."
    },

    {
        name: "BMW i7",
        series: "BMW i",
        year: "2025",
        type: "Electric Luxury Sedan",
        image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=900&q=85",
        description: "The electric flagship of BMW's luxury sedan family."
    },

    {
        name: "BMW i8",
        series: "BMW i",
        year: "2020",
        type: "Hybrid Sports Car",
        image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=85",
        description: "A futuristic plug-in hybrid sports car remembered for its dramatic design."
    },

    {
        name: "BMW 3 Series",
        series: "3 SERIES",
        year: "2025",
        type: "Sports Sedan",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=85",
        description: "One of BMW's most celebrated sports sedans, balancing luxury and driving dynamics."
    },

    {
        name: "BMW 5 Series",
        series: "5 SERIES",
        year: "2025",
        type: "Executive Sedan",
        image: "https://images.unsplash.com/photo-1523983302122-73e869e1f850?auto=format&fit=crop&w=900&q=85",
        description: "Executive comfort, modern technology and classic BMW driving dynamics."
    },

    {
        name: "BMW 7 Series",
        series: "7 SERIES",
        year: "2025",
        type: "Luxury Sedan",
        image: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=900&q=85",
        description: "BMW's flagship luxury sedan featuring advanced technology and exceptional comfort."
    }

];


/* ==========================================
   ELEMENTS
   ========================================== */

const searchInput =
    document.getElementById("modelSearch");

const clearButton =
    document.getElementById("clearSearch");

const modelGrid =
    document.getElementById("modelGrid");

const resultsSection =
    document.getElementById("resultsSection");

const searchStatus =
    document.getElementById("searchStatus");

const noResults =
    document.getElementById("noResults");

const resultCount =
    document.getElementById("resultCount");

const suggestions =
    document.getElementById("suggestions");


/* ==========================================
   SUGGESTIONS
   ========================================== */

const popularModels = [
    "BMW M3",
    "BMW M4",
    "BMW X5",
    "BMW X7",
    "BMW i8",
    "BMW 3 Series",
    "BMW 7 Series"
];


popularModels.forEach(model => {

    const button =
        document.createElement("button");

    button.className = "suggestion";

    button.textContent = model;

    button.type = "button";

    button.addEventListener("click", () => {

        searchInput.value = model;

        searchModels();

        searchInput.focus();

    });

    suggestions.appendChild(button);

});


/* ==========================================
   SEARCH FUNCTION
   ========================================== */

function searchModels() {

    const searchValue =
        searchInput.value
            .trim()
            .toLowerCase();


    /*
       IMPORTANT:

       If search box is empty,
       hide ALL BMW pictures.
    */

    if (searchValue === "") {

        modelGrid.innerHTML = "";

        resultsSection.classList.add("hidden");

        noResults.classList.add("hidden");

        searchStatus.classList.remove("hidden");

        resultCount.textContent = "0 Models";

        return;
    }


    /* ======================================
       FIND MATCHING MODELS
       ====================================== */

    const matches =
        bmwModels.filter(model => {

            return (
                model.name.toLowerCase().includes(searchValue) ||
                model.series.toLowerCase().includes(searchValue) ||
                model.type.toLowerCase().includes(searchValue)
            );

        });


    /* ======================================
       NO RESULTS
       ====================================== */

    if (matches.length === 0) {

        modelGrid.innerHTML = "";

        resultsSection.classList.add("hidden");

        searchStatus.classList.add("hidden");

        noResults.classList.remove("hidden");

        resultCount.textContent = "0 Models";

        return;
    }


    /* ======================================
       RESULTS FOUND
       ====================================== */

    searchStatus.classList.add("hidden");

    noResults.classList.add("hidden");

    resultsSection.classList.remove("hidden");


    resultCount.textContent =
        `${matches.length} Model${matches.length !== 1 ? "s" : ""}`;


    modelGrid.innerHTML = "";


    matches.forEach((model, index) => {

        const card =
            document.createElement("article");

        card.className = "model-card";

        card.style.animationDelay =
            `${index * 0.06}s`;


        card.innerHTML = `

            <div class="image-wrapper">

                <img
                    src="${model.image}"
                    alt="${model.name}"
                    class="model-image"
                    loading="lazy"
                >

                <span class="series-badge">
                    ${model.series}
                </span>

            </div>


            <div class="model-content">

                <h3>
                    ${model.name}
                </h3>

                <div class="model-year">
                    ${model.year}
                </div>

                <p class="model-description">
                    ${model.description}
                </p>


                <div class="model-footer">

                    <span class="model-type">
                        ${model.type}
                    </span>

                    <span class="explore-btn">
                        BMW MODEL →
                    </span>

                </div>

            </div>

        `;


        modelGrid.appendChild(card);

    });

}


/* ==========================================
   LIVE SEARCH
   ========================================== */

searchInput.addEventListener(
    "input",
    searchModels
);


/* ==========================================
   CLEAR SEARCH
   ========================================== */

clearButton.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        searchModels();

        searchInput.focus();

    }
);


/* ==========================================
   KEYBOARD SHORTCUT
   ========================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "/" &&
            document.activeElement !== searchInput
        ) {

            event.preventDefault();

            searchInput.focus();

        }

        if (
            event.key === "Escape" &&
            document.activeElement === searchInput
        ) {

            searchInput.value = "";

            searchModels();

        }

    }
);


/* ==========================================
   INITIAL STATE
   ========================================== */

searchModels();