/* =========================================================
   BMW GALLERY JAVASCRIPT
========================================================= */


/* =========================================================
   BMW DATA
========================================================= */

const bmwModels = [

    {
        id: 1,
        name: "BMW M3 Competition",
        category: "M Series",
        type: "performance",
        priority: "performance",
        engine: "3.0L Twin Turbo",
        power: "503 HP",
        speed: "3.9 SEC",
        topSpeed: "250 KM/H",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=85",
        description: "A legendary high-performance sports sedan built for pure driving pleasure."
    },

    {
        id: 2,
        name: "BMW M4 Competition",
        category: "M Series",
        type: "performance",
        priority: "performance",
        engine: "3.0L Twin Turbo",
        power: "503 HP",
        speed: "3.9 SEC",
        topSpeed: "250 KM/H",
        image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=85",
        description: "A powerful coupe combining aggressive design with exceptional M performance."
    },

    {
        id: 3,
        name: "BMW M5",
        category: "M Series",
        type: "performance",
        priority: "performance",
        engine: "4.4L V8",
        power: "717 HP",
        speed: "3.4 SEC",
        topSpeed: "305 KM/H",
        image: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1000&q=85",
        description: "A high-performance executive sedan combining luxury and extreme power."
    },

    {
        id: 4,
        name: "BMW M8 Competition",
        category: "M Series",
        type: "performance",
        priority: "performance",
        engine: "4.4L V8",
        power: "617 HP",
        speed: "3.0 SEC",
        topSpeed: "305 KM/H",
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1000&q=85",
        description: "BMW's grand touring performance machine with breathtaking acceleration."
    },

    {
        id: 5,
        name: "BMW 3 Series",
        category: "3 Series",
        type: "sedan",
        priority: "comfort",
        engine: "2.0L Turbo",
        power: "255 HP",
        speed: "5.6 SEC",
        topSpeed: "250 KM/H",
        image: "https://images.unsplash.com/photo-1523983300217-8d7f6d7a2b3a?auto=format&fit=crop&w=1000&q=85",
        description: "The iconic BMW sports sedan balancing comfort, technology and driving dynamics."
    },

    {
        id: 6,
        name: "BMW M340i",
        category: "3 Series",
        type: "sedan",
        priority: "performance",
        engine: "3.0L Turbo",
        power: "386 HP",
        speed: "4.1 SEC",
        topSpeed: "250 KM/H",
        image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1000&q=85",
        description: "A performance-focused 3 Series delivering everyday usability and serious speed."
    },

    {
        id: 7,
        name: "BMW 330i",
        category: "3 Series",
        type: "sedan",
        priority: "comfort",
        engine: "2.0L Turbo",
        power: "255 HP",
        speed: "5.6 SEC",
        topSpeed: "250 KM/H",
        image: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1000&q=85",
        description: "A refined sports sedan designed for comfortable daily driving."
    },

    {
        id: 8,
        name: "BMW 5 Series",
        category: "5 Series",
        type: "sedan",
        priority: "luxury",
        engine: "2.0L Turbo",
        power: "255 HP",
        speed: "5.9 SEC",
        topSpeed: "250 KM/H",
        image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1000&q=85",
        description: "Executive luxury, intelligent technology and classic BMW driving dynamics."
    },

    {
        id: 9,
        name: "BMW M550i",
        category: "5 Series",
        type: "performance",
        priority: "performance",
        engine: "4.4L V8",
        power: "523 HP",
        speed: "3.6 SEC",
        topSpeed: "250 KM/H",
        image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1000&q=85",
        description: "Executive luxury meets V8 performance in this powerful sports sedan."
    },

    {
        id: 10,
        name: "BMW 540i",
        category: "5 Series",
        type: "sedan",
        priority: "comfort",
        engine: "3.0L Turbo",
        power: "375 HP",
        speed: "4.9 SEC",
        topSpeed: "250 KM/H",
        image: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1000&q=85",
        description: "A sophisticated executive sedan with smooth power and advanced technology."
    },

    {
        id: 11,
        name: "BMW 7 Series",
        category: "7 Series",
        type: "luxury",
        priority: "luxury",
        engine: "3.0L Turbo",
        power: "375 HP",
        speed: "4.9 SEC",
        topSpeed: "250 KM/H",
        image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=85",
        description: "BMW flagship luxury with extraordinary comfort and technology."
    },

    {
        id: 12,
        name: "BMW i7",
        category: "i Series",
        type: "electric",
        priority: "electric",
        engine: "Dual Electric Motor",
        power: "536 HP",
        speed: "4.5 SEC",
        topSpeed: "240 KM/H",
        image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=1000&q=85",
        description: "All-electric flagship luxury with exceptional technology and refinement."
    },

    {
        id: 13,
        name: "BMW X1",
        category: "X Series",
        type: "suv",
        priority: "comfort",
        engine: "2.0L Turbo",
        power: "241 HP",
        speed: "6.2 SEC",
        topSpeed: "250 KM/H",
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1000&q=85",
        description: "Compact luxury SUV designed for urban adventures and everyday comfort."
    },

    {
        id: 14,
        name: "BMW X3",
        category: "X Series",
        type: "suv",
        priority: "comfort",
        engine: "2.0L Turbo",
        power: "248 HP",
        speed: "6.0 SEC",
        topSpeed: "210 KM/H",
        image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1000&q=85",
        description: "A versatile premium SUV combining comfort, practicality and performance."
    },

    {
        id: 15,
        name: "BMW X5",
        category: "X Series",
        type: "suv",
        priority: "luxury",
        engine: "3.0L Turbo",
        power: "375 HP",
        speed: "5.3 SEC",
        topSpeed: "250 KM/H",
        image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1000&q=85",
        description: "A premium SUV offering commanding presence and refined performance."
    },

    {
        id: 16,
        name: "BMW X6",
        category: "X Series",
        type: "suv",
        priority: "luxury",
        engine: "3.0L Turbo",
        power: "375 HP",
        speed: "5.3 SEC",
        topSpeed: "250 KM/H",
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1000&q=85",
        description: "A bold Sports Activity Coupe with aggressive styling and luxury."
    },

    {
        id: 17,
        name: "BMW X7",
        category: "X Series",
        type: "suv",
        priority: "luxury",
        engine: "3.0L Turbo",
        power: "375 HP",
        speed: "5.6 SEC",
        topSpeed: "250 KM/H",
        image: "https://images.unsplash.com/photo-1568844293986-8c5f8f5a2e45?auto=format&fit=crop&w=1000&q=85",
        description: "BMW's largest SUV delivering three-row luxury and commanding road presence."
    },

    {
        id: 18,
        name: "BMW i4",
        category: "i Series",
        type: "electric",
        priority: "electric",
        engine: "Electric Motor",
        power: "536 HP",
        speed: "3.9 SEC",
        topSpeed: "225 KM/H",
        image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=1000&q=85",
        description: "An all-electric Gran Coupe combining performance with zero-emission driving."
    },

    {
        id: 19,
        name: "BMW i5",
        category: "i Series",
        type: "electric",
        priority: "electric",
        engine: "Dual Electric Motor",
        power: "593 HP",
        speed: "3.8 SEC",
        topSpeed: "230 KM/H",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1000&q=85",
        description: "The electric executive sedan bringing innovation to the 5 Series."
    },

    {
        id: 20,
        name: "BMW iX",
        category: "i Series",
        type: "electric",
        priority: "electric",
        engine: "Dual Electric Motor",
        power: "516 HP",
        speed: "4.6 SEC",
        topSpeed: "200 KM/H",
        image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1000&q=85",
        description: "A futuristic electric SUV built around technology and sustainable performance."
    },

    {
        id: 21,
        name: "BMW Z4",
        category: "Z Series",
        type: "roadster",
        priority: "performance",
        engine: "3.0L Turbo",
        power: "382 HP",
        speed: "3.9 SEC",
        topSpeed: "250 KM/H",
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=85",
        description: "A classic two-seat roadster built for open-air driving."
    },

    {
        id: 22,
        name: "BMW M2",
        category: "M Series",
        type: "performance",
        priority: "performance",
        engine: "3.0L Twin Turbo",
        power: "453 HP",
        speed: "4.1 SEC",
        topSpeed: "285 KM/H",
        image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=85",
        description: "Compact M performance with a focus on pure driver engagement."
    },

    {
        id: 23,
        name: "BMW M8 Coupe",
        category: "M Series",
        type: "performance",
        priority: "performance",
        engine: "4.4L V8",
        power: "617 HP",
        speed: "3.0 SEC",
        topSpeed: "305 KM/H",
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1000&q=85",
        description: "A luxurious high-performance coupe with extraordinary power."
    },

    {
        id: 24,
        name: "BMW 7 Series M Sport",
        category: "7 Series",
        type: "luxury",
        priority: "luxury",
        engine: "3.0L Turbo",
        power: "375 HP",
        speed: "4.9 SEC",
        topSpeed: "250 KM/H",
        image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=85",
        description: "Executive flagship luxury with sporty M styling."
    },

    {
        id: 25,
        name: "BMW X3 M",
        category: "X Series",
        type: "suv",
        priority: "performance",
        engine: "3.0L Twin Turbo",
        power: "473 HP",
        speed: "3.7 SEC",
        topSpeed: "285 KM/H",
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1000&q=85",
        description: "A performance SUV combining practicality with serious M power."
    },

    {
        id: 26,
        name: "BMW X5 M",
        category: "X Series",
        type: "suv",
        priority: "performance",
        engine: "4.4L V8",
        power: "617 HP",
        speed: "3.7 SEC",
        topSpeed: "285 KM/H",
        image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1000&q=85",
        description: "High-performance SUV power combined with premium luxury."
    },

    {
        id: 27,
        name: "BMW 840i",
        category: "5 Series",
        type: "coupe",
        priority: "luxury",
        engine: "3.0L Turbo",
        power: "335 HP",
        speed: "4.9 SEC",
        topSpeed: "250 KM/H",
        image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1000&q=85",
        description: "Elegant grand touring performance with luxurious refinement."
    },

    {
        id: 28,
        name: "BMW iX M60",
        category: "i Series",
        type: "electric",
        priority: "electric",
        engine: "Dual Electric Motor",
        power: "610 HP",
        speed: "3.8 SEC",
        topSpeed: "250 KM/H",
        image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1000&q=85",
        description: "Electric SUV performance with impressive acceleration and technology."
    },

    {
        id: 29,
        name: "BMW M4 CSL",
        category: "M Series",
        type: "performance",
        priority: "performance",
        engine: "3.0L Twin Turbo",
        power: "543 HP",
        speed: "3.7 SEC",
        topSpeed: "307 KM/H",
        image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=85",
        description: "A lightweight limited-production M car focused on track performance."
    },

    {
        id: 30,
        name: "BMW Z4 M40i",
        category: "Z Series",
        type: "roadster",
        priority: "performance",
        engine: "3.0L Turbo",
        power: "382 HP",
        speed: "3.9 SEC",
        topSpeed: "250 KM/H",
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=85",
        description: "A powerful roadster designed for open-air performance."
    }

];


