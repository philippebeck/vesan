<template>
  <CardElt>
    <template #header>
      <h3>
        <i class="fa-regular fa-comment fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.CREATE_COMMENT }}
      </h3>
    </template>

    <template #body>
      <form method="post">

      <!-- Comment Text -->
      <FieldElt id="comment-text"
        type="textarea"
        v-model:value="text"
        @keyup.enter="createComment()"
        :info="constants.CREATE_TEXT"
        :max="5000">

        <template #legend>
          {{ constants.LEGEND_TEXT }}
        </template>
        <template #label>
          {{ constants.LABEL_TEXT }}
        </template>
      </FieldElt>

      <!-- Create Button -->
      <BtnElt type="button"
        @click="createComment()" 
        class="btn-green"
        :content="constants.CONTENT_CREATE"
        :title="constants.CREATE_COMMENT">

        <template #btn>
          <i class="fa-solid fa-square-plus fa-lg"></i>
        </template>
      </BtnElt>
      </form>
    </template>
  </CardElt>
</template>

<script>
export default {
  name: "CommentCreator",
  props: ["constants"],

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
      if (this.$serve.checkText(this.text)) {
        let comment  = new FormData();

        comment.append("text", this.text);
        comment.append("article", this.$route.params.id);
        comment.append("user", this.constants.USER_ID);
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
}
</script>