<template>
  <CardElt>
    <template #header>
      <h2>
        <i class="fa-solid fa-star-half-stroke fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.REVIEW_CREATOR }}
      </h2>
    </template>

    <template #body>
      <form method="post">

        <FieldElt type="textarea"
          v-model:value="text"
          @keyup.enter="createReview()"
          :info="constants.INFO_TEXT"
          :min="constants.TEXT_MIN"
          :max="constants.TEXT_MAX">

          <template #legend>
            {{ constants.LEGEND_TEXT }}
          </template>
          <template #label>
            {{ constants.LABEL_TEXT }}
          </template>
        </FieldElt>

        <FieldElt type="number"
          v-model:value="score"
          @keyup.enter="createReview()"
          :info="constants.INFO_SCORE"
          :min="constants.NUM_MIN"
          :max="constants.NUM_MAX">

          <template #legend>
            {{ constants.LEGEND_SCORE }}
          </template>
          <template #label>
            {{ constants.LABEL_SCORE }}
          </template>
        </FieldElt>

        <BtnElt type="button"
          @click="createReview()" 
          class="btn-green"
          :content="constants.CONTENT_CREATE"
          :title="constants.REVIEW_CREATOR">

          <template #btn>
            <i class="fa-solid fa-square-plus fa-lg"></i>
          </template>
        </BtnElt>
      </form>
    </template>
  </CardElt>
</template>

<script>
import { postData } from "../assets/axios"
import { checkError, checkRange } from "../assets/serve"

import BtnElt from "../assets/BtnElt"
import CardElt from "../assets/CardElt"
import FieldElt from "../assets/FieldElt"

export default {
  name: "ReviewCreator",
  components: {
    BtnElt,
    CardElt,
    FieldElt
  },

  props: ["constants"],
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
      const SCORE_MAX  = this.constants.SCORE_MAX;
      const SCORE_MIN  = this.constants.SCORE_MIN;
      const SCORE_MSG  = this.constants.CHECK_NUMBER;
      const TEXT_MAX   = this.constants.TEXT_MAX;
      const TEXT_MIN   = this.constants.TEXT_MIN;
      const TEXT_MSG   = this.constants.CHECK_STRING;

      if (checkRange(this.text, TEXT_MSG, TEXT_MIN, TEXT_MAX) && 
          checkRange(this.score, SCORE_MSG, SCORE_MIN, SCORE_MAX)) {

        let review = new FormData();
        review.append("text", this.text);
        review.append("score", this.score);
        review.append("product", this.$route.params.id);
        review.append("user", this.constants.USER_ID);
        review.append("moderate", "false");
        review.append("created", Date.now());
        review.append("updated", Date.now());

        postData("/reviews", review)
          .then(() => {
            alert(this.constants.ALERT_NEW_REVIEW);
            this.$router.go();
          })
          .catch(err => { checkError(err) });
      }
    }
  }
}
</script>