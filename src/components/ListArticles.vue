<template>
  <CardElt>
    <template #header>
      <i class="fa-solid fa-shopping-cart fa-2x"></i>
      <h3>List Articles</h3>
    </template>

    <template #body>
      <form method="post"
        enctype="multipart/form-data">
        <TableElt :items="articles">

          <!-- Last Table Head -->
          <template #head>
            up/del
          </template>

          <!-- Article Id -->
          <template #cell-_id="slotProps">
            {{ slotProps.index + 1 }}
          </template>

          <!-- Article Name -->
          <template #cell-name="slotProps">
            <FieldElt :id="'name-' + articles[slotProps.index]._id"
              v-model:value="getArticles()[slotProps.index].name"
              info="Update the article name"
              @keyup.enter="validateUpdatedArticle(articles[slotProps.index]._id)">
            </FieldElt>
          </template>

          <!-- Article Description -->
          <template #cell-description="slotProps">
            <FieldElt :id="'description-' + articles[slotProps.index]._id"
              type="textarea"
              v-model:value="getArticles()[slotProps.index].description"
              info="Update the article description"
              @keyup.enter="validateUpdatedArticle(articles[slotProps.index]._id)">
            </FieldElt>
          </template>

          <!-- Article Image -->
          <template #cell-image="slotProps">
            <MediaElt :src="'/img/articles/' + articles[slotProps.index].image"
              :alt="articles[slotProps.index].name"
              :title="articles[slotProps.index].image">
            </MediaElt>
            <FieldElt :id="'image-' + articles[slotProps.index]._id"
              type="file"
              info="Update the article image">
            </FieldElt>
          </template>

          <!-- Article Alt -->
          <template #cell-alt="slotProps">
            <FieldElt :id="'alt-' + articles[slotProps.index]._id"
              type="textarea"
              v-model:value="getArticles()[slotProps.index].alt"
              info="Update the article alt"
              @keyup.enter="validateUpdatedArticle(articles[slotProps.index]._id)">
            </FieldElt>
          </template>

          <!-- Article Price -->
          <template #cell-price="slotProps">
            <FieldElt :id="'price-' + articles[slotProps.index]._id"
              type="number"
              v-model:value="getArticles()[slotProps.index].price"
              @keyup.enter="validateUpdatedArticle(articles[slotProps.index]._id)"
              info="Update the article price"
              :min="1"
              :max="1000">
            </FieldElt>
          </template>

          <!-- Article Category -->
          <template #cell-cat="slotProps">
            <FieldElt :id="'cat-' + articles[slotProps.index]._id"
              type="select"
              v-model:value="getArticles()[slotProps.index].cat"
              info="Update the category"
              @keyup.enter="validateUpdatedArticle(articles[slotProps.index]._id)"
              :list="cats">
              {{ value }}
            </FieldElt>
          </template>

          <!-- Article Created -->
          <template #cell-created="slotProps">
            {{ new Date(getArticles()[slotProps.index].created).toLocaleString() }}
          </template>

          <!-- Article Updated -->
          <template #cell-updated="slotProps">
            {{ new Date(getArticles()[slotProps.index].updated).toLocaleString() }}
          </template>

          <template #body="slotProps">

            <!-- Update Button -->
            <BtnElt type="button"
              @click="validateUpdatedArticle(articles[slotProps.index]._id)" 
              class="btn-sky"
              :title="'Update ' + articles[slotProps.index].name">
              <template #btn>
                <i class="fa-solid fa-edit"></i>
              </template>
            </BtnElt>

            <!-- Delete Button -->
            <BtnElt type="button"
              @click="deleteArticle(articles[slotProps.index]._id)" 
              class="btn-red"
              :title="'Delete ' + articles[slotProps.index].name">
              <template #btn>
                <i class="fa-solid fa-trash-alt"></i>
              </template>
            </BtnElt>
          </template>
        </TableElt>
      </form>
    </template>
  </CardElt>
</template>

<script>
export default {
  name: "ListArticles",
  props: ["articles"],

  computed: {
    cats() {
      const cats = new Set();
      this.articles.forEach(article => cats.add(article.cat));
      return Array.from(cats); 
    }
  },

  methods: {
    /**
     * GET ALL ARTICLES
     */
    getArticles() {
      return this.articles;
    },

    /**
     * VALIDATE UPDATED ARTICLE
     * @param {string} id 
     */
    validateUpdatedArticle(id) {
      for (let i = 0; i < this.articles.length; i++ ) {
        if (this.articles[i]._id === id) {

          if (this.$serve.checkName(this.articles[i].name)) {
            this.checkUpdatedArticle(i);
          }
        }
      }
    },

    /**
     * CHECK UPDATED ARTICLE IF NAME | DESCRIPTION ARE REFERENCED
     * @param {number} i 
     */
    checkUpdatedArticle(i) {
      this.$serve.getData("/api/articles")
        .then((articles) => {
          let isReferenced = false;

          for (let j = 0; j < articles.length; j++) {
            if (articles[j]._id === this.articles[i]._id) {
              articles.splice(j, 1);
            }

            if (articles[j] && articles[j].name === this.articles[i].name) {
              alert(this.articles[i].name + " is not available !");
              isReferenced = true;
            }

            if (articles[j] && articles[j].description === this.articles[i].description) {
              alert(this.articles[i].description+ " is already referenced !");
              isReferenced = true;
            }
          }
          this.updateArticle(isReferenced, i);
        })
        .catch(err => { console.log(err) });
    },

    /**
     * UPDATE ARTICLE IF NO INFO IS REFERENCED
     * @param {boolean} isReferenced 
     * @param {number} i 
     */
    updateArticle(isReferenced, i) {
      if (!isReferenced) {

        let article  = new FormData();
        let image = document.getElementById('image-' + this.articles[i]._id).files[0];

        if (typeof image === "undefined") {
          image = this.articles[i].image;
        }

        article.append("id", this.articles[i]._id);
        article.append("name", this.articles[i].name);
        article.append("description", this.articles[i].description);
        article.append("image", image);
        article.append("alt", this.articles[i].alt);
        article.append("price", this.articles[i].price);
        article.append("cat", this.articles[i].cat);
        article.append("created", this.articles[i].created);
        article.append("updated", Date.now());

        this.$serve.putData(`/api/articles/${article.get("id")}`, article)
          .then(() => {
            alert(article.get("name") + " updated !");
            this.$router.go();
          })
          .catch(err => { console.log(err) });
      }
    },

    /**
     * DELETE ARTICLE
     * @param {string} id 
     */
    deleteArticle(id) {
      let articleName = "";

      for (let i = 0; i < this.articles.length; i++ ) {
        if (this.articles[i]._id === id) {
          articleName = this.articles[i].name;
        }
      }
      
      if (confirm(`Delete ${articleName} ?`) === true) {
        this.$serve.deleteData(`/api/articles/${id}`)
          .then(() => {
            alert(articleName + " deleted !");
            this.$router.go();
          })
          .catch(err => { console.log(err) });
      }
    }
  }
}
</script>
