const Cards = document.querySelector('.cards');

async function getAssetFileNames() {
  const response = await fetch('./assets/image/');
  const text = await response.text();
  const fileNames = text.match(/[^/]+\.[^/]+/g);
  return fileNames;
}

async function DisplayCards(data) {
    const response = await fetch('./assets/image/');
  const assetFileNames = await getAssetFileNames();
  data.forEach((element, index) => {
    Cards.innerHTML += `
      <div class="card">
        <div class="img-container">
          <div class="img-hold">
            <div class="img">
              <img class = "image-api" src="./assets/image/${assetFileNames[index]}">
            </div>
          </div>
        </div>
        <div class="title-container">
          <h3>${element.title} <i class="fa-solid fa-heart fa-lg"></i></h3>
          <div class="interactions">       
            <div class="likes">355 likes</div>
          </div>
          <div>
            ${element.publication_history && typeof element.publication_history === 'string' ? element.publication_history.substr(0, 50) + '...' : ''}
          </div>
          <button class="button comment"><i class="fa-solid fa-comments"></i> Comments</button>
        </div>
      </div>
    `;
  });
}

export default DisplayCards;
