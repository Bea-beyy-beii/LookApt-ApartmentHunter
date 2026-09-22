document.addEventListener("DOMContentLoaded", () => {

    const tabLinks = document.querySelectorAll(".tab-link");
    const tabSections = document.querySelectorAll(".dashboard-tab");


    function showTab(tabName, updateURL = true) {

        tabSections.forEach(section => {

            section.hidden = section.dataset.section !== tabName;

        });


        tabLinks.forEach(link => {

            link.classList.toggle(
                "active",
                link.dataset.tab === tabName
            );

        });


        if (updateURL) {

            const newURL = `?tab=${tabName}`;

            window.history.pushState(
                { tab: tabName },
                "",
                newURL
            );

        }

    }


    function getCurrentTab() {

        const params = new URLSearchParams(
            window.location.search
        );

        return params.get("tab") || "home";

    }


    tabLinks.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            const tabName = link.dataset.tab;

            showTab(tabName);

        });

    });


    window.addEventListener("popstate", () => {

        showTab(getCurrentTab(), false);

    });


    showTab(getCurrentTab(), false);

});