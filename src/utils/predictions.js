import { nonWordsShort, nonWords } from "./nonwords.js";

function decodeHtmlCharCodes(str) {
  return str.replace(/(&#(\d+);)/g, function (match, capture, charCode) {
    return String.fromCharCode(charCode);
  });
}

function clearTargetWord(word) {
  return word.replace("'", "").replace("-", "");
}

const getPredictionsAPI = (q) => {
  return `www.google.com/complete/search?q=${q}&cp=7&client=gws-wiz&xssi=t&hl=en-AZ&authuser=0&psi=5jfHYpKHGqGPxc8P_9y84As.1657223142852&dpr=2`;
};

const processPredictionsRequest = (question, res) => {
  const responseText = res.responseText;
  const json_match = responseText.match(/\[([\s\S]*)$/);
  const json = JSON.parse(json_match[0])[0];
  return json.map((item) => {
    let prediction = decodeHtmlCharCodes(item[0]);
    const answerMatch = prediction.match(/<b>([\s\S]*)<\/b>/g);
    let answer = prediction;
    if (answerMatch) {
      answer = answerMatch[0].replace("<b>", "").replace("</b>", "");
      prediction = prediction.replace(answerMatch[0], answer);
    } else {
      answer = prediction
        .split(" ")
        .filter((word) => !question.toLowerCase().includes(word))
        .join(" ")
        .trim();
    }
    answer = answer.trim();
    const targets = clearTargetWord(answer)
      .split(" ")
      .filter((targetWord) => !nonWordsShort.includes(targetWord));
    return {
      prediction: prediction,
      predictionAnswer: answer,
      targets: targets,
      solved: false
    };
  });
};

const questions = [
  "why is the world",
  "is Elon Musk",
  "does iPhone have",
  "how to open",
  "what to do when",
  "who is Troye Sivan",
  "when did"
];

const pickQuestion = () => {
  return questions[Math.floor(Math.random() * questions.length)];
};

const getGuessWordsFromGuess = (guess) => {
  guess
    .toLowerCase()
    .split(" ")
    .filter((word) => !nonWords.includes(word));
};

const checkGuessWithTargets = (guessWords, answer) => {
  for (const word of guessWords) {
    if (!answer.targets.includes(word)) {
      return false;
    }
  }
  return true;
};

export {
  getPredictionsAPI,
  processPredictionsRequest,
  pickQuestion,
  getGuessWordsFromGuess,
  checkGuessWithTargets
};
