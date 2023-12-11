const pinkFloydQuiz = [
  {
    question: "Pink floyd was formed in 1965.",
    answers: [
      { option: "True", right: true, id: "true" },
      { option: "False", right: false, id: "false" },
    ],
    type: "trueFalse",
  },
  {
    question:
      "Which album features the iconic prism and rainbow artwork on its cover?",
    answers: [
      { option: "Dark Side of the Moon", right: true, id: "darkSide" },
      { option: "Wish You Were Here", right: false, id: "wishYou" },
      { option: "The Division Bell", right: false, id: "theDivision" },
      { option: "The Wall", right: false, id: "theWall" },
    ],
    type: "multipleChoices",
  },
  {
    question: "What is the title of Pink Floyd's longest studio album?",
    answers: [
      { option: "Meddle", right: false, id: "meddle" },
      { option: "Atom Heart Mother", right: false, id: "atomHeart" },
      { option: "The Division Bell", right: false, id: "divisionBell" },
      { option: "The Endless River", right: true, id: "theEndless" },
    ],
    type: "multipleChoices",
  },
  {
    question: "Which of the following played guitar in the band?",
    answers: [
      { option: "Roger Waters", right: false, id: "roger" },
      { option: "David Gilmour", right: true, id: "david" },
      { option: "Jimmy Page", right: false, id: "jimmy" },
      { option: "Syd Barrett", right: true, id: "syd" },
    ],
    type: "checkBox",
  },
  {
    question:
      "Which member of Pink Floyd left the band in the early 1980s but rejoined for their final reunion concert in 2005?",
    answers: [
      { option: "Syd Barrett", right: false, id: "barrett" },
      { option: "David Gilmour", right: false, id: "gilmour" },
      { option: "Roger Waters", right: true, id: "waters" },
      { option: "Richard Wright", right: false, id: "wright" },
    ],
    type: "multipleChoices",
  },
  {
    question:
      "Which song begins with the famous line, 'Hello, is there anybody in there?'",
    answers: [
      { option: "Comfortably Numb", right: true, id: "comfNumb" },
      {
        option: "Another Brick in the Wall (Part 2)",
        right: false,
        id: "anotherBrick",
      },
      { option: "See Emily Play", right: false, id: "seeEmily" },
    ],
    type: "multipleChoices",
  },
  {
    question:
      "Pink Floyd's rock opera 'The Wall' explores themes of alienation and the impact of war.",
    answers: [
      { option: "True", right: true, id: "true" },
      { option: "False", right: false, id: "false" },
    ],
    type: "trueFalse",
  },
  {
    question: "The album cover of the album 'Meddle' features a flying pig?",
    answers: [
      { option: "True", right: false, id: "true" },
      { option: "False", right: true, id: "false" },
    ],
    type: "trueFalse",
  },
  {
    question: "What is the name of Pink Floyd's lead vocalist and guitarist?",
    answers: [
      { option: "Syd Barrett", right: false, id: "sydBarrett" },
      { option: "Roger Waters", right: false, id: "rogerWaters" },
      { option: "David Gilmour", right: true, id: "davidGilmour" },
      { option: "Nick Mason", right: false, id: "nickMason" },
    ],
    type: "multipleChoices",
  },
  {
    question: "Which of the following albums were released in the 1960s?",
    answers: [
      { option: "Atom Heart Mother", right: false, id: "atomHeartMother" },
      { option: "The Piper at the Gates of Dawn", right: true, id: "thePiper" },
      { option: "A Saucerful of Secrets", right: true, id: "aSaucerful" },
      {
        option: "The Dark Side of the Moon",
        right: false,
        id: "darkSideOfTheMoon",
      },
    ],
    type: "checkBox",
  },
  {
    question: "You answered all questions!",
    type: "last",
  },
];

//selectors for buttons and containers
const questionContainer = document.querySelector(".quiz-question");
const answerContainer = document.querySelector(".quiz-answers");
const alertContainer = document.querySelector(".alert-container");
const startBtn = document.querySelector("#startBtn");
const restartBtn = document.querySelector("#restartBtn");
const nextBtn = document.querySelector("#nextBtn");
const resultBtn = document.querySelector("#resultBtn");
const lightDarkBtn = document.querySelector("#lightDarkBtn");
lightDarkBtn.innerText = "Toggle Dark Mode";

//variables needed
let questionNumber = 0;
let userScore = 0;
let correctAnswers = [];
let wrongAnswers = [];
let wrongAnswersLabels = [];

//toggle buttons function
const toggleButton = (buttonArray) => {
  buttonArray.forEach((button) => {
    if (button.classList.contains("hide")) {
      button.classList.remove("hide");
    } else {
      button.classList.add("hide");
    }
  });
};
//reset quiz function
const resetQuiz = () => {
  questionContainer.innerHTML = "";
  answerContainer.innerHTML = "";
  renderQuestion(pinkFloydQuiz[0]);
  toggleButton([nextBtn, restartBtn]);
  questionNumber = 0;
  userScore = 0;
  correctAnswers = [];
  wrongAnswers = [];
  wrongAnswersLabels = [];
  return questionNumber++;
};

//function to check if value is "true"
const checkTrue = (index) => {
  return index.value === "true";
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
      input.id = option.id;
      input.value = option.right;
      label.htmlFor = input.id;
      label.innerText = option.option;
      answerContainer.append(div);
      div.append(input, label);
    });
  };
  //render questions based on type
  if (question.type === "checkBox") {
    //render checkboxes
    createElements("checkbox");
  } else if (question.type === "last") {
    //render message to say quiz is finished
    let h3 = document.createElement("h3");
    h3.innerText = "See your results by pressing the button below.";
    questionContainer.append(h3);
  } else {
    //default render which is for type multipleChoices and trueFalse
    createElements("radio");
  }
};

