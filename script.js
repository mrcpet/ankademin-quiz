const pinkFloydQuiz = [
  {
    question: "Pink floyd was formed in 1965.",
    answers: [
      { option: true, right: true },
      { option: false, right: false },
    ],
    type: "trueFalse",
  },
  {
    question:
      "Which album features the iconic prism and rainbow artwork on its cover?",
    answers: [
      { option: "Dark Side of the Moon", right: true },
      { option: "The Wall", right: false },
    ],
    type: "checkBox",
  },
  {
    question: "What is the title of Pink Floyd's longest studio album?",
    answers: [
      { option: "Meddle", right: false },
      { option: "Atom Heart Mother", right: false },
      { option: "The Division Bell", right: false },
      { option: "The Endless River", right: true },
    ],
    type: "multipleChoices",
  },
  {
    question: "Who was the primary lyricist for Pink Floyd?",
    answers: [
      { option: "Roger Waters", right: true },
      { option: "David Gilmour", right: false },
    ],
  },
  {
    question:
      "Which member of Pink Floyd left the band in the early 1980s but rejoined for their final reunion concert in 2005?",
    answers: [
      { option: "Syd Barrett", right: false },
      { option: "David Gilmour", right: false },
      { option: "Roger Waters", right: true },
      { option: "Richard Wright", right: false },
    ],
  },
  {
    question:
      "Which song begins with the famous line, 'Hello, is there anybody in there?'",
    answers: [
      { option: "Comfortably Numb", right: true },
      { option: "Another Brick in the Wall (Part 2)", right: false },
    ],
  },
  {
    question:
      "What is the title of Pink Floyd's rock opera that explores themes of alienation and the impact of war?",
    answers: [
      { option: "Animals", right: false },
      { option: "The Wall", right: true },
    ],
  },
  {
    question: "Which Pink Floyd album cover features a flying pig?",
    answers: [
      { option: "Animals", right: true },
      { option: "Meddle", right: false },
    ],
  },
  {
    question: "What is the name of Pink Floyd's lead vocalist and guitarist?",
    answers: [
      { option: "Syd Barrett", right: false },
      { option: "Roger Waters", right: false },
      { option: "David Gilmour", right: true },
      { option: "Nick Mason", right: false },
    ],
  },
  {
    question:
      "Which Pink Floyd album is often considered a soundtrack to the film '2001: A Space Odyssey'?",
    answers: [
      { option: "Atom Heart Mother", right: false },
      { option: "The Piper at the Gates of Dawn", right: false },
      { option: "Ummagumma", right: false },
      { option: "Obscured by Clouds", right: true },
    ],
  },
];

const questionContainer = document.querySelector(".quiz-question");
const answerContainer = document.querySelector(".quiz-answers");
const startBtn = document.querySelector("#startBtn");
const nextBtn = document.querySelector("#nextBtn");
const resultBtn = document.querySelector("#resultBtn");
let getQuestionNumber = 0;
let userAnswers = [];
// pinkFloydQuiz.forEach((question) => {
//   question.answers.forEach((option) => {
//     if (option.right === true) console.log(option.option);
//   });
// });

//function to turn a string into camelcase, copied from chat gpt, pray i dont need to use this
function toCamelCase(inputString) {
  return inputString
    .toLowerCase()
    .replace(/[-_\s]+(.)?/g, (_, c) => c.toUpperCase());
}

//function to render question into DOM
let renderQuestion = (question) => {
  //render question title
  let h2 = document.createElement("h2");
  h2.innerText = question.question;
  questionContainer.append(h2);
  //function to create elements
  let createElements = (typeInput) => {
    question.answers.forEach((option) => {
      let label = document.createElement("label");
      let input = document.createElement("input");
      input.type = typeInput;
      input.name = "option";
      input.id = toCamelCase(option.option.toString());
      input.value = option.right;
      label.htmlFor = input.id;
      label.innerText = option.option;
      answerContainer.append(input, label);
    });
  };
  //render questions based on type
  if (question.type === "trueFalse") {
    //render radio buttons
    createElements("radio");
  } else if (question.type === "checkBox") {
    //render boxes
    createElements("checkbox");
  } else {
    //default render which is for type multipleChoices
    createElements("radio");
  }
};
//function to render correct question based on current number
let getQuestion = (number) => {
  renderQuestion(pinkFloydQuiz[number]);
  return getQuestionNumber++;
};
//start button event
startBtn.addEventListener("click", () => {
  renderQuestion(pinkFloydQuiz[0]);
  startBtn.classList.add("hide");
  nextBtn.classList.remove("hide");
  return getQuestionNumber++;
});
//next button event
nextBtn.addEventListener("click", () => {
  //take value from selected answer and store in userAnswers array
  let chosenAnswer = document.querySelectorAll(
    "input[type='checkbox']:checked, input[type='radio']:checked"
  );
  //TODO make sure the answer.value only gets pushed to userAnswers once if there are several correct answers, and only if ALL correct answers are selected
  let rightAnswers = document.querySelectorAll("input[value='true']");
  chosenAnswer.forEach((answer) => {
    userAnswers.push(answer.value);
  });
  console.log(userAnswers);
  console.log(rightAnswers);

  //clear html and render next question
  questionContainer.innerHTML = "";
  answerContainer.innerHTML = "";
  getQuestion(getQuestionNumber);
  if (getQuestionNumber > 9) {
    nextBtn.classList.add("hide");
    resultBtn.classList.remove("hide");
  }
});
//result button event
resultBtn.addEventListener("click", () => {
  questionContainer.innerHTML = "";
  answerContainer.innerHTML = "";
  questionContainer.innerText =
    "Du svarade rätt på 6 av 10 frågor, bra jobbat!";
});
