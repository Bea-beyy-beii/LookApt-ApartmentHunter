/* =========================================================
   REPORT MODAL
   ========================================================= */

let currentReportStep = 1;

const MAX_STEPS = 3;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_FILE_TYPES = [
    "image/png",
    "image/jpeg",
    "application/pdf"
];


/* =========================================================
   OPEN MODAL
   ========================================================= */

function openReportModal() {

    const modal = document.getElementById("reportModal");

    if (!modal) {
        return;
    }

    modal.classList.add("active");

    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    currentReportStep = 1;

    updateReportStep();
}


/* =========================================================
   CLOSE MODAL
   ========================================================= */

function closeReportModal() {

    const modal = document.getElementById("reportModal");

    if (!modal) {
        return;
    }

    modal.classList.remove("active");

    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    resetReportForm();
}


/* =========================================================
   RESET FORM
   ========================================================= */

function resetReportForm() {

    const form = document.getElementById("reportForm");

    if (form) {
        form.reset();
    }

    currentReportStep = 1;

    updateReportStep();

    updateCharacterCount();

    hideOtherCategory();

    const uploadedFiles = document.getElementById("uploadedFiles");

    if (uploadedFiles) {
        uploadedFiles.innerHTML = "";
    }

    selectedFiles = [];
}


/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        const modal = document.getElementById("reportModal");

        if (modal && modal.classList.contains("active")) {
            closeReportModal();
        }

    }

});


/* =========================================================
   STEP NAVIGATION
   ========================================================= */

function nextReportStep() {

    if (!validateCurrentStep()) {
        return;
    }

    if (currentReportStep < MAX_STEPS) {

        currentReportStep++;

        updateReportStep();

        if (currentReportStep === 3) {
            fillReviewStep();
        }

    }

}


function previousReportStep() {

    if (currentReportStep > 1) {

        currentReportStep--;

        updateReportStep();

    }

}


/* =========================================================
   UPDATE STEP UI
   ========================================================= */

function updateReportStep() {

    const steps = document.querySelectorAll(
        ".report-step"
    );

    const indicators = document.querySelectorAll(
        ".step-indicator"
    );

    steps.forEach(function (step) {

        const stepNumber = Number(
            step.dataset.stepContent
        );

        step.classList.toggle(
            "active",
            stepNumber === currentReportStep
        );

    });


    indicators.forEach(function (indicator) {

        const stepNumber = Number(
            indicator.dataset.step
        );

        indicator.classList.toggle(
            "active",
            stepNumber === currentReportStep
        );

        indicator.classList.toggle(
            "completed",
            stepNumber < currentReportStep
        );

    });


    /* Back button */

    const backButton = document.getElementById(
        "backStepBtn"
    );

    if (backButton) {

        backButton.style.display =
            currentReportStep === 1
                ? "none"
                : "block";

    }


    /* Next button */

    const nextButton = document.getElementById(
        "nextStepBtn"
    );

    if (nextButton) {

        nextButton.style.display =
            currentReportStep === MAX_STEPS
                ? "none"
                : "block";

    }


    /* Submit button */

    const submitButton = document.getElementById(
        "submitReportBtn"
    );

    if (submitButton) {

        submitButton.style.display =
            currentReportStep === MAX_STEPS
                ? "block"
                : "none";

    }

}


/* =========================================================
   VALIDATION
   ========================================================= */

function validateCurrentStep() {

    if (currentReportStep === 1) {
        return validateStepOne();
    }

    if (currentReportStep === 2) {
        return validateStepTwo();
    }

    return true;
}


/* =========================================================
   STEP 1 VALIDATION
   ========================================================= */

