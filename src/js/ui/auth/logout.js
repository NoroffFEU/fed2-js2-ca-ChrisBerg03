/**
 * Handles the logout functionality by removing user credentials and redirecting to the login page.
 */
export function onLogout() {
    const logoutBtn = document.querySelector(".logoutBtn");

    // Add event listener for the logout button
    logoutBtn.addEventListener("click", function () {
        // Remove accessToken and userID from localStorage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userID");

        // Redirect to the login page
        window.location.href = "/auth/login/";
    });
}