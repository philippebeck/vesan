<template>
  <CardElt v-if="this.$route.params.id">
    <template #header>
      <i class="fa-regular fa-comments fa-2x"></i>
      <h2>List Comments</h2>
    </template>

    <template #body>

      <ListElt :items="comments"
        :dynamic="true">

        <template #items="slotProps">
          <blockquote class="container-90sm-80md-70lg-60xl-50wd bord bord-sky blue">
            {{ slotProps.item.text }}
          </blockquote>
          <p>by {{ getCommentUser(slotProps.item.user) }}</p>
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
      <i class="fa-regular fa-comments fa-2x"></i>
      <h3>List Comments</h3>
    </template>

    <template #body>

      <form method="post">
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
          <template #cell-post="slotProps">
            {{ getCommentPost(getComments()[slotProps.index].post) }}
          </template>

          <!-- Comment User -->
          <template #cell-user="slotProps">
            {{ getCommentUser(getComments()[slotProps.index].user) }}
          </template>

          <!-- Comment Created -->
          <template #cell-created="slotProps">
            {{ new Date(getComments()[slotProps.index].created).toLocaleString() }}
          </template>

          <!-- Comment Updated -->
          <template #cell-updated="slotProps">
            {{ new Date(getComments()[slotProps.index].updated).toLocaleString() }}
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
          comment.append("post", this.comments[i].post);
          comment.append("user", constants.USER_ID);
          comment.append("created", this.comments[i].created);
          comment.append("updated", Date.now());

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
