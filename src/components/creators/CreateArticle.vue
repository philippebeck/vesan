<template>
  <CardElt id="create-article">
    <template #header>
      <i class="fa-regular fa-envelope fa-2x"></i>
      <h3>Create Article</h3>
    </template>

    <template #body>
      <form method="post"
        enctype="multipart/form-data">
        <ListElt :items="['title', 'text', 'image', 'alt', 'cat']">

          <!-- Article Title -->
          <template #item-1>
            <FieldElt id="article-title"
              v-model:value="title"
              info="My new article"
              @keyup.enter="validateNewArticle()"
              :min="2">
              <template #legend>
                Title
              </template>
              <template #label>
                Indicate the article title
              </template>
            </FieldElt>
          </template>

          <!-- Article Text -->
          <template #item-2>
            <FieldElt id="article-text"
              v-model:value="text"
              info="Once upon a time..."
              @keyup.enter="validateNewArticle()"
              type="textarea">
              <template #legend>
                Text
              </template>
              <template #label>
                Indicate the article text
              </template>
            </FieldElt>
          </template>
          
          <!-- Article Image -->
          <template #item-3>
            <FieldElt id="article-image"
              v-model:value="image"
              info="Image file only"
              type="file">
              <template #legend>
                Image
              </template>
              <template #label>
                Provide article image
              </template>
            </FieldElt>
          </template>

          <!-- Article Author -->
          <template #item-4>
            <FieldElt id="article-alt"
              type="textarea"
              v-model:value="alt"
              info="Alternative text"
              @keyup.enter="validateNewArticle()">
              <template #legend>
                Alt
              </template>
              <template #label>
                Indicate the article alt
              </template>
            </FieldElt>
          </template>

          <!-- Article Category -->
          <template #item-5>
            <FieldElt id="article-cat"
              type="select"
              v-model:value="cat"
              info="Choose a category"
              @keyup.enter="validateNewArticle()"
              :list="cats">
              <template #legend>
                Category
              </template>
              <template #label>
                Choose the article category
              </template>
            </FieldElt>
          </template>
        </ListElt>

        <!-- Create Button -->
        <BtnElt type="button"
          content="Create"
          @click="validateNewArticle()" 
          class="btn-green"
          title="Create a new Article">
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
      title: "",
      text:"",
      image: "",
      alt: "",
      cat: "",
      cats: []
    }
  },

  mounted() {
    this.cats = constants.CATS_ARTICLE;
  },

  methods: {
    /**
     * VALIDATE NEW ARTICLE IF DATA ARE VALID
     */
    validateNewArticle() {
      if (this.$serve.checkName(this.title)) {

        if (typeof document.getElementById('article-image').files[0] !== "undefined") {
          this.checkNewArticle();

        } else {
          alert("A photo of the article must be uploaded !");
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

          for (let i = 0; i < articles.length; i++) {

            if (articles[i].title === this.title) {
              alert(this.title + constants.CHECK_AVAILABLE);
              isReferenced = true;
            }

            if (articles[i].text === this.text) {
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

        article.append("title", this.title);
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
            alert(article.get("title") + " created !");
            this.$router.go();
          })
          .catch(err => { console.log(err) });
      }
    }
  }
}
</script>