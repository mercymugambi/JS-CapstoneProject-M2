const BASE_URL =
  "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps";
const APP_ID = "rZVQvLjlhB3dnDtkMDhH";

const addLikes = async (like) => {
  await fetch(`${BASE_URL}/${APP_ID}/likes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(like),
  });
};
export default addLikes;
