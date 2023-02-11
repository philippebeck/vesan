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

          <form v-if="slotProps.item.user === constants.USER_ID"
            itemscope
            itemtype="https://schema.org/Review">

            <FieldElt :id="'text-' + slotProps.item._id"
              type="textarea"
              v-model:value="slotProps.item.text"
              itemprop="text"
              @keyup.enter="updateReview(slotProps.item._id)"
              :info="constants.UPDATE_TEXT">
            </FieldElt>

            <FieldElt :id="'score-' + slotProps.item._id"
              type="number"
              v-model:value="slotProps.item.score"
              @keyup.enter="updateReview(slotProps.item._id)"
              :info="constants.UPDATE_SCORE"
              :min="0"
              :max="5">
            </FieldElt>

            <BtnElt type="button"
              @click="updateReview(slotProps.item._id)" 
              class="btn-sky"
              :title="'Update review #' + slotProps.item._id">
              <template #btn>
                <i class="fa-solid fa-edit"></i>
              </template>
            </BtnElt>

            <BtnElt type="button"
              @click="deleteReview(slotProps.item._id)" 
              class="btn-red"
              :title="'Delete review #' + slotProps.item._id">
              <template #btn>
                <i class="fa-solid fa-trash-alt"></i>
              </template>
            </BtnElt>

            <p class="silver">
              Created by
              <b itemprop="author">
                {{ getReviewUser(slotProps.item.user) }}
              </b>
              on
              <i itemprop="dateCreated">
                {{ new Date(slotProps.item.created).toLocaleDateString() }}
              </i>
              / Updated on
              <i>
                {{ new Date(slotProps.item.updated).toLocaleDateString() }}
              </i>
            </p>
          </form>

          <figure v-else
            itemscope
            itemtype="https://schema.org/Review">
            <blockquote itemprop="text"
              class="container-90sm-80md-70lg-60xl-50wd bord bord-sky blue">
              {{ slotProps.item.text }}
            </blockquote>

            <figcaption>
              <p itemprop="reviewRating"
                itemscope
                itemtype="https://schema.org/Rating"
                class="violet">
                <b itemprop="ratingValue">
                  {{ slotProps.item.score }}
                </b> <i class="fa-solid fa-star"></i>
              </p>

              <p class="silver">
                Created by
                <b itemprop="author">
                  {{ getReviewUser(slotProps.item.user) }}
                </b>
                on
                <i itemprop="dateCreated">
                  {{ new Date(slotProps.item.created).toLocaleDateString() }}
                </i>
                / Updated on
                <i>
                  {{ new Date(slotProps.item.updated).toLocaleDateString() }}
                </i>
              </p>
            </figcaption>
          </figure>

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

          <template #head>
            up/del
          </template>

          <!-- Id -->
          <template #cell-_id="slotProps">
            <b>#{{ slotProps.index + 1 }}</b>
            ({{ reviews[slotProps.index]._id }})
          </template>

          <!-- Text -->
          <template #cell-text="slotProps">
            <FieldElt :id="'text-' + reviews[slotProps.index]._id"
              type="textarea"
              v-model:value="getReviews()[slotProps.index].text"
              @keyup.enter="updateReview(reviews[slotProps.index]._id)"
              :info="constants.UPDATE_TEXT">
            </FieldElt>
          </template>

          <!-- Score -->
          <template #cell-score="slotProps">
            <FieldElt :id="'score-' + reviews[slotProps.index]._id"
              type="number"
              v-model:value="getReviews()[slotProps.index].score"
              @keyup.enter="updateReview(reviews[slotProps.index]._id)"
              :info="constants.UPDATE_SCORE"
              :min="0"
              :max="5">
            </FieldElt>
          </template>

          <!-- Product -->
          <template #cell-product="slotProps">
            <b>{{ getReviewProduct(reviews[slotProps.index].product) }}</b>
            ({{ reviews[slotProps.index].product }})
          </template>

          <!-- User -->
          <template #cell-user="slotProps">
            <b>{{ getReviewUser(reviews[slotProps.index].user) }}</b>
            ({{ reviews[slotProps.index].user }})
          </template>

          <!-- Moderate -->
          <template #cell-moderate="slotProps">
            <FieldElt :id="'text-' + reviews[slotProps.index]._id"
              type="select"
              v-model:value="getReviews()[slotProps.index].moderate"
              @keyup.enter="updateReview(reviews[slotProps.index]._id)"
              :list="constants.IS_MODERATE"
              :info="constants.UPDATE_MODERATE"/>
          </template>

          <!-- Created -->
          <template #cell-created="slotProps">
            {{ new Date(reviews[slotProps.index].created).toLocaleString() }}
          </template>

          <!-- Updated -->
          <template #cell-updated="slotProps">
            {{ new Date(reviews[slotProps.index].updated).toLocaleString() }}
          </template>

          <template #body="slotProps">

            <!-- Update -->
            <BtnElt type="button"
              @click="updateReview(reviews[slotProps.index]._id)" 
              class="btn-sky"
              :title="'Update review #' + reviews[slotProps.index]._id">
              <template #btn>
                <i class="fa-solid fa-edit"></i>
              </template>
            </BtnElt>

            <!-- Delete -->
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

  data() {
    return {
      constants: []
    }
  },

  mounted() {
    this.constants = constants;
  },

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
          review.append("user", constants.USER_ID);
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
