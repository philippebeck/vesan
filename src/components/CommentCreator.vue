<template>
  <CardElt>
    <template #header>
      <h2>
        <i class="fa-regular fa-comment fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.COMMENT_CREATOR }}
      </h2>
    </template>

    <template #body>
      <form method="post">

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
import { checkError, checkRange, fetchSet } from "../assets/serve"

import BtnElt from "../assets/BtnElt"
import CardElt from "../assets/CardElt"
import FieldElt from "../assets/FieldElt"

export default {
  name: "CommentCreator",
  components: {
    BtnElt,
    CardElt,
    FieldElt
  },

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
      const MAX = this.constants.TEXT_MAX;
      const MIN = this.constants.TEXT_MIN;
      const MSG = this.constants.CHECK_STRING;

      if (checkRange(this.text, MSG, MIN, MAX)) {
        let comment = new FormData();

        comment.append("text", this.text);
        comment.append("article", this.$route.params.id);
        comment.append("user", this.constants.USER_ID);
        comment.append("moderate", "false");
        comment.append("created", Date.now());
        comment.append("updated", Date.now());

        const URL   = this.constants.API_URL + "/comments";
        let options = {
          method: "POST",
          mode: "cors",
          headers: { "Authorization": `Bearer ${this.constants.TOKEN}` },
          body: comment
        };

        fetchSet(URL, options)
          .then(() => {
            alert(this.constants.ALERT_NEW_COMMENT);
            this.$router.go();
          })
          .catch(err => { checkError(err) });
      }
    }
  }
}
</script>