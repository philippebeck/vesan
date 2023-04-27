<template>
  <CardElt>
    <template #header>
      <h2 id="review">
        <i class="fa-solid fa-ranking-star fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.REVIEW_MANAGER }}
      </h2>
    </template>

    <template #body>
      <form>
        <TableElt :items="reviews">

          <template #cell-_id="slotProps">
            <a :href="`/product/${reviews[slotProps.index].product}`">
              <b>#{{ slotProps.index + 1 }}</b>
              ({{ reviews[slotProps.index]._id }})
            </a>
          </template>

          <template #cell-score="slotProps">
            {{ reviews[slotProps.index].score }}
            <i class="fa-regular fa-star"></i>
          </template>

          <template #cell-product="slotProps">
            <a :href="`/product/${reviews[slotProps.index].product}`">
              <b>{{ getProductName(reviews[slotProps.index].product) }}</b>
              ({{ reviews[slotProps.index].product }})
            </a>
          </template>

          <template #cell-user="slotProps">
            <b>{{ reviews[slotProps.index].user.split('-')[0] }}</b>
            ({{ reviews[slotProps.index].user.split('-')[1] }})
          </template>

          <template #cell-moderate="slotProps">
            <FieldElt type="select"
              :list="constants.IS_MODERATE"
              v-model:value="getReviews()[slotProps.index].moderate"
              @keyup.enter="moderateReview(reviews[slotProps.index]._id)"
              :info="constants.INFO_UP_MODERATE"/>
          </template>

          <template #cell-created="slotProps">
            <p>
              {{ new Date(reviews[slotProps.index].created).toLocaleString() }}
            </p>

            <BtnElt type="button"
              @click="deleteReview(reviews[slotProps.index]._id)" 
              class="btn-red"
              :title="constants.TITLE_DELETE_REVIEW + reviews[slotProps.index]._id">

              <template #btn>
                <i class="fa-solid fa-trash-arrow-up fa-lg fa-fw"></i>
              </template>
            </BtnElt>
          </template>

          <template #cell-updated="slotProps">
            <p>
              {{ new Date(reviews[slotProps.index].updated).toLocaleString() }}
            </p>

            <BtnElt type="button"
              @click="moderateReview(reviews[slotProps.index]._id)" 
              class="btn-green"
              :title="constants.TITLE_REVIEW_MODERATE + reviews[slotProps.index]._id">

              <template #btn>
                <i class="fa-solid fa-spell-check fa-lg fa-fw"></i>
              </template>
            </BtnElt>
          </template>
        </TableElt>
      </form>
    </template>
  </CardElt>
</template>

<script>
import BtnElt from "@/assets/BtnElt"
import CardElt from "@/assets/CardElt"
import FieldElt from "@/assets/FieldElt"
import TableElt from "@/assets/TableElt"

export default {
  name: "ReviewManager",
  components: {
    BtnElt,
    CardElt,
    FieldElt,
    TableElt
  },

  props: [
    "constants", 
    "products", 
    "reviews", 
    "users"
  ],

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
     * MODERATE REVIEW
     * @param {string} id 
     */
    moderateReview(id) {
      for (let review of this.reviews) {
        if (review._id === id) {

          let data = new FormData();
          data.append("text", review.text);
          data.append("score", review.score);
          data.append("moderate", review.moderate);

          let options = {
            method: "PUT",
            mode: "cors",
            headers: { "Authorization": `Bearer ${this.constants.TOKEN}` },
            body: data
          };

          this.$serve.fetchSet(this.constants.API_URL + `/reviews/${id}`, options)
            .then(() => {
              alert(this.constants.ALERT_REVIEW + id + this.constants.ALERT_MODERATED);
            })
            .catch(err => { this.$serve.checkError(err) });
        }
      }
    },

    /**
     * DELETE REVIEW
     * @param {string} id 
     */
    deleteReview(id) {
      if (confirm(`${this.constants.TITLE_DELETE_REVIEW}${id} ?`) === true) {
        let options = {
          method: "DELETE",
          mode: "cors",
          headers: { "Authorization": `Bearer ${this.constants.TOKEN}` }
        };

        this.$serve.fetchSet(this.constants.API_URL + `/reviews/${id}`, options)
          .then(() => {
            alert(this.constants.ALERT_REVIEW + id + this.constants.ALERT_DELETED);
            this.$router.go();
          })
          .catch(err => { this.$serve.checkError(err) });
      }
    }
  }
}
</script>
