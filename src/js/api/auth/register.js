// export async function register({
//   name,
//   email,
//   password,
//   bio,
//   banner,
//   avatar,
// }) {}

import {API_KEY, API_AUTH_REGISTER} from "../constants.js";
export async function register({ name, email, password }) {
  if (!name || !email || !password) {
    alert("Please fill out all required fields.");
    return;
  }

  try {
    const response = await fetch(`${API_AUTH_REGISTER}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": API_KEY,

      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error data:', data);
      if (data.errors && data.errors.length > 0) {
        console.error('Detailed errors:', data.errors);
        const errorMessage = data.errors.map(function(error) {
          return error.message;
        }).join(', ');
        throw new Error(errorMessage);
      }
      throw new Error(data.message || "Registration failed. Please try again.");
    }

    alert("Your registration was successful!");
    location.href = "auth/login/index.html";
  } catch (error) {
    console.error("Error:", error.message);
    if (error.message.includes("Profile already exists")) {
      alert("Registration failed: A profile with this username or email already exists.");
    } else {
      alert(`Registration failed: ${error.message}. Please check your information and try again.`);
    }
  }
}
