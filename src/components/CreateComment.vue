<template>
  <CardElt>
    <template #header>
      <i class="fa-regular fa-comment fa-2x"></i>
      <h2>Create Comment</h2>
    </template>

    <template #body>
      <form method="post">

      <!-- Comment Text -->
      <FieldElt id="comment-text"
        type="textarea"
        v-model:value="text"
        @keyup.enter="createComment()"
        info="Thanks for this post !"
        :min="2">
        <template #legend>
          Text
        </template>
        <template #label>
          Indicate the comment text
        </template>
      </FieldElt>

      <!-- Create Button -->
      <BtnElt type="button"
        content="Create"
        @click="createComment()" 
        class="btn-green"/>
      </form>
    </template>
  </CardElt>
</template>

<script>
import constants from "/constants";

export default {
  name: "CreateComment",

  data() {
    return {
      text: ""
    }
  },

  methods: {
    /**
     * CREATE COMMENT
     */
    createComment() {
      let comment  = new FormData();

      comment.append("text", this.text);
      comment.append("postId", this.$route.params.id);
      comment.append("userId", constants.USER_ID);
      comment.append("createdDate", Date.now());
      comment.append("updatedDate", Date.now());

      this.$serve.postData("/api/comments", comment)
        .then(() => {
          alert("New comment created !");
          this.$router.go();
        })
        .catch(err => { console.log(err) });
    }
  }
}
</script>