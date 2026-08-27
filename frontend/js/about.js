document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       REVIEW SEARCH
    ================================================= */

    const searchInput =
        document.getElementById("reviewSearch");

    const reviewCards =
        document.querySelectorAll(".review-card");

    const noReviews =
        document.getElementById("noReviews");


    searchInput.addEventListener("input", () => {

        const searchValue =
            searchInput.value.toLowerCase().trim();

        let visibleReviews = 0;


        reviewCards.forEach(card => {

            const reviewText =
                card.dataset.review.toLowerCase();

            if (reviewText.includes(searchValue)) {

                card.style.display = "block";

                visibleReviews++;

            } else {

                card.style.display = "none";

            }

        });


        if (visibleReviews === 0) {

            noReviews.style.display = "block";

        } else {

            noReviews.style.display = "none";

        }

    });



    /* =================================================
       LIKE BUTTON
    ================================================= */

    const likeButtons =
        document.querySelectorAll(".like-btn");


    likeButtons.forEach(button => {

        button.addEventListener("click", () => {

            const count =
                button.querySelector("span");

            let likes =
                parseInt(count.textContent);


            if (button.classList.contains("liked")) {

                likes--;

                button.classList.remove("liked");

                button.firstChild.textContent = "♡ ";

            } else {

                likes++;

                button.classList.add("liked");

                button.firstChild.textContent = "♥ ";

            }


            count.textContent = likes;

        });

    });



    /* =================================================
       STAR SELECTOR
    ================================================= */

    const starButtons =
        document.querySelectorAll(
            "#starSelector button"
        );

    let selectedRating = 0;


    starButtons.forEach(button => {

        button.addEventListener("click", () => {

            selectedRating =
                parseInt(button.dataset.rating);


            starButtons.forEach(star => {

                const rating =
                    parseInt(star.dataset.rating);


                if (rating <= selectedRating) {

                    star.classList.add("selected");

                } else {

                    star.classList.remove("selected");

                }

            });

        });

    });



    /* =================================================
       REVIEW FORM
    ================================================= */

    const reviewForm =
        document.getElementById("reviewForm");

    const reviewMessage =
        document.getElementById("reviewMessage");


    reviewForm.addEventListener("submit", event => {

        event.preventDefault();


        const name =
            document.getElementById(
                "reviewerName"
            ).value.trim();


        const car =
            document.getElementById(
                "carModel"
            ).value.trim();


        const text =
            document.getElementById(
                "reviewText"
            ).value.trim();


        if (selectedRating === 0) {

            reviewMessage.textContent =
                "Please select a rating.";

            reviewMessage.className =
                "review-message error";

            return;

        }


        const stars =
            "★".repeat(selectedRating) +
            "☆".repeat(5 - selectedRating);


        const initials =
            name
                .split(" ")
                .map(word => word.charAt(0))
                .join("")
                .substring(0, 2)
                .toUpperCase();


        const reviewCard =
            document.createElement("article");


        reviewCard.className =
            "review-card new-review";


        reviewCard.dataset.review =
            text.toLowerCase();


        reviewCard.innerHTML = `

            <div class="review-top">

                <div class="reviewer">

                    <div class="avatar">
                        ${initials}
                    </div>

                    <div>

                        <h3>
                            ${escapeHTML(name)}
                        </h3>

                        <span>
                            New Driver ✓
                        </span>

                    </div>

                </div>

                <span class="review-date">
                    Just now
                </span>

            </div>


            <div class="stars">
                ${stars}
            </div>


            <p class="review-text">
                "${escapeHTML(text)}"
            </p>


            <div class="review-bottom">

                <span class="car-model">
                    🚘 ${escapeHTML(car)}
                </span>

                <button
                    class="like-btn"
                    type="button"
                >
                    ♡ <span>0</span>
                </button>

            </div>

        `;


        const reviewGrid =
            document.getElementById(
                "reviewsGrid"
            );


        reviewGrid.prepend(reviewCard);


        /* Add like functionality */

        const likeButton =
            reviewCard.querySelector(
                ".like-btn"
            );


        likeButton.addEventListener(
            "click",
            () => {

                const count =
                    likeButton.querySelector(
                        "span"
                    );

                let likes =
                    parseInt(
                        count.textContent
                    );


                if (
                    likeButton.classList
                        .contains("liked")
                ) {

                    likes--;

                    likeButton.classList
                        .remove("liked");

                    likeButton.firstChild
                        .textContent = "♡ ";

                } else {

                    likes++;

                    likeButton.classList
                        .add("liked");

                    likeButton.firstChild
                        .textContent = "♥ ";

                }


                count.textContent = likes;

            }
        );


        reviewMessage.textContent =
            "✓ Your review has been published!";


        reviewMessage.className =
            "review-message success";


        reviewForm.reset();


        selectedRating = 0;


        starButtons.forEach(star => {

            star.classList.remove(
                "selected"
            );

        });

    });



    /* =================================================
       HTML ESCAPE
    ================================================= */

    function escapeHTML(value) {

        const div =
            document.createElement("div");

        div.textContent = value;

        return div.innerHTML;

    }

});