<template>

  <!-- REVIEW CREATION ADMIN -->
  <form method="post"
    class="form width-lg container-60lg-50wd">
    <ListElt :items="['text', 'score', 'article', 'user']">

      <!-- Review Text -->
      <template #item-1>
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
      </template>

      <!-- Review Score -->
      <template #item-2>
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
      </template>

      <!-- Review Article -->
      <template #item-3>
        <FieldElt id="review-article"
          v-model:value="article"
          info=""
          @keyup.enter="createReview()">
          <template #legend>
            Article
          </template>
          <template #label>
            Choose the linked article
          </template>
        </FieldElt>
      </template>
      
      <!-- Review User -->
      <template #item-4>
        <FieldElt id="review-user"
          v-model:value="user"
          info="">
          <template #legend>
            User
          </template>
          <template #label>
            Choose the linked user
          </template>
        </FieldElt>
      </template>
    </ListElt>

    <!-- Create Button -->
    <BtnElt type="button"
      content="Create"
      @click="createReview()" 
      class="btn-green"/>
  </form>
</template>

<script>
export default {
  name: "CreateReview",

  data() {
    return {
      text: "",
      score: null,
      article:"",
      user: ""
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
      review.append("article", this.article);
      review.append("user", this.user);

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