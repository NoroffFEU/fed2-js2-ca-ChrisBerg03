import { onLogin } from "../../ui/auth/login.js";

const form = document.forms.login;

/**
 * Initializes the login form by adding a submit event listener.
 * The listener calls the `onLogin` function when the form is submitted.
 * If the form is not found, an error message is logged to the console.
 */
if (form) {
    form.addEventListener("submit", onLogin);
} else {
    console.error("Form not found");
}