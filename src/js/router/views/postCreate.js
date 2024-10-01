import { onCreatePost, populateCreatePostForm } from "../../ui/post/create.js";
import { authGuard } from "../../utilities/authGuard";

// Ensure the user is authenticated before proceeding
authGuard();

/**
 * Initializes the post creation form by populating it with necessary fields
 * and setting up the event listener for form submission.
 */
const form = document.forms.createPost;
populateCreatePostForm();
form.addEventListener("submit", onCreatePost);
