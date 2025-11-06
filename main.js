const col = document.getElementById("collection");
const add_col = document.getElementById("add-col");
const card = document.getElementById("card");
const add_card = document.getElementById("add-card");
const new_col = document.getElementById("new-col");
const add_coll = document.getElementById("add-coll-btn");
const new_card = document.getElementById("new-card");
const add_card_btn = document.getElementById("add-card-btn");
const inputCollection = add_col.querySelector("input");
const inputsCard = add_card.querySelectorAll("input");

let data = { collections: [] };
let currentCollectionId = null;

loadData();

function loadData() {
  fetch("./flashcard.json")
    .then((res) => {
      if (!res.ok) throw new Error("File not found");
      return res.json();
    })
    .then((jsonData) => {
      data = jsonData;
      displayCollections();
    })
    .catch(() => {
      if (localStorage.getItem("flashcardsData")) {
        data = JSON.parse(localStorage.getItem("flashcardsData"));
        displayCollections();
      } else {
        data = { collections: [] };
        displayCollections();
      }
    });
}

function saveData() {
  localStorage.setItem("flashcardsData", JSON.stringify(data));
}

function displayCollections() {
  col.innerHTML = `
    <div class="text-3xl italic mb-4"><h1>Collections</h1></div>
    <button id="new-col" class="relative bg-amber-200 flex h-[300px] w-[300px] items-center justify-center text-white rounded-lg shadow-lg shadow-amber-700 hover:bg-amber-300">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="w-8 h-8 fill-current">
        <polygon points="30,12 20,12 20,2 12,2 12,12 2,12 2,20 12,20 12,30 20,30 20,20 30,20"/>
      </svg>
    </button>
  `;
  const newColBtn = col.querySelector("#new-col");
  newColBtn.addEventListener("click", () => {
    col.classList.add("hidden");
    add_col.classList.remove("hidden");
  });
  data.collections.forEach((collection) => {
    const div = document.createElement("div");
    div.className =
      "bg-amber-100 p-4 m-3 rounded-lg shadow-md hover:bg-amber-200 cursor-pointer text-center font-bold w-[250px]";
    div.textContent = collection.name;
    div.addEventListener("click", () => {
      currentCollectionId = collection.id;
      showCards(collection);
    });
    col.appendChild(div);
  });
}

function showCards(collection) {
  card.classList.remove("hidden");
  col.classList.add("hidden");
  add_col.classList.add("hidden");
  add_card.classList.add("hidden");
  card.innerHTML = `
    <div class="text-3xl italic mb-4"><h1>${collection.name}</h1></div>
    <button id="new-card" class="bg-amber-200 flex h-[300px] w-[300px] items-center justify-center text-white rounded-lg shadow-lg shadow-amber-700 hover:bg-amber-300">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="w-8 h-8 fill-current">
        <polygon points="30,12 20,12 20,2 12,2 12,12 2,12 2,20 12,20 12,30 20,30 20,20 30,20"/>
      </svg>
    </button>
  `;
  const newCardBtn = card.querySelector("#new-card");
  newCardBtn.addEventListener("click", () => {
    card.classList.add("hidden");
    add_card.classList.remove("hidden");
  });
  collection.cards.forEach((c) => {
    const div = document.createElement("div");
    div.className = "flip-card bg-transparent w-[300px] h-[200px] m-3 perspective";
    div.innerHTML = `
      <div class="flip-card-inner transition-transform duration-500 transform-style-preserve-3d hover:rotate-y-180">
        <div class="flip-card-front bg-white border border-amber-300 rounded-lg shadow-md flex items-center justify-center font-bold p-4">
          ${c.question}
        </div>
        <div class="flip-card-back bg-amber-100 border border-amber-300 rounded-lg shadow-md flex items-center justify-center text-gray-800 p-4 rotate-y-180">
          ${c.answer}
        </div>
      </div>
    `;
    card.appendChild(div);
  });
}

add_coll.addEventListener("click", (e) => {
  e.preventDefault();
  const name = inputCollection.value.trim();
  if (name === "") {
    alert("Please enter a name!");
    return;
  }
  const newCollection = {
    id: Date.now(),
    name,
    cards: [],
  };
  data.collections.push(newCollection);
  saveData();
  inputCollection.value = "";
  add_col.classList.add("hidden");
  col.classList.remove("hidden");
  displayCollections();
});

add_card_btn.addEventListener("click", (e) => {
  e.preventDefault();
  const question = inputsCard[0].value.trim();
  const answer = inputsCard[1].value.trim();
  if (question === "" || answer === "") {
    alert("Please fill both fields!");
    return;
  }
  const collection = data.collections.find((c) => c.id === currentCollectionId);
  collection.cards.push({ question, answer });
  saveData();
  inputsCard[0].value = "";
  inputsCard[1].value = "";
  add_card.classList.add("hidden");
  showCards(collection);
});

