import "./form.scss";
import "../assets/styles/styles.scss";

const form = document.querySelector("form");
const errorsNode = document.querySelector("#errors");
let errors = [];
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  //  La méthode Object.fromEntries() permet de transformer une liste de paires de clés/valeurs en un objet.
  const article = Object.fromEntries(formData.entries());
  // Si le formulaire est valide on le met au format JSON
  if (formIsValid(article)) {
    try {
      const json = JSON.stringify(article);
      const response = await fetch("https://restapi.fr/api/article", {
        method: "POST",
        body: json,
        headers: { "Content-type": "application/json" },
      });

      const body = await response.json();
      console.log(body);
    } catch (e) {
      console.error("err:", e);
    }
  }
});

const formIsValid = (article) => {
  errors = [];
  // si un champs n'est pas rempli
  if (!article.author || !article.topic || !article.content) {
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
