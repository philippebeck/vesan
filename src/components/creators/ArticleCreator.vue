<template>
  <CardElt id="create-article">
    <template #header>
      <h3>
        <i class="fa-regular fa-envelope fa-lg"
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
            <FieldElt id="article-name"
              v-model:value="name"
              @keyup.enter="validateNewArticle()"
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
            <label for="article-text">
              {{ constants.LEGEND_TEXT }}
            </label>

            <Editor id="article-text"
              :api-key="constants.TINY_KEY"
              v-model="text"
              @keyup.enter="validateNewArticle()"
              :init="{
                toolbar:
                  'undo redo outdent indent align | \
                  bold italic underline strikethrough backcolor'
              }"/>
          </template>

          <!-- Image -->
          <template #item-3>
            <FieldElt id="article-image"
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
            <FieldElt id="article-alt"
              type="textarea"
              v-model:value="alt"
              @keyup.enter="validateNewArticle()"
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
            <FieldElt id="article-cat"
              type="select"
              :list="constants.CATS_ARTICLE"
              v-model:value="cat"
              @keyup.enter="validateNewArticle()"
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
          @click="validateNewArticle()" 
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
     * VALIDATE NEW ARTICLE IF DATA ARE VALID
     */
    validateNewArticle() {
      if (this.$serve.checkName(this.name) &&
        this.$serve.checkText(this.text)) {

        if (document.getElementById('article-image').files[0] !== undefined) {

          if (this.cat === "") {
            this.cat = this.constants.CAT_ARTICLE;
          }
          this.checkNewArticle();

        } else {
          alert(this.constants.ALERT_IMG);
        }
      }
    },

    /**
     * CHECK NEW ARTICLE IF TITLE | TEXT ARE REFERENCED
     */
    checkNewArticle() {
      this.$serve.getData("/api/articles")
        .then((articles) => {
          let isReferenced = false;

          for (let article of articles) {
            
            if (article.name === this.name) {
              alert(this.name + this.constants.ALERT_AVAILABLE);
              isReferenced = true;
            }

            if (article.text === this.text) {
              alert(this.text + this.constants.ALERT_REFERENCED);
              isReferenced = true;
            }
          }

          this.createArticle(isReferenced);
        })
        .catch(err => { console.log(err) });
    },

    /**
     * CREATE ARTICLE IF NO INFO IS REFERENCED
     * @param {boolean} isReferenced 
     */
    createArticle(isReferenced) {
      if (!isReferenced) {
        let article  = new FormData();
        let image = document.getElementById('article-image').files[0];

        article.append("name", this.name);
        article.append("text", this.text);
        article.append("image", image);
        article.append("alt", this.alt);
        article.append("cat", this.cat);
        article.append("user", this.constants.USER_ID);
        article.append("created", Date.now());
        article.append("updated", Date.now());
        article.append("likes", 0);
        article.append("usersLiked", []);

        this.$serve.postData("/api/articles", article)
          .then(() => {
            alert(this.name + this.constants.ALERT_CREATED);
            this.$router.go();
          })
          .catch(err => { console.log(err) });
      }
    }
  }
}
</script>