/* =========================================================
   ELEMENTS
========================================================= */

const grid =
    document.getElementById("modelGrid");

const searchInput =
    document.getElementById("searchInput");

const modelCount =
    document.getElementById("modelCount");

const noResults =
    document.getElementById("noResults");

const favoritesOnly =
    document.getElementById("favoritesOnly");

const filterButtons =
    document.querySelectorAll(".filter-btn");


let currentCategory = "all";


/* =========================================================
   FAVORITES
========================================================= */

let favorites =
    JSON.parse(
        localStorage.getItem(
            "bmwFavorites"
        )
    ) || [];


/* =========================================================
   RENDER MODELS
========================================================= */

function renderModels() {

    const search =
        searchInput.value
            .trim()
            .toLowerCase();


    let filtered =
        bmwModels.filter(model => {


            const matchesSearch =

                model.name
                    .toLowerCase()
                    .includes(search)

                ||

                model.category
                    .toLowerCase()
                    .includes(search)

                ||

                model.type
                    .toLowerCase()
                    .includes(search);


            const matchesCategory =

                currentCategory === "all"

                ||

                model.category ===
                currentCategory;


            const matchesFavorite =

                !favoritesOnly.checked

                ||

                favorites.includes(
                    model.id
                );


            return (
                matchesSearch &&
                matchesCategory &&
                matchesFavorite
            );

        });


    grid.innerHTML = "";


    modelCount.textContent =
        filtered.length;


    if (filtered.length === 0) {

        noResults.classList.add(
            "show"
        );

        return;

    }


    noResults.classList.remove(
        "show"
    );


    filtered.forEach(model => {

        const isFavorite =
            favorites.includes(
                model.id
            );


        const card =
            document.createElement(
                "article"
            );


        card.className =
            "model-card";


        card.innerHTML = `

            <div class="card-image">

                <img
                    src="${model.image}"
                    alt="${model.name}"
                    loading="lazy"
                >

                <div
                    class="card-overlay"
                ></div>


                <button
                    class="favorite-btn ${
                        isFavorite
                            ? "favorited"
                            : ""
                    }"
                    data-id="${model.id}"
                    title="Favorite"
                >
                    ${
                        isFavorite
                            ? "♥"
                            : "♡"
                    }
                </button>

            </div>


            <div class="card-content">

                <span
                    class="card-category"
                >
                    ${model.category}
                </span>


                <h3>
                    ${model.name}
                </h3>


                <p
                    class="card-description"
                >
                    ${model.description}
                </p>


                <div class="card-specs">

                    <div>

                        <span>
                            Power
                        </span>

                        <strong>
                            ${model.power}
                        </strong>

                    </div>


                    <div>

                        <span>
                            0-100
                        </span>

                        <strong>
                            ${model.speed}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Engine
                        </span>

                        <strong>
                            ${model.engine.split(" ")[0]}
                        </strong>

                    </div>

                </div>


                <button
                    class="view-btn"
                    data-id="${model.id}"
                >
                    VIEW DETAILS →
                </button>

            </div>

        `;


        grid.appendChild(card);

    });


    attachCardEvents();

}


