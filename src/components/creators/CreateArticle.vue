<template>
  <CardElt id="create-article">
    <template #header>
      <i class="fa-solid fa-basket-shopping fa-2x"></i>
      <h3>Create Article</h3>
    </template>

    <template #body>
      <form method="post"
        enctype="multipart/form-data">
        <ListElt :items="['name', 'description', 'image', 'alt', 'price', 'options', 'cat']">

          <!-- Article Name -->
          <template #item-1>
            <FieldElt id="article-name"
              v-model:value="name"
              @keyup.enter="validateNewArticle()"
              info="My beautiful article"
              :min="2">
              <template #legend>
                Name
              </template>
              <template #label>
                Indicate the article name
              </template>
            </FieldElt>
          </template>

          <!-- Article Description -->
          <template #item-2>
            <FieldElt id="article-description"
              type="textarea"
              v-model:value="description"
              @keyup.enter="validateNewArticle()"
              info="This article is wonderful !">
              <template #legend>
                Description
              </template>
              <template #label>
                Indicate the article description
              </template>
            </FieldElt>
          </template>
          
          <!-- Article Image -->
          <template #item-3>
            <FieldElt id="article-image"
              type="file"
              v-model:value="image"
              info="Image file only">
              <template #legend>
                Image
              </template>
              <template #label>
                Provide article image
              </template>
            </FieldElt>
          </template>
          
          <!-- Article Alt -->
          <template #item-4>
            <FieldElt id="article-alt"
              type="textarea"
              v-model:value="alt"
              info="Alternative text">
              <template #legend>
                Alt
              </template>
              <template #label>
                Provide article alt
              </template>
            </FieldElt>
          </template>

          <!-- Article Price -->
          <template #item-5>
            <FieldElt id="article-price"
              type="number"
              v-model:value="price"
              @keyup.enter="validateNewArticle()"
              info="100 €"
              :min="1"
              :max="1000">
              <template #legend>
                Price
              </template>
              <template #label>
                Indicate the article price
              </template>
            </FieldElt>
          </template>

          <!-- Article Options -->
          <template #item-6>
            <FieldElt id="article-options"
              type="textarea"
              v-model:value="options"
              @keyup.enter="validateNewArticle()"
              info="option-1,option-2,option-3,etc"
              :max="100">
              <template #legend>
                Options
              </template>
              <template #label>
                Indicate the article options
              </template>
            </FieldElt>
          </template>

          <!-- Article Category -->
          <template #item-7>
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
      name: "",
      description:"",
      image: "",
      alt: "",
      price: null,
      options: [],
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
      if (this.$serve.checkName(this.name)) {

        if (typeof document.getElementById('article-image').files[0] !== "undefined") {
          this.checkNewArticle();

        } else {
          alert("A photo of the article must be uploaded !");
        }
      }
    },

    /**
     * CHECK NEW ARTICLE IF NAME | DESCRIPTION ARE REFERENCED
     */
    checkNewArticle() {
      this.$serve.getData("/api/articles")
        .then((articles) => {
          let isReferenced = false;

          for (let i = 0; i < articles.length; i++) {

            if (articles[i].name === this.name) {
              alert(this.name + " is not available !");
              isReferenced = true;
            }

            if (articles[i].description === this.description) {
              alert(this.description + " is already referenced !");
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
        article.append("description", this.description);
        article.append("image", image);
        article.append("alt", this.alt);
        article.append("price", this.price);
        article.append("options", this.options);
        article.append("cat", this.cat);
        article.append("created", Date.now());
        article.append("updated", Date.now());

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