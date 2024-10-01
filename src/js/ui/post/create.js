import { createPost as apiCreatePost } from "../../api/post/create.js";

/**
 * Populates the form used to create a new post with input fields dynamically.
 * Prevents adding duplicate fields by checking for existing ones.
 */
export function populateCreatePostForm() {
    const form = document.forms.createPost;

    // Check if the title input already exists
    if (form.querySelector("input[name='title']")) {
        return;
    }

    // Define the input fields to be added to the form
    const fields = [
        { name: "title", type: "text", placeholder: "Title", required: true },
        {
            name: "body",
            type: "textarea",
            placeholder: "Post Content",
            required: true,
        },
        { name: "tags", type: "text", placeholder: "Tags (comma separated)" },
        { name: "media", type: "text", placeholder: "Media URL" },
    ];

    // Dynamically create and append input fields to the form
    fields.forEach((field) => {
        const label = document.createElement("label");
        label.textContent = field.placeholder;
        form.appendChild(label);

        let input;
        if (field.type === "textarea") {
            input = document.createElement("textarea");
        } else {
            input = document.createElement("input");
            input.type = field.type;
        }
        input.name = field.name;
        input.placeholder = field.placeholder;
        if (field.required) {
            input.required = true;
        }

        form.appendChild(input);
    });
}

/**
 * Handles the submission of the post creation form and sends the post data to the API.
 * @param {Event} event - The form submit event.
 */
export async function onCreatePost(event) {
    event.preventDefault();
    const form = event.target;

    // Collect input values from the form
    const title = form.title.value;
    const body = form.body.value;
    const tags = form.tags.value.split(",").map((tag) => tag.trim());
    const media = form.media.value;

    console.log("Post data:", { title, body, tags, media });

    try {
        // Send the post data to the API for creation
        const response = await apiCreatePost({ title, body, tags, media });

        if (response.ok) {
            const responseData = await response.json();
            console.log("Post created successfully!", responseData);
            window.location.href = "/";
        } else {
            const errorText = await response.text();
            console.error("Failed to create post:", response.status, errorText);
        }
    } catch (error) {
        console.error("Error creating post:", error);
    }
}

// Initialize the form by populating it with input fields
populateCreatePostForm();
