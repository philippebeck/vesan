<template>
  <main id="top">
    <NavElt :items="getCategories" class="sidebar">
      <template #hide>
        <i class="fa-solid fa-eye fa-fw" :title="val.TITLE_TOGGLE"></i>
      </template>

      <template #last v-if="checkSession('editor')">
        <a href="#article-set" :title="val.ARTICLE_MANAGER">
          <i class="fa-regular fa-pen-to-square fa-fw"></i>
        </a>
      </template>

      <template #top>
        <i class="fa-solid fa-chevron-circle-up fa-fw" :title="val.TITLE_TOP"></i>
      </template>
    </NavElt>

    <CardElt :isArticle="true" class="container-90lg">
      <template #header>
        <h1 class="sky-dark">
          <i class="fa-solid fa-blog fa-lg"></i>
          {{ val.BLOG_VIEW }}
        </h1>
        <p>{{ val.INTRO_ARTICLE }}</p>
      </template>

      <template #body>
        <ListElt :items="getItemsByCategory(articles)" :dynamic="true">
          <template #items="slotProps">
            <h2 :id="slotProps.item[0].cat" class="sky-dark ani-turnXZ-loop-altrev-into">
              {{ slotProps.item[0].cat }}
            </h2>
          </template>

          <template #nested="slotProps">
            <CardElt itemscope itemtype="https://schema.org/Article" class="blog">
              <template #header>
                <h3 itemprop="name" class="sky-dark">{{ slotProps.value.name }}</h3>
              </template>

              <template #body>
                <BtnElt v-if="!checkSession('user')"
                  :id="`like-${slotProps.value.id}`"
                  href="/login"
                  class="btn-sky-dark"
                  :title="val.TITLE_LIKE_LOGIN + slotProps.value.name">
                  <template #btn>
                    <i class="fa-regular fa-thumbs-up fa-lg fa-fw"></i>
                    <b itemprop="contentRating">{{ slotProps.value.likes.length }}</b>
                  </template>
                </BtnElt>

                <BtnElt v-else-if="checkLikes(slotProps.value.id) === false"
                  :id="`like-${slotProps.value.id}`"
                  type="button"
                  @click="addLike(slotProps.value.id)"
                  class="btn-sky"
                  :title="val.TITLE_LIKE + slotProps.value.name">
                  <template #btn>
                    <i class="fa-regular fa-thumbs-up fa-lg fa-fw"></i>
                    <b itemprop="contentRating">{{ slotProps.value.likes.length }}</b>
                  </template>
                </BtnElt>

                <BtnElt v-else-if="checkLikes(slotProps.value.id) === true"
                  :id="`like-${slotProps.value.id}`"
                  type="button"
                  @click="addLike(slotProps.value.id)"
                  class="btn-sky"
                  :title="val.TITLE_DISLIKE + slotProps.value.name">
                  <template #btn>
                    <i class="fa-solid fa-thumbs-up fa-lg fa-fw"></i>
                    <b itemprop="contentRating">{{ slotProps.value.likes.length }}</b>
                  </template>
                </BtnElt>

                <a v-if="!slotProps.value.url || checkSession('editor')"
                  :href="`article/${slotProps.value.id}`" 
                  :title="val.TITLE_READ + slotProps.value.name">
                  <MediaElt :id="`${slotProps.value.name.toLowerCase()}-${slotProps.value.cat.toLowerCase()}`"
                    :src="`img/thumbnails/articles/${slotProps.value.image}`" 
                    :alt="`${slotProps.value.alt}`" 
                    :width="val.THUMB_WIDTH"
                    :height="val.THUMB_HEIGHT"
                    itemprop="image">
                    <template #figcaption>
                      <p v-html="slotProps.value.text.split(':')[0]"></p>
                    </template>
                  </MediaElt>
                </a>

                <a v-else
                  :href="`https://${slotProps.value.url}`" 
                  :title="val.TITLE_READ + slotProps.value.name"
                  target="_blank"
                  rel="noopener noreferrer">
                  <MediaElt :id="`${slotProps.value.name.toLowerCase()}-${slotProps.value.cat.toLowerCase()}`"
                    :src="`img/thumbnails/articles/${slotProps.value.image}`" 
                    :alt="`${slotProps.value.alt}`" 
                    :width="val.THUMB_WIDTH"
                    :height="val.THUMB_HEIGHT"
                    itemprop="image">
                    <template #figcaption>
                      <p v-html="slotProps.value.text.split(':')[0]" class="blog"></p>
                    </template>
                  </MediaElt>
                </a>
              </template>
            </CardElt>
          </template>
        </ListElt>
      </template>

      <template #aside v-if="checkSession('editor')">
        <ArticleSet :token="token" :val="val"/>
      </template>
    </CardElt>
  </main>
