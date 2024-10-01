import { API_AUTH_LOGIN, API_KEY } from "../constants.js";

/**
 * Logs in by sending credentials.
 * @param {Object} credentials - The login credentials.
 * @param {string} credentials.email - The user's email address.
 * @param {string} credentials.password - The user's password.
 * @returns {Promise<{ok: boolean, data?: Object, error?: string}>}
 * - An object containing:
 *   - `ok`: Indicates if the login was successful.
 *   - `data`: The response data from the server if successful.
 *   - `error`: An error message if the login failed.
 *
 * @throws {Error} Throws an error if the login request fails due to issues
 * or errors.
 */

export async function login({ email, password }) {
    try {
        const response = await fetch(API_AUTH_LOGIN, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Noroff-API-Key": API_KEY,
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            return { ok: true, data };
        }

        throw new Error("Failed to login: email or password is incorrect");
    } catch (error) {
        console.error(error);
        return { ok: false, error: error.message };
    }
}
