<template>
  <CardElt>
    <template #header>
      <h3>
        <i class="fa-solid fa-envelopes-bulk fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.ARTICLE_MANAGER }}
      </h3>
    </template>

    <template #body>
      <form method="post"
        enctype="multipart/form-data">
        <TableElt :items="articles">

          <template #head>
            {{ constants.HEAD_UP }}
          </template>

          <!-- Id -->
          <template #cell-_id="slotProps">
            <a :href="`/article/${articles[slotProps.index]._id}`">
              <b>#{{ slotProps.index + 1 }}</b>
              ({{ articles[slotProps.index]._id }})
            </a>
          </template>

          <!-- Name -->
          <template #cell-name="slotProps">
            <FieldElt :id="'name-' + articles[slotProps.index]._id"
              v-model:value="getArticles()[slotProps.index].name"
              @keyup.enter="validateUpdatedArticle(articles[slotProps.index]._id)"
              :info="constants.UPDATE_NAME"/>
          </template>

          <!-- Text -->
          <template #cell-text="slotProps">
            <FieldElt :id="'text-' + articles[slotProps.index]._id"
              type="textarea"
              v-model:value="getArticles()[slotProps.index].text"
              @keyup.enter="validateUpdatedArticle(articles[slotProps.index]._id)"
              :info="constants.UPDATE_TEXT"
              :max="5000"/>
          </template>

          <!-- Image -->
          <template #cell-image="slotProps">
            <MediaElt :src="'/img/thumbnails/articles/' + articles[slotProps.index].image"
              :alt="articles[slotProps.index].alt"
              :title="articles[slotProps.index].name"/>

            <FieldElt :id="'image-' + articles[slotProps.index]._id"
              type="file"
              :info="constants.UPDATE_IMAGE"/>
          </template>

          <!-- Alt -->
          <template #cell-alt="slotProps">
            <FieldElt :id="'alt-' + articles[slotProps.index]._id"
              type="textarea"
              v-model:value="getArticles()[slotProps.index].alt"
              @keyup.enter="validateUpdatedArticle(articles[slotProps.index]._id)"
              :info="constants.UPDATE_ALT"/>
          </template>

          <!-- Category -->
          <template #cell-cat="slotProps">
            <FieldElt :id="'cat-' + articles[slotProps.index]._id"
              type="select"
              :list="constants.CATS_ARTICLE"
              v-model:value="getArticles()[slotProps.index].cat"
              @keyup.enter="validateUpdatedArticle(articles[slotProps.index]._id)"
              :info="constants.UPDATE_CATEGORY"/>
          </template>

          <!-- User -->
          <template #cell-user="slotProps">
            <b>{{ getUserName(articles[slotProps.index].user) }}</b>
            ({{ articles[slotProps.index].user }})
          </template>

          <!-- UsersLiked -->
          <template #cell-usersLiked="slotProps">
            <ListElt :id="'usersLiked-' + articles[slotProps.index]._id"
              :dynamic="true"
              :items="articles[slotProps.index].usersLiked"/>
          </template>

          <!-- Created -->
          <template #cell-created="slotProps">
            {{ new Date(articles[slotProps.index].created).toLocaleString() }}
          </template>

          <!-- Updated -->
          <template #cell-updated="slotProps">
            {{ new Date(articles[slotProps.index].updated).toLocaleString() }}
          </template>

          <template #body="slotProps">

          <!-- Update -->
          <BtnElt type="button"
              @click="validateUpdatedArticle(articles[slotProps.index]._id)" 
              class="btn-sky"
              :title="constants.UPDATE + articles[slotProps.index].name">

              <template #btn>
                <i class="fa-solid fa-edit"></i>
              </template>
            </BtnElt>

            <!-- Delete -->
            <BtnElt type="button"
              @click="deleteArticle(articles[slotProps.index]._id)" 
              class="btn-red"
              :title="constants.DELETE + articles[slotProps.index].name">

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
  name: "ArticleManager",
  props: ["articles", "users", "constants"],

  methods: {
    /**
     * GET ALL ARTICLES
     * @returns
     */
    getArticles() {
      return this.articles;
    },

    /**
     * GET USER NAME
     * @param {string} id 
     * @returns
     */
    getUserName(id) {
      return this.$serve.getItemName(id, this.users);
    },

    /**
     * VALIDATE UPDATED ARTICLE
     * @param {string} id 
     */
    validateUpdatedArticle(id) {
      for (let i = 0; i < this.articles.length; i++ ) {
        if (this.articles[i]._id === id) {

          if (this.$serve.checkName(this.articles[i].name) &&
            this.$serve.checkText(this.articles[i].text)) {

            this.checkUpdatedArticle(i);
          }
        }
      }
    },

    /**
     * CHECK UPDATED ARTICLE IF NAME | EMAIL ARE REFERENCED
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
              alert(this.articles[i].name + this.constants.CHECK_AVAILABLE);
              isReferenced = true;
            }

            if (articles[j] && articles[j].text === this.articles[i].text) {
              alert(this.articles[i].text+ this.constants.CHECK_REFERENCE);
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

        if (image !== undefined) {
          article.append("image", image);
        }

        article.append("id", this.articles[i]._id);
        article.append("name", this.articles[i].name);
        article.append("text", this.articles[i].text);
        article.append("alt", this.articles[i].alt);
        article.append("cat", this.articles[i].cat);
        article.append("updated", Date.now());
        article.append("likes", this.articles[i].likes);
        article.append("usersLiked", this.articles[i].usersLiked);

        this.$serve.putData(`/api/articles/${article.get("id")}`, article)
          .then(() => {
            alert(article.get("name") + this.constants.UPDATED);
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
      let articleTitle = "";

      for (let i = 0; i < this.articles.length; i++ ) {
        if (this.articles[i]._id === id) {
          articleTitle = this.articles[i].name;
        }
      }

      if (confirm(`${this.constants.DELETE} ${articleTitle} ?`) === true) {
        this.$serve.deleteData(`/api/articles/${id}`)
          .then(() => {
            alert(articleTitle + this.constants.DELETED);
            this.$router.go();
          })
          .catch(err => { console.log(err) });
      }
    }
  }
}
</script>
