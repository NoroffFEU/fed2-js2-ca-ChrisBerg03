import { onRegister } from "../../ui/auth/register";

// Retrieve the registration form from the document
const form = document.forms.register;

// Attach an event listener for form submission to handle user registration
form.addEventListener("submit", onRegister);