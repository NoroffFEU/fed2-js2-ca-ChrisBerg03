import { authGuard } from "../../utilities/authGuard";
import { setLogoutListener } from "../../ui/global/logout";
import { readPosts } from "../../api/post/read"; // Adjust based on your file structure

// Apply the authentication guard to protect the route
authGuard();

// Set up the logout listener for the logout button
setLogoutListener();

const postContainer = document.getElementById("postContainer");
let currentPage = 1;

/**
 * Fetches and displays posts for the specified page.
 *
 * @param {number} [page=1] - The page number to fetch posts for.
 * @returns {Promise<void>} - A promise that resolves when posts have been displayed.
 */
async function displayPosts(page = 1) {
    const { ok, data } = await readPosts(12, page);

    if (!ok) {
        alert("Failed to load posts");
        return;
    }

    postContainer.innerHTML = "";

    data.data.forEach((post) => {
        const card = document.createElement("div");
        card.classList.add("postCard");

        card.innerHTML = `
                <div class="media">
                <img src="${
                    post.media?.url ||
                    "https://upload.wikimedia.org/wikipedia/commons/f/f9/No-image-available.jpg"
                }" alt="${post.media?.alt || "Post Image"}">
            </div>
            <h2 class="title">${post.title}</h2>
            <p class="tags">${post.tags.join(", ")}</p>
            <p class="body">${post.body}</p>
        `;

        card.addEventListener("click", () => {
            localStorage.setItem("selectedPostId", post.id);
            window.location.href = "/post/";
        });

        postContainer.appendChild(card);
    });
    globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

/**
 * Event handler for the next button click event.
 * Increments the current page and fetches the new posts.
 */
nextBtn.addEventListener("click", () => {
    currentPage++;
    displayPosts(currentPage);
});

/**
 * Event handler for the previous button click event.
 * Decrements the current page and fetches the new posts if the current page is greater than 1.
 */
prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        displayPosts(currentPage);
    }
});

// Initially display posts for the current page
displayPosts(currentPage);
