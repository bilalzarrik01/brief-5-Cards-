// ------------------ العناصر ديال HTML ------------------
const col = document.getElementById("collection");
const add_col = document.getElementById("add-col");
const card = document.getElementById("card");
const add_card = document.getElementById("add-card");

const new_col = document.getElementById("new-col");
const add_coll = document.getElementById("add-coll-btn");
const new_card = document.getElementById("new-card");
const add_card_btn = document.getElementById("add-card-btn");

// 🔹 المتغيرات الإضافية
const inputCollection = add_col.querySelector("input"); // input 
const inputsCard = add_card.querySelectorAll("input"); // question و answer

let data = { collections: [] };
let currentCollectionId = null;

// for localStorage
if (localStorage.getItem("flashcardsData")) {
  data = JSON.parse(localStorage.getItem("flashcardsData"));
  displayCollections();
}


function saveData() {
  localStorage.setItem("flashcardsData", JSON.stringify(data));
}

//  disiplay collection
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

  // the last coll u saved
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

// display cards
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
    div.className =
      "bg-white p-3 m-2 rounded-lg shadow-md w-[300px] text-center border border-amber-300";
    div.innerHTML = `<p class='font-bold'>${c.question}</p><p class='text-gray-700 mt-1'>${c.answer}</p>`;
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