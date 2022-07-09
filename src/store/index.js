import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      user: {
        name: "Altun",
        score: 0
      },
      game: {
        activeQuestion: "",
        activeAnswers: ""
      }
    };
  },
  getters: {},
  mutations: {
    increaseUserScore(state, score) {
      state.user.score += score;
    },
    setGameQuestion(state, question) {
      state.game.activeQuestion = question;
    },
    setGameAnswers(state, answers) {
      state.game.activeAnswers = answers;
    }
  },
  actions: {
    solveForAnswers(context, guessWords, checkGuess) {
      const answers = context.state.game.answers;
      answers.map((answer) => {
        if (!answer.solved) {
          const answerMatches = checkGuess(guessWords, answer);
          if (!answerMatches) {
            return false;
          }
          answer.solved = true;
          context.commit("increaseUserScore", guessWords.length);
          return true;
        }
        return false;
      });
    }
  }
});
