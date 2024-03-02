<template>
  <main>
    <CardElt v-if="checkSession('editor')">
      <template #header>
        <h1>{{ val.EDIT }} {{ article.name }}</h1>
        <h2>{{ article.cat }}</h2>
      </template>

      <template #body>
        <form enctype="multipart/form-data">
          <ListElt :items="val.ARTICLE_FORM">

            <template #item-1>
              <FieldElt id="name"
                v-model:value="article.name"
                @keyup.enter="updateArticle()"
                :info="val.INFO_NAME"
                :min="2">
                <template #legend>{{ val.LEGEND_NAME }}</template>
                <template #label>{{ val.LABEL_NAME }}</template>
              </FieldElt>
            </template>

            <template #item-2>
              <label for="text">{{ val.LEGEND_TEXT }}</label>
              <Editor id="text"
                :api-key="val.TINY_KEY"
                v-model="article.text"
                :init="val.TINY_INIT"/>
            </template>

            <template #item-3>
              <MediaElt v-if="article.image"
                :src="'/img/thumbnails/articles/' + article.image"
                :alt="article.alt" />

              <FieldElt id="image"
                type="file"
                v-model:value="image"
                :info="val.INFO_IMAGE">
                <template #legend>{{ val.LEGEND_IMAGE }}</template>
                <template #label>{{ val.LABEL_IMAGE }}</template>
              </FieldElt>
            </template>

            <template #item-4>
              <FieldElt id="alt"
                type="textarea"
                v-model:value="article.alt"
                @keyup.enter="updateArticle()"
                :info="val.INFO_ALT">
                <template #legend>{{ val.LEGEND_ALT }}</template>
                <template #label>{{ val.LABEL_ALT }}</template>
              </FieldElt>
            </template>

            <template #item-5>
              <FieldElt id="url"
                v-model:value="article.url"
                @keyup.enter="updateArticle()"
                :info="val.INFO_URL">
                <template #legend>{{ val.LEGEND_URL }}</template>
                <template #label>{{ val.LABEL_URL }}</template>
              </FieldElt>
            </template>

            <template #item-6>
              <FieldElt id="cat"
                type="select"
                :list="val.CATS_ARTICLE"
                v-model:value="article.cat"
                @keyup.enter="updateArticle()"
                :info="val.INFO_CAT">
                <template #legend>{{ val.LEGEND_CAT }}</template>
                <template #label>{{ val.LABEL_CAT }}</template>
              </FieldElt>
            </template>
          </ListElt>

          <BtnElt type="button"
            @click="updateArticle()" 
            class="btn-sky"
            :content="val.CONTENT_UPDATE"
            :title="val.TITLE_UPDATE + article.name">
            <template #btn>
              <i class="fa-solid fa-cloud-arrow-up fa-lg"></i>
            </template>
          </BtnElt>

          <BtnElt type="button"
            @click="deleteArticle()" 
            class="btn-red"
            :content="val.TITLE_DELETE"
            :title="val.TITLE_DELETE + article.name">
            <template #btn>
              <i class="fa-solid fa-trash fa-lg"></i>
            </template>
          </BtnElt>
        </form>
      </template>
    </CardElt>

    <CardElt v-else
      itemscope 
      itemtype="https://schema.org/Article">
      <template #header>
        <h1 itemprop="name">{{ article.name }}</h1>
        <h2>{{ article.cat }}</h2>
      </template>

      <template #body>
        <BtnElt v-if="!checkSession('user')"
          id="likes"
          href="/login"
          class="btn-blue"
          :title="val.TITLE_LIKE_LOGIN + article.name">
          <template #btn>
            <i class="fa-regular fa-thumbs-up fa-lg fa-fw"></i>
            <b v-if="article.likes" itemprop="contentRating">
              {{ article.likes.length }}
            </b>
          </template>
        </BtnElt>

        <BtnElt v-else-if="checkLikes() === false"
          id="likes"
          type="button"
          @click="addLike()"
          class="btn-blue"
          :title="val.TITLE_LIKE + article.name">
          <template #btn>
            <i class="fa-regular fa-thumbs-up fa-lg fa-fw"></i>
            <b v-if="article.likes" itemprop="contentRating">
              {{ article.likes.length }}
            </b>
          </template>
        </BtnElt>

        <BtnElt v-else-if="checkLikes() === true"
          id="likes"
          type="button"
          @click="addLike()"
          class="btn-sky"
          :title="val.TITLE_DISLIKE + article.name">
          <template #btn>
            <i class="fa-solid fa-thumbs-up fa-lg fa-fw"></i>
            <b v-if="article.likes" itemprop="contentRating">
              {{ article.likes.length }}
            </b>
          </template>
        </BtnElt>

        <MediaElt v-if="article.image"
          :src="`/img/articles/${article.image}`"
          :alt="article.alt"
          :width="val.IMG_WIDTH"
          :height="val.IMG_HEIGHT"
          itemprop="image">

          <template #figcaption>
            <section v-html="article.text" id="figcaption"></section>
            <p>
              {{ val.PUBLISHED_ON }}
              <time itemprop="dateCreated" :datetime="article.createdAt">
                {{ new Date(article.createdAt).toLocaleDateString() }}
              </time>
            </p>
          </template>
        </MediaElt>
      </template>
    </CardElt>
  </main>
