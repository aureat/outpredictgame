<script>
import { mapState, mapMutations } from "vuex";
import {
  getPredictionsAPI,
  processPredictionsRequest,
  pickQuestion,
} from "./utils/predictions";

import Navigation from "./components/Navigation";

export default {
  name: "App",
  inject: ["doGETRequest"],
  components: {
    Navigation,
  },
  computed: {
    ...mapState({
      question: (state) => state.game.activeQuestion,
    }),
  },
  methods: {
    setAnswersFromQuestion() {
      this.doGETRequest(getPredictionsAPI(this.question), (res) => {
        this.setGameAnswers(processPredictionsRequest(this.question, res));
      });
    },
    ...mapMutations(["setGameQuestion", "setGameAnswers"]),
  },
  created() {
    this.setGameQuestion(pickQuestion());
    this.setAnswersFromQuestion();
  },
};
</script>

<template>
  <div id="app">
    <Navigation />
    <router-view />
  </div>
</template>
