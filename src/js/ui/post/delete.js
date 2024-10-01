import { deletePost } from "../../api/post/delete";

/**
 * Handles the post deletion process.
 * When triggered, it confirms with the user if they really want to delete the post,
 * and then proceeds to call the API to delete the post. If successful, the page will
 * reload; if not, an error message will be displayed.
 *
 * @param {Event} event - The event object from the delete button click.
 */
export async function onDeletePost(event) {
    console.log(event);

    if (confirm("Are you sure you want to delete this post?")) {
        try {
            const success = await deletePost(event);
            if (success) {
                window.location.reload();
                alert("Post deleted successfully");
            } else {
                alert("Failed to delete post.");
            }
        } catch (error) {
            console.error("Failed to delete post:", error);
            alert("Failed to delete post.");
        }
    }
}
