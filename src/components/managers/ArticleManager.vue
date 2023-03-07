<template>
  <CardElt>
    <template #header>
      <h2>
        <i class="fa-regular fa-newspaper fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.ARTICLE_MANAGER }}
      </h2>
    </template>

    <template #body>
      <form method="post"
        enctype="multipart/form-data">
        <TableElt :items="articles">

          <!-- Id -->
          <template #cell-_id="slotProps">
            <a :href="`/article/${articles[slotProps.index]._id}`">
              <b>#{{ slotProps.index + 1 }}</b>
              ({{ articles[slotProps.index]._id }})
            </a>
          </template>

          <!-- Name -->
          <template #cell-name="slotProps">
            <FieldElt v-model:value="getArticles()[slotProps.index].name"
              @keyup.enter="updateArticle(articles[slotProps.index]._id)"
              :info="constants.INFO_UP_NAME"/>
          </template>

          <!-- Text -->
          <template #cell-text="slotProps">
            <BtnElt :href="`/article/edit/${articles[slotProps.index]._id}`"
              class="btn-blue"
              :title="constants.TITLE_UPDATE + articles[slotProps.index].name">

              <template #btn>
                <i class="fa-regular fa-edit fa-lg"></i>
              </template>
            </BtnElt>
          </template>

          <!-- Image -->
          <template #cell-image="slotProps">
            <MediaElt :src="'/img/thumbnails/articles/' + articles[slotProps.index].image"
              :alt="articles[slotProps.index].alt"
              :title="articles[slotProps.index].name"/>

            <FieldElt :id="articles[slotProps.index]._id"
              type="file"
              :info="constants.INFO_UP_IMAGE"/>
          </template>

          <!-- Alt -->
          <template #cell-alt="slotProps">
            <FieldElt type="textarea"
              v-model:value="getArticles()[slotProps.index].alt"
              @keyup.enter="updateArticle(articles[slotProps.index]._id)"
              :info="constants.INFO_UP_ALT"
              :min="constants.TEXT_MIN"
              :max="constants.TEXT_MAX"/>
          </template>

          <!-- Category -->
          <template #cell-cat="slotProps">
            <FieldElt type="select"
              :list="constants.CATS_ARTICLE"
              v-model:value="getArticles()[slotProps.index].cat"
              @keyup.enter="updateArticle(articles[slotProps.index]._id)"
              :info="constants.INFO_UP_CATEGORY"/>
          </template>

          <!-- User -->
          <template #cell-user="slotProps">
            <b>{{ getUserName(articles[slotProps.index].user) }}</b>
            ({{ articles[slotProps.index].user }})
          </template>

          <!-- Likes -->
          <template #cell-likes="slotProps">
            <ListElt :id="'likes-' + articles[slotProps.index]._id"
              :dynamic="true"
              :items="articles[slotProps.index].likes"/>
          </template>

          <!-- Created -->
          <template #cell-created="slotProps">
            <p>
              {{ new Date(articles[slotProps.index].created).toLocaleString() }}
            </p>

            <BtnElt type="button"
              @click="deleteArticle(articles[slotProps.index]._id)" 
              class="btn-red"
              :title="constants.TITLE_DELETE + articles[slotProps.index].name">

              <template #btn>
                <i class="fa-solid fa-trash-arrow-up fa-lg fa-fw"></i>
              </template>
            </BtnElt>
          </template>

          <!-- Updated -->
          <template #cell-updated="slotProps">
            <p>
              {{ new Date(articles[slotProps.index].updated).toLocaleString() }}
            </p>

            <BtnElt type="button"
              @click="updateArticle(articles[slotProps.index]._id)" 
              class="btn-sky"
              :title="constants.TITLE_UPDATE + articles[slotProps.index].name">

              <template #btn>
                <i class="fa-solid fa-cloud-arrow-up fa-lg fa-fw"></i>
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
     * UPDATE ARTICLE
     * @param {string} id 
     */
    updateArticle(id) {
      for (let article of this.articles) {
        if (article._id === id) {

          if (this.$serve.checkString(article.name) && 
            this.$serve.checkString(article.text, this.constants.TEXT_MIN, this.constants.TEXT_MAX) && 
            this.$serve.checkString(article.alt, this.constants.TEXT_MIN, this.constants.TEXT_MAX)) {

            let data  = new FormData();
            let image = document.getElementById(id).files[0] ?? article.image;

            data.append("name", article.name);
            data.append("text", article.text);
            data.append("image", image);
            data.append("alt", article.alt);
            data.append("likes", article.likes);
            data.append("cat", article.cat);
            data.append("updated", Date.now());

            this.$serve.putData(`/api/articles/${id}`, data)
              .then(() => {
                alert(article.name + this.constants.ALERT_UPDATED);
              })
              .catch(err => {
                if (err.response) {
                  alert(err.response.data.message) 
                } else {
                  console.log(err);
                }
              });
          }
        }
      }
    },

    /**
     * DELETE ARTICLE
     * @param {string} id 
     */
    deleteArticle(id) {
      let articleName = "";

      for (let article of this.articles) {
        if (article._id === id) {
          articleName = article.name;
        }
      }

      if (confirm(`${this.constants.TITLE_DELETE} ${articleName} ?`) === true) {
        this.$serve.deleteData(`/api/articles/${id}`)
          .then(() => {
            alert(articleName + this.constants.ALERT_DELETED);
            this.$router.go();
          })
          .catch(err => {
            if (err.response) {
              alert(err.response.data.message) 
            } else {
              console.log(err);
            }
          });
      }
    }
  }
}
</script>
