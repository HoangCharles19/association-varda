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
  <p class="news-author">${actualite.author} - ${actualite.topic}</p>
  <p class="news-content">
  ${actualite.content}
  </p>
  <div class="news-actions">
    <button class="btn btn-danger">Supprimer</button>
    <button class="btn btn-primary">Modifier</button>
  </div>`;
    return newsNode;
  });
  containerNews.innerHTML = "";
  containerNews.append(...newsNodes);
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
