import { API_SOCIAL_POSTS, API_KEY } from "../constants";
import { getKey } from "../auth/key";

/**
 * Fetches a single post by its ID from the API.
 *
 * @param {string} id - The ID of the post to fetch.
 * @returns {Promise<Object|null>} - Returns the post object if found, otherwise null.
 *
 * @throws {Error} Throws an error if the request fails.
 */

export async function readPost(id) {
    const accessToken = await getKey();
    if (!accessToken) {
        console.error("No access token. Cannot fetch post.");
        return;
    }

    const myHeaders = new Headers();
    myHeaders.append("X-Noroff-API-Key", API_KEY);
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    try {
        const response = await fetch(
            `${API_SOCIAL_POSTS}/${id}?_author=true`,
            requestOptions
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch post: ${response.statusText}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error fetching post:", error);
        throw error;
    }
}

/**
 * Fetches multiple posts from the API with pagination and optional tagging.
 *
 * @param {number} [limit=12] - The maximum number of posts to return.
 * @param {number} [page=1] - The page number for pagination.
 * @param {string} [tag] - An optional tag to filter posts.
 * @throws {Error} Throws an error if the request fails.
 */

// multiple posts
export async function readPosts(limit = 12, page = 1, tag) {
    const accessToken = await getKey();

    if (!accessToken) {
        console.error("No accessToken. Cannot fetch posts.");
        return { ok: false, error: "No access token" };
    }

    const url = new URL(API_SOCIAL_POSTS);
    url.searchParams.append("limit", limit);
    url.searchParams.append("page", page);
    if (tag) {
        url.searchParams.append("tag", tag);
    }

    const options = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": API_KEY,
            "Content-Type": "application/json",
        },
    };
    try {
        const response = await fetch(url.toString(), options);
        const data = await response.json();
        if (response.ok) {
            return { ok: true, data };
        }
        throw new Error("Failed to fetch posts");
    } catch (error) {
        console.error("Error fetching posts:", error);
        return { ok: false, error: error.message };
    }
}

export async function readPostsByUser(username, limit = 12, page = 1, tag) {}
