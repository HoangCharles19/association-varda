import "./assets/styles/styles.scss";
import "./index.scss";

const containerNews = document.querySelector(".news-container");

const createNews = (actualites) => {
  const newsNodes = actualites.map((actualite) => {
    const newsNode = document.createElement("div");
    newsNode.classList.add("news");
    newsNode.innerHTML = ` <img
    src="${actualite.photo}"
    alt="profile"
  />
  <h2>${actualite.title}</h2>
  <p class="news-author">${actualite.author} - ${new Date(
      actualite.createdAt
    ).toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })}</p>
  <p class="news-content">
  ${actualite.content}
  </p>
  <div class="news-actions">
    <button class="btn btn-danger" data-id="${actualite._id}"
    >Supprimer</button>
    <button class="btn btn-primary">Modifier</button>
  </div>`;
    return newsNode;
  });

  containerNews.innerHTML = "";
  containerNews.append(...newsNodes);

  const deleteButtons = document.querySelectorAll(".btn-danger");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      try {
        const target = event.target;
        const newsId = target.dataset.id;
        const response = await fetch(`https://restapi.fr/api/news/${newsId}`, {
          method: "DELETE",
        });
        const body = await response.json();
        console.log(body);
        fetchArticles();
      } catch {
        console.error("error:", e);
      }
    });
  });
};

const fetchArticles = async () => {
  try {
    const response = await fetch("https://restapi.fr/api/news");
    const actualites = await response.json();
    createNews(actualites);
  } catch (e) {
    console.error("e:", e);
  }
};

fetchArticles();
