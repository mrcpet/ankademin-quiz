const pinkFloydQuiz = [
  {
    question: "Pink floyd was formed in 1965.",
    answers: [
      { option: "True", right: true, id: "q01a1" },
      { option: "False", right: false, id: "q01a2" },
    ],
    type: "trueFalse",
  },
  {
    question:
      "Which album features the iconic prism and rainbow artwork on its cover?",
    answers: [
      { option: "Dark Side of the Moon", right: true, id: "q02a1" },
      { option: "Wish You Were Here", right: false, id: "q02a2" },
      { option: "The Division Bell", right: false, id: "q02a3" },
      { option: "The Wall", right: false, id: "q02a4" },
    ],
    type: "multipleChoices",
  },
  {
    question: "What is the title of Pink Floyd's longest studio album?",
    answers: [
      { option: "Meddle", right: false, id: "q03a1" },
      { option: "Atom Heart Mother", right: false, id: "q03a2" },
      { option: "The Division Bell", right: false, id: "q03a3" },
      { option: "The Endless River", right: true, id: "q03a4" },
    ],
    type: "multipleChoices",
  },
  {
    question: "Which of the following played guitar in the band?",
    answers: [
      { option: "Roger Waters", right: false, id: "q04a1" },
      { option: "David Gilmour", right: true, id: "q04a2" },
      { option: "Jimmy Page", right: false, id: "q04a3" },
      { option: "Syd Barrett", right: true, id: "q04a4" },
    ],
    type: "checkBox",
  },
  {
    question:
      "Which member of Pink Floyd left the band in the early 1980s but rejoined for their final reunion concert in 2005?",
    answers: [
      { option: "Syd Barrett", right: false, id: "q05a1" },
      { option: "David Gilmour", right: false, id: "q05a2" },
      { option: "Roger Waters", right: true, id: "q05a3" },
      { option: "Richard Wright", right: false, id: "q05a4" },
    ],
    type: "multipleChoices",
  },
  {
    question:
      "Which song begins with the famous line, 'Hello, is there anybody in there?'",
    answers: [
      { option: "Comfortably Numb", right: true, id: "q06a1" },
      {
        option: "Time",
        right: false,
        id: "q06a2",
      },
      { option: "See Emily Play", right: false, id: "q06a3" },
    ],
    type: "multipleChoices",
  },
  {
    question:
      "Pink Floyd's rock opera 'The Wall' explores themes of alienation and the impact of war.",
    answers: [
      { option: "True", right: true, id: "q07a1" },
      { option: "False", right: false, id: "q07a2" },
    ],
    type: "trueFalse",
  },
  {
    question: "The album cover of the album 'Meddle' features a flying pig?",
    answers: [
      { option: "True", right: false, id: "q08a1" },
      { option: "False", right: true, id: "q08a2" },
    ],
    type: "trueFalse",
  },
  {
    question: "What is the name of Pink Floyd's lead vocalist and guitarist?",
    answers: [
      { option: "Syd Barrett", right: false, id: "q09a1" },
      { option: "Roger Waters", right: false, id: "q09a2" },
      { option: "David Gilmour", right: true, id: "q09a3" },
      { option: "Nick Mason", right: false, id: "q09a4" },
    ],
    type: "multipleChoices",
  },
  {
    question: "Which of the following albums were released in the 1960s?",
    answers: [
      { option: "Atom Heart Mother", right: false, id: "q10a1" },
      { option: "The Piper at the Gates of Dawn", right: true, id: "q10a2" },
      { option: "A Saucerful of Secrets", right: true, id: "a10a3" },
      {
        option: "The Dark Side of the Moon",
        right: false,
        id: "q10a4",
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

// clear container and add logo function
const clearContainers = () => {
  questionContainer.innerHTML =
    "<img src='assets/logo-pfquiz-circle.png' alt='logo'>";
  answerContainer.innerHTML = "";
};
//reset quiz function
const resetQuiz = () => {
  clearContainers();
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
const renderQuestion = (question) => {
  //render question title
  let h2 = document.createElement("h2");
  h2.innerText = question.question;
  questionContainer.append(h2);
  //function to create elements for options
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
const getQuestion = (number) => {
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
const getAnswers = () => {
  // select all chosen answers and all correct answers
  let chosenAnswer = document.querySelectorAll(
    "input[type='checkbox']:checked, input[type='radio']:checked"
  );
  if (chosenAnswer.length !== 0) {
    let rightAnswers = document.querySelectorAll("input[value='true']");
    //turn node list into an array
    let chosenArray = Array.from(chosenAnswer);
    //push question into corresponding array
    if (
      chosenArray.every(checkTrue) &&
      chosenArray.length === rightAnswers.length
    ) {
      correctAnswers.push(pinkFloydQuiz[questionNumber - 1]);
      //add to score counter
      userScore++;
    } else {
      wrongAnswers.push(pinkFloydQuiz[questionNumber - 1]);
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
    //clear html and render next question
    clearContainers();
    getQuestion(questionNumber);

    //show result button if last question of quiz
    if (questionNumber === pinkFloydQuiz.length) {
      toggleButton([nextBtn, resultBtn]);
    }
  } else {
    //tell user to pick an answer if none are selected
    let alertMsg = answerContainer.querySelector("p");
    if (!alertMsg) {
      let p = document.createElement("p");
      p.innerText = "Pick an answer!";
      p.classList.add("red");
      answerContainer.prepend(p);
    }
  }
};

//filter and show correct answers for each question in the list
const showOptions = (array, appendTarget) => {
  let filterAnswers = array.answers.filter((option) => option.right === true);
  filterAnswers.forEach((answer) => {
    let p = document.createElement("p");
    p.innerText = `Correct answer: ${answer.option}`;
    appendTarget.append(p);
    p.classList.add("green");
  });
};

//print final score and message function
const finalScore = () => {
  let p = document.createElement("p");
  let resultMessage = document.createElement("span").innerText;
  p.innerText = `You answered correctly on ${userScore} out of 10 questions. `;
  if (userScore > 7.5) {
    p.classList.add("green");
    resultMessage = "Well done mate!";
  } else if (userScore >= 5 && userScore < 7.5) {
    p.classList.add("orange");
    resultMessage = "Good job!";
  } else {
    p.classList.add("red");
    resultMessage = "Fail!";
  }
  questionContainer.append(p);
  p.append(resultMessage);
};

//show results function
const showResults = (correct, wrong) => {
  finalScore();

  //create buttons and lists to show all correct answers
  let btnCorrect = document.createElement("button");
  let ulCorrect = document.createElement("ul");
  ulCorrect.classList.add("hide");
  ulCorrect.classList.add("ulCorrect");
  btnCorrect.innerText = "Correct answers";

  //event listener to show/hide list on click
  btnCorrect.addEventListener("click", () => {
    if (ulCorrect.classList.contains("hide")) {
      ulCorrect.classList.remove("hide");
    } else {
      ulCorrect.classList.add("hide");
    }
  });

  //create buttons and lists to show all wrong answers
  let btnWrong = document.createElement("button");
  let ulWrong = document.createElement("ul");
  ulWrong.classList.add("hide");
  ulWrong.classList.add("ulWrong");
  btnWrong.innerText = "Wrong answers";

  //event listener to show/hide list on click
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
  clearContainers();
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
