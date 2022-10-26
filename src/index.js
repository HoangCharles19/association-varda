import "./assets/styles/styles.scss";
import "./index.scss";

const containerNews = document.querySelector(".news-container");
const containerTopics = document.querySelector(".topic");

let actualites;
let filter;

const createNews = () => {
  const newsNodes = actualites
    .filter((actualite) => {
      if (filter) {
        return actualite.topic === filter;
      } else {
        return true;
      }
    })
    .map((actualite) => {
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
    <button class="btn btn-primary" data-id="${actualite._id}">Modifier</button>
  </div>`;
      return newsNode;
    });

  containerNews.innerHTML = "";
  containerNews.append(...newsNodes);

  const deleteButtons = containerNews.querySelectorAll(".btn-danger");
  const editButtons = containerNews.querySelectorAll(".btn-primary");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      try {
        const target = event.target;
        const newsId = target.dataset.id;
        console.log(newsId);
        const response = await fetch(`https://restapi.fr/api/news/${newsId}`, {
          method: "DELETE",
        });
        const body = await response.json();

        fetchArticles();
      } catch {
        console.error("error:", e);
      }
    });
  });
  editButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const target = event.target;
      const newsId = target.dataset.id;
      window.location.assign(`./form.html?id=${newsId}`);
    });
  });
};

const displayMenuTopics = (topicsArr) => {
  const liElements = topicsArr.map((topicArr) => {
    const li = document.createElement("li");
    li.innerHTML = `  <li>${topicArr[0]} (<strong>${topicArr[1]}</strong>)</li>`;
    li.addEventListener("click", () => {
      if (filter === topicArr[0]) {
        filter = null;
        li.classList.remove("active");
      } else {
        filter = topicArr[0];
        liElements.forEach((li) => {
          li.classList.remove("active");
        });
        li.classList.add("active");
      }
      createNews();
    });
    return li;
  });
  containerTopics.innerHTML = "";
  containerTopics.append(...liElements);
};

const createMenuTopics = () => {
  const topics = actualites.reduce((acc, actualite) => {
    if (acc[actualite.topic]) {
      acc[actualite.topic]++;
    } else {
      acc[actualite.topic] = 1;
    }
    return acc;
  }, {});

  const topicsArr = Object.keys(topics)
    .map((topic) => {
      return [topic, topics[topic]];
    })
    .sort((c1, c2) => c1[0].localeCompare(c2[0]));

  displayMenuTopics(topicsArr);
};

const fetchArticles = async () => {
  try {
    const response = await fetch("https://restapi.fr/api/news");
    actualites = await response.json();
    createNews();
    createMenuTopics();
  } catch (e) {
    console.error("e:", e);
  }
};

fetchArticles();
