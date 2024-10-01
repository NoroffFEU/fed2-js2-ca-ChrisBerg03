import { authGuard } from "../../utilities/authGuard";
import { renderProfile, onUpdateProfile } from "../../ui/profile/update.js";

// Ensure the user is authenticated before proceeding
authGuard();

// Event listener for DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    const userID = localStorage.getItem("userID");

    // Redirect to login page if userID is not found in local storage
    if (!userID) {
        window.location.href = "/auth/login/";
    } else {
        renderProfile(userID); // Call renderProfile to show the profile on load
    }

    const form = document.querySelector('form[name="updateProfile"]');

    // Attach event listener for form submission to update profile
    form.addEventListener("submit", onUpdateProfile);
});
