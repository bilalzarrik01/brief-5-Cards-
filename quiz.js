let current = 0;
let score = 0;


const high = document.getElementById("high");

let question = document.getElementById("question");
let s1 = document.getElementById("q1");
let s2 = document.getElementById("q2");
let s3 = document.getElementById("q3");
let s4 = document.getElementById("q4");
let nextBtn = document.getElementById("next");
let high_score = parseInt(localStorage.getItem("high")) || 0;

high_score.textContent = "Your prime is :  " + high_score ;


let buttons = [s1, s2, s3, s4];
let data = [];

fetch("quiz.json")
  .then(res => res.json())
  .then(json => {
    data = json.cards;
    showQuestion();
  })
  .catch(err => console.error("Error loading JSON:", err));

function showQuestion() {
  let card = data[current];
  question.textContent = card.question;

  for (let i = 0; i < 4; i++) {
    buttons[i].textContent = card.suggestions[i];
    buttons[i].style.backgroundColor = "#FEF3C7";
    buttons[i].style.pointerEvents = "auto";
  }

  nextBtn.disabled = true;
}

buttons.forEach(btn => {
  btn.addEventListener("click", e => {
    let chosen = e.target.textContent.trim();
    let correct = data[current].answer.trim();

    if (chosen === correct) {
      e.target.style.backgroundColor = "lightgreen";
      score++;
    } else {
      e.target.style.backgroundColor = "lightcoral";
      buttons.forEach(b => {
        if (b.textContent.trim() === correct) {
          b.style.backgroundColor = "lightgreen";
        }
      });
    }

    buttons.forEach(b => (b.style.pointerEvents = "none"));
    nextBtn.disabled = false;
  });
});


nextBtn.addEventListener("click", () => {
  if (current < data.length - 1) {
    current++;
    showQuestion();
  } 
  
  else {
    document.getElementById("collection").innerHTML = `
      <div class="bg-white p-10 rounded-2xl text-center text-3xl font-bold shadow-md">
        🎉 Quiz Finished! <br><br>
        Your Score: ${score} / ${data.length} <br><br>
        <button onclick="location.reload()" 
          class=" bg-[#DF552E] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#ff673a] transition mt-7">
          Retry
        </button>
      </div>
    `;
  }
  if(high_score < score){
    high_score = score ;
    localStorage.setItem("high" , high_score);
  }
  high.textContent = "YOUR PRIME : " + high_score;
  return ;
});

