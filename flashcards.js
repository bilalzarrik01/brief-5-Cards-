
// HTML ELEMENTS 
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


// LOAD DATA
if (localStorage.getItem("flashcardsData")) {
  data = JSON.parse(localStorage.getItem("flashcardsData"));
} else {
  data = { collections: [] };
  saveData();
}
displayCollections();



// SAVE DATA
function saveData() {
  localStorage.setItem("flashcardsData", JSON.stringify(data));
}

// DISPLAY COLLECTIONS 
function displayCollections() {
  const container = col.querySelector("div.w-full");
  container.innerHTML = "";

  // Add button
  const newColBtn = document.createElement("button");
  newColBtn.id = "new-col";
  newColBtn.className =
    "bg-amber-200 flex h-[250px] w-[250px] sm:h-[300px] sm:w-[300px] items-center justify-center text-white rounded-lg shadow-lg shadow-amber-700 hover:bg-amber-300hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-linear p-4";
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
      "bg-amber-100 flex flex-col justify-center items-center p-4 m-3 rounded-lg shadow-md hover:bg-amber-200 cursor-pointer text-center font-bold w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-linear p-4";
    div.textContent = collection.name;

    div.addEventListener("click", () => {
      currentCollectionId = collection.id;
      showCards(collection);
    });

    container.appendChild(div);
  });
  const backBtn = document.createElement("button");

}


// DISPLAY CARDS 

function showCards(collection) {
  card.classList.remove("hidden");
  col.classList.add("hidden");
  add_col.classList.add("hidden");
  add_card.classList.add("hidden");

  const container = card.querySelector("div.w-full");
  container.innerHTML = "";
    const backBtn = document.createElement("button");
backBtn.textContent = "← Back";
backBtn.className =
  "bg-[#FF4800] text-white rounded-lg shadow-md flex justify-center items-center p-4 transition";
backBtn.addEventListener("click", () => {
  card.classList.add("hidden");
  col.classList.remove("hidden");
});
container.appendChild(backBtn);

  // Add new card button
  const newCardBtn = document.createElement("button");
  newCardBtn.id = "new-card";
  newCardBtn.className =
    "bg-amber-200 flex h-[250px] w-[250px] sm:h-[300px] sm:w-[300px] items-center justify-center text-white rounded-lg shadow-lg shadow-amber-700 hover:bg-amber-300 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-linear p-4";
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
  const cardWrapper = document.createElement("div");
  cardWrapper.className =
    "w-[250px] sm:w-[300px] h-[250px] sm:h-[300px] perspective cursor-pointer";

  // container 
  const cardInner = document.createElement("div");
  cardInner.className =
    "relative w-full h-full transition-transform duration-500 transform-style-preserve-3d";

  // face
  const front = document.createElement("div");
  front.className =
    "absolute w-full h-full bg-white rounded-lg shadow-md flex flex-col justify-center items-center p-4 backface-hidden border border-amber-300 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-linear p-4";
  front.innerHTML = `
    <p class='font-bold mb-2 text-[#FF4800] text-lg'>${c.question}</p>
    <p class='text-gray-400 italic text-sm'>(Click to see answer)</p>
  `;

  // back 
  const back = document.createElement("div");
  back.className =
    "absolute w-full h-full bg-[#FF4800] text-white rounded-lg shadow-md flex justify-center items-center p-4 rotate-y-180 backface-hidden border border-amber-300 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-linear p-4";
  back.innerHTML = `
    <p class='font-semibold text-lg text-center'>${c.answer}</p>
  `;

  // combine
  cardInner.appendChild(front);
  cardInner.appendChild(back);
  cardWrapper.appendChild(cardInner);
  container.appendChild(cardWrapper);

  // click event
  cardWrapper.addEventListener("click", () => {
    cardInner.classList.toggle("rotate-y-180");
  });
});

}

// ADD NEW COLLECTION 
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

// ADD NEW CARD 
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

