import { register } from "../../api/auth/register.js";

/**
 * Handles the form submission for user registration
 * @param {Event} event - The form submission event
 * @returns {Promise<void>}
 */
export async function onRegister(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await register({ name, email, password });

    if (response.ok) {
        const { name, email } = response.data;
        alert(`Welcome, ${name}! You have registered with ${email}.`);
    } else {
        alert("Registration failed: " + response.error);
    }
}
