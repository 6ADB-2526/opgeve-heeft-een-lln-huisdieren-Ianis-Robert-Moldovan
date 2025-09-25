// lijst met namen

const users = [
  { id: 1, naam: "Kleintjes", voornaam: "Karel" },
  { id: 2, naam: "Dotjes", voornaam: "Els" },
  { id: 3, naam: "Kleintjes", voornaam: "Steven" },
];

// elementen selecteren uit html
const select = document.getElementById("mySelect");
const checkbox = document.getElementById("heeftHuisdieren");
const container = document.getElementById("naamHuisdierWrap"); 
const eersteInput = document.getElementById("naamHuisdier");
const verstuurBtn = document.getElementById("btn_versturen");

// h3 verandert naar naam
select.addEventListener("change", () => {
  const user = users.find((users) => users.id == select.value);
  if (user) {
    document.querySelector("h3").innerHTML = `Welkom ${user.naam} ${user.voornaam}`;
  }
});

// extra input veld maken
function addExtraInput() {
  const input = document.createElement("input");
  input.type = "text";
  input.className = "form-control mt-2"; 
  input.placeholder = "Naam van huisdier";

  input.addEventListener("input", () => {
    const lastInput = container.querySelector("input:last-of-type");
    if (lastInput.value.trim() !== "" && !lastInput.dataset.hasNext) {
      lastInput.dataset.hasNext = "true";
      addExtraInput();
    }
  });

  container.appendChild(input);
}

// checkbox 
checkbox.addEventListener("change", () => {
  container.querySelectorAll("input:not(#naamHuisdier)").forEach(el => el.remove());
  eersteInput.value = ""; 
  delete eersteInput.dataset.hasNext;

  if (checkbox.checked) {
    container.classList.remove("visually-hidden");
  } else {
    container.classList.add("visually-hidden");
  }
});

eersteInput.addEventListener("input", () => {
  const lastInput = container.querySelector("input:last-of-type");
  if (lastInput.value.trim() !== "" && !lastInput.dataset.hasNext) {
    lastInput.dataset.hasNext = "true";
    addExtraInput();
  }
});

verstuurBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const dieren = Array.from(container.querySelectorAll("input"))
    .map(input => input.value.trim())
    .filter(value => value !== "");
  console.log("Huisdieren:", dieren);
});
