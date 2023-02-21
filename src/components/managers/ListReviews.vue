<template>
  <CardElt v-if="this.$route.params.id">
    <template #header>
      <h2>
        <i class="fa-solid fa-list-check fa-lg"
          aria-hidden="true">
        </i>
        List Reviews
      </h2>
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
              @change="setModerate(slotProps.item._id)"
              @keyup.enter="updateReview(slotProps.item._id)"
              itemprop="text"
              :info="constants.UPDATE_TEXT"
              :max="5000"/>

            <FieldElt :id="'score-' + slotProps.item._id"
              type="number"
              v-model:value="slotProps.item.score"
              @change="setModerate(slotProps.item._id)"
              @keyup.enter="updateReview(slotProps.item._id)"
              :info="constants.UPDATE_SCORE"
              :min="0"
              :max="5"/>

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
                {{ getUserName(slotProps.item.user) }}
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
                  {{ getUserName(slotProps.item.user) }}
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
      <h2>
        <i class="fa-solid fa-list-check fa-lg"
          aria-hidden="true">
        </i>
        List Reviews
      </h2>
    </template>

    <template #body>
      <form method="post">
        <TableElt :items="reviews">
          <template #head>up/del</template>

          <!-- Id -->
          <template #cell-_id="slotProps">
            <a :href="`/product/${reviews[slotProps.index].product}`">
              <b>#{{ slotProps.index + 1 }}</b>
              ({{ reviews[slotProps.index]._id }})
            </a>
          </template>

          <!-- Text -->
          <template #cell-text="slotProps">
            {{ reviews[slotProps.index].text }}
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
              @keyup.enter="updateReview(reviews[slotProps.index]._id)"
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
     * SET MODERATE
     * @param {string} id 
     */
    setModerate(id) {
      for (let review of this.reviews) {
        if (review._id === id) {
          review.moderate = "false";
        }
      }
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
     * UPDATE REVIEW
     * @param {string} id 
     */
    updateReview(id) {
      for (let review of this.reviews) {
        if (review._id === id) {

          if (this.$serve.checkText(review.text) &&
            review.score !== null) {
            let reviewData = new FormData();

            reviewData.append("id", id);
            reviewData.append("text", review.text);
            reviewData.append("score", review.score);
            reviewData.append("moderate", review.moderate);
            reviewData.append("updated", Date.now());

            this.$serve.putData(`/api/reviews/${id}`, reviewData)
              .then(() => {
                alert(`Review #${id} updated !`);
                this.$router.go();
              })
              .catch(err => { console.log(err) });
          }
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
