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
          @keyup.enter="validateNewReview()"
          :min="parseInt('2')">
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
          v-model:value="score"
          info=""
          @keyup.enter="validateNewReview()"
          type="number">
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
          @keyup.enter="validateNewReview()">
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
        <FieldElt id="user"
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
      @click="validateNewReview()" 
      class="btn-green"/>
  </form>
</template>

<script>
export default {
  name: "CreateReview",

  data() {
    return {
      text: "",
      score: "",
      article:"",
      user: ""
    }
  },

  methods: {
    /**
     * VALIDATE NEW REVIEW IF DATA ARE VALID
     */
    validateNewReview() {
      if (this.$serve.checkName(this.text) && 
        this.$serve.checkArticle(this.article) && 
        this.$serve.checkPass(this.pass)) {

        if (typeof document.getElementById('user').files[0] !== "undefined") {
          this.checkNewReview();

        } else {
          alert("Une photo de l'utilisateur doit être uploadée !");
        }
      }
    },

    /**
     * CHECK NEW REVIEW IF NAME | EMAIL ARE REFERENCED
     */
    checkNewReview() {
      this.$serve.getData("/api/reviews")
        .then((reviews) => {
          let isReferenced = false;

          for (let i = 0; i < reviews.length; i++) {

            if (reviews[i].text === this.text) {
              alert(this.text + " is not available !");
              isReferenced = true;
            }

            if (reviews[i].article === this.article) {
              alert(this.article + " is already referenced !");
              isReferenced = true;
            }
          }

          this.createReview(isReferenced);
        })
        .catch(err => { console.log(err) });
    },

    /**
     * CREATE REVIEW IF NO INFO IS REFERENCED
     * @param {boolean} isReferenced 
     */
    createReview(isReferenced) {
      if (!isReferenced) {
        let review  = new FormData();
        let user = document.getElementById('user').files[0];

        review.append("text", this.text);
        review.append("article", this.article);
        review.append("user", user);
        review.append("pass", this.pass);

        this.$serve.articleData("/api/reviews", review)
          .then(() => {
            alert(review.get("text") + " created !");
            this.$router.go();
          })
          .catch(err => { console.log(err) });
      }
    }
  }
}
</script>