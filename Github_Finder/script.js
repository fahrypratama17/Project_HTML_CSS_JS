const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const profileContainer = document.getElementById("profile-container");
const errorContainer = document.getElementById("error-container");
const avatar = document.getElementById("avatar");
const nameElement = document.getElementById("name");
const usernameElement = document.getElementById("username");
const bioElement = document.getElementById("bio");
const locationElement = document.getElementById("location");
const joinedDateElement = document.getElementById("joined-date");
const profileLink = document.getElementById("profile-link");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const repos = document.getElementById("repos");
const companyElement = document.getElementById("company");
const blogElement = document.getElementById("blog");
const twitterElement = document.getElementById("twitter");
const companyContainer = document.getElementById("company-container");
const blogContainer = document.getElementById("blog-container");
const twitterContainer = document.getElementById("twitter-container");
const reposContainer = document.getElementById("repos-container");

searchBtn.addEventListener("click", searchUser);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchUser();
});

async function searchUser() {
  const username = searchInput.value.trim();

  if (!username) return alert("Please enter a username");

  try {
    // Reset the UI
    profileContainer.classList.add("hidden");
    errorContainer.classList.add("hidden");

    // Fetch API
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) throw new Error("User not found");

    const userData = await response.json();
    console.log("User data is here:", userData);

    displayUserData(userData);
  } catch (error) {
    showError();
  }
}

function displayUserData(user) {
  avatar.src = user.avatar_url;
}

function  showError() {
  errorContainer.classList.remove("hidden");
  profileContainer.classList.add("hidden");
}

