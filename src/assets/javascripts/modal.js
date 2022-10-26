let calc;
let modal;
let cancel;
let confirm;
const body = document.querySelector("body");

const createCalc = () => {
  calc = document.createElement("div");
  calc.classList.add("calc");
  calc.addEventListener("click", (event) => {
    calc.remove();
  });
};

const createModal = (question) => {
  modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `<p>${question}</p>`;
  modal.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  cancel = document.createElement("div");
  cancel.classList.add("btn", "btn-secondary");
  cancel.innerText = "Annuler";

  confirm = document.createElement("div");
  confirm.classList.add("btn", "btn-primary");
  confirm.innerText = "Confirmer";

  modal.append(cancel, confirm);
};

export function openModal(question) {
  createCalc();
  createModal(question);
  calc.append(modal);
  body.append(calc);

  return new Promise((resolve, reject) => {
    calc.addEventListener("click", () => {
      resolve(false);
      calc.remove();
    });
    cancel.addEventListener("click", () => {
      resolve(false);
      calc.remove();
    });
    confirm.addEventListener("click", () => {
      resolve(true);
      calc.remove();
    });
  });
}
