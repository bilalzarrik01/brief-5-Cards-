// ------------------ HTML ELEMENTS ------------------
const col = document.getElementById("collection");
const add_col = document.getElementById("add-col");
const card = document.getElementById("card");
const add_card = document.getElementById("add-card");

const add_coll = document.getElementById("add-coll-btn");
const add_card_btn = document.getElementById("add-card-btn");

const inputCollection = add_col.querySelector("input");
const inputsCard = add_card.querySelectorAll("input");

let data = { collections: [] };
let currentCollectionId = null;

// ------------------ LOAD DATA ------------------
if (localStorage.getItem("flashcardsData")) {
  data = JSON.parse(localStorage.getItem("flashcardsData"));
} else {
  data = { collections: [] };
  saveData();
}
displayCollections();



// ------------------ SAVE DATA ------------------
function saveData() {
  localStorage.setItem("flashcardsData", JSON.stringify(data));
}

// ------------------ DISPLAY COLLECTIONS ------------------
function displayCollections() {
  const container = col.querySelector("div.w-full");
  container.innerHTML = "";

  // Add button
  const newColBtn = document.createElement("button");
  newColBtn.id = "new-col";
  newColBtn.className =
    "bg-amber-200 flex h-[250px] w-[250px] sm:h-[300px] sm:w-[300px] items-center justify-center text-white rounded-lg shadow-lg shadow-amber-700 hover:bg-amber-300 transition";
  newColBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="w-8 h-8 fill-current">
      <polygon points="30,12 20,12 20,2 12,2 12,12 2,12 2,20 12,20 12,30 20,30 20,20 30,20"/>
    </svg>
  `;
  newColBtn.addEventListener("click", () => {
    col.classList.add("hidden");
    add_col.classList.remove("hidden");
  });
  container.appendChild(newColBtn);

  // Render each collection
  data.collections.forEach((collection) => {
    const div = document.createElement("div");
    div.className =
      "bg-amber-100 flex flex-col justify-center items-center p-4 m-3 rounded-lg shadow-md hover:bg-amber-200 cursor-pointer text-center font-bold w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] transition";
    div.textContent = collection.name;

    div.addEventListener("click", () => {
      currentCollectionId = collection.id;
      showCards(collection);
    });

    container.appendChild(div);
  });
}

// ------------------ DISPLAY CARDS ------------------
function showCards(collection) {
  card.classList.remove("hidden");
  col.classList.add("hidden");
  add_col.classList.add("hidden");
  add_card.classList.add("hidden");

  const container = card.querySelector("div.w-full");
  container.innerHTML = "";

  // Add new card button
  const newCardBtn = document.createElement("button");
  newCardBtn.id = "new-card";
  newCardBtn.className =
    "bg-amber-200 flex h-[250px] w-[250px] sm:h-[300px] sm:w-[300px] items-center justify-center text-white rounded-lg shadow-lg shadow-amber-700 hover:bg-amber-300 transition";
  newCardBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="w-8 h-8 fill-current">
      <polygon points="30,12 20,12 20,2 12,2 12,12 2,12 2,20 12,20 12,30 20,30 20,20 30,20"/>
    </svg>
  `;
  newCardBtn.addEventListener("click", () => {
    card.classList.add("hidden");
    add_card.classList.remove("hidden");
  });
  container.appendChild(newCardBtn);

  // Render all cards
  collection.cards.forEach((c) => {
    const div = document.createElement("div");
    div.className =
      "bg-white p-4 m-3 rounded-lg shadow-md w-[250px] sm:w-[300px] text-center border border-amber-300 transition hover:shadow-lg";
    div.innerHTML = `
      <p class='font-bold mb-2 text-[#FF4800]'>${c.question}</p>
      <p class='text-gray-700 mt-1 font-semibold'>${c.answer}</p>
    `;
    container.appendChild(div);
  });
}

// ------------------ ADD NEW COLLECTION ------------------
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

// ------------------ ADD NEW CARD ------------------
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
