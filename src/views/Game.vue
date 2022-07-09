<script>
import { mapState, mapMutations, mapActions } from "vuex";
import {
  getGuessWordsFromGuess,
  checkGuessWithTargets,
} from "../utils/predictions";

export default {
  name: "Game",
  inject: ["doGETRequest"],
  data() {
    return {
      userGuess: "",
    };
  },
  methods: {
    userGuessSubmit() {
      const guessWords = getGuessWordsFromGuess(this.userGuess);
      this.userGuess = "";
      if (guessWords.length > 0) {
        this.solveForAnswers(guessWords, checkGuessWithTargets);
      }
    },
    ...mapMutations(["increaseUserScore"]),
    ...mapActions(["solveForAnswers"]),
  },
  computed: {
    ...mapState({
      userName: (state) => state.user.name,
      userScore: (state) => state.user.score,
      question: (state) => state.game.activeQuestion,
      answers: (state) => state.game.activeAnswers,
    }),
  },
};
</script>

<template>
  <div class="search-container">
    <div class="user-info">{{ userName }}, <b>Score: </b> {{ userScore }}</div>
    <div class="search-box">
      <div class="search-input">
        <div class="input-icon"></div>
        <div class="input-text">
          <div class="question">{{ question }}</div>
          <div class="prediction">
            <span class="resizer">{{ userGuess || "filler" }}</span>
            <input
              v-model="userGuess"
              @keyup.enter="userGuessSubmit"
              placeholder="your guess ..."
            />
          </div>
        </div>
      </div>
      <div class="search-results">
        <SearchResult
          v-for="a in answers"
          :key="a.result"
          :prediction="a.result"
          :predictionAnswer="a.answer"
          :solved="a.solved"
        />
      </div>
    </div>
  </div>
</template>