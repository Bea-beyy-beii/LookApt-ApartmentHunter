const bg = document.getElementById("pageBg");

function getPeriod() {

    const hour = new Date().getHours();

    if (hour >= 5 && hour < 11) {
        return "morning";
    }

    if (hour >= 11 && hour < 15) {
        return "midday";
    }

    if (hour >= 15 && hour < 18) {
        return "afternoon";
    }

    return "night";
}


function setTime(period) {

    bg.classList.remove(
        "morning",
        "midday",
        "afternoon",
        "night"
    );

    bg.classList.add(period);
}


function updateTimeOfDay() {
    setTime(getPeriod());
}


updateTimeOfDay();


setInterval(
    updateTimeOfDay,
    60 * 1000
);


/* Testing */

window.setPreview = function(period) {

    const validPeriods = [
        "morning",
        "midday",
        "afternoon",
        "night"
    ];

    if (validPeriods.includes(period)) {
        setTime(period);
    }
};