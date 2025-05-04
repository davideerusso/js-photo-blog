const postFotos = document.getElementById("post-foto");

axios.get("https://lanciweb.github.io/demo/api/pictures/").then((response) => {
  const posts = response.data;
  console.log(posts);

  let cardsHtml = "";
  posts.forEach((post) => {
    cardsHtml += generatePostCard(post);
  });

  postFotos.innerHTML += cardsHtml;

  const cardsNodes = document.querySelectorAll(".card");

  cardsNodes.forEach((cardNode) => {
    cardNode.addEventListener("click", () => {
      const cardId = parseInt(cardNode.getAttribute("data-post-id"));
      const post = posts.find((post) => post.id === cardId);
      console.log(post);

      const OverlayId = document.getElementById("Overlay-id");

      OverlayId.classList.remove("none");

      OverlayId.innerHTML = `
      <div class="overlay-grey">
        <button id="button-close" class="button">Chiudi</button>
        <div>
          <img id="img-overlay" class="img-large" src="${post.url}">
        </div>
      </div>
      <div class="grey"></div>`;
      document.getElementById("button-close").addEventListener("click", () => {
        OverlayId.classList.add("none");
      });
    });
  });
});

const generatePostCard = (post) => {
  const cardHtml = ` 
    <div  class="photo-40 card" data-post-id="${post.id}">
      <div> 
        <img src="${post.url}" alt="" />
        </div>
        <div class="info-photo"> 
        <span class="font-date">${post.date}</span>
        <span class="font-date"> ${post.title}</span>
      </div>
    </div>
 `;

  return cardHtml;
};
