<template>

  <!-- REVIEW ADMIN MANAGER -->
  <form method="post">
    <TableElt :items="reviews"
      id="reviews">

      <!-- Last Table Head -->
      <template #head>
        up/del
      </template>

      <!-- Review Text -->
      <template #cell-text="slotProps">
        <FieldElt :id="'text-' + reviews[slotProps.index]._id"
          v-model:value="getReviews()[slotProps.index].text"
          info="Update the review text"
          @keyup.enter="updateReview(reviews[slotProps.index]._id)">
        </FieldElt>
      </template>

      <!-- Review Score -->
      <template #cell-score="slotProps">
        <FieldElt :id="'score-' + reviews[slotProps.index]._id"
          type="number"
          v-model:value="getReviews()[slotProps.index].score"
          info="Update the review score"
          @keyup.enter="updateReview(reviews[slotProps.index]._id)">
        </FieldElt>
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

<script>
export default {
  name: "ListReviews",
  props: ["reviews"],

  methods: {
    /**
     * GET ALL REVIEWS
     */
    getReviews() {
      return this.reviews;
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
