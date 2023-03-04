<template>
  <CardElt>
    <template #header>
      <h3>
        <i class="fa-solid fa-check fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.REVIEW_CREATOR }}
      </h3>
    </template>

    <template #body>
      <form method="post">

        <!-- Review Text -->
        <FieldElt type="textarea"
          v-model:value="text"
          @keyup.enter="createReview()"
          :info="constants.INFO_TEXT"
          :max="5000">

          <template #legend>
            {{ constants.LEGEND_TEXT }}
          </template>
          <template #label>
            {{ constants.LABEL_TEXT }}
          </template>
        </FieldElt>

        <!-- Review Score -->
        <FieldElt type="number"
          v-model:value="score"
          @keyup.enter="createReview()"
          :info="constants.INFO_SCORE"
          :min="0"
          :max="5">

          <template #legend>
            {{ constants.LEGEND_SCORE }}
          </template>
          <template #label>
            {{ constants.LABEL_SCORE }}
          </template>
        </FieldElt>

        <!-- Create Button -->
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
export default {
  name: "ReviewCreator",
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
      if (this.$serve.checkText(this.text) && this.score !== null) {
        let review  = new FormData();

        review.append("text", this.text);
        review.append("score", this.score);
        review.append("product", this.$route.params.id);
        review.append("user", this.constants.USER_ID);
        review.append("moderate", "false");
        review.append("created", Date.now());
        review.append("updated", Date.now());

        this.$serve.postData("/api/reviews", review)
          .then(() => {
            alert(this.constants.ALERT_NEW_REVIEW);
            this.$router.go();
          })
          .catch(err => { alert(err.response.data.message) });
      }
    }
  }
}
</script>