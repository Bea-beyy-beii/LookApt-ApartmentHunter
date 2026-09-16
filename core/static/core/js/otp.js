/* =========================================================
   OTP INPUTS
========================================================= */

const otpInputs = document.querySelectorAll('.otp-inputs input');
const otpForm = document.getElementById('otpForm');
const verifyButton = document.getElementById('verifyButton');


/* =========================================================
   INPUT BEHAVIOR
========================================================= */

otpInputs.forEach((input, index) => {

    /* Allow only numbers */

    input.addEventListener('input', () => {

        input.value = input.value.replace(/\D/g, '').slice(0, 1);


        /* Automatically move to next box */

        if (
            input.value !== '' &&
            index < otpInputs.length - 1
        ) {

            otpInputs[index + 1].focus();

        }


        updateVerifyButton();

    });


    /* Keyboard behavior */

    input.addEventListener('keydown', (event) => {

        /* Move backwards with Backspace */

        if (
            event.key === 'Backspace' &&
            input.value === '' &&
            index > 0
        ) {

            otpInputs[index - 1].focus();

        }


        /* Move backwards with ArrowLeft */

        if (
            event.key === 'ArrowLeft' &&
            index > 0
        ) {

            otpInputs[index - 1].focus();

        }


        /* Move forwards with ArrowRight */

        if (
            event.key === 'ArrowRight' &&
            index < otpInputs.length - 1
        ) {

            otpInputs[index + 1].focus();

        }

    });

});


/* =========================================================
   PASTE OTP
========================================================= */

otpInputs.forEach((input) => {

    input.addEventListener('paste', (event) => {

        event.preventDefault();


        const pasted = event.clipboardData
            .getData('text')
            .replace(/\D/g, '')
            .slice(0, otpInputs.length);


        if (!pasted) {
            return;
        }


        pasted.split('').forEach((number, index) => {

            if (otpInputs[index]) {

                otpInputs[index].value = number;

            }

        });


        /* Focus the next empty box */

        const nextEmptyIndex = pasted.length;

        if (nextEmptyIndex < otpInputs.length) {

            otpInputs[nextEmptyIndex].focus();

        } else {

            otpInputs[otpInputs.length - 1].focus();

        }


        updateVerifyButton();

    });

});


/* =========================================================
   VERIFY BUTTON
========================================================= */

function updateVerifyButton() {

    const otpComplete = [...otpInputs]
        .every(input => input.value !== '');


    verifyButton.disabled = !otpComplete;

}


/* =========================================================
   FORM SUBMISSION
========================================================= */

otpForm.addEventListener('submit', (event) => {

    const otp = [...otpInputs]
        .map(input => input.value)
        .join('');


    if (otp.length !== 6) {

        event.preventDefault();

        otpInputs[otp.length]?.focus();

        return;

    }

});


/* =========================================================
   COUNTDOWN
========================================================= */

let remainingTime = 59;

const timer = document.getElementById('timer');


function updateTimer() {

    const seconds = String(remainingTime)
        .padStart(2, '0');


    timer.textContent = `00:${seconds}s`;


    if (remainingTime <= 0) {

        clearInterval(countdown);

        timer.textContent = 'Expired';

        otpInputs.forEach(input => {

            input.disabled = true;

        });

        verifyButton.disabled = true;

        return;

    }


    remainingTime--;

}


updateTimer();


const countdown = setInterval(
    updateTimer,
    1000
);


/* =========================================================
   INITIAL STATE
========================================================= */

updateVerifyButton();