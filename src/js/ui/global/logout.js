import { onLogout } from "../auth/logout";

/**
 * Sets up the logout button event listener by calling the `onLogout` function.
 * The `onLogout` function will handle the removal of user credentials and redirect the user to the login page.
 */
export function setLogoutListener() {
    onLogout();
}