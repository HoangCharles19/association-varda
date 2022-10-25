import "./form.scss";
import "../assets/styles/styles.scss";

const form = document.querySelector("form");
const errorsNode = document.querySelector("#errors");
const cancelButton = document.querySelector(".btn-secondary");

let actualiteId;
let errors = [];

cancelButton.addEventListener("click", () => {
  window.location.assign("./index.html");
});
const initForm = async () => {
  const params = new URL(window.location.href);
  actualiteId = params.searchParams.get("id");

  if (actualiteId) {
    const response = await fetch(`https://restapi.fr/api/news/${actualiteId}`);
    if (response.status < 300) {
      const news = await response.json();
      fillform(news);
    }
  }
};
initForm();

const fillform = async (news) => {
  const author = document.querySelector('input[name="author"]');
  const photo = document.querySelector('input[name="photo"]');
  const topic = document.querySelector('input[name="topic"]');
  const title = document.querySelector('input[name="title"]');
  const content = document.querySelector("textarea");

  author.value = news.author || "";
  photo.value = news.photo || "";
  topic.value = news.topic || "";
  title.value = news.title || "";
  content.value = news.content || "";
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  //  La méthode Object.fromEntries() permet de transformer une liste de paires de clés/valeurs en un objet.
  const news = Object.fromEntries(formData.entries());
  // Si le formulaire est valide on le met au format JSON
  if (formIsValid(news)) {
    try {
      const json = JSON.stringify(news);
      let response;
      if (actualiteId) {
        response = await fetch(`https://restapi.fr/api/news/${actualiteId}`, {
          method: "PATCH",
          body: json,
          headers: { "Content-type": "application/json" },
        });
      } else {
        response = await fetch("https://restapi.fr/api/news", {
          method: "POST",
          body: json,
          headers: { "Content-type": "application/json" },
        });
      }

      const body = await response.json();
      if (response.status < 300) {
        window.location.assign("./index.html");
      }
      console.log(body);
    } catch (e) {
      console.error("err:", e);
    }
  }
});

const formIsValid = (news) => {
  errors = [];
  // si un champs n'est pas rempli
  if (
    !news.author ||
    !news.photo ||
    !news.topic ||
    !news.title ||
    !news.content
  ) {
    errors.push("Vous devez remplir tous les champs");
  } else {
    errors = [];
  }

  if (errors.length) {
    let errorHTML = "";
    // on cumule le li dans errorHTML
    errors.forEach((error) => {
      errorHTML += `<li>${error}</li>`;
    });
    // puis on l'injecte dans la UL en HTML
    errorsNode.innerHTML = errorHTML;
    return false;
  } else {
    errorsNode.innerHTML = "";
    return true;
  }
};
