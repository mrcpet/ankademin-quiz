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
      { option: "Wish You Were Here", right: false },
      { option: "The Division Bell", right: false },
      { option: "The Wall", right: false },
    ],
    type: "multipleChoices",
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
    question: "Which of the following played guitar in the band?",
    answers: [
      { option: "Roger Waters", right: false },
      { option: "David Gilmour", right: true },
      { option: "Jimmy Page", right: false },
      { option: "Syd Barrett", right: true },
    ],
    type: "checkBox",
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
    type: "multipleChoices",
  },
  {
    question:
      "Which song begins with the famous line, 'Hello, is there anybody in there?'",
    answers: [
      { option: "Comfortably Numb", right: true },
      { option: "Another Brick in the Wall (Part 2)", right: false },
      { option: "See Emily Play", right: false },
    ],
    type: "multipleChoices",
  },
  {
    question:
      "Pink Floyd's rock opera 'The Wall' explores themes of alienation and the impact of war.",
    answers: [
      { option: "True", right: true },
      { option: "False", right: false },
    ],
    type: "trueFalse",
  },
  {
    question: "The album cover of the album 'Meddle' features a flying pig?",
    answers: [
      { option: "True", right: false },
      { option: "False", right: true },
    ],
    type: "trueFalse",
  },
  {
    question: "What is the name of Pink Floyd's lead vocalist and guitarist?",
    answers: [
      { option: "Syd Barrett", right: false },
      { option: "Roger Waters", right: false },
      { option: "David Gilmour", right: true },
      { option: "Nick Mason", right: false },
    ],
    type: "multipleChoices",
  },
  {
    question: "Which of the following albums were released in the 1960s?",
    answers: [
      { option: "Atom Heart Mother", right: false },
      { option: "The Piper at the Gates of Dawn", right: true },
      { option: "A Saucerful of Secrets", right: true },
      { option: "The Dark Side of the Moon", right: false },
    ],
    type: "checkBox",
  },
  {
    question: "You answered all questions!",
    answers: [{ option: "See your results by pressing the button" }],
    type: "last",
  },
];

//selectors for buttons and containers
const questionContainer = document.querySelector(".quiz-question");
const answerContainer = document.querySelector(".quiz-answers");
const alertContainer = document.querySelector(".alert-container");
const startBtn = document.querySelector("#startBtn");
const nextBtn = document.querySelector("#nextBtn");
const resultBtn = document.querySelector("#resultBtn");

//variables needed
let getQuestionNumber = 0;
let userScore = 0;
let correctAnswers = [];
let wrongAnswers = [];

//function to turn a string into camelcase, copied from chat gpt, pray i dont need to use this
function toCamelCase(inputString) {
  return inputString
    .toLowerCase()
    .replace(/[-_\s]+(.)?/g, (_, c) => c.toUpperCase());
}
//function to check that all answers in array are true

const onlyTrueAnswers = (element) => {
  return element === "true";
};

//function to render question into DOM
let renderQuestion = (question) => {
  //render question title
  let h2 = document.createElement("h2");
  h2.innerText = question.question;
  questionContainer.append(h2);
  //function to create elements
  let createElements = (typeInput) => {
    question.answers.forEach((option) => {
      let div = document.createElement("div");
      div.classList.add("options-container");
      let label = document.createElement("label");
      let input = document.createElement("input");
      input.type = typeInput;
      input.name = "option";
      input.id = toCamelCase(option.option.toString());
      input.value = option.right;
      label.htmlFor = input.id;
      label.innerText = option.option;
      answerContainer.append(div);
      div.append(input, label);
    });
  };
  //render questions based on type
  if (question.type === "trueFalse") {
    //render radio buttons
    createElements("radio");
  } else if (question.type === "checkBox") {
    //render boxes
    createElements("checkbox");
  } else if (question.type === "last") {
    let h3 = document.createElement("h3");
    h3.innerText = "Well done!";
    questionContainer.append(h3);
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
//function to count score and store answers

let getAnswers = () => {
  // select all chosen answers and all correct answers
  let chosenAnswer = document.querySelectorAll(
    "input[type='checkbox']:checked, input[type='radio']:checked"
  );
  if (chosenAnswer.length !== 0) {
    let rightAnswers = document.querySelectorAll("input[value='true']");
    //turn node list into an array
    let chosenArray = Array.from(chosenAnswer);
    //function to check if value is "true"
    const checkTrue = (index) => {
      return index.value === "true";
    };
    //push question into corresponding array
    //TODO clear console logs
    if (
      chosenArray.every(checkTrue) &&
      chosenArray.length === rightAnswers.length
    ) {
      correctAnswers.push(pinkFloydQuiz[getQuestionNumber - 1]);
      //add to score counter
      userScore++;
      console.log("rätt svar");
    } else {
      wrongAnswers.push(pinkFloydQuiz[getQuestionNumber - 1]);
      console.log("fel svar");
    }
    console.log(correctAnswers);
    console.log(wrongAnswers);

    //clear html and render next question
    questionContainer.innerHTML = "";
    answerContainer.innerHTML = "";
    getQuestion(getQuestionNumber);
    console.log(getQuestionNumber);
    if (getQuestionNumber === 11) {
      nextBtn.removeEventListener("click", getAnswers);
      nextBtn.classList.add("hide");
      resultBtn.classList.remove("hide");
    }
  } else {
    alert("Please pick your answer.");
  }
};

//start button event
startBtn.addEventListener("click", () => {
  renderQuestion(pinkFloydQuiz[0]);
  startBtn.classList.add("hide");
  nextBtn.classList.remove("hide");
  return getQuestionNumber++;
});

//next button event
nextBtn.addEventListener("click", getAnswers);

//show results function
let showResults = (correct, wrong) => {
  correct.forEach((answer) => {
    console.log("du svarade rätt på");
    console.log(answer.question);
  });
  wrong.forEach((answer) => {
    console.log("du svarade fel på");
    console.log(answer.question);
  });
};

//result button event
resultBtn.addEventListener("click", () => {
  questionContainer.innerHTML = "";
  answerContainer.innerHTML = "";
  questionContainer.innerText = `Du svarade rätt på ${userScore} av 10 frågor, bra jobbat!`;
  showResults(correctAnswers, wrongAnswers);
});
