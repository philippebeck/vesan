<template>
  <CardElt>
    <template #header>
      <h2>
        <i class="fa-regular fa-comments fa-lg"
          aria-hidden="true">
        </i>
        Comment List
      </h2>
    </template>

    <template #body>
      <ListElt :items="comments"
        :dynamic="true">
        <template #items="slotProps">

          <form v-if="slotProps.item.user.split('-')[1] === constants.USER_ID"
            itemscope
            itemtype="https://schema.org/Comment">

            <FieldElt :id="'text-' + slotProps.item._id"
              type="textarea"
              v-model:value="slotProps.item.text"
              @change="setModerate(slotProps.item._id)"
              @keyup.enter="updateComment(slotProps.item._id)"
              itemprop="text"
              :info="constants.UPDATE_TEXT"
              :max="5000"/>

            <BtnElt type="button"
              @click="updateComment(slotProps.item._id)" 
              class="btn-sky"
              :title="'Update comment #' + slotProps.item._id">
              <template #btn>
                <i class="fa-solid fa-edit"></i>
              </template>
            </BtnElt>

            <BtnElt type="button"
              @click="deleteComment(slotProps.item._id)" 
              class="btn-red"
              :title="'Delete comment #' + slotProps.item._id">
              <template #btn>
                <i class="fa-solid fa-trash-alt"></i>
              </template>
            </BtnElt>

            <p class="silver">
              Created by
              <b itemprop="author">
                {{ slotProps.item.user.split("-")[0] }}
              </b>
              on 
              <i itemprop="dateCreated">
                {{ new Date(slotProps.item.created).toLocaleDateString() }}
              </i>
              / Updated on 
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
              Created by
              <b itemprop="author">
                {{ slotProps.item.user.split("-")[0] }}
              </b>
              on 
              <i itemprop="dateCreated">
                {{ new Date(slotProps.item.created).toLocaleDateString() }}
              </i>
              / Updated on 
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
import constants from "/constants";

export default {
  name: "CommentList",
  props: ["comments"],

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
     * SET MODERATE
     * @param {string} id 
     */
    setModerate(id) {
      for (let comment of this.comments) {
        if (comment._id === id) {
          comment.moderate = "false";
        }
      }
    },

    /**
     * UPDATE COMMENT
     * @param {string} id 
     */
    updateComment(id) {
      for (let comment of this.comments) {
        if (comment._id === id) {

          if (this.$serve.checkText(comment.text)) {
            let commentData = new FormData();

            commentData.append("id", id);
            commentData.append("text", comment.text);
            commentData.append("moderate", comment.moderate);
            commentData.append("updated", Date.now());

            this.$serve.putData(`/api/comments/${id}`, commentData)
              .then(() => {
                alert(`Comment #${id} updated !`);
                this.$router.go();
              })
              .catch(err => { console.log(err) });
          }
        }
      }
    },

    /**
     * DELETE COMMENT
     * @param {string} id 
     */
    deleteComment(id) {
      if (confirm(`Delete comment #${id} ?`) === true) {

        this.$serve.deleteData(`/api/comments/${id}`)
          .then(() => {
            alert(`Comment #${id} deleted !`);
            this.$router.go();
          })
          .catch(err => { console.log(err) });
      }
    }
  }
}
</script>
