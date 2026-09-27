document.addEventListener("DOMContentLoaded", () => {

    const tabLinks = document.querySelectorAll(".tab-link");
    const tabSections = document.querySelectorAll(".dashboard-tab");

    // Not a dashboard page: leave the links alone
    if (tabSections.length === 0) return;

    function showTab(tabName, updateURL = true) {

        tabSections.forEach(section => {
            section.hidden = section.dataset.section !== tabName;
        });

        tabLinks.forEach(link => {
            link.classList.toggle("active", link.dataset.tab === tabName);
        });

        if (updateURL) {
            window.history.pushState({ tab: tabName }, "", `?tab=${tabName}`);
        }
    }

    function getCurrentTab() {
        const params = new URLSearchParams(window.location.search);
        return params.get("tab") || "home";
    }

    tabLinks.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            showTab(link.dataset.tab);
        });
    });

    window.addEventListener("popstate", () => {
        showTab(getCurrentTab(), false);
    });

    showTab(getCurrentTab(), false);
});