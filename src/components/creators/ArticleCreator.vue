<template>
  <CardElt id="create-article">
    <template #header>
      <h3>
        <i class="fa-regular fa-pen-to-square fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.ARTICLE_CREATOR }}
      </h3>
    </template>

    <template #body>
      <form method="post"
        enctype="multipart/form-data">
        <ListElt :items="constants.ARTICLE_FORM">

          <!-- Name -->
          <template #item-1>
            <FieldElt v-model:value="name"
              @keyup.enter="createArticle()"
              :info="constants.INFO_NAME"
              :min="2">

              <template #legend>
                {{ constants.LEGEND_NAME }}
              </template>
              <template #label>
                {{ constants.LABEL_NAME }}
              </template>
            </FieldElt>
          </template>

          <!-- Text -->
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
                  'undo redo outdent indent align | \
                  bold italic underline strikethrough backcolor'
              }"/>
          </template>

          <!-- Image -->
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

          <!-- Alternative Text -->
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

          <!-- Category -->
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

        <!-- Create Button -->
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
import Editor from "@tinymce/tinymce-vue"

export default {
  name: "ArticleCreator",
  components: {
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
      if (this.$serve.checkName(this.name) && this.$serve.checkText(this.text) && this.$serve.checkText(this.alt)) {

        if (this.cat === "") { this.cat = this.constants.CAT_ARTICLE }
        let image = document.getElementById('image').files[0];

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

          this.$serve.postData("/api/articles", article)
            .then(() => {
              alert(this.name + this.constants.ALERT_CREATED);
              this.$router.go();
            })
            .catch(err => { alert(err.response.data.message) });

        } else {
          alert(this.constants.ALERT_IMG);
        }
      }
    }
  }
}
</script>