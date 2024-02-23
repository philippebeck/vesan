<template>
  <CardElt id="article-set">
    <template #header>
      <h2>
        <i class="fa-regular fa-pen-to-square fa-lg"></i>
        {{ val.ARTICLE_MANAGER }}
      </h2>
    </template>

    <template #body>
      <form enctype="multipart/form-data">
        <ListElt :items="val.ARTICLE_FORM">

          <template #item-1>
            <FieldElt id="name"
              v-model:value="name" 
              @keyup.enter="createArticle()"
              :info="val.INFO_NAME">
              <template #legend>{{ val.LEGEND_NAME }}</template>
              <template #label>{{ val.LABEL_NAME }}</template>
            </FieldElt>
          </template>

          <template #item-2>
            <label for="text">{{ val.LEGEND_TEXT }}</label>
            <Editor id="text"
              :api-key="val.TINY_KEY"
              v-model="text"
              @keyup.enter="createArticle()"
              :init="val.TINY_INIT"/>
          </template>

          <template #item-3>
            <FieldElt id="image" 
              type="file"
              v-model:value="image"
              :info="val.INFO_IMAGE">
              <template #legend>{{ val.LEGEND_IMAGE }}</template>
              <template #label>{{ val.LABEL_IMAGE }}</template>
            </FieldElt>
          </template>

          <template #item-4>
            <FieldElt id="alt"
              type="textarea"
              v-model:value="alt"
              @keyup.enter="createArticle()"
              :info="val.INFO_ALT">
              <template #legend>{{ val.LEGEND_ALT }}</template>
              <template #label>{{ val.LABEL_ALT }}</template>
            </FieldElt>
          </template>

          <template #item-5>
              <FieldElt id="url"
                v-model:value="url"
                @keyup.enter="updateArticle()"
                :info="val.INFO_URL">
                <template #legend>{{ val.LEGEND_URL }}</template>
                <template #label>{{ val.LABEL_URL }}</template>
              </FieldElt>
            </template>

          <template #item-6>
            <FieldElt id="cat"
              type="select"
              :list="val.CATS_ARTICLE"
              v-model:value="cat"
              @keyup.enter="createArticle()"
              :info="val.INFO_CAT">
              <template #legend>{{ val.LEGEND_CAT }}</template>
              <template #label>{{ val.LABEL_CAT }}</template>
            </FieldElt>
          </template>
        </ListElt>
        <br>

        <BtnElt type="button"
          @click="createArticle()" 
          class="btn-green"
          :content="val.CONTENT_CREATE"
          :title="val.TITLE_ARTICLE">
          <template #btn>
            <i class="fa-solid fa-square-plus fa-lg"></i>
          </template>
        </BtnElt>
      </form>
    </template>
  </CardElt>
</template>

<script>
import BtnElt from "../elements/BtnElt"
import CardElt from "../elements/CardElt"
import FieldElt from "../elements/FieldElt"
import ListElt from "../elements/ListElt"

import { checkRange, checkRegex } from "../../services/checkers"
import { postData } from "../../services/fetchers"
import { setError } from "../../services/setters"

import Editor from "@tinymce/tinymce-vue"

export default {
  name: "ArticleSet",
  components: { BtnElt, CardElt, FieldElt, ListElt, Editor },
  props: ["token", "val"],
  data() {
    return {
      name: "",
      text:"",
      image: "",
      alt: "",
      url: "",
      cat: ""
    }
  },

  methods: {
    /**
     * ? CREATE ARTICLE
     * * Creates an article by sending a POST request to the server with the provided data.
     */
    createArticle() {
      const { ALERT_CREATED, ALERT_IMG, API_URL, CAT_ARTICLE, CHECK_STRING, CHECK_URL, REGEX_URL, TEXT_MIN, TEXT_MAX } = this.val;

      if (this.url.startsWith("http")) this.url = this.url.split('//')[1];
      if (this.cat === "") this.cat = CAT_ARTICLE;

      const IS_NAME_CHECKED = checkRange(this.name, CHECK_STRING);
      const IS_TEXT_CHECKED = checkRange(this.text, CHECK_STRING, TEXT_MIN, TEXT_MAX);
      const IS_ALT_CHECKED  = checkRange(this.alt, CHECK_STRING);

      const IS_URL_CHECKED = this.url ? checkRegex(this.url, CHECK_URL, REGEX_URL) : true;

      if (IS_NAME_CHECKED && IS_TEXT_CHECKED && IS_ALT_CHECKED && IS_URL_CHECKED) {
        const img = document.getElementById("image")?.files[0];

        if (img !== undefined) {
          const URL   = `${API_URL}/articles`;
          const data  = new FormData();

          data.append("name", this.name);
          data.append("text", this.text);
          data.append("image", img);
          data.append("alt", this.alt);
          data.append("url", this.url);
          data.append("cat", this.cat);

          postData(URL, data, this.token)
            .then(() => {
              alert(this.name + ALERT_CREATED);
              this.$router.go();
            })
            .catch(err => setError(err));

        } else {
          alert(ALERT_IMG);
        }
      }
    }
  }
}
</script>