/* =========================================================
   CARD EVENTS
========================================================= */

function attachCardEvents() {


    document
        .querySelectorAll(
            ".favorite-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    const id =
                        Number(
                            button.dataset.id
                        );

                    toggleFavorite(id);

                }
            );

        });


    document
        .querySelectorAll(
            ".view-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        Number(
                            button.dataset.id
                        );

                    openModal(id);

                }
            );

        });

}


/* =========================================================
   FAVORITE
========================================================= */

function toggleFavorite(id) {

    if (
        favorites.includes(id)
    ) {

        favorites =
            favorites.filter(
                item => item !== id
            );

    } else {

        favorites.push(id);

    }


    localStorage.setItem(
        "bmwFavorites",
        JSON.stringify(favorites)
    );


    renderModels();

}


/* =========================================================
   FILTER
========================================================= */

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            filterButtons.forEach(
                btn =>
                    btn.classList.remove(
                        "active"
                    )
            );


            button.classList.add(
                "active"
            );


            currentCategory =
                button.dataset.category;


            renderModels();

        }
    );

});


/* =========================================================
   SEARCH
========================================================= */

searchInput.addEventListener(
    "input",
    renderModels
);


/* =========================================================
   FAVORITES FILTER
========================================================= */

favoritesOnly.addEventListener(
    "change",
    renderModels
);


