<template>

  <!-- COMMENT CREATION ADMIN -->
  <form method="post">
    <ListElt :items="['text', 'post', 'user']">

      <!-- Comment Text -->
      <template #item-1>
        <FieldElt id="comment-text"
          type="textarea"
          v-model:value="text"
          info="Thanks for this post !"
          @keyup.enter="createComment()"
          :min="2">
          <template #legend>
            Text
          </template>
          <template #label>
            Indicate the comment text
          </template>
        </FieldElt>
      </template>

      <!-- Comment Post -->
      <template #item-2>
        <FieldElt id="comment-post"
          v-model:value="post"
          info=""
          @keyup.enter="createComment()">
          <template #legend>
            Post
          </template>
          <template #label>
            Choose the linked post
          </template>
        </FieldElt>
      </template>
      
      <!-- Comment User -->
      <template #item-3>
        <FieldElt id="comment-user"
          v-model:value="user"
          info="">
          <template #legend>
            User
          </template>
          <template #label>
            Choose the linked user
          </template>
        </FieldElt>
      </template>
    </ListElt>

    <!-- Create Button -->
    <BtnElt type="button"
      content="Create"
      @click="createComment()" 
      class="btn-green"/>
  </form>
</template>

<script>
export default {
  name: "CreateComment",

  data() {
    return {
      text: "",
      post:"",
      user: ""
    }
  },

  methods: {
    /**
     * CREATE COMMENT
     */
    createComment() {
      let comment  = new FormData();

      comment.append("text", this.text);
      comment.append("post", this.post);
      comment.append("user", this.user);

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