function validateStepOne() {

    const category = document.getElementById(
        "reportCategory"
    );

    const reportedUser = document.getElementById(
        "reportedUser"
    );

    const description = document.getElementById(
        "reportDescription"
    );

    if (!category || !reportedUser || !description) {
        return true;
    }


    /* Category */

    if (!category.value) {

        showValidationMessage(
            category,
            "Please select a report category."
        );

        return false;
    }


    /* Others */

    if (category.value === "Others") {

        const otherCategory = document.getElementById(
            "otherCategory"
        );

        if (
            otherCategory &&
            !otherCategory.value.trim()
        ) {

            showValidationMessage(
                otherCategory,
                "Please specify your report reason."
            );

            return false;
        }

    }


    /* Reported user */

    if (!reportedUser.value) {

        showValidationMessage(
            reportedUser,
            "Please select the person you are reporting."
        );

        return false;
    }


    /* Description */

    if (!description.value.trim()) {

        showValidationMessage(
            description,
            "Please provide details about your report."
        );

        return false;
    }


    return true;
}


/* =========================================================
   STEP 2 VALIDATION
   ========================================================= */

function validateStepTwo() {

    /*
        Evidence is currently optional.

        If you want evidence to be REQUIRED later,
        change this function.
    */

    return true;
}


/* =========================================================
   VALIDATION MESSAGE
   ========================================================= */

function showValidationMessage(
    element,
    message
) {

    alert(message);

    element.focus();
}


/* =========================================================
   CHARACTER COUNTER
   ========================================================= */

function updateCharacterCount() {

    const textarea = document.getElementById(
        "reportDescription"
    );

    const counter = document.getElementById(
        "characterCount"
    );

    if (!textarea || !counter) {
        return;
    }

    const length = textarea.value.length;

    counter.textContent = `${length}/500`;

}


/* =========================================================
   CHARACTER COUNTER EVENT
   ========================================================= */

document.addEventListener(
    "input",
    function (event) {

        if (
            event.target.id ===
            "reportDescription"
        ) {

            updateCharacterCount();

        }

    }
);


/* =========================================================
   OTHERS FIELD
   ========================================================= */

function showOtherCategory() {

    const group = document.getElementById(
        "otherCategoryGroup"
    );

    const input = document.getElementById(
        "otherCategory"
    );

    if (group) {
        group.hidden = false;
    }

    if (input) {
        input.required = true;
    }

}


function hideOtherCategory() {

    const group = document.getElementById(
        "otherCategoryGroup"
    );

    const input = document.getElementById(
        "otherCategory"
    );

    if (group) {
        group.hidden = true;
    }

    if (input) {
        input.required = false;
        input.value = "";
    }

}


/* Listen for category changes */

document.addEventListener(
    "change",
    function (event) {

        if (
            event.target.id !==
            "reportCategory"
        ) {
            return;
        }

        if (event.target.value === "Others") {
            showOtherCategory();
        } else {
            hideOtherCategory();
        }

    }
);


/* =========================================================
   FILE UPLOAD
   ========================================================= */

let selectedFiles = [];


const evidenceInput = document.getElementById(
    "evidenceInput"
);

const evidenceDropZone = document.getElementById(
    "evidenceDropZone"
);


if (evidenceInput) {

    evidenceInput.addEventListener(
        "change",
        function (event) {

            handleFiles(
                Array.from(event.target.files)
            );

        }
    );

}


/* =========================================================
   DRAG & DROP
   ========================================================= */

if (evidenceDropZone) {

    evidenceDropZone.addEventListener(
        "dragover",
        function (event) {

            event.preventDefault();

            evidenceDropZone.classList.add(
                "dragover"
            );

        }
    );


    evidenceDropZone.addEventListener(
        "dragleave",
        function () {

            evidenceDropZone.classList.remove(
                "dragover"
            );

        }
    );


    evidenceDropZone.addEventListener(
        "drop",
        function (event) {

            event.preventDefault();

            evidenceDropZone.classList.remove(
                "dragover"
            );

            handleFiles(
                Array.from(event.dataTransfer.files)
            );

        }
    );

}


/* =========================================================
   HANDLE FILES
   ========================================================= */

function handleFiles(files) {

    files.forEach(function (file) {

        /* File type */

        if (
            !ALLOWED_FILE_TYPES.includes(
                file.type
            )
        ) {

            alert(
                `${file.name} is not a supported file type.`
            );

            return;
        }


        /* File size */

        if (
            file.size > MAX_FILE_SIZE
        ) {

            alert(
                `${file.name} is larger than 10 MB.`
            );

            return;
        }


        /* Duplicate */

        const alreadyExists =
            selectedFiles.some(function (existingFile) {

                return (
                    existingFile.name === file.name &&
                    existingFile.size === file.size
                );

            });


        if (alreadyExists) {
            return;
        }


        selectedFiles.push(file);

    });


    renderUploadedFiles();

    updateFileInput();

}


