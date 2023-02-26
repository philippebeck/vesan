<template>
  <CardElt>
    <template #header>
      <h2>
        <i class="fa-solid fa-list-check fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.MANAGER_REVIEW }}
      </h2>
    </template>

    <template #body>
      <form method="post">
        <TableElt :items="reviews">

          <template #head>
            {{ constants.HEAD_MOD }}
          </template>

          <!-- Id -->
          <template #cell-_id="slotProps">
            <a :href="`/product/${reviews[slotProps.index].product}`">
              <b>#{{ slotProps.index + 1 }}</b>
              ({{ reviews[slotProps.index]._id }})
            </a>
          </template>

          <!-- Score -->
          <template #cell-score="slotProps">
            {{ reviews[slotProps.index].score }}
            <i class="fa-regular fa-star"></i>
          </template>

          <!-- Product -->
          <template #cell-product="slotProps">
            <a :href="`/product/${reviews[slotProps.index].product}`">
              <b>{{ getProductName(reviews[slotProps.index].product) }}</b>
              ({{ reviews[slotProps.index].product }})
            </a>
          </template>

          <!-- User -->
          <template #cell-user="slotProps">
            <b>{{ getUserName(reviews[slotProps.index].user) }}</b>
            ({{ reviews[slotProps.index].user }})
          </template>

          <!-- Moderate -->
          <template #cell-moderate="slotProps">
            <FieldElt :id="'text-' + reviews[slotProps.index]._id"
              type="select"
              :list="constants.IS_MODERATE"
              v-model:value="getReviews()[slotProps.index].moderate"
              @keyup.enter="moderateReview(reviews[slotProps.index]._id)"
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

            <!-- Moderate -->
            <BtnElt type="button"
              @click="moderateReview(reviews[slotProps.index]._id)" 
              class="btn-green"
              :title="constants.MODERATE_REVIEW + reviews[slotProps.index]._id">

              <template #btn>
                <i class="fa-solid fa-spell-check"></i>
              </template>
            </BtnElt>

            <!-- Delete -->
            <BtnElt type="button"
              @click="deleteReview(reviews[slotProps.index]._id)" 
              class="btn-red"
              :title="constants.DELETE_REVIEW + reviews[slotProps.index]._id">

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
  name: "ReviewManager",
  props: ["reviews", "products", "users"],

  data() {
    return {
      constants: {}
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
     * GET PRODUCT NAME
     * @param {string} id 
     * @returns
     */
    getProductName(id) {
      return this.$serve.getItemName(id, this.products);
    },

    /**
     * GET USER NAME
     * @param {string} id
     * @returns 
     */
    getUserName(id) {
      return this.$serve.getItemName(id, this.users);
    },

    /**
     * MODERATE REVIEW
     * @param {string} id 
     */
    moderateReview(id) {
      for (let review of this.reviews) {
        if (review._id === id) {

          let reviewData = new FormData();
          reviewData.append("id", id);
          reviewData.append("moderate", review.moderate);

          this.$serve.putData(`/api/reviews/${id}`, reviewData)
            .then(() => {
              alert(`Review #${id} moderated !`);
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
