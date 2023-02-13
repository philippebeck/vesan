<template>
  <CardElt>
    <template #header>
      <i class="fa-solid fa-check fa-2x"></i>
      <h3>{{ constants.CREATE_REVIEW }}</h3>
    </template>

    <template #body>
      <form method="post">

        <!-- Review Text -->
        <FieldElt id="review-text"
          type="textarea"
          v-model:value="text"
          @keyup.enter="createReview()"
          :info="constants.CREATE_TEXT"
          :min="2">
          <template #legend>
            Text
          </template>
          <template #label>
            {{ constants.LABEL_TEXT }}
          </template>
        </FieldElt>

        <!-- Review Score -->
        <FieldElt id="review-score"
          type="number"
          v-model:value="score"
          @keyup.enter="createReview()"
          :info="constants.CREATE_SCORE"
          :min="0"
          :max="5">
          <template #legend>
            Score
          </template>
          <template #label>
            {{ constants.LABEL_SCORE }}
          </template>
        </FieldElt>

        <!-- Create Button -->
        <BtnElt type="button"
          @click="checkNewReview()" 
          class="btn-green"
          content="Create"
          :title="constants.CREATE_REVIEW">
          <template #btn>
            <i class="fa-solid fa-square-plus fa-lg"></i>
          </template>
        </BtnElt>
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
      score: null,
      constants: {}
    }
  },

  mounted() {
    this.constants = constants;
  },

  methods: {
    /**
     * CHECK NEW PRODUCT IF NAME | DESCRIPTION ARE REFERENCED
     */
    checkNewReview() {
      this.$serve.getData("/api/reviews")
        .then((reviews) => {
          let isReferenced = false;

          for (let review of reviews) {
            if (review.user === constants.USER_ID && 
              review.product === this.$route.params.id) {

              alert(constants.CHECK_REVIEW);
              isReferenced = true;
            }
          }
          this.createReview(isReferenced);
        })
        .catch(err => { console.log(err) });
    },

    /**
     * CREATE REVIEW
     * @param {boolean} isReferenced 
     */
    createReview(isReferenced) {
      if (!isReferenced) {
        let review  = new FormData();

        review.append("text", this.text);
        review.append("score", this.score);
        review.append("product", this.$route.params.id);
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
}
</script>