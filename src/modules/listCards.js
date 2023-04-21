import Api from "./api.js";
import { openModal, modal } from "./popup.js";

const BASE_URL =
  "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps";
const APP_ID = "rZVQvLjlhB3dnDtkMDhH";

async function getLikes(id) {
  try {
    const response = await fetch(`${BASE_URL}/${APP_ID}/likes`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.likes;
  } catch (error) {
    console.error("Error fetching likes:", error);
    return 0; // Return 0 likes if an error occurs
  }
}

async function DisplayCards(data) {
  const Cards = document.querySelector(".cards");
  const likes = {};

  // Fetch likes for each artwork
  for (let i = 0; i < data.length; i++) {
    const id = data[i].id;
    const artworkLikes = await getLikes(id);
    likes[id] = artworkLikes;
  }

  // Display artwork cards with likes
  data.forEach((element, index) => {
    const id = element.id;
    Cards.innerHTML += `
      <div class="card">
        <div class="img-container">
          <div class="img-hold">
            <div class="img">
              <img class="image-api" src="./assets/image/${index}.jpg">
            </div>
          </div>
        </div>
        <div class="title-container">
          <h3>${element.title} <i class="fa fa-heart"></i></h3>
          <div class="interactions">
            <div class="likes">${likes[id] || 0} likes</div>
          </div>
          <button class="button comment"><i class="fa fa-comments"></i> Comments</button>
        </div>
      </div>
    `;
  });

  const commentButtons = document.querySelectorAll(".comment");
  commentButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const imgSrc = `./assets/image/${index}.jpg`;
      const title = data[index].title;
      openModal(modal, imgSrc, title, index);
    });
  });
}

export default DisplayCards;
