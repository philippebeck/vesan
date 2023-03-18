<template>
  <NavElt :items="getCats"
    class="sidebar">
    <template #hide>
      <i class="fa-solid fa-eye fa-fw" 
        :title="constants.TITLE_TOGGLE"></i>
    </template>

    <template #last  v-if="checkRole('editor')">
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
      :isArticle="true">
    <template #header>
      <h1 class="sky-dark ani-flipY-it">
        <i class="fa-solid fa-blog fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.BLOG_VIEW }}
      </h1>
      <p>{{ constants.INTRO_ARTICLE }}</p>
    </template>

    <template #body>
      <ListElt :items="getItemsByCat(articles)"
        :dynamic="true">

        <template #items="slotProps">
          <h2 :id="slotProps.item[0].cat"
            class="sky-dark ani-flipX-it">
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
              <BtnElt v-if="!checkRole('user')"
                :id="`like-${slotProps.value._id}`"
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

              <BtnElt v-else-if="checkLikes(slotProps.value._id) === false"
                :id="`like-${slotProps.value._id}`"
                type="button"
                @click="addLike(slotProps.value._id)"
                class="btn-sky"
                :title="constants.TITLE_LIKE + slotProps.value.name">

                <template #btn>
                  <i class="fa-regular fa-thumbs-up fa-lg">
                  </i> <b itemprop="contentRating">
                    {{ slotProps.value.likes.length }}
                  </b>
                </template>
              </BtnElt>

              <BtnElt v-else-if="checkLikes(slotProps.value._id) === true"
                :id="`like-${slotProps.value._id}`"
                type="button"
                @click="addLike(slotProps.value._id)"
                class="btn-sky"
                :title="constants.TITLE_DISLIKE + slotProps.value.name">

                <template #btn>
                  <i class="fa-regular fa-thumbs-up fa-lg">
                  </i> <b itemprop="contentRating">
                    {{ slotProps.value.likes.length }}
                  </b>
                </template>
              </BtnElt>

              <a :href="`article/${slotProps.value._id}`"
                :title="constants.TITLE_READ + slotProps.value.name">

                <MediaElt :id="`${slotProps.value.name.toLowerCase()}-${slotProps.value.cat.toLowerCase()}`"
                  :src="`img/thumbnails/articles/${slotProps.value.image}`" 
                  :alt="`${slotProps.value.alt}`" 
                  itemprop="image">

                  <template #figcaption>
                    <blockquote v-html="slotProps.value.text.slice(0, 50)" 
                      itemprop="text"
                      class="monospace">
                    </blockquote>
                  </template>
                </MediaElt>
              </a>

            </template>
          </CardElt>
        </template>
      </ListElt>
    </template>

    <template #aside v-if="checkRole('editor')">
      <ArticleCreator :constants="constants"/>
    </template>
  </CardElt>
</template>

<script>
import { mapState, mapActions } from "vuex"

import BtnElt from "@/assets/BtnElt"
import ListElt from "@/assets/ListElt"
import MediaElt from "@/assets/MediaElt"
import NavElt from "@/assets/NavElt"
import CardElt from "@/assets/CardElt"

import ArticleCreator from "@/components/creators/ArticleCreator"

export default {
  name: "BlogView",
  components: {
    BtnElt,
    ListElt,
    MediaElt,
    NavElt,
    CardElt,
    ArticleCreator 
  },
  props: ["constants"],

  created() {
    this.$store.dispatch("listArticles");

    this.$serve.setMeta(
      this.constants.HEAD_BLOG, 
      this.constants.META_BLOG,
      this.constants.UI_URL + "/blog",
      this.constants.UI_URL + "/img/logo.svg"
    );
  },

  computed: {
    ...mapState(["articles", "user"]),

    /**
     * SET CATEGORIES
     * @returns
     */
    getCats() {
      return this.$serve.getCats(this.articles);
    }
  },

  methods: {
    ...mapActions(["listArticles"]),

    /**
     * CHECK ROLE
     * @param {string} role
     * @returns
     */
    checkRole(role) {
      return this.$serve.checkRole(this.user.role, role);
    },

    /**
     * SORT ITEMS BY CATEGORY
     * @param {array} items 
     * @returns
     */
    getItemsByCat(items) {
      return this.$serve.getItemsByCat(items);
    },

    /**
     * CHECK LIKES
     * @param {string} id
     * @returns
     */
    checkLikes(id) {
      for (let article of this.articles) {
        if (article._id === id) {

          return this.$serve.checkLikes(article.likes);
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
        if (id === this.articles[i]._id) {
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

          this.$serve.putData(`/articles/${id}`, article)
            .then(() => {
              if (hasLiked === true) {
                console.log(this.article.name + this.constants.ALERT_DISLIKED);
              } else {
                console.log(this.article.name + this.constants.ALERT_LIKED);
              }
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
}
</script>
