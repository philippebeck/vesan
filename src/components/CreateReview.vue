<template>
  <CardElt>
    <template #header>
      <i class="fa-solid fa-check fa-2x"></i>
      <h2>Create Review</h2>
    </template>

    <template #body>
      <form method="post">

        <!-- Review Text -->
        <FieldElt id="review-text"
          type="textarea"
          v-model:value="text"
          info="Thanks for this article !"
          @keyup.enter="createReview()"
          :min="2">
          <template #legend>
            Text
          </template>
          <template #label>
            Indicate the review text
          </template>
        </FieldElt>

        <!-- Review Score -->
        <FieldElt id="review-score"
          type="number"
          v-model:value="score"
          @keyup.enter="createReview()"
          info=""
          :min="0"
          :max="5">
          <template #legend>
            Score
          </template>
          <template #label>
            Indicate the review score
          </template>
        </FieldElt>

        <!-- Create Button -->
        <BtnElt type="button"
          content="Create"
          @click="createReview()" 
          class="btn-green"/>
      </form>
    </template>
  </CardElt>
</template>

<script>
import constants from "/constants";

export default {
  name: "CreateReview",

  data() {
    return {
      text: "",
      score: null
    }
  },

  methods: {
    /**
     * CREATE REVIEW
     */
    createReview() {
      let review  = new FormData();

      review.append("text", this.text);
      review.append("score", this.score);
      review.append("article", this.$route.params.id);
      review.append("user", constants.USER_ID);
      review.append("created", Date.now());
      review.append("updated", Date.now());

      this.$serve.postData("/api/reviews", review)
        .then(() => {
          alert("New review created !");
          this.$router.go();
        })
        .catch(err => { console.log(err) });

    }
  }
}
</script>