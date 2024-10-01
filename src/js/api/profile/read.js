import { API_KEY, API_SOCIAL_PROFILES } from "../constants.js";

/**
 * Fetches the user profile data from the API based on the stored user ID.
 *
 * @returns {Promise<{ok: boolean, data?: Object, error?: string}>}
 * - An object containing:
 *   - `ok`: Indicates if the fetch was successful.
 *   - `data`: The profile data if the fetch is successful.
 *   - `error`: An error message if the fetch fails.
 *
 * @throws {Error} Throws an error if the request fails.
 */

export async function readProfile() {
    const name = localStorage.getItem("userID");

    try {
        const response = await fetch(`${API_SOCIAL_PROFILES}/${name}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                "X-Noroff-API-Key": API_KEY,
            },
        });

        if (!response.ok) {
            console.error(response.status, response.statusText);
            throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();

        return { ok: true, data };
    } catch (error) {
        console.error("Error occurred while fetching data:", error);
        return { ok: false, error: error.message };
    }
}
