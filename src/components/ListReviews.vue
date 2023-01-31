<template>
  <CardElt>
    <template #header>
      <i class="fa-solid fa-list-check fa-2x"></i>
      <h3>List Reviews</h3>
    </template>

    <template #body>

      <ListElt v-if="this.$route.params.id"
        :dynamic="true"
        :items="reviews">
        <template #items="slotProps">
          <blockquote class="container-90sm-80md-70lg-60xl-50wd bord bord-sky blue">
            {{ slotProps.item.text }}
          </blockquote>
          <p>by {{ getReviewUser(slotProps.item.userId) }}</p>
          <p class="violet">
            {{ slotProps.item.score }}
            <i class="fa-solid fa-star"></i>
          </p>
          <p class="silver">
            Created: {{ new Date(slotProps.item.createdDate).toLocaleDateString() }}
            (Updated: {{ new Date(slotProps.item.updatedDate).toLocaleDateString() }})
          </p>
        </template>
      </ListElt>

      <form v-else
        method="post">
        <TableElt :items="reviews">

          <!-- Last Table Head -->
          <template #head>
            up/del
          </template>

          <!-- Review Text -->
          <template #cell-text="slotProps">
            <FieldElt :id="'text-' + reviews[slotProps.index]._id"
              type="textarea"
              v-model:value="getReviews()[slotProps.index].text"
              @keyup.enter="updateReview(reviews[slotProps.index]._id)"
              info="Update the review text">
            </FieldElt>
          </template>

          <!-- Review Score -->
          <template #cell-score="slotProps">
            <FieldElt :id="'score-' + reviews[slotProps.index]._id"
              type="number"
              v-model:value="getReviews()[slotProps.index].score"
              @keyup.enter="updateReview(reviews[slotProps.index]._id)"
              info="Update the review score"
              :min="0"
              :max="5">
            </FieldElt>
          </template>

          <!-- Review Article -->
          <template #cell-articleId="slotProps">
            {{ getReviewArticle(getReviews()[slotProps.index].articleId) }}
          </template>

          <!-- Review User -->
          <template #cell-userId="slotProps">
            {{ getReviewUser(getReviews()[slotProps.index].userId) }}
          </template>

          <!-- Review Created -->
          <template #cell-createdDate="slotProps">
            {{ new Date(getReviews()[slotProps.index].createdDate).toLocaleString() }}
          </template>

          <!-- Review Updated -->
          <template #cell-updatedDate="slotProps">
            {{ new Date(getReviews()[slotProps.index].updatedDate).toLocaleString() }}
          </template>

          <template #body="slotProps">

          <!-- Update Button -->
          <BtnElt type="button"
              @click="updateReview(reviews[slotProps.index]._id)" 
              class="btn-sky"
              :title="'Update review #' + reviews[slotProps.index]._id">
              <template #btn>
                <i class="fa-solid fa-edit"></i>
              </template>
            </BtnElt>

            <!-- Delete Button -->
            <BtnElt type="button"
              @click="deleteReview(reviews[slotProps.index]._id)" 
              class="btn-red"
              :title="'Delete review #' + reviews[slotProps.index]._id">
              <template #btn>
                <i class="fa-solid fa-trash-alt"></i>
              </template>
            </BtnElt>
          </template>
        </TableElt>
      </form>
    </template>
  </CardElt>
</template>

<script>
import constants from "/constants";

export default {
  name: "ListReviews",
  props: ["reviews", "article", "articles", "users"],

  methods: {
    /**
     * GET ALL REVIEWS
     */
    getReviews() {
      return this.reviews;
    },
    
    /**
     * GET REVIEW ARTICLE
     * @param {string} articleId 
     */
    getReviewArticle(articleId) {
      for (let i = 0; i < this.articles.length; i++ ) {
        if (articleId === this.articles[i]._id) {

          return this.articles[i].name;
        }
      }
    },

    /**
     * GET REVIEW USER
     * @param {string} userId 
     */
    getReviewUser(userId) {
      for (let i = 0; i < this.users.length; i++ ) {
        if (userId === this.users[i]._id) {

          return this.users[i].name;
        }
      }
    },

    /**
     * UPDATE REVIEW
     * @param {string} id 
     */
    updateReview(id) {
      for (let i = 0; i < this.reviews.length; i++ ) {

        if (this.reviews[i]._id === id) {
          let review = new FormData();

          review.append("id", this.reviews[i]._id);
          review.append("text", this.reviews[i].text);
          review.append("score", this.reviews[i].score);
          review.append("articleId", this.reviews[i].articleId);
          review.append("userId", constants.USER_ID);
          review.append("createdDate", this.reviews[i].createdDate);
          review.append("updatedDate", Date.now());

          this.$serve.putData(`/api/reviews/${id}`, review)
            .then(() => {
              alert(`Review #${id} updated !`);
              this.$router.go();
            })
            .catch(err => { console.log(err) });
        }
      }
    },

    /**
     * DELETE REVIEW
     * @param {string} id 
     */
    deleteReview(id) {
      if (confirm(`Delete review #${id} ?`) === true) {

        this.$serve.deleteData(`/api/reviews/${id}`)
          .then(() => {
            alert(`Review #${id} deleted !`);
            this.$router.go();
          })
          .catch(err => { console.log(err) });
      }
    }
  }
}
</script>
