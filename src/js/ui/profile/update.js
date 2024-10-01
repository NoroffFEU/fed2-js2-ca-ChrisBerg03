import { readProfile } from "../../api/profile/read.js";

const profileContainer = document.getElementById("profileContainer");

/**
 * Renders the user's profile by fetching profile data from the API and updating the
 * DOM with the user's name, bio, avatar, banner, and statistics (followers, following, posts).
 * If the profile cannot be loaded, an error message is displayed.
 *
 * @async
 * @function renderProfile
 */
export async function renderProfile() {
    if (!profileContainer) {
        console.error("Profile container element not found");
        return;
    }

    const response = await readProfile();
    console.log(response);
    if (response.ok) {
        const data = response.data;

        profileContainer.innerHTML = `
            <h2>${data.data.name}</h2>
            <p>${data.data.bio}</p>
            <img src="${data.data.banner?.url}" alt="${
            data.data.banner?.alt || "Banner"
        }"/>
            <img src="${data.data.avatar?.url}" alt="${
            data.data.avatar?.alt || "Avatar"
        }"/>
            <h3>Followers: ${data.data._count.followers}</h3>
            <h3>Following: ${data.data._count.following}</h3>
            <h3>Posts: ${data.data._count.posts}</h3>
        `;
    } else {
        console.error("Failed to load data:", response.error);
        alert("Failed to fetch profile data.");
    }
}
renderProfile();

export async function onUpdateProfile(event) {}
