import "./assets/styles/styles.scss";
import "./index.scss";

const containerNews = document.querySelector(".news-container");

const createNews = (actus) => {
  const newsNodes = actus.map((actu) => {
    const newsNode = document.createElement("div");
    newsNode.classList.add("news");
    newsNode.innerHTML = ` <img
    src="${actu.photo}"
    alt="profile"
  />
  <h2>${actu.title}</h2>
  <p class="news-author">${actu.author} - ${actu.topic}</p>
  <p class="news-content">
  ${actu.content}
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
    const news = await response.json();
    createNews(news);
  } catch (e) {
    console.error("e:", e);
  }
};

fetchArticles();
