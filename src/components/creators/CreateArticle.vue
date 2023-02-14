<template>
  <CardElt id="create-article">
    <template #header>
      <i class="fa-regular fa-envelope fa-2x"></i>
      <h3>{{ constants.CREATE_ARTICLE }}</h3>
    </template>

    <template #body>
      <form method="post"
        enctype="multipart/form-data">
        <ListElt :items="['name', 'text', 'image', 'alt', 'cat']">

          <!-- Name -->
          <template #item-1>
            <FieldElt id="article-name"
              v-model:value="name"
              @keyup.enter="validateNewArticle()"
              :info="constants.CREATE_TITLE"
              :min="2">
              <template #legend>
                Title
              </template>
              <template #label>
                {{ constants.LABEL_TITLE }}
              </template>
            </FieldElt>
          </template>

          <!-- Text -->
          <template #item-2>
            <FieldElt id="article-text"
              type="textarea"
              v-model:value="text"
              @keyup.enter="validateNewArticle()"
              :info="constants.CREATE_TEXT">
              <template #legend>
                Text
              </template>
              <template #label>
                {{ constants.LABEL_TEXT }}
              </template>
            </FieldElt>
          </template>
          
          <!-- Image -->
          <template #item-3>
            <FieldElt id="article-image"
              type="file"
              v-model:value="image"
              :info="constants.CREATE_IMAGE">
              <template #legend>
                Image
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
              :info="constants.CREATE_ALT">
              <template #legend>
                Alt
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
              :info="constants.CREATE_CATEGORY">
              <template #legend>
                Category
              </template>
              <template #label>
                {{ constants.LABEL_CATEGORY }}
              </template>
            </FieldElt>
          </template>
        </ListElt>

        <!-- Create Button -->
        <BtnElt type="button"
          @click="validateNewArticle()" 
          class="btn-green"
          content="Create"
          :title="constants.CREATE_ARTICLE">
          <template #btn>
            <i class="fa-solid fa-square-plus fa-lg"></i>
          </template>
        </BtnElt>
      </form>
    </template>
  </CardElt>
</template>

<script>
import constants from "/constants"

export default {
  name: "CreateArticle",

  data() {
    return {
      name: "",
      text:"",
      image: "",
      alt: "",
      cat: "",
      constants: {}
    }
  },

  mounted() {
    this.constants = constants;
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
            this.cat = constants.CAT_ARTICLE;
          }
          this.checkNewArticle();

        } else {
          alert(constants.IMG_ARTICLE);
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
              alert(this.name + constants.CHECK_AVAILABLE);
              isReferenced = true;
            }

            if (article.text === this.text) {
              alert(this.text + constants.CHECK_REFERENCE);
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
        article.append("user", constants.USER_ID);
        article.append("created", Date.now());
        article.append("updated", Date.now());
        article.append("likes", 0);
        article.append("usersLiked", []);

        this.$serve.postData("/api/articles", article)
          .then(() => {
            alert(article.get("name") + " created !");
            this.$router.go();
          })
          .catch(err => { console.log(err) });
      }
    }
  }
}
</script>