/* =========================================================
   MODAL
========================================================= */

const modal =
    document.getElementById(
        "modelModal"
    );

const modalImage =
    document.getElementById(
        "modalImage"
    );

const modalName =
    document.getElementById(
        "modalName"
    );

const modalCategory =
    document.getElementById(
        "modalCategory"
    );

const modalDescription =
    document.getElementById(
        "modalDescription"
    );

const modalEngine =
    document.getElementById(
        "modalEngine"
    );

const modalPower =
    document.getElementById(
        "modalPower"
    );

const modalSpeed =
    document.getElementById(
        "modalSpeed"
    );

const modalTopSpeed =
    document.getElementById(
        "modalTopSpeed"
    );

const modalClose =
    document.getElementById(
        "modalClose"
    );

const modalFavorite =
    document.getElementById(
        "modalFavorite"
    );


let currentModalId = null;


/* OPEN */

function openModal(id) {

    const model =
        bmwModels.find(
            item => item.id === id
        );


    if (!model) return;


    currentModalId = id;


    modalImage.src =
        model.image;


    modalImage.alt =
        model.name;


    modalName.textContent =
        model.name;


    modalCategory.textContent =
        model.category;


    modalDescription.textContent =
        model.description;


    modalEngine.textContent =
        model.engine;


    modalPower.textContent =
        model.power;


    modalSpeed.textContent =
        model.speed;


    modalTopSpeed.textContent =
        model.topSpeed;


    updateModalFavorite();


    modal.classList.add(
        "show"
    );


    document.body.style.overflow =
        "hidden";

}


