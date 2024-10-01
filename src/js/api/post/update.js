import { getKey } from "../auth/key";
import { API_KEY, API_SOCIAL_POSTS } from "../constants";

/**
 * Updates an existing post by its ID with the provided data.
 *
 * @param {string} id - The ID of the post to be updated.
 * @param {Object} postDetails - The details of the post to be updated.
 * @param {string} postDetails.title - The new title of the post.
 * @param {string} postDetails.body - The new body content of the post.
 * @param {Array<string>} postDetails.tags - An array of tags for the post.
 * @param {string} postDetails.media - The URL of the media associated with the post.

 * @throws {Error} Throws an error if the request fails.
 */

export async function updatePost(id, { title, body, tags, media }) {
    const accessToken = await getKey();
    if (!accessToken) {
        console.error("No access token. Cannot update post.");
        return { ok: false, error: "No access token" };
    }

    const myHeaders = new Headers();
    myHeaders.append("X-Noroff-API-Key", API_KEY);
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify({
            title,
            body,
            tags,
            media,
        }),
        redirect: "follow",
    };

    try {
        const response = await fetch(
            `${API_SOCIAL_POSTS}/${id}`,
            requestOptions
        );
        if (response.ok) {
            const result = await response.json();
            return { ok: true, data: result };
        }
        throw new Error(`Failed to update post: ${response.statusText}`);
    } catch (error) {
        console.error("Error updating post:", error);
        return { ok: false, error: error.message };
    }
}