//function to render correct question based on current number
let getQuestion = (number) => {
  renderQuestion(pinkFloydQuiz[number]);
  return questionNumber++;
};

//function to store wrong answer labels
const storeLabel = (arrayInput, arrayOutput) => {
  arrayInput.forEach((input) => {
    let labels = input.labels;
    let labelText = labels[0].innerText;
    arrayOutput.push(labelText);
  });
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
    //push question into corresponding array
    //TODO clear console logs
    if (
      chosenArray.every(checkTrue) &&
      chosenArray.length === rightAnswers.length
    ) {
      correctAnswers.push(pinkFloydQuiz[questionNumber - 1]);
      //add to score counter
      userScore++;
      console.log("rätt svar");
    } else {
      wrongAnswers.push(pinkFloydQuiz[questionNumber - 1]);
      console.log("fel svar");
      if (chosenAnswer.length >= 2) {
        //if several answers, save labels of picked answers in a separate array
        let labelsArray = [];
        storeLabel(chosenAnswer, labelsArray);
        wrongAnswersLabels.push(labelsArray);
      } else {
        //save label of picked answer
        storeLabel(chosenAnswer, wrongAnswersLabels);
      }
    }
    console.log(correctAnswers);
    console.log(wrongAnswers);
    console.log(wrongAnswersLabels);

    //clear html and render next question
    questionContainer.innerHTML = "";
    answerContainer.innerHTML = "";
    getQuestion(questionNumber);
    console.log(questionNumber);

    //show result button if last question of quiz
    if (questionNumber === pinkFloydQuiz.length) {
      toggleButton([nextBtn, resultBtn]);
    }
  } else {
    alert("Please pick your answer.");
  }
};
//filter and show correct answers for each question in the list
let showOptions = (array, appendTarget) => {
  let filterAnswers = array.answers.filter((option) => option.right === true);
  filterAnswers.forEach((answer) => {
    let p = document.createElement("p");
    p.innerText = `Correct answer: ${answer.option}`;
    appendTarget.append(p);
    p.classList.add("green");
    console.log(answer.option);
  });
};
//show results function
//TODO create helper function to avoid duplicate code, for correct.foreach and wrong.foreach
let showResults = (correct, wrong) => {
  //show score
  let p = document.createElement("p");
  let resultMessage = document.createElement("span").innerText;
  p.innerText = `You answered correctly on ${userScore} out of 10 questions. `;
  if (userScore > 7.5) {
    p.classList.add("green");
    resultMessage = "Well fucking done mate!";
  } else if (userScore >= 5 && userScore < 7.5) {
    p.classList.add("orange");
    resultMessage = "Good job!";
  } else {
    p.classList.add("red");
    resultMessage = "Fail!";
  }
  questionContainer.append(p);
  p.append(resultMessage);
  let btnCorrect = document.createElement("button");
  let ulCorrect = document.createElement("ul");
  ulCorrect.classList.add("hide");
  ulCorrect.classList.add("ulCorrect");
  btnCorrect.innerText = "Correct answers";
  btnCorrect.addEventListener("click", () => {
    if (ulCorrect.classList.contains("hide")) {
      ulCorrect.classList.remove("hide");
    } else {
      ulCorrect.classList.add("hide");
    }
  });
  let btnWrong = document.createElement("button");
  let ulWrong = document.createElement("ul");
  ulWrong.classList.add("hide");
  ulWrong.classList.add("ulWrong");
  btnWrong.innerText = "Wrong answers";
  btnWrong.addEventListener("click", () => {
    if (ulWrong.classList.contains("hide")) {
      ulWrong.classList.remove("hide");
    } else {
      ulWrong.classList.add("hide");
    }
  });
  questionContainer.append(btnCorrect, ulCorrect, btnWrong, ulWrong);
  //show correct answers
  correct.forEach((answer) => {
    let li = document.createElement("li");
    ulCorrect.append(li);
    let p = document.createElement("p");
    p.innerText = `${answer.question}`;
    li.append(p);
    showOptions(answer, li);
  });
  //show wrong answers
  wrong.forEach((answer, index) => {
    let li = document.createElement("li");
    ulWrong.append(li);
    let p = document.createElement("p");
    p.innerText = `${answer.question}`;
    li.append(p);
    showOptions(answer, li);
    let p2 = document.createElement("p");
    let stringAnswer = wrongAnswersLabels[index];
    if (Array.isArray(stringAnswer)) {
      p2.innerText = `Your answer: ${stringAnswer.join(", ")}`;
    } else {
      p2.innerText = `Your answer: ${stringAnswer}`;
    }
    p2.classList.add("red");
    li.append(p2);
  });
  // wrongAnswersLabels.forEach((answer) => {
  //   let p = document.createElement("p");
  //   p.innerText = answer;
  //   ulWrong.append(p);
  // })
};

//start button event
startBtn.addEventListener("click", () => {
  alertContainer.innerHTML = "";
  renderQuestion(pinkFloydQuiz[0]);
  toggleButton([startBtn, nextBtn]);
  return questionNumber++;
});

//next button event
nextBtn.addEventListener("click", getAnswers);

//result button event
resultBtn.addEventListener("click", () => {
  questionContainer.innerHTML = "";
  answerContainer.innerHTML = "";
  showResults(correctAnswers, wrongAnswers);
  toggleButton([restartBtn, resultBtn]);
});

//restart button event
restartBtn.addEventListener("click", resetQuiz);

//dark mode event
lightDarkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  lightDarkBtn.innerText = "Toggle Dark Mode";
  if (document.body.classList.contains("dark-mode")) {
    lightDarkBtn.innerText = "Toggle Light Mode";
  }
});