/* CLOSE */

function closeModal() {

    modal.classList.remove(
        "show"
    );


    document.body.style.overflow =
        "";

}


modalClose.addEventListener(
    "click",
    closeModal
);


document
    .querySelector(".modal-overlay")
    .addEventListener(
        "click",
        closeModal
    );


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeModal();

        }

    }
);


/* =========================================================
   MODAL FAVORITE
========================================================= */

function updateModalFavorite() {

    if (
        favorites.includes(
            currentModalId
        )
    ) {

        modalFavorite.textContent =
            "♥ Remove from Favorites";

    } else {

        modalFavorite.textContent =
            "♡ Add to Favorites";

    }

}


modalFavorite.addEventListener(
    "click",
    () => {

        toggleFavorite(
            currentModalId
        );

        updateModalFavorite();

    }
);


/* =========================================================
   BMW FINDER
========================================================= */

const finderType =
    document.getElementById(
        "finderType"
    );

const finderPriority =
    document.getElementById(
        "finderPriority"
    );

const findBmwBtn =
    document.getElementById(
        "findBmwBtn"
    );

const finderResult =
    document.getElementById(
        "finderResult"
    );

const finderName =
    document.getElementById(
        "finderName"
    );

const finderDescription =
    document.getElementById(
        "finderDescription"
    );

const finderViewBtn =
    document.getElementById(
        "finderViewBtn"
    );


let recommendedModel = null;


/* FIND BMW */

findBmwBtn.addEventListener(
    "click",
    () => {

        const type =
            finderType.value;

        const priority =
            finderPriority.value;


        let matches =
            bmwModels.filter(
                model => {

                    const typeMatch =

                        type === "all"

                        ||

                        (
                            type ===
                            "M Series"

                            &&
                            model.category ===
                            "M Series"
                        )

                        ||

                        (
                            type ===
                            "X Series"

                            &&
                            model.category ===
                            "X Series"
                        )

                        ||

                        (
                            type ===
                            "3 Series"

                            &&
                            model.category ===
                            "3 Series"
                        )

                        ||

                        (
                            type ===
                            "i Series"

                            &&
                            model.category ===
                            "i Series"
                        )

                        ||

                        (
                            type ===
                            "Z Series"

                            &&
                            model.category ===
                            "Z Series"
                        );


                    return typeMatch;

                }
            );


        const priorityMatches =
            matches.filter(
                model =>
                    model.priority ===
                    priority
            );


        if (
            priorityMatches.length
        ) {

            matches =
                priorityMatches;

        }


        recommendedModel =
            matches[
                Math.floor(
                    Math.random() *
                    matches.length
                )
            ];


        if (!recommendedModel) {

            recommendedModel =
                bmwModels[0];

        }


        finderName.textContent =
            recommendedModel.name;


        finderDescription.textContent =
            recommendedModel.description;


        finderResult.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }
);


/* VIEW RECOMMENDED BMW */

finderViewBtn.addEventListener(
    "click",
    () => {

        if (
            recommendedModel
        ) {

            openModal(
                recommendedModel.id
            );

        }

    }
);


/* =========================================================
   INITIAL RENDER
========================================================= */

renderModels();