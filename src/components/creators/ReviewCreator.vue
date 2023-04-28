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
import BtnElt from "@/assets/BtnElt"
import CardElt from "@/assets/CardElt"
import FieldElt from "@/assets/FieldElt"

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
      let textMsg = this.constants.CHECK_STRING;
      let textMin = this.constants.TEXT_MIN;
      let textMax = this.constants.TEXT_MAX;
      let scoreMsg = this.constants.CHECK_NUMBER;
      let scoreMin = this.constants.SCORE_MIN;
      let scoreMax = this.constants.SCORE_MAX;

      if (this.$serve.checkRange(this.text, textMsg, textMin, textMax) && 
        this.$serve.checkRange(this.score, scoreMsg, scoreMin, scoreMax)) {
        let review  = new FormData();

        review.append("text", this.text);
        review.append("score", this.score);
        review.append("product", this.$route.params.id);
        review.append("user", this.constants.USER_ID);
        review.append("moderate", "false");
        review.append("created", Date.now());
        review.append("updated", Date.now());

        let options = {
            method: "POST",
            mode: "cors",
            headers: { "Authorization": `Bearer ${this.constants.TOKEN}` },
            body: review
          };

        this.$serve.fetchSet(this.constants.API_URL + "/reviews", options)
          .then(() => {
            alert(this.constants.ALERT_NEW_REVIEW);
            this.$router.go();
          })
          .catch(err => { this.$serve.checkError(err) });
      }
    }
  }
}
</script>