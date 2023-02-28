<template>
  <NavElt :items="setCats"
    class="sidebar">

    <template #last  v-if="checkRole('editor')">
      <a href="#create-article"
        :title="constants.ARTICLE_CREATOR">
        <i class="fa-regular fa-envelope fa-fw"></i>
      </a>
    </template>

    <template #top>
      <i class="fa-solid fa-chevron-circle-up fa-fw"></i>
    </template>
  </NavElt>

  <CardElt id="top"
      :isArticle="true">
    <template #header>
      <h1 class="sky anima-flipY">
        <i class="fa-solid fa-blog fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.BLOG_VIEW }}
      </h1>
      <p>{{ constants.INTRO_ARTICLES }}</p>
    </template>

    <template #body>
      <ListElt :items="sortItemsByCat(articles)"
        :dynamic="true">

        <template #items="slotProps">
          <h2 :id="slotProps.item[0].cat"
            class="blue anima-flipX">
            {{ slotProps.item[0].cat }}
          </h2>
        </template>

        <template #nested="slotProps">

          <CardElt itemscope
            itemtype="https://schema.org/Article">
            <template #header>
              <h3 itemprop="name"
                class="sky">
                {{ slotProps.value.name }}
              </h3>
            </template>

            <template #body>
              <BtnElt v-if="!checkRole('user')"
                :id="`like-${slotProps.value._id}`"
                href="/login"
                class="btn-blue"
                :title="constants.TITLE_LIKE_LOGIN + slotProps.value.name">

                <template #btn>
                  <i class="fa-regular fa-thumbs-up fa-lg">
                  </i> <b itemprop="contentRating">
                    {{ slotProps.value.usersLiked.length }}
                  </b>
                </template>
              </BtnElt>

              <BtnElt v-else-if="checkLikes(slotProps.value._id) === false"
                :id="`like-${slotProps.value._id}`"
                type="button"
                @click="addLike(slotProps.value._id)"
                class="btn-blue"
                :title="constants.TITLE_LIKE + slotProps.value.name">

                <template #btn>
                  <i class="fa-regular fa-thumbs-up fa-lg">
                  </i> <b itemprop="contentRating">
                    {{ slotProps.value.usersLiked.length }}
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
                    {{ slotProps.value.usersLiked.length }}
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
                    <blockquote v-html="slotProps.value.text.slice(0, 40)" 
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
import ArticleCreator from "@/components/creators/ArticleCreator"

export default {
  name: "BlogView",
  components: { ArticleCreator },
  props: ["constants"],

  mounted () {
    this.$store.dispatch("listArticles");
  },

  computed: {
    ...mapState(["articles", "user"]),

    /**
     * SET CATEGORIES
     * @returns
     */
    setCats() {
      return this.$serve.setCats(this.articles);
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
    sortItemsByCat(items) {
      return this.$serve.sortItemsByCat(items);
    },

    /**
     * CHECK LIKES
     * @param {string} id
     * @returns
     */
    checkLikes(id) {
      for (let article of this.articles) {
        if (article._id === id) {

          return this.$serve.checkLikes(article.usersLiked);
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
          let usersLiked = this.articles[i].usersLiked;

          for (let j = 0; j < usersLiked.length; j++) {
            if (this.constants.USER_ID === usersLiked[j]) {
              hasLiked = true;
              usersLiked.splice(j, 1);
            }
          }

          if (hasLiked === false) {
            usersLiked.push(this.constants.USER_ID);
          }

          let article = new FormData();

          article.append("id", this.articles[i]._id);
          article.append("name", this.articles[i].name);
          article.append("usersLiked", usersLiked);

          this.$serve.putData(`/api/articles/${article.get("id")}`, article)
            .then(() => {

              if (hasLiked === true) {
                alert(article.get("name") + this.constants.ALERT_DISLIKED);
              } else {
                alert(article.get("name") + this.constants.ALERT_LIKED);
              }
            })
            .catch(err => { console.log(err) });
        }
      }
    }
  }
}
</script>
