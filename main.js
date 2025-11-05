const col = document.getElementById("collection");
const add_col = document.getElementById("add-col");
const card = document.getElementById("card");
const add_card = document.getElementById("add-card");

const new_col = document.getElementById("new-col");
const add_coll = document.getElementById("add-coll-btn");
const new_card = document.getElementById("new-card");
const add_card_btn = document.getElementById("add-card-btn");

new_col.addEventListener("click", (e) => {
  e.preventDefault();
  col.classList.add("hidden");
  add_col.classList.remove("hidden");
});

add_coll.addEventListener("click", (e) => {
  e.preventDefault();
  add_col.classList.add("hidden");
  card.classList.remove("hidden");
});

new_card.addEventListener("click", (e) => {
  e.preventDefault();
  card.classList.add("hidden");
  add_card.classList.remove("hidden");
});

add_card_btn.addEventListener("click", (e) => {
  e.preventDefault();
  add_card.classList.add("hidden");
  col.classList.remove("hidden");
});
