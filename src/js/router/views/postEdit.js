import { authGuard } from "../../utilities/authGuard";
import { readPost } from "../../api/post/read";
import { updatePost } from "../../api/post/update";
import { deletePost } from "../../api/post/delete";

// Ensure the user is authenticated before proceeding
authGuard();

/**
 * Initializes the edit post form by fetching the selected post data
 * and populating the form fields with the post's current information.
 */
async function initialize() {
    const selectedPostId = localStorage.getItem("selectedPostId");
    console.log("Selected Post ID:", selectedPostId);

    if (!selectedPostId) {
        console.error("No post found.");
        return;
    }

    try {
        const post = await readPost(selectedPostId);
        console.log("Fetched Post:", post);

        if (post) {
            const editPostForm = document.getElementById("editPostForm");

            // Populate the edit form with the post data
            editPostForm.innerHTML = `
                <label>Media URL</label>
                <input type="text" id="mediaUrl" value="${post.data.media?.url || ""}" placeholder="Media URL"/>
                
                <label>Media Alt</label>
                <input type="text" id="mediaAlt" value="${post.data.media?.alt || ""}" placeholder="Media Alt"/>
                
                <label>Title</label>
                <input type="text" id="title" value="${post.data.title || ""}" placeholder="Title"/>
                
                <label>Tags</label>
                <input type="text" id="tags" value="${post.data.tags.join(", ") || ""}" placeholder="Tags"/>
                
                <label>Body</label>
                <textarea id="body" placeholder="Body">${post.data.body || ""}</textarea>
                
                <button type="submit" id="editPostBtn">Update Post</button>
                <button type="submit" id="deletePostBtn">Delete Post</button>
            `;

            const editPostBtn = document.getElementById("editPostBtn");

            // Event listener for updating the post
            editPostBtn.addEventListener("click", async (event) => {
                event.preventDefault();

                const updatedPost = {
                    media: {
                        url: document.getElementById("mediaUrl").value,
                        alt: document.getElementById("mediaAlt").value,
                    },
                    title: document.getElementById("title").value,
                    tags: document
                        .getElementById("tags")
                        .value.split(",")
                        .map((tag) => tag.trim()),
                    body: document.getElementById("body").value,
                };

                const response = await updatePost(selectedPostId, updatedPost);
                if (response.ok) {
                    alert("Post updated successfully!");
                    window.location.href = "/";
                } else {
                    alert("Failed to update post.");
                }
            });

            const deletePostBtn = document.getElementById("deletePostBtn");
            // Event listener for deleting the post
            deletePostBtn.addEventListener("click", async (event) => {
                event.preventDefault();

                const confirmation = confirm(
                    "Are you sure you want to delete this post?"
                );
                if (confirmation) {
                    try {
                        await deletePost(selectedPostId);
                        alert("Post deleted successfully!");
                        window.location.href = "/";
                    } catch (error) {
                        alert("Failed to delete post. Please try again.");
                    }
                }
            });
        }
    } catch (error) {
        console.error("Failed to fetch post:", error);
    }
}

// Initialize the form when the DOM is fully loaded
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
} else {
    initialize();
}
