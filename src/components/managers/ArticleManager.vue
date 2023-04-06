<template>
  <CardElt>
    <template #header>
      <h2 id="article">
        <i class="fa-regular fa-newspaper fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.ARTICLE_MANAGER }}
      </h2>
    </template>

    <template #body>
      <form enctype="multipart/form-data">
        <TableElt :items="articles">

          <template #cell-_id="slotProps">
            <a :href="`/article/${articles[slotProps.index]._id}`">
              <b>#{{ slotProps.index + 1 }}</b>
              ({{ articles[slotProps.index]._id }})
            </a>
          </template>

          <template #cell-name="slotProps">
            <FieldElt v-model:value="getArticles()[slotProps.index].name"
              @keyup.enter="updateArticle(articles[slotProps.index]._id)"
              :info="constants.INFO_UP_NAME"/>
          </template>

          <template #cell-text="slotProps">
            <BtnElt :href="`/article/edit/${articles[slotProps.index]._id}`"
              class="btn-cyan"
              :title="constants.TITLE_UPDATE + articles[slotProps.index].name">

              <template #btn>
                <i class="fa-regular fa-edit fa-lg"></i>
              </template>
            </BtnElt>
          </template>

          <template #cell-image="slotProps">
            <MediaElt :src="'/img/thumbnails/articles/' + articles[slotProps.index].image"
              :alt="articles[slotProps.index].alt"
              :title="articles[slotProps.index].name"/>

            <FieldElt :id="articles[slotProps.index]._id"
              type="file"
              :info="constants.INFO_UP_IMAGE"/>
          </template>

          <template #cell-alt="slotProps">
            <FieldElt type="textarea"
              v-model:value="getArticles()[slotProps.index].alt"
              @keyup.enter="updateArticle(articles[slotProps.index]._id)"
              :info="constants.INFO_UP_ALT"/>
          </template>

          <template #cell-cat="slotProps">
            <FieldElt type="select"
              :list="constants.CATS_ARTICLE"
              v-model:value="getArticles()[slotProps.index].cat"
              @keyup.enter="updateArticle(articles[slotProps.index]._id)"
              :info="constants.INFO_UP_CATEGORY"/>
          </template>

          <template #cell-user="slotProps">
            <b>{{ articles[slotProps.index].user.split('-')[0] }}</b>
            ({{ articles[slotProps.index].user.split('-')[1] }})
          </template>

          <template #cell-likes="slotProps">
            <ListElt :id="'likes-' + articles[slotProps.index]._id"
              :dynamic="true"
              :items="articles[slotProps.index].likes"/>
          </template>

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
import BtnElt from "@/assets/BtnElt"
import CardElt from "@/assets/CardElt"
import FieldElt from "@/assets/FieldElt"
import MediaElt from "@/assets/MediaElt"
import TableElt from "@/assets/TableElt"

export default {
  name: "ArticleManager",
  components: {
    BtnElt,
    CardElt,
    FieldElt,
    MediaElt,
    TableElt
  },

  props: [
    "articles", 
    "users", 
    "constants"
  ],

  methods: {
    /**
     * GET ALL ARTICLES
     * @returns
     */
    getArticles() {
      return this.articles;
    },

    /**
     * GET ARTICLE
     * @param {string} id 
     * @param {object} article 
     */
    getArticle(id, article) {
      let data  = new FormData();
      let image = document.getElementById(id).files[0] ?? article.image;

      data.append("name", article.name);
      data.append("text", article.text);
      data.append("image", image);
      data.append("alt", article.alt);
      data.append("likes", article.likes);
      data.append("cat", article.cat);
      data.append("updated", Date.now());

      return data;
    },

    /**
     * CHECK ARTICLE
     * @param {string} id 
     * @param {object} article 
     */
    checkArticle(id, article) {
      if (this.$serve.checkString(article.name) && 
        this.$serve.checkString(article.text, this.constants.TEXT_MIN, this.constants.TEXT_MAX) && 
        this.$serve.checkString(article.alt)) {

        this.$serve.putData(`/articles/${id}`, this.getArticle(id, article))
          .then(() => {
            alert(article.name + this.constants.ALERT_UPDATED);
          })
          .catch(err => { this.$serve.checkError(err) });
      }
    },

    /**
     * UPDATE ARTICLE
     * @param {string} id 
     */
    updateArticle(id) {
      for (let article of this.articles) {
        if (article._id === id) { this.checkArticle(id, article) }
      }
    },

    /**
     * DELETE ARTICLE
     * @param {string} id 
     */
    deleteArticle(id) {
      let articleName = this.$serve.getItemName(id, this.articles);

      if (confirm(`${this.constants.TITLE_DELETE} ${articleName} ?`) === true) {
        this.$serve.deleteData(`/articles/${id}`)
          .then(() => {
            alert(articleName + this.constants.ALERT_DELETED);
            this.$router.go();
          })
          .catch(err => { this.$serve.checkError(err) });
      }
    }
  }
}
</script>
