<template>
  <CardElt>
    <template #header>
      <i class="fa-solid fa-envelopes-bulk fa-2x"></i>
      <h3>List Articles</h3>
    </template>

    <template #body>
      <form method="post"
        enctype="multipart/form-data">
        <TableElt :items="articles">

          <template #head>
            up/del
          </template>

          <!-- Id -->
          <template #cell-_id="slotProps">
            <b>#{{ slotProps.index + 1 }}</b>
            ({{ articles[slotProps.index]._id }})
          </template>

          <!-- Title -->
          <template #cell-title="slotProps">
            <FieldElt :id="'title-' + articles[slotProps.index]._id"
              v-model:value="getArticles()[slotProps.index].title"
              @keyup.enter="validateUpdatedArticle(articles[slotProps.index]._id)"
              :info="constants.UPDATE_TITLE">
            </FieldElt>
          </template>

          <!-- Text -->
          <template #cell-text="slotProps">
            <FieldElt :id="'text-' + articles[slotProps.index]._id"
              type="textarea"
              v-model:value="getArticles()[slotProps.index].text"
              @keyup.enter="validateUpdatedArticle(articles[slotProps.index]._id)"
              :info="constants.UPDATE_TEXT">
            </FieldElt>
          </template>

          <!-- Image -->
          <template #cell-image="slotProps">
            <MediaElt :src="'/img/thumbnails/articles/' + articles[slotProps.index].image"
              :alt="articles[slotProps.index].alt"
              :title="articles[slotProps.index].title">
            </MediaElt>
            <FieldElt :id="'image-' + articles[slotProps.index]._id"
              type="file"
              :info="constants.UPDATE_IMAGE">
            </FieldElt>
          </template>

          <!-- Alt -->
          <template #cell-alt="slotProps">
            <FieldElt :id="'alt-' + articles[slotProps.index]._id"
              type="textarea"
              v-model:value="getArticles()[slotProps.index].alt"
              @keyup.enter="validateUpdatedArticle(articles[slotProps.index]._id)"
              :info="constants.UPDATE_ALT">
            </FieldElt>
          </template>

          <!-- Category -->
          <template #cell-cat="slotProps">
            <FieldElt :id="'cat-' + articles[slotProps.index]._id"
              type="select"
              v-model:value="getArticles()[slotProps.index].cat"
              @keyup.enter="validateUpdatedArticle(articles[slotProps.index]._id)"
              :list="constants.CATS_ARTICLE"
              :info="constants.UPDATE_CATEGORY">
              {{ value }}
            </FieldElt>
          </template>

          <!-- User -->
          <template #cell-user="slotProps">
            <b>{{ getArticleUser(articles[slotProps.index].user) }}</b>
            ({{ getArticles()[slotProps.index].user }})
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
              :title="'Update ' + articles[slotProps.index].title">
              <template #btn>
                <i class="fa-solid fa-edit"></i>
              </template>
            </BtnElt>

            <!-- Delete -->
            <BtnElt type="button"
              @click="deleteArticle(articles[slotProps.index]._id)" 
              class="btn-red"
              :title="'Delete ' + articles[slotProps.index].title">
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
import constants from "/constants";

export default {
  name: "ListArticles",
  props: ["articles", "users"],

  data() {
    return {
      constants: []
    }
  },

  mounted() {
    this.constants = constants;
  },

  methods: {
    /**
     * GET ALL ARTICLES
     */
    getArticles() {
      return this.articles;
    },

    /**
     * GET ARTICLE USER
     * @param {string} userId 
     */
    getArticleUser(userId) {
      for (let i = 0; i < this.users.length; i++ ) {
        if (userId === this.users[i]._id) {

          return this.users[i].name;
        }
      }
    },

    validateUpdatedArticle(id) {
      for (let i = 0; i < this.articles.length; i++ ) {
        if (this.articles[i]._id === id) {

          if (this.$serve.checkName(this.articles[i].title)) {
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

            if (articles[j] && articles[j].title === this.articles[i].title) {
              alert(this.articles[i].title + constants.CHECK_AVAILABLE);
              isReferenced = true;
            }

            if (articles[j] && articles[j].text === this.articles[i].text) {
              alert(this.articles[i].text+ constants.CHECK_REFERENCE);
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

        if (typeof image !== "undefined") {
          article.append("image", image);
        }

        article.append("id", this.articles[i]._id);
        article.append("title", this.articles[i].title);
        article.append("text", this.articles[i].text);
        article.append("alt", this.articles[i].alt);
        article.append("cat", this.articles[i].cat);
        article.append("updated", Date.now());
        article.append("likes", this.articles[i].likes);
        article.append("usersLiked", this.articles[i].usersLiked);

        this.$serve.putData(`/api/articles/${article.get("id")}`, article)
          .then(() => {
            alert(article.get("title") + " updated !");
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
          articleTitle = this.articles[i].title;
        }
      }

      if (confirm(`Delete ${articleTitle} ?`) === true) {
        this.$serve.deleteData(`/api/articles/${id}`)
          .then(() => {
            alert(articleTitle + " deleted !");
            this.$router.go();
          })
          .catch(err => { console.log(err) });
      }
    }
  }
}
</script>
