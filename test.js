// ============ SELECT ELEMENTS ============
const col = document.getElementById("collection");
const add_col = document.getElementById("add-col");
const card = document.getElementById("card");
const add_card = document.getElementById("add-card");

const new_col = document.getElementById("new-col");
const add_coll = document.getElementById("add-coll-btn");
const new_card = document.getElementById("new-card");
const add_card_btn = document.getElementById("add-card-btn");

const collectionInput = document.getElementById("collection-name");
const questionInput = document.getElementById("card-question");
const answerInput = document.getElementById("card-answer");

const collectionsList = document.getElementById("collections-list");
const cardsList = document.getElementById("cards-list");

// ============ DATA HANDLING ============
let data = { collections: [] };
let currentCollectionId = null;

// Load from localStorage
if (localStorage.getItem("flashcardsData")) {
  data = JSON.parse(localStorage.getItem("flashcardsData"));
  renderCollections();
}

// ============ EVENT LISTENERS ============

// Show "add collection" form
new_col.addEventListener("click", () => {
  col.classList.add("hidden");
  add_col.classList.remove("hidden");
});

// Add collection
add_coll.addEventListener("click", () => {
  const name = collectionInput.value.trim();
  if (!name) return alert("Please enter a collection name!");

  const newCollection = {
    id: Date.now(),
    name,
    cards: []
  };
  data.collections.push(newCollection);
  localStorage.setItem("flashcardsData", JSON.stringify(data));

  collectionInput.value = "";
  add_col.classList.add("hidden");
  col.classList.remove("hidden");
  renderCollections();
});

// Go to card list of clicked collection
function openCollection(id) {
  currentCollectionId = id;
  col.classList.add("hidden");
  card.classList.remove("hidden");
  renderCards();
}

// Show "add card" form
new_card.addEventListener("click", () => {
  card.classList.add("hidden");
  add_card.classList.remove("hidden");
});

// Add card
add_card_btn.addEventListener("click", () => {
  const question = questionInput.value.trim();
  const answer = answerInput.value.trim();
  if (!question || !answer) return alert("Please fill both fields!");

  const collection = data.collections.find(c => c.id === currentCollectionId);
  if (collection) {
    collection.cards.push({ question, answer });
    localStorage.setItem("flashcardsData", JSON.stringify(data));
  }

  questionInput.value = "";
  answerInput.value = "";

  add_card.classList.add("hidden");
  card.classList.remove("hidden");
  renderCards();
});

// ============ RENDER FUNCTIONS ============

function renderCollections() {
  collectionsList.innerHTML = "";
  if (data.collections.length === 0) {
    collectionsList.innerHTML = "<p>No collections yet.</p>";
    return;
  }

  data.collections.forEach(colItem => {
    const div = document.createElement("div");
    div.className = "bg-amber-200 rounded-xl shadow-lg p-4 text-center cursor-pointer hover:bg-amber-300";
    div.textContent = colItem.name;
    div.addEventListener("click", () => openCollection(colItem.id));
    collectionsList.appendChild(div);
  });
}

function renderCards() {
  cardsList.innerHTML = "";
  const collection = data.collections.find(c => c.id === currentCollectionId);
  if (!collection || collection.cards.length === 0) {
    cardsList.innerHTML = "<p>No cards yet.</p>";
    return;
  }

  collection.cards.forEach(card => {
    const div = document.createElement("div");
    div.className = "bg-white border-2 border-amber-400 rounded-xl p-4 text-center";
    div.innerHTML = `<p class="font-bold text-lg">${card.question}</p>
                     <p class="text-amber-600 mt-2">${card.answer}</p>`;
    cardsList.appendChild(div);
  });
}
