<template>

  <!-- ARTICLE CREATION ADMIN -->
  <form method="post"
    enctype="multipart/form-data"
    class="form width-lg container-60lg-50wd">
    <ListElt :items="['name', 'cat', 'description', 'image', 'price']">

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

      <!-- Article Category -->
      <template #item-2>
        <FieldElt id="article-cat"
          type="list"
          v-model:value="cat"
          info="Choose a category"
          @keyup.enter="validateNewArticle()"
          :list="['sauce']">
          <template #legend>
            Category
          </template>
          <template #label>
            
          </template>
        </FieldElt>
      </template>

      <!-- Article Description -->
      <template #item-3>
        <FieldElt id="article-description"
          type="area"
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
      <template #item-4>
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

      <!-- Article Price -->
      <template #item-5>
        <FieldElt id="article-price"
          type="number"
          v-model:number="price"
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
    </ListElt>

    <!-- Create Button -->
    <BtnElt type="button"
      content="Create"
      @click="validateNewArticle()" 
      class="btn-green"/>
  </form>
</template>

<script>
export default {
  name: "CreateArticle",

  data() {
    return {
      name: "",
      cat: "",
      description:"",
      image: "",
      price: null
    }
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
        article.append("cat", this.cat);
        article.append("description", this.description);
        article.append("image", image);
        article.append("price", this.price);

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