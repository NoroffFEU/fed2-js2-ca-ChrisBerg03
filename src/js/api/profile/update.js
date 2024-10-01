import { API_KEY, API_SOCIAL_PROFILES } from "../constants.js";

/**
 * Updates the user profile with the provided data.
 *
 * @param {string} userID - The ID of the user whose profile is to be updated.
 * @param {Object} profileData - The new profile data.
 * @param {Object} profileData.avatar - The avatar information.
 * @param {string} profileData.avatar.url - The URL of the new avatar image.
 * @param {string} profileData.banner - The banner information.
 * @param {string} profileData.banner.url - The URL of the new banner image.
 * @param {string} profileData.bio - The new bio for the user.
 * @returns {Promise<Object>} - Returns the updated profile data from the API.
 *
 * @throws {Error} Throws an error if the request fails.
 */

// updating the profile. NOT IN USE
export async function updateProfile(userID, { avatar, banner, bio }) {
    const response = await fetch(`${API_SOCIAL_PROFILES}/${userID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "X-Noroff-API-Key": API_KEY,
        },
        body: JSON.stringify({
            avatar: { url: avatar, alt: "User Avatar" },
            banner: { url: banner, alt: "User Banner" },
            bio,
        }),
    });

    if (!response.ok) {
        throw new Error("Could not update profile.");
    }

    return await response.json();
}
