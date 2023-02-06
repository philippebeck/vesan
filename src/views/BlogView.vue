<template>
  <NavElt
    type="sidebar"
    :items="cats"
    class="sidebar">

    <template #last  v-if="userId">
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
      <i class="blue anima-shrink fa-solid fa-blog fa-4x"></i>
      <h1 class="sky anima-grow">
        Blog
      </h1>
      <strong class="gray">
        Articles to read !
      </strong>
      <p>Under construction !</p>
    </template>

    <template #aside v-if="userId">
      <CreateArticle 
        :cats="cats"/>
    </template>

    <template #body>
      <ListElt :items="itemsByCat(articles)"
        :dynamic="true">

        <template #items="slotProps">
          <h2 :id="slotProps.item[0].cat">{{ slotProps.item[0].cat }}</h2>
        </template>

        <template #nested="slotProps">
          <BtnElt v-if="checkLikes(slotProps.value._id) === false"
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

          <BtnElt v-if="checkLikes(slotProps.value._id) === true"
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
      userId: null
    }
  },

  mounted () {
    this.$serve.getData("/api/articles")
      .then(res => { this.articles = res })
      .catch(err => { console.log(err) });

    if (localStorage.userId) {
      this.userId = JSON.parse(localStorage.userId);
    }
  },

  computed: {
    cats() {
      const cats = new Set();
      this.articles.forEach(article => cats.add(article.cat));
      return Array.from(cats); 
    }
  },

  methods: {
    /**
     * GET ITEMS BY CATEGORY
     * @param {*} items 
     */
    itemsByCat(items) {
      const itemsByCat = {};
      items.forEach(item => {
        if (!itemsByCat[item.cat]) {
          itemsByCat[item.cat] = [];
        }
        itemsByCat[item.cat].push(item);
        itemsByCat[item.cat].sort((a, b) => (a.name > b.name) ? 1 : -1);
      });
      return itemsByCat;
    },

    /**
     * CHECK LIKES
     * @returns
     */
    checkLikes(id) {
      let usersLiked;

      for (let i = 0; i < this.articles.length; i++) {
        if (id === this.articles[i]._id) {
          usersLiked = this.articles[i].usersLiked;
        }
      }

      for (let i = 0; i < usersLiked.length; i++) {
        if (constants.USER_ID === usersLiked[i]) {
          return true;
        }
      }
      return false;
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
                alert(article.get("title") + " disliked !");
              } else {
                alert(article.get("title") + " liked !");
              }
            })
            .catch(err => { console.log(err) });
        }
      }
    }
  }
}
</script>
