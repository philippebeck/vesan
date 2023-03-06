<template>
  <CardElt>
    <template #header>
      <h2>
        <i class="fa-regular fa-comments fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.COMMENT_LIST }}
      </h2>
    </template>

    <template #body>
      <ListElt :items="comments"
        :dynamic="true">
        <template #items="slotProps">

          <form v-if="slotProps.item.user.split('-')[1] === constants.USER_ID"
            itemscope
            itemtype="https://schema.org/Comment">

            <FieldElt type="textarea"
              v-model:value="slotProps.item.text"
              @keyup.enter="updateComment(slotProps.item._id)"
              itemprop="text"
              :info="constants.INFO_UP_TEXT"
              :min="constants.TEXT_MIN"
              :max="constants.TEXT_MAX"/>

            <BtnElt type="button"
              @click="updateComment(slotProps.item._id)" 
              class="btn-sky"
              :title="constants.INFO_UP_COMMENT + slotProps.item._id">

              <template #btn>
                <i class="fa-solid fa-edit"></i>
              </template>
            </BtnElt>

            <BtnElt type="button"
              @click="deleteComment(slotProps.item._id)" 
              class="btn-red"
              :title="constants.TITLE_DELETE_COMMENT + slotProps.item._id">

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
              <i itemprop="dateModified">
                {{ new Date(slotProps.item.updated).toLocaleDateString() }}
              </i>
            </p>
          </form>

          <figure v-else
            itemscope
            itemtype="https://schema.org/Comment">
            <blockquote itemprop="text"
              class="container-90sm-80md-70lg-60xl-50wd bord bord-sky blue">
              {{ slotProps.item.text }}
            </blockquote>
            <br>

            <figcaption class="silver">
              {{ constants.CREATE_BY }}
              <b itemprop="author">
                {{ slotProps.item.user.split("-")[0] }}
              </b>
              {{ constants.ON }} 
              <i itemprop="dateCreated">
                {{ new Date(slotProps.item.created).toLocaleDateString() }}
              </i>
              / {{ constants.UPDATE_ON }} 
              <i itemprop="dateModified">
                {{ new Date(slotProps.item.updated).toLocaleDateString() }}
              </i>
            </figcaption>
          </figure>

        </template>
      </ListElt>
    </template>
  </CardElt>
</template>

<script>
export default {
  name: "CommentList",
  props: ["comments", "constants"],

  methods: {
    /**
     * UPDATE COMMENT
     * @param {string} id 
     */
    updateComment(id) {
      for (let comment of this.comments) {
        if (comment._id === id) {

          if (this.$serve.checkString(comment.text, this.constants.TEXT_MIN, this.constants.TEXT_MAX)) {
            let data = new FormData();

            data.append("text", comment.text);
            data.append("moderate", "false");
            data.append("updated", Date.now());

            this.$serve.putData(`/api/comments/${id}`, data)
              .then(() => {
                alert(this.constants.ALERT_COMMENT + id + this.constants.ALERT_UPDATED);
                this.$router.go();
              })
              .catch(err => { alert(err.response.data.message) });
          }
        }
      }
    },

    /**
     * DELETE COMMENT
     * @param {string} id 
     */
    deleteComment(id) {
      if (confirm(`${this.constants.TITLE_DELETE_COMMENT}${id} ?`) === true) {

        this.$serve.deleteData(`/api/comments/${id}`)
          .then(() => {
            alert(this.constants.ALERT_COMMENT + id + this.constants.ALERT_DELETED);
            this.$router.go();
          })
          .catch(err => { alert(err.response.data.message) });
      }
    }
  }
}
</script>
