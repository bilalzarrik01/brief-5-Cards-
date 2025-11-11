let current = 0; // رقم السؤال الحالي
let score = 0; // النقاط

// العناصر من HTML
let question = document.getElementById("question");
let s1 = document.getElementById("q1");
let s2 = document.getElementById("q2");
let s3 = document.getElementById("q3");
let s4 = document.getElementById("q4");
let nextBtn = document.getElementById("next");

let buttons = [s1, s2, s3, s4];
let data = [];

// تحميل الأسئلة من JSON
fetch("quiz.json")
  .then(res => res.json())
  .then(json => {
    data = json.cards;
    showQuestion();
  })
  .catch(err => console.error("Error loading JSON:", err));

// display que
function showQuestion() {
  let card = data[current];
  question.textContent = card.question;

  for (let i = 0; i < 4; i++) {
    buttons[i].textContent = card.suggestions[i];
    buttons[i].style.backgroundColor = "#FEF3C7"; // نفس لون amber-50
    buttons[i].style.pointerEvents = "auto"; // نفعّل الأزرار من جديد
  }
}

// التحقق من الجواب
buttons.forEach(btn => {
  btn.addEventListener("click", e => {
    let chosen = e.target.textContent.trim();
    let correct = data[current].answer.trim();

    if (chosen === correct) {
      e.target.style.backgroundColor = "lightgreen";
      score++;
    } else {
      e.target.style.backgroundColor = "lightcoral";
    }

    // تعطيل الأزرار بعد ما يختار
    buttons.forEach(b => (b.style.pointerEvents = "none"));
  });
});

// زر NEXT باش يدوز للسؤال الموالي
nextBtn.addEventListener("click", () => {
  current++;

  if (current < data.length) {
    showQuestion();
  } else {
    // ملي يسالي الكويز
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
});
