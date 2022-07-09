<script>
export default {
  name: "SearchResult",
  props: {
    prediction: String,
    predictionAnswer: String,
    solved: Boolean,
  },
  computed: {
    resultString() {
      if (!this.solved) {
        return this.prediction.replace(
          this.predictionAnswer,
          `<span class="notguessed" style="width: ${
            this.predictionAnswer.length * 8
          }px"></span>`
        );
      } else {
        return this.prediction.replace(
          this.predictionAnswer,
          `<span class="guessed">${this.predictionAnswer}</span>`
        );
      }
    },
  },
};
</script>

<template>
  <div class="result">
    <div class="result-icon"></div>
    <div class="result-text" v-html="resultString"></div>
  </div>
</template>

<style>
</style>
