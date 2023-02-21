<template>
  <CardElt>
    <template #header>
      <h3>
        <i class="fa-solid fa-check fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.CREATE_REVIEW }}
      </h3>
    </template>

    <template #body>
      <form method="post">

        <!-- Review Text -->
        <FieldElt id="review-text"
          type="textarea"
          v-model:value="text"
          @keyup.enter="validateNewReview()"
          :info="constants.CREATE_TEXT"
          :max="5000">
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
          @keyup.enter="validateNewReview()"
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
          @click="validateNewReview()" 
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
  name: "ReviewCreator",

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
     * VALIDATE NEW REVIEW
     */
    validateNewReview() {
      if (this.$serve.checkText(this.text) &&
        this.score !== null) {

        this.checkNewReview();

      } else {
        alert(constants.ALERT_FIELD);
      }
    },

    /**
     * CHECK IF USER HAS MADE A REVIEW FOR THIS PRODUCT
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