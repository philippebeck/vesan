<template>
  <CardElt>
    <template #header>
      <h2>
        <i class="fa-solid fa-list-check fa-lg"
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
              :max="5000"/>

            <FieldElt type="number"
              v-model:value="slotProps.item.score"
              @keyup.enter="updateReview(slotProps.item._id)"
              :info="constants.INFO_UP_SCORE"
              :min="0"
              :max="5"/>

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
            </figcaption>
          </figure>

        </template>
      </ListElt>
    </template>
  </CardElt>
</template>

<script>
export default {
  name: "ReviewManager",
  props: ["constants", "reviews"],

  methods: {
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

            reviewData.append("text", review.text);
            reviewData.append("score", review.score);
            reviewData.append("moderate", "false");
            reviewData.append("updated", Date.now());

            this.$serve.putData(`/api/reviews/${id}`, reviewData)
              .then(() => {
                alert(this.constants.ALERT_REVIEW + id + this.constants.ALERT_UPDATED);
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
      if (confirm(`${this.constants.TITLE_DELETE_REVIEW}${id} ?`) === true) {

        this.$serve.deleteData(`/api/reviews/${id}`)
          .then(() => {
            alert(this.constants.ALERT_REVIEW + id + this.constants.ALERT_DELETED);
            this.$router.go();
          })
          .catch(err => { console.log(err) });
      }
    }
  }
}
</script>
