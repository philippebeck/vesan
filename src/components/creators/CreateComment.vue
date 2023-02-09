<template>
  <CardElt>
    <template #header>
      <i class="fa-regular fa-comment fa-2x"></i>
      <h3>Create Comment</h3>
    </template>

    <template #body>
      <form method="post">

      <!-- Comment Text -->
      <FieldElt id="comment-text"
        type="textarea"
        v-model:value="text"
        @keyup.enter="createComment()"
        info="Thanks for this article !"
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
        class="btn-green"
        title="Create a new Comment">
        <template #btn>
          <i class="fa-solid fa-square-plus fa-lg"></i>
        </template>
      </BtnElt>
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
      text: "",
      constants: []
    }
  },

  mounted() {
    this.constants = constants;
  },

  methods: {
    /**
     * CREATE COMMENT
     */
    createComment() {
      let comment  = new FormData();

      comment.append("text", this.text);
      comment.append("article", this.$route.params.id);
      comment.append("user", constants.USER_ID);
      comment.append("created", Date.now());
      comment.append("updated", Date.now());

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