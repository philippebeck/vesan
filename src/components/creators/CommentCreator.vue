<template>
  <CardElt>
    <template #header>
      <h3>
        <i class="fa-regular fa-comment fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.COMMENT_CREATOR }}
      </h3>
    </template>

    <template #body>
      <form method="post">

      <!-- Comment Text -->
      <FieldElt type="textarea"
        v-model:value="text"
        @keyup.enter="createComment()"
        :info="constants.INFO_TEXT"
        :min="constants.TEXT_MIN"
        :max="constants.TEXT_MAX">

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
        :title="constants.COMMENT_CREATOR">

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
      if (this.$serve.checkString(this.text, this.constants.TEXT_MIN, this.constants.TEXT_MAX)) {
        let comment = new FormData();

        comment.append("text", this.text);
        comment.append("article", this.$route.params.id);
        comment.append("user", this.constants.USER_ID);
        comment.append("moderate", "false");
        comment.append("created", Date.now());
        comment.append("updated", Date.now());

        this.$serve.postData("/comments", comment)
          .then(() => {
            alert(this.constants.ALERT_NEW_COMMENT);
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