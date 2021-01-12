export const emailCheck = (text, emailError) => {
    let condition = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    emailError.style.color = "red";

    if (!text.match(condition)) {
        emailError.style.display = "block";
        emailError.innerText = "Invalid Email Address";
        return;
    }

    emailError.style.display = "none";
    return;
}

export const pswdCheck = (text, passwordError) => {
    let condition1 = /(?=.*\d)/; //should contain atleast 1 digit
    let condition2 = /(?=.*[a-z])/; //should contain atleast 1 lowercase
    let condition3 = /(?=.*[A-Z])/; //should contain atleast 1 uppercase
    let condition4 = /[a-zA-Z0-9]{8,}/; //should contain atleast 8 characters

    passwordError.style.color = "red";

    if (!text.match(condition1)) {
        passwordError.style.display = "block";
        passwordError.innerText = "Password should contain atleast 1 digit";
        return;
    }

    if (!text.match(condition2)) {
        passwordError.style.display = "block";
        passwordError.innerText = "Password should contain atleast 1 lowercase";
        return;
    }

    if (!text.match(condition3)) {
        passwordError.style.display = "block";
        passwordError.innerText = "Password should contain atleast 1 uppercase";
        return;
    }

    if (!text.match(condition4)) {
        passwordError.style.display = "block";
        passwordError.innerText = "Password should contain atleast 8 characters";
        return;
    }

    passwordError.style.display = "none";
    return;
}

export const confirmPasswordCheck = (text, initPasswrd, confPasswordError) => {

    confPasswordError.style.color = "red";

    if (text !== initPasswrd) {
        confPasswordError.style.display = "block";
        confPasswordError.innerText = "Passwords don't match";
        return;
    }

    confPasswordError.style.display = "none";
    return;
}