import { emailCheck, pswdCheck, confirmPasswordCheck } from './controller.js';

let email = document.getElementById("email");
let emailError = document.getElementById("emailError");
emailError.style.display = "none";
email.addEventListener("keypress", event => {
    let text = email.value + `${event.key}`;
    emailCheck(text, emailError);
});


let password = document.getElementById("pswd");
let passwordError = document.getElementById("pswdError");
passwordError.style.display = "none";
password.addEventListener('keypress', event => {
    let text = password.value + `${event.key}`;
    pswdCheck(text, passwordError);
})

let confPassword = document.getElementById("confirmPswd");
let confPasswordError = document.getElementById("confirmPswdError");
confPasswordError.style.display = "none";
confPassword.addEventListener('keypress', event => {
    let text = confPassword.value + `${event.key}`;
    let initPasswrd = password.value;
    confirmPasswordCheck(text, initPasswrd, confPasswordError);
})

