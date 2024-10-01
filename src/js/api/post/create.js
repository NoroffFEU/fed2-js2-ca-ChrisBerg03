import { API_KEY, API_SOCIAL_POSTS } from "../constants.js"; // Import the API endpoint

/**
 * Creates a new post by sending the post data to the API.
 *
 * @param {Object} postDetails - The details of the post to be created.
 * @param {string} postDetails.title - The title of the post.
 * @param {string} postDetails.body - The body content of the post.
 * @param {Array<string>} postDetails.tags - An array of tags associated with the post.
 * @param {string} postDetails.media - The URL of the media associated with the post.
 * @returns {Promise<Response>} - The response from the API after attempting to create the post.
 *
 * @throws {Error} Throws an error if the request to create the post fails.
 */

export async function createPost({ title, body, tags, media }) {
    const postData = {
        title,
        body,
        tags,
        media: { url: media },
    };

    try {
        const response = await fetch(API_SOCIAL_POSTS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                "X-Noroff-API-Key": API_KEY,
            },
            body: JSON.stringify(postData),
        });

        return response;
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
}
