/* =========================================================
   RENTER DASHBOARD
   Small UI interactions
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------------
       Save listing
    ----------------------------------------- */

    const saveButtons = document.querySelectorAll(".save-listing");

    saveButtons.forEach(button => {

        button.addEventListener("click", () => {

            button.classList.toggle("saved");

        });

    });


    /* -----------------------------------------
       Map category buttons
    ----------------------------------------- */

    const mapCategories = document.querySelectorAll(".map-category");

    mapCategories.forEach(button => {

        button.addEventListener("click", () => {

            mapCategories.forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");

        });

    });


    /* -----------------------------------------
       Search
    ----------------------------------------- */

    const searchInput =
        document.querySelector(".dashboard-search input");

    const listingCards =
        document.querySelectorAll(".listing-card");

    if (searchInput) {

        searchInput.addEventListener("input", () => {

            const searchValue =
                searchInput.value.toLowerCase().trim();

            listingCards.forEach(card => {

                const cardText =
                    card.textContent.toLowerCase();

                card.style.display =
                    cardText.includes(searchValue)
                        ? ""
                        : "none";

            });

        });

    }

});