</template>

<script>
import ArticleSet from "../components/ArticleSet"
import BtnElt from "../components/BtnElt"
import CardElt from "../components/CardElt"
import ListElt from "../components/ListElt"
import MediaElt from "../components/MediaElt"
import NavElt from "../components/NavElt"

import { checkRole, getCats, getItemsByCat, putData, setError, setMeta } from "../app/services"
import { mapState, mapActions } from "vuex"

export default {
  name: "BlogView",
  components: { BtnElt, CardElt, ListElt, MediaElt, NavElt, ArticleSet },
  props: ["avatar", "val"],

  /**
   * ? CREATED
   * * A function that retrieves the articles & sets the meta data of the page.
   */
  async created() {
    const { HEAD_BLOG, LOGO_SRC, META_BLOG, UI_URL } = this.val;
    await this.$store.dispatch("listArticles");
    setMeta(HEAD_BLOG, META_BLOG, `${UI_URL}/blog`, UI_URL + LOGO_SRC);
  },

  /**
   * ? UPDATED
   * * A function that updates the text elements by setting the "itemprop" attribute to "text".
   */
  updated() {
    const textArray = document.getElementsByClassName("figcaption");
    for (let textElt of textArray) textElt.firstChild.setAttribute("itemprop", "text");
  },

  computed: {
    ...mapState(["articles", "id", "token"]),

    /**
     * ? GET CATEGORIES
     * * Retrieves the categories of articles.
     * @return {Array} An array of article categories.
     */
    getCategories() { return getCats(this.articles) }
  },

  methods: {
    ...mapActions(["listArticles"]),

    /**
     * ? CHECK SESSION
     * * Checks the session for the specified role.
     * @param {type} role - the role to check
     * @return {type} the result of the role check
     */
    checkSession(role) { return checkRole(this.avatar.role, role) },

    /**
     * ? GET ITEMS BY CATEGORY
     * * Retrieves items based on category.
     * @param {Array} items - The list of items to filter.
     * @return {Array} The filtered list of items.
     */
    getItemsByCategory(items) { return getItemsByCat(items) },

    /**
     * ? CHECK LIKES
     * * Check if the given ID is present in the likes array of any user article.
     * @param {type} id - The ID to check for in the likes array.
     * @return {type} - Returns a boolean indicating whether the ID is present in the likes array.
     */
    checkLikes(id) { return this.articles.some(a => a.id === id && a.likes.includes(this.id)) },

    /**
     * ? ADD LIKE
     * * Asynchronously adds a like to the specified article.
     * @param {number} id - The ID of the article to add a like to
     */
    async addLike(id) {
      const { API_URL } = this.val;
      const article = this.articles.find(a => a.id === id);

      if (!article) return;
      let { name, text, image, alt, url, likes, cat } = article;

      const index = likes.indexOf(this.id);
      index > -1 ? likes.splice(index, 1) : likes.push(this.id);

      const URL   = `${API_URL}/articles/${id}`;
      const data  = new FormData();

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
    }
  }
}
</script>

<style>
.blog {
  --ve-card-width: 350px;
}

.blog h3 {
  height: 120px;
}
</style>