</template>

<script>
import BtnElt from "../components/BtnElt"
import CardElt from "../components/CardElt"
import Editor from "@tinymce/tinymce-vue"
import FieldElt from "../components/FieldElt"
import ListElt from "../components/ListElt"
import MediaElt from "../components/MediaElt"

import { checkRange, checkRegex, checkRole, deleteData, getData, putData, setError, setMeta } from "../app/services"
import { mapState } from "vuex"

export default {
  name: "ArticleView",
  components: { BtnElt, CardElt, FieldElt, ListElt, MediaElt, Editor },

  props: ["avatar", "val"],
  data() {
    return {
      article: {}
    }
  },

  /**
   * ? CREATED
   * * Retrieves the article from the API
   * * Sets the meta tags
   * @return {Promise<void>} A promise that gets an "article"
   */
  async created() {
    const { API_URL, HEAD, UI_URL } = this.val;

    try {
      const article = await getData(`${API_URL}/articles/${this.$route.params.id}`);
      article.likes = JSON.parse(article.likes);
      this.article = article;

      setMeta(
        article.name + HEAD,
        (article.text || "").slice(0, 160).replace( /(<([^>]+)>)/gi, ""),
        `${UI_URL}/article/${article.id}`,
        `${UI_URL}/img/thumbnails/articles/${article.image}`
      );

    } catch (err) {
      setError(err);
      this.$router.push("/blog");
    }
  },

  /**
   * ? UPDATED
   * * A function that updates the text element's itemprop attribute 
   * * if the "figcaption" element is present.
   */
  updated() {
    if (document.getElementById("figcaption")) {
      const textElt = document.getElementById("figcaption");
      textElt.firstChild.setAttribute("itemprop", "text");
    }
  },

  computed: { ...mapState(["id", "token"]) },

  methods: {
    /**
     * ? CHECK SESSION
     * * Checks the session for the specified role.
     * @param {string} role - The role to check.
     * @return {boolean} The result of the session check.
     */
    checkSession(role) { return checkRole(this.avatar.role, role) },

    /**
     * ? CHECK LIKES
     * * Check if the current user has liked the article.
     * @return {boolean} True if the user has liked the article, false otherwise.
     */
    checkLikes() { return this.article.likes && this.article.likes.includes(this.id) },

    /**
     * ? ADD LIKE
     * * Adds a like to the article.
     */
    async addLike() {
      const { API_URL } = this.val;
      let { id, name, text, image, alt, url, likes, cat } = this.article;

      const index = likes.indexOf(this.id);
      index > -1 ? likes.splice(index, 1) : likes.push(this.id);

      const URL  = `${API_URL}/articles/${id}`;
      const data = new FormData();

      data.append("name", name);
      data.append("text", text);
      data.append("image", image);
      data.append("alt", alt);
      data.append("url", url);
      data.append("likes", JSON.stringify(likes));
      data.append("cat", cat);

      try {
        await putData(URL, data, this.token);
      } catch (err) {
        setError(err);
      }
    },

    /**
     * ? UPDATE ARTICLE
     * * Updates the article with the provided data.
     */
    async updateArticle() {
      const { API_URL, ALERT_UPDATED, CHECK_STRING, REGEX_URL, TEXT_MAX, TEXT_MIN } = this.val;
      let { id, name, text, image, alt, url, likes, cat } = this.article;

      const IS_NAME_CHECKED = checkRange(name, CHECK_STRING);
      const IS_TEXT_CHECKED = checkRange(text, CHECK_STRING, TEXT_MIN, TEXT_MAX);
      const IS_ALT_CHECKED  = checkRange(alt, CHECK_STRING);
      const IS_URL_CHECKED  = url ? checkRegex(url, CHECK_STRING, REGEX_URL) : true;

      if (IS_NAME_CHECKED && IS_TEXT_CHECKED && IS_ALT_CHECKED && IS_URL_CHECKED) {
        const URL   = `${API_URL}/articles/${id}`;
        const data  = new FormData();
        const img   = document.getElementById("image")?.files[0] ?? image;

        data.append("name", name);
        data.append("text", text);
        data.append("image", img);
        data.append("alt", alt);
        data.append("url", url);
        data.append("likes", JSON.stringify(likes));
        data.append("cat", cat);

        try {
          await putData(URL, data, this.token);
          alert(name + ALERT_UPDATED);
        } catch (err) {
          setError(err);
        } finally {
          this.$router.push("/blog");
        }
      }
    },

    /**
     * ? DELETE ARTICLE
     * * Deletes an article with the given ID.
     */
    async deleteArticle() {
      const { TITLE_DELETE, API_URL, ALERT_DELETED } = this.val;
      let { id, name } = this.article;

      if (confirm(`${TITLE_DELETE} ${name} ?`)) {
        const URL = `${API_URL}/articles/${id}`

        try {
          await deleteData(URL, this.token);
          alert(name + ALERT_DELETED);
        } catch (err) {
          setError(err);
        } finally {
          this.$router.push("/blog");
        }
      }
    }
  }
}
</script>

<style>
.tox {
  margin: auto;
  max-width: 1000px;
}
</style>
