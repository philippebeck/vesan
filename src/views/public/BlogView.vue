<template>
  <main>
    <NavElt :items="getCategories"
      class="sidebar">
      <template #hide>
        <i class="fa-solid fa-eye fa-fw" 
          :title="constants.TITLE_TOGGLE"></i>
      </template>

      <template #last  v-if="checkSession('editor')">
        <a href="#create-article"
          :title="constants.ARTICLE_CREATOR">
          <i class="fa-regular fa-pen-to-square fa-fw"></i>
        </a>
      </template>

      <template #top>
        <i class="fa-solid fa-chevron-circle-up fa-fw" 
          :title="constants.TITLE_TOP"></i>
      </template>
    </NavElt>

    <CardElt id="top"
      :isArticle="true"
      class="container-90md-80lg-70wd">
      <template #header>
        <h1 class="sky-dark">
          <i class="fa-solid fa-blog fa-lg"
            aria-hidden="true">
          </i>
          {{ constants.BLOG_VIEW }}
        </h1>
        <p>{{ constants.INTRO_ARTICLE }}</p>
      </template>

      <template #body>
        <ListElt :items="getItemsByCategory(articles)"
          :dynamic="true">

          <template #items="slotProps">
            <h2 :id="slotProps.item[0].cat"
              class="sky-dark ani-turn3D-loop-altrev-into">
              {{ slotProps.item[0].cat }}
            </h2>
          </template>

          <template #nested="slotProps">

            <CardElt itemscope
              itemtype="https://schema.org/Article">
              <template #header>
                <h3 itemprop="name"
                  class="sky-dark">
                  {{ slotProps.value.name }}
                </h3>
              </template>

              <template #body>
                <BtnElt v-if="!checkSession('user')"
                  :id="`like-${slotProps.value.id}`"
                  href="/login"
                  class="btn-sky-dark"
                  :title="constants.TITLE_LIKE_LOGIN + slotProps.value.name">

                  <template #btn>
                    <i class="fa-regular fa-thumbs-up fa-lg">
                    </i> <b itemprop="contentRating">
                      {{ slotProps.value.likes.length }}
                    </b>
                  </template>
                </BtnElt>

                <BtnElt v-else-if="checkLikes(slotProps.value.id) === false"
                  :id="`like-${slotProps.value.id}`"
                  type="button"
                  @click="addLike(slotProps.value.id)"
                  class="btn-sky"
                  :title="constants.TITLE_LIKE + slotProps.value.name">

                  <template #btn>
                    <i class="fa-regular fa-thumbs-up fa-lg">
                    </i> <b itemprop="contentRating">
                      {{ slotProps.value.likes.length }}
                    </b>
                  </template>
                </BtnElt>

                <BtnElt v-else-if="checkLikes(slotProps.value.id) === true"
                  :id="`like-${slotProps.value.id}`"
                  type="button"
                  @click="addLike(slotProps.value.id)"
                  class="btn-sky"
                  :title="constants.TITLE_DISLIKE + slotProps.value.name">

                  <template #btn>
                    <i class="fa-regular fa-thumbs-up fa-lg">
                    </i> <b itemprop="contentRating">
                      {{ slotProps.value.likes.length }}
                    </b>
                  </template>
                </BtnElt>

                <a :href="`article/${slotProps.value.id}`"
                  :title="constants.TITLE_READ + slotProps.value.name">

                  <MediaElt :id="`${slotProps.value.name.toLowerCase()}-${slotProps.value.cat.toLowerCase()}`"
                    :src="`img/thumbnails/articles/${slotProps.value.image}`" 
                    :alt="`${slotProps.value.alt}`" 
                    :width="constants.THUMB_WIDTH"
                    :height="constants.THUMB_HEIGHT"
                    itemprop="image">

                    <template #figcaption>
                      <blockquote v-html="slotProps.value.text.split(':')[0]" 
                        class="monospace figcaption">
                      </blockquote>
                    </template>
                  </MediaElt>
                </a>

              </template>
            </CardElt>
          </template>
        </ListElt>
      </template>

      <template #aside v-if="checkSession('editor')">
        <ArticleCreator :constants="constants"/>
      </template>
    </CardElt>
  </main>
</template>

<script>
import BtnElt from "@/assets/elements/BtnElt"
import CardElt from "@/assets/elements/CardElt"
import ListElt from "@/assets/elements/ListElt"
import MediaElt from "@/assets/elements/MediaElt"
import NavElt from "@/assets/elements/NavElt"

import ArticleCreator from "@/assets/creators/ArticleCreator"

import { checkRole, getCats, getItemsByCat, putData, setError, setMeta } from "servidio"
import { mapState, mapActions } from "vuex"

export default {
  name: "BlogView",
  components: {
    BtnElt,
    CardElt,
    ListElt,
    MediaElt,
    NavElt,
    ArticleCreator 
  },
  props: ["constants", "user"],

  created() {
    this.$store.dispatch("listArticles");

    setMeta(
      this.constants.HEAD_BLOG, 
      this.constants.META_BLOG,
      this.constants.UI_URL + "/blog",
      this.constants.UI_URL + this.constants.LOGO_SRC
    );
  },

  updated() {
    const textArray = document.getElementsByClassName("figcaption");

    for (let textElt of textArray) {
      textElt.firstChild.setAttribute("itemprop", "text");
    }
  },

  computed: {
    ...mapState(["articles"]),

    /**
     * GET CATEGORIES
     * @returns
     */
    getCategories() {
      return getCats(this.articles);
    }
  },

  methods: {
    ...mapActions(["listArticles"]),

    /**
     * CHECK ROLE
     * @param {string} role
     * @returns
     */
    checkSession(role) {
      return checkRole(this.user.role, role);
    },

    /**
     * SORT ITEMS BY CATEGORY
     * @param {array} items 
     * @returns
     */
    getItemsByCategory(items) {
      return getItemsByCat(items);
    },

    /**
     * CHECK LIKES
     * @param {string} id
     * @returns
     */
    checkLikes(id) {
      for (let article of this.articles) {
        if (article.id === id) {

          return article.likes.includes(this.constants.USER_ID);
        }
      }
    },

    /**
     * ADD LIKE
     * @param {string} id 
     */
    addLike(id) {
      let hasLiked = false;

      for (let i = 0; i < this.articles.length; i++) {
        if (id === this.articles[i].id) {
          let likes = this.articles[i].likes;

          for (let j = 0; j < likes.length; j++) {
            if (this.constants.USER_ID === likes[j]) {
              hasLiked = true;
              likes.splice(j, 1);
            }
          }

          if (hasLiked === false) { likes.push(this.constants.USER_ID) }

          let article = new FormData();

          article.append("name", this.articles[i].name);
          article.append("text", this.articles[i].text);
          article.append("image", this.articles[i].image);
          article.append("alt", this.articles[i].alt);
          article.append("likes", likes);
          article.append("cat", this.articles[i].cat);
          article.append("updated", this.articles[i].updated);

          putData(this.constants.API_URL + "/articles/" + id, article)
            .then(() => {
              if (hasLiked === true) {
                console.log(this.article.name + this.constants.ALERT_DISLIKED);
              } else {
                console.log(this.article.name + this.constants.ALERT_LIKED);
              }
            })
            .catch(err => { setError(err) });
        }
      }
    }
  }
}
</script>
