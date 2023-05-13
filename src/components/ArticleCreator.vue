<template>
  <CardElt>
    <template #header>
      <h2 id="create-article">
        <i class="fa-regular fa-pen-to-square fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.ARTICLE_CREATOR }}
      </h2>
    </template>

    <template #body>
      <form enctype="multipart/form-data">
        <ListElt :items="constants.ARTICLE_FORM">

          <template #item-1>
            <FieldElt v-model:value="name"
              @keyup.enter="createArticle()"
              :info="constants.INFO_NAME">

              <template #legend>
                {{ constants.LEGEND_NAME }}
              </template>
              <template #label>
                {{ constants.LABEL_NAME }}
              </template>
            </FieldElt>
          </template>

          <template #item-2>
            <label for="text">
              {{ constants.LEGEND_TEXT }}
            </label>

            <Editor id="text"
              :api-key="constants.TINY_KEY"
              v-model="text"
              @keyup.enter="createArticle()"
              :init="{
                toolbar:
                  'undo redo outdent indent align lineheight | \
                  bold italic underline strikethrough backcolor | \
                  blocks fontfamily fontsize'
              }"/>
          </template>

          <template #item-3>
            <FieldElt id="image" 
              type="file"
              v-model:value="image"
              :info="constants.INFO_IMAGE">

              <template #legend>
                {{ constants.LEGEND_IMAGE }}
              </template>
              <template #label>
                {{ constants.LABEL_IMAGE }}
              </template>
            </FieldElt>
          </template>

          <template #item-4>
            <FieldElt type="textarea"
              v-model:value="alt"
              @keyup.enter="createArticle()"
              :info="constants.INFO_ALT">

              <template #legend>
                {{ constants.LEGEND_ALT }}
              </template>
              <template #label>
                {{ constants.LABEL_ALT }}
              </template>
            </FieldElt>
          </template>

          <template #item-5>
            <FieldElt type="select"
              :list="constants.CATS_ARTICLE"
              v-model:value="cat"
              @keyup.enter="createArticle()"
              :info="constants.INFO_CATEGORY">

              <template #legend>
                {{ constants.LEGEND_CATEGORY }}
              </template>
              <template #label>
                {{ constants.LABEL_CATEGORY }}
              </template>
            </FieldElt>
          </template>
        </ListElt>
        <br>

        <BtnElt type="button"
          @click="createArticle()" 
          class="btn-green"
          :content="constants.CONTENT_CREATE"
          :title="constants.ARTICLE_CREATOR">

          <template #btn>
            <i class="fa-solid fa-square-plus fa-lg"></i>
          </template>
        </BtnElt>
      </form>
    </template>
  </CardElt>
</template>

<script>
import { postData } from "../assets/axios"
import { checkError, checkRange } from "../assets/serve"

import BtnElt from "../assets/BtnElt"
import CardElt from "../assets/CardElt"
import FieldElt from "../assets/FieldElt"
import ListElt from "../assets/ListElt"
import Editor from "@tinymce/tinymce-vue"

export default {
  name: "ArticleCreator",
  components: {
    BtnElt,
    CardElt,
    FieldElt,
    ListElt,
    Editor
  },

  props: ["constants"],
  data() {
    return {
      name: "",
      text:"",
      image: "",
      alt: "",
      cat: ""
    }
  },

  methods: {
    /**
     * CREATE ARTICLE
     */
    createArticle() {
      const MSG = this.constants.CHECK_STRING;
      const MIN = this.constants.TEXT_MIN;
      const MAX = this.constants.TEXT_MAX;

      if (checkRange(this.name, MSG) && 
          checkRange(this.text, MSG, MIN, MAX) && 
          checkRange(this.alt, MSG)) {

        if (this.cat === "") { this.cat = this.constants.CAT_ARTICLE }
        let image = document.getElementById("image").files[0];

        if (image !== undefined) {
          let article = new FormData();

          article.append("name", this.name);
          article.append("text", this.text);
          article.append("image", image);
          article.append("alt", this.alt);
          article.append("user", this.constants.USER_ID);
          article.append("likes", []);
          article.append("cat", this.cat);
          article.append("created", Date.now());
          article.append("updated", Date.now());

          postData("/articles", article)
            .then(() => {
              alert(this.name + this.constants.ALERT_CREATED);
              this.$router.go();
            })
            .catch(err => { checkError(err) });

        } else {
          alert(this.constants.ALERT_IMG);
        }
      }
    }
  }
}
</script>