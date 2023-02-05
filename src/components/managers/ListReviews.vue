<template>
  <CardElt v-if="this.$route.params.id">
    <template #header>
      <i class="fa-solid fa-list-check fa-2x"></i>
      <h2>List Reviews</h2>
    </template>

    <template #body>

      <ListElt :items="reviews"
        :dynamic="true">
        <template #items="slotProps">
          <blockquote class="container-90sm-80md-70lg-60xl-50wd bord bord-sky blue">
            {{ slotProps.item.text }}
          </blockquote>

          <p class="violet">
            {{ slotProps.item.score }}
            <i class="fa-solid fa-star"></i>
          </p>
          
          <p>by {{ getReviewUser(slotProps.item.user) }}</p>
          <p class="silver">
            Created: {{ new Date(slotProps.item.created).toLocaleDateString() }}
            (Updated: {{ new Date(slotProps.item.updated).toLocaleDateString() }})
          </p>
        </template>
      </ListElt>
    </template>
  </CardElt>

  <CardElt v-else>
    <template #header>
      <i class="fa-solid fa-list-check fa-2x"></i>
      <h2>List Reviews</h2>
    </template>

    <template #body>
      <form method="post">
        <TableElt :items="reviews">

          <!-- Last Table Head -->
          <template #head>
            up/del
          </template>

          <!-- Review Id -->
          <template #cell-_id="slotProps">
            <b>#{{ slotProps.index + 1 }}</b>
            ({{ reviews[slotProps.index]._id }})
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

          <!-- Review Product -->
          <template #cell-product="slotProps">
            <b>{{ getReviewProduct(reviews[slotProps.index].product) }}</b>
            ({{ reviews[slotProps.index].product }})
          </template>

          <!-- Review User -->
          <template #cell-user="slotProps">
            <b>{{ getReviewUser(reviews[slotProps.index].user) }}</b>
            ({{ reviews[slotProps.index].user }})
          </template>

          <!-- Review Created -->
          <template #cell-created="slotProps">
            {{ new Date(reviews[slotProps.index].created).toLocaleString() }}
          </template>

          <!-- Review Updated -->
          <template #cell-updated="slotProps">
            {{ new Date(reviews[slotProps.index].updated).toLocaleString() }}
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
  props: ["reviews", "products", "users"],

  methods: {
    /**
     * GET ALL REVIEWS
     */
    getReviews() {
      return this.reviews;
    },
    
    /**
     * GET REVIEW PRODUCT
     * @param {string} productId 
     */
    getReviewProduct(productId) {
      for (let i = 0; i < this.products.length; i++ ) {
        if (productId === this.products[i]._id) {

          return this.products[i].name;
        }
      }
    },

    /**
     * GET REVIEW USER
     * @param {string} userId 
     */
    getReviewUser(userId) {
      for (let i = 0; i < this.users.length; i++ ) {
        if (userId === this.users[i].id) {

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
          review.append("product", this.reviews[i].product);
          review.append("user", constants.USER_ID);
          review.append("created", this.reviews[i].created);
          review.append("updated", Date.now());

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
