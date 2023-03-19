<template>
  <CardElt>
    <template #header>
      <h2>
        <i class="fa-solid fa-ranking-star fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.REVIEW_LIST }}
      </h2>
    </template>

    <template #body>
      <ListElt :items="reviews"
        :dynamic="true">
        <template #items="slotProps">

          <form v-if="slotProps.item.user.split('-')[1] === constants.USER_ID"
            itemscope
            itemtype="https://schema.org/Review">

            <FieldElt type="textarea"
              v-model:value="slotProps.item.text"
              @keyup.enter="updateReview(slotProps.item._id)"
              itemprop="text"
              :info="constants.INFO_UP_TEXT"
              :min="constants.TEXT_MIN"
              :max="constants.TEXT_MAX"/>

            <FieldElt type="number"
              v-model:value="slotProps.item.score"
              @keyup.enter="updateReview(slotProps.item._id)"
              :info="constants.INFO_UP_SCORE"
              :min="constants.NUM_MIN"
              :max="constants.NUM_MAX"/>

            <BtnElt type="button"
              @click="updateReview(slotProps.item._id)" 
              class="btn-sky"
              :title="constants.INFO_UP_REVIEW + slotProps.item._id">

              <template #btn>
                <i class="fa-solid fa-edit"></i>
              </template>
            </BtnElt>

            <BtnElt type="button"
              @click="deleteReview(slotProps.item._id)" 
              class="btn-red"
              :title="constants.TITLE_DELETE_REVIEW + slotProps.item._id">

              <template #btn>
                <i class="fa-solid fa-trash-alt"></i>
              </template>
            </BtnElt>

            <p class="silver">
              {{ constants.CREATE_BY }}
              <b itemprop="author">
                {{ slotProps.item.user.split("-")[0] }}
              </b>
              {{ constants.ON }}
              <i itemprop="dateCreated">
                {{ new Date(slotProps.item.created).toLocaleDateString() }}
              </i>
              / {{ constants.UPDATE_ON }}
              <i>
                {{ new Date(slotProps.item.updated).toLocaleDateString() }}
              </i>
            </p>
          </form>

          <MediaElt v-else
            type="quote"
            :content="slotProps.item.text"
            class="container-90sm-80md-70lg-60xl-50wd bord bord-sky blue"
            itemscope
            itemtype="https://schema.org/Review"
            itemprop="text">

            <template #figcaption>
              <p itemprop="reviewRating"
                itemscope
                itemtype="https://schema.org/Rating"
                class="violet">
                <b itemprop="ratingValue">
                  {{ slotProps.item.score }}
                </b> <i class="fa-solid fa-star"></i>
              </p>

              <p class="silver">
                {{ constants.CREATE_BY }}
                <b itemprop="author">
                  {{ slotProps.item.user.split("-")[0] }}
                </b>
                {{ constants.ON }}
                <i itemprop="dateCreated">
                  {{ new Date(slotProps.item.created).toLocaleDateString() }}
                </i>
                / {{ constants.UPDATE_ON }}
                <i>
                  {{ new Date(slotProps.item.updated).toLocaleDateString() }}
                </i>
              </p>
            </template>
          </MediaElt>

        </template>
      </ListElt>
    </template>
  </CardElt>
</template>

<script>
import BtnElt from "@/assets/BtnElt"
import CardElt from "@/assets/CardElt"
import FieldElt from "@/assets/FieldElt"
import ListElt from "@/assets/ListElt"
import MediaElt from "@/assets/MediaElt"

export default {
  name: "ReviewManager",
  components: {
    BtnElt,
    CardElt,
    FieldElt,
    ListElt,
    MediaElt
  },

  props: [
    "constants", 
    "reviews"
  ],

  methods: {
    /**
     * UPDATE REVIEW
     * @param {string} id 
     */
    updateReview(id) {
      for (let review of this.reviews) {
        if (review._id === id) {

          if (this.$serve.checkString(review.text, this.constants.TEXT_MIN, this.constants.TEXT_MAX) && 
            this.$serve.checkNumber(this.score)) {
            let data = new FormData();

            data.append("text", review.text);
            data.append("score", review.score);
            data.append("moderate", "false");
            data.append("updated", Date.now());

            this.$serve.putData(`/reviews/${id}`, data)
              .then(() => {
                alert(this.constants.ALERT_REVIEW + id + this.constants.ALERT_UPDATED);
                this.$router.go();
              })
              .catch(err => {
                if (err.response) {
                  alert(err.response.data.message) 
                } else {
                  console.log(err);
                }
              });
          }
        }
      }
    },

    /**
     * DELETE REVIEW
     * @param {string} id 
     */
    deleteReview(id) {
      if (confirm(`${this.constants.TITLE_DELETE_REVIEW}${id} ?`) === true) {

        this.$serve.deleteData(`/reviews/${id}`)
          .then(() => {
            alert(this.constants.ALERT_REVIEW + id + this.constants.ALERT_DELETED);
            this.$router.go();
          })
          .catch(err => {
            if (err.response) {
              alert(err.response.data.message) 
            } else {
              console.log(err);
            }
          });
      }
    }
  }
}
</script>
