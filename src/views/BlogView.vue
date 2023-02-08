<template>
  <NavElt
    type="sidebar"
    :items="setCats"
    class="sidebar">

    <template #last  v-if="checkSession('author')">
      <a href="#create-article"
        title="Create a article">
        <i class="fa-regular fa-envelope fa-fw"></i>
      </a>
    </template>

    <template #top>
      <i class="fa-solid fa-chevron-circle-up fa-fw"></i>
    </template>
  </NavElt>

  <CardElt id="top">
    <template #header>
      <i class="blue anima-flipX fa-solid fa-blog fa-4x"></i>
      <h1 class="sky anima-flipY">Blog</h1>
      <b>Articles to read !</b>
    </template>

    <template #body>
      <ListElt :items="sortItemsByCat(articles)"
        :dynamic="true">

        <template #items="slotProps">
          <h2 :id="slotProps.item[0].cat"
            class="anima-flipX">
            {{ slotProps.item[0].cat }}
          </h2>
        </template>

        <template #nested="slotProps">

          <BtnElt v-if="!checkSession('user')"
            :id="`like-${slotProps.value._id}`"
            href="/login"
            class="btn-blue"
            :title="`Login to like ${slotProps.value.title}`">
            <template #btn>
              <i class="fa-regular fa-thumbs-up fa-lg"></i>
              {{ slotProps.value.likes }}
            </template>
          </BtnElt>

          <BtnElt v-else-if="checkLikes(slotProps.value._id) === false"
            :id="`like-${slotProps.value._id}`"
            type="button"
            @click="addLike(slotProps.value._id)"
            class="btn-blue"
            :title="`Like ${slotProps.value.title} ?`">
            <template #btn>
              <i class="fa-regular fa-thumbs-up fa-lg"></i>
              {{ slotProps.value.likes }}
            </template>
          </BtnElt>

          <BtnElt v-else-if="checkLikes(slotProps.value._id) === true"
            :id="`like-${slotProps.value._id}`"
            type="button"
            @click="addLike(slotProps.value._id)"
            class="btn-sky"
            :title="`Dislike ${slotProps.value.title} ?`">
            <template #btn>
              <i class="fa-solid fa-thumbs-up fa-lg"></i>
              {{ slotProps.value.likes }}
            </template>
          </BtnElt>

          <a :href="`article/${slotProps.value._id}`"
            :title="`Read ${slotProps.value.title}`">
            <MediaElt :src="`img/thumbnails/articles/${slotProps.value.image}`" 
              :alt="`${slotProps.value.title}`" 
              :id="`${slotProps.value.title.toLowerCase()}-${slotProps.value.cat.toLowerCase()}`">

              <template #figcaption>
                <h3>{{ slotProps.value.title }}</h3>
                <blockquote>{{ slotProps.value.text }}</blockquote>
              </template>
            </MediaElt>
          </a>

        </template>
      </ListElt>
    </template>

    <template #aside v-if="checkSession('author')">
      <CreateArticle />
    </template>
  </CardElt>
</template>

<script>
import constants from "/constants"

import CreateArticle from "@/components/creators/CreateArticle"

export default {
  name: "BlogView",
  components: {
    CreateArticle
  },

  data() {
    return {
      articles: [],
      users: [],
      userId: null
    }
  },

  mounted () {
    this.$serve.getData("/api/users/check")
      .then(res => { this.users = res })
      .catch(err => { console.log(err) });

    this.$serve.getData("/api/articles")
      .then(res => { this.articles = res })
      .catch(err => { console.log(err) });
  },

  computed: {
    /**
     * SET CATEGORIES
     * @returns
     */
    setCats() {
      return this.$serve.setCats(this.articles);
    }
  },

  methods: {
    /**
     * CHECK SESSION
     * @param {string} role
     * @returns
     */
    checkSession(role) {
      return this.$serve.checkSession(this.users, role);
    },

    /**
     * SORT ITEMS BY CATEGORY
     * @param {array} items 
     */
    sortItemsByCat(items) {
      return this.$serve.sortItemsByCat(items);
    },

    /**
     * CHECK LIKES
     * @returns
     */
    checkLikes(id) {
      for (let i = 0; i < this.articles.length; i++) {
        if (id === this.articles[i]._id) {

          return this.$serve.checkLikes(this.articles[i].usersLiked);
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
            if (constants.USER_ID === usersLiked[j]) {

              hasLiked = true;
              this.articles[i].likes -= 1;
              usersLiked.splice(j, 1);
            }
          }

          if (hasLiked === false) {
            this.articles[i].likes += 1;
            usersLiked.push(constants.USER_ID);
          }

          let article = new FormData();
          article.append("id", this.articles[i]._id);
          article.append("title", this.articles[i].title);
          article.append("likes", this.articles[i].likes);
          article.append("usersLiked", usersLiked);

          this.$serve.putData(`/api/articles/${article.get("id")}`, article)
            .then(() => {
              if (hasLiked === true) {
                console.log(article.get("title") + " disliked !");
              } else {
                console.log(article.get("title") + " liked !");
              }
            })
            .catch(err => { console.log(err) });
        }
      }
    }
  }
}
</script>
