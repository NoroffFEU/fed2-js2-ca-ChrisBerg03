import { login } from "../../api/auth/login.js";

/**
 * Handles the login form submission event.
 *
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} - A promise that resolves when the login is completed.
 */
export async function onLogin(event) {
    event.preventDefault();

    // Get the email and password values from the form input fields
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Make the login request with the provided email and password
    const response = await login({ email, password });

    // Check if the login response was successful
    if (response.ok) {
        const { accessToken, name } = response.data.data;

        // If accessToken is present, store it in localStorage and redirect to the homepage
        if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("userID", name);
            window.location.href = "/";
        }
    } else {
        // If login failed, display an error message
        alert("Login failed: " + response.error);
    }
}
