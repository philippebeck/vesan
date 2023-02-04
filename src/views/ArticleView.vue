<template>
  <CardElt>
    <template #header>
      <h1>{{ article.title }}</h1>
      <strong>{{ article.cat }}</strong>
    </template>

    <template #body>

      <BtnElt v-if="checkLikes() === false"
        id="likes"
        type="button"
        @click="addLike()"
        class="btn-blue"
        :title="`Like ${article.title} ?`">
        <template #btn>
          <i class="fa-regular fa-thumbs-up fa-lg"></i>
          {{ article.likes }}
        </template>
      </BtnElt>

      <BtnElt v-else-if="checkLikes() === true"
        id="likes"
        type="button"
        @click="addLike()"
        class="btn-sky"
        :title="`Dislike ${article.title} ?`">
        <template #btn>
          <i class="fa-solid fa-thumbs-up fa-lg"></i>
          {{ article.likes }}
        </template>
      </BtnElt>

      <MediaElt :src="`/img/articles/${article.image}`"
        :alt="article.alt">

        <template #figcaption>
          <blockquote class="container width-sm bord bord-sky blue">
            {{ article.text }}
          </blockquote>
          
          <p class="silver">
            Created: {{ new Date(article.created).toLocaleDateString() }} 
            (Updated: {{ new Date(article.updated).toLocaleDateString() }})
          </p>
        </template>
      </MediaElt>

      <ListComments v-if="comments.length > 0"
        :comments="getArticleComments()"
        :users="users"/>
    </template>

    <template #aside  v-if="userId">
      <CreateComment />
    </template>
  </CardElt>
</template>

<script>
import constants from "/constants"

import CreateComment from "@/components/creators/CreateComment"
import ListComments from "@/components/managers/ListComments"

export default {
  name: "ArticleView",
  components: {
    CreateComment,
    ListComments
  },

  data() {
    return {
      article: {},
      comments: [],
      users: [],
      userId: null
    }
  },

  created () {
    this.$serve.getData(`/api/articles/${this.$route.params.id}`)
      .then(res => { this.article = res })
      .catch(err => { console.log(err) });

    this.$serve.getData("/api/comments")
      .then(res => { this.comments = res })
      .catch(err => { console.log(err) });

    this.$serve.getData("/api/users")
      .then(res => { this.users = res })
      .catch(err => { console.log(err) });

    if (localStorage.userId) {
      this.userId = JSON.parse(localStorage.userId);
    }
  },

  methods: {
    /**
     * GET ARTICLE COMMENTS
     * @returns
     */
    getArticleComments() {
      let articleComments = [];

      for (let i = 0 ; i < this.comments.length ; i++) {
        if (this.$route.params.id === this.comments[i].article) {
          articleComments.push(this.comments[i]);
        }
      }
      return articleComments;
    },

    /**
     * CHECK LIKES
     * @returns
     */
    checkLikes() {
      let usersLiked = this.article.usersLiked;

      for (let i = 0; i < usersLiked.length; i++) {
        if (constants.USER_ID === usersLiked[i]) {
          return true;
        }
      }
      return false;
    },

    /**
     * ADD LIKE
     */
    addLike() {
      let hasLiked = false;
      let usersLiked = this.article.usersLiked;

      for (let i = 0; i < usersLiked.length; i++) {
        if (constants.USER_ID === usersLiked[i]) {
          hasLiked = true;
          this.article.likes -= 1;
          usersLiked.splice(i, 1);
        }
      }

      if (hasLiked === false) {
        this.article.likes += 1;
        usersLiked.push(constants.USER_ID);
      }

      let article = new FormData();
      article.append("id", this.article._id);
      article.append("title", this.article.title);
      article.append("likes", this.article.likes);
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
</script>
