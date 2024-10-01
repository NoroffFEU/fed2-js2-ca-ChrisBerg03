import { API_SOCIAL_POSTS, API_KEY } from "../constants";
import { getKey } from "../auth/key";

/**
 * Deletes a post by its ID from the API.
 *
 * @param {string} id - The ID of the post to be deleted.
 * @returns {Promise<boolean>} - Returns true if the post was successfully deleted.
 *
 * @throws {Error} Throws an error if the deletion request fails.
 */

export async function deletePost(id) {
    const myHeaders = new Headers();
    myHeaders.append("X-Noroff-API-Key", API_KEY);

    const accessToken = await getKey();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow",
    };

    try {
        const response = await fetch(
            `${API_SOCIAL_POSTS}/${id}`,
            requestOptions
        );

        if (!response.ok) {
            throw new Error(`Failed to delete post: ${response.statusText}`);
        }
        return true;
    } catch (error) {
        console.error("Error deleting post:", error);
        throw error;
    }
}