/* =========================================================
   DISPLAY UPLOADED FILES
   ========================================================= */

function renderUploadedFiles() {

    const container = document.getElementById(
        "uploadedFiles"
    );

    if (!container) {
        return;
    }

    container.innerHTML = "";


    selectedFiles.forEach(
        function (file, index) {

            const fileElement =
                document.createElement("div");

            fileElement.className =
                "uploaded-file";


            fileElement.innerHTML = `

                <div class="uploaded-file-info">

                    <i class="fa-regular fa-file"></i>

                    <span class="uploaded-file-name">
                        ${escapeHTML(file.name)}
                    </span>

                </div>

                <button
                    type="button"
                    class="remove-file-btn"
                    onclick="removeUploadedFile(${index})"
                    aria-label="Remove file"
                >
                    <i class="fa-solid fa-xmark"></i>
                </button>

            `;


            container.appendChild(fileElement);

        }
    );

}


/* =========================================================
   REMOVE FILE
   ========================================================= */

function removeUploadedFile(index) {

    selectedFiles.splice(
        index,
        1
    );

    renderUploadedFiles();

    updateFileInput();

}


/* =========================================================
   UPDATE INPUT
   ========================================================= */

function updateFileInput() {

    if (!evidenceInput) {
        return;
    }

    /*
        DataTransfer lets us rebuild the
        actual <input type="file"> contents.
    */

    const dataTransfer =
        new DataTransfer();


    selectedFiles.forEach(
        function (file) {

            dataTransfer.items.add(file);

        }
    );


    evidenceInput.files =
        dataTransfer.files;

}


/* =========================================================
   REVIEW STEP
   ========================================================= */

function fillReviewStep() {

    const category = document.getElementById(
        "reportCategory"
    );

    const reportedUser = document.getElementById(
        "reportedUser"
    );

    const description = document.getElementById(
        "reportDescription"
    );

    const reviewCategory = document.getElementById(
        "reviewCategory"
    );

    const reviewReportedUser =
        document.getElementById(
            "reviewReportedUser"
        );

    const reviewDescription =
        document.getElementById(
            "reviewDescription"
        );

    const reviewEvidence =
        document.getElementById(
            "reviewEvidence"
        );


    /* Category */

    if (category && reviewCategory) {

        let categoryText =
            category.options[
                category.selectedIndex
            ].text;

        /*
            If Others was selected,
            display the user's custom reason.
        */

        if (category.value === "Others") {

            const otherCategory =
                document.getElementById(
                    "otherCategory"
                );

            if (
                otherCategory &&
                otherCategory.value.trim()
            ) {

                categoryText =
                    otherCategory.value.trim();

            }

        }

        reviewCategory.textContent =
            categoryText;

    }


    /* Reported User */

    if (
        reportedUser &&
        reviewReportedUser
    ) {

        const selectedOption =
            reportedUser.options[
                reportedUser.selectedIndex
            ];

        reviewReportedUser.textContent =
            selectedOption
                ? selectedOption.text
                : "—";

    }


    /* Description */

    if (
        description &&
        reviewDescription
    ) {

        reviewDescription.textContent =
            description.value.trim()
                ? description.value.trim()
                : "—";

    }


    /* Evidence */

    if (reviewEvidence) {

        if (selectedFiles.length === 0) {

            reviewEvidence.textContent =
                "No files attached";

        } else {

            reviewEvidence.textContent =
                `${selectedFiles.length} file${
                    selectedFiles.length > 1
                        ? "s"
                        : ""
                } attached`;

        }

    }

}


/* =========================================================
   HTML ESCAPE
   ========================================================= */

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent = value;

    return div.innerHTML;

}


/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateReportStep();

        updateCharacterCount();

        hideOtherCategory();

    }
);