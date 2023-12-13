<template>
  <main>
    <NavElt :items="getCategories"
      class="sidebar">
      <template #hide>
        <i class="fa-solid fa-eye fa-fw" 
          :title="val.TITLE_TOGGLE"></i>
      </template>

      <template #last  v-if="checkSession('editor')">
        <a href="#create-article"
          :title="val.ARTICLE_CREATOR">
          <i class="fa-regular fa-pen-to-square fa-fw"></i>
        </a>
      </template>

      <template #top>
        <i class="fa-solid fa-chevron-circle-up fa-fw" 
          :title="val.TITLE_TOP"></i>
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
          {{ val.BLOG_VIEW }}
        </h1>
        <p>{{ val.INTRO_ARTICLE }}</p>
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
                  :title="val.TITLE_LIKE_LOGIN + slotProps.value.name">

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
                  :title="val.TITLE_LIKE + slotProps.value.name">

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
                  :title="val.TITLE_DISLIKE + slotProps.value.name">

                  <template #btn>
                    <i class="fa-regular fa-thumbs-up fa-lg">
                    </i> <b itemprop="contentRating">
                      {{ slotProps.value.likes.length }}
                    </b>
                  </template>
                </BtnElt>

                <a :href="`article/${slotProps.value.id}`"
                  :title="val.TITLE_READ + slotProps.value.name">

                  <MediaElt :id="`${slotProps.value.name.toLowerCase()}-${slotProps.value.cat.toLowerCase()}`"
                    :src="`img/thumbnails/articles/${slotProps.value.image}`" 
                    :alt="`${slotProps.value.alt}`" 
                    :width="val.THUMB_WIDTH"
                    :height="val.THUMB_HEIGHT"
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
        <ArticleCreator :val="val"/>
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
  props: ["val", "user"],

  created() {
    this.$store.dispatch("listArticles");
    setMeta(
      this.val.HEAD_BLOG, 
      this.val.META_BLOG,
      this.val.UI_URL + "/blog",
      this.val.UI_URL + this.val.LOGO_SRC
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
          return article.likes.includes(this.val.USER_ID);
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
            if (this.val.USER_ID === likes[j]) {
              likes.splice(j, 1);
              hasLiked = true;
            }
          }

          if (hasLiked === false) likes.push(this.val.USER_ID);
          const URL   = this.val.API_URL + "/articles/" + id;
          const data  = new FormData();

          data.append("name", this.articles[i].name);
          data.append("text", this.articles[i].text);
          data.append("image", this.articles[i].image);
          data.append("alt", this.articles[i].alt);
          data.append("likes", JSON.stringify(likes));
          data.append("cat", this.articles[i].cat);

          putData(URL, data, this.val.TOKEN)
            .then(() => {
              if (hasLiked === true) {
                console.log(data.get("name") + this.val.ALERT_DISLIKED);
              } else {
                console.log(data.get("name") + this.val.ALERT_LIKED);
              }
            })
            .catch(err => { setError(err) });
        }
      }
    }
  }
}
</script>
