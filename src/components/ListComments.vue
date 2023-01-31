<template>
  <CardElt>
    <template #header>
      <i class="fa-regular fa-comments fa-2x"></i>
      <h3>List Comments</h3>
    </template>

    <template #body>

      <ListElt v-if="this.$route.params.id"
        :dynamic="true"
        :items="comments">

        <template #items="slotProps">
          <blockquote class="container-90sm-80md-70lg-60xl-50wd bord bord-sky blue">
            {{ slotProps.item.text }}
          </blockquote>
          <p>by {{ getCommentUser(slotProps.item.userId) }}</p>
          <p class="silver">
            Created: {{ new Date(slotProps.item.createdDate).toLocaleDateString() }}
            (Updated: {{ new Date(slotProps.item.updatedDate).toLocaleDateString() }})
          </p>
        </template>
      </ListElt>

      <form v-else
        method="post">
        <TableElt :items="comments">

          <!-- Last Table Head -->
          <template #head>
            up/del
          </template>

          <!-- Comment Text -->
          <template #cell-text="slotProps">
            <FieldElt :id="'text-' + comments[slotProps.index]._id"
              type="textarea"
              v-model:value="getComments()[slotProps.index].text"
              info="Update the comment text"
              @keyup.enter="updateComment(comments[slotProps.index]._id)">
            </FieldElt>
          </template>

          <!-- Comment Post -->
          <template #cell-postId="slotProps">
            {{ getCommentPost(getComments()[slotProps.index].postId) }}
          </template>

          <!-- Comment User -->
          <template #cell-userId="slotProps">
            {{ getCommentUser(getComments()[slotProps.index].userId) }}
          </template>

          <!-- Comment Created -->
          <template #cell-createdDate="slotProps">
            {{ new Date(getComments()[slotProps.index].createdDate).toLocaleString() }}
          </template>

          <!-- Comment Updated -->
          <template #cell-updatedDate="slotProps">
            {{ new Date(getComments()[slotProps.index].updatedDate).toLocaleString() }}
          </template>

          <template #body="slotProps">

          <!-- Update Button -->
          <BtnElt type="button"
              @click="updateComment(comments[slotProps.index]._id)" 
              class="btn-sky"
              :title="'Update comment #' + comments[slotProps.index]._id">
              <template #btn>
                <i class="fa-solid fa-edit"></i>
              </template>
            </BtnElt>

            <!-- Delete Button -->
            <BtnElt type="button"
              @click="deleteComment(comments[slotProps.index]._id)" 
              class="btn-red"
              :title="'Delete comment #' + comments[slotProps.index]._id">
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
  name: "ListComments",
  props: ["comments", "post", "posts", "users"],

  methods: {
    /**
     * GET ALL COMMENTS
     */
    getComments() {
      return this.comments;
    },
    
    /**
     * GET COMMENT POST
     * @param {string} postId 
     */
    getCommentPost(postId) {
      for (let i = 0; i < this.posts.length; i++ ) {
        if (postId === this.posts[i]._id) {

          return this.posts[i].title;
        }
      }
    },

    /**
     * GET COMMENT USER
     * @param {string} userId 
     */
    getCommentUser(userId) {
      for (let i = 0; i < this.users.length; i++ ) {
        if (userId === this.users[i]._id) {

          return this.users[i].name;
        }
      }
    },

    /**
     * UPDATE COMMENT
     * @param {string} id 
     */
    updateComment(id) {
      for (let i = 0; i < this.comments.length; i++ ) {
        if (this.comments[i]._id === id) {
          let comment = new FormData();

          comment.append("id", id);
          comment.append("text", this.comments[i].text);
          comment.append("postId", this.comments[i].postId);
          comment.append("userId", constants.USER_ID);
          comment.append("createdDate", this.comments[i].createdDate);
          comment.append("updatedDate", Date.now());

          this.$serve.putData(`/api/comments/${id}`, comment)
            .then(() => {
              alert(`Comment #${id} updated !`);
              this.$router.go();
            })
            .catch(err => { console.log(err) });
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
