<template>
  <CardElt>
    <template #header>
      <h1>{{ post.title }}</h1>
      <strong>{{ post.cat }}</strong>
    </template>

    <template #body>

      <BtnElt v-if="checkLikes() === false"
        id="likes"
        type="button"
        @click="addLike()"
        class="btn-blue">
        <template #btn>
          <i class="fa-solid fa-thumbs-up fa-lg"></i>
          {{ post.likes }}
        </template>
      </BtnElt>

      <BtnElt v-else-if="checkLikes() === true"
        id="likes"
        type="button"
        @click="addLike()"
        class="btn-sky">
        <template #btn>
          <i class="fa-regular fa-thumbs-up fa-lg"></i>
          {{ post.likes }}
        </template>
      </BtnElt>

      <MediaElt :src="`/img/posts/${post.image}`"
        :alt="post.alt">

        <template #figcaption>
          <blockquote class="container width-sm bord bord-sky blue">
            {{ post.text }}
          </blockquote>
          
          <p class="silver">
            Created: {{ new Date(post.created).toLocaleDateString() }} 
            (Updated: {{ new Date(post.updated).toLocaleDateString() }})
          </p>
        </template>
      </MediaElt>

      <ListComments v-if="comments.length > 0"
        :comments="getPostComments()"
        :users="users"/>
    </template>

    <template #aside  v-if="userId">
      <CreateComment />
    </template>
  </CardElt>
</template>

<script>
import constants from "/constants"

import CreateComment from "@/components/CreateComment"
import ListComments from "@/components/ListComments"

export default {
  name: "PostView",
  components: {
    CreateComment,
    ListComments
  },

  data() {
    return {
      post: {},
      comments: [],
      users: [],
      userId: null
    }
  },

  created () {
    this.$serve.getData(`/api/posts/${this.$route.params.id}`)
      .then(res => { this.post = res })
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
     * GET POST COMMENTS
     * @returns
     */
    getPostComments() {
      let postComments = [];

      for (let i = 0 ; i < this.comments.length ; i++) {
        if (this.$route.params.id === this.comments[i].post) {
          postComments.push(this.comments[i]);
        }
      }
      return postComments;
    },

    /**
     * CHECK LIKES
     * @returns
     */
    checkLikes() {
      let usersLiked = this.post.usersLiked;

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
      let usersLiked = this.post.usersLiked;

      for (let i = 0; i < usersLiked.length; i++) {
        if (constants.USER_ID === usersLiked[i]) {
          hasLiked = true;
          this.post.likes -= 1;
          usersLiked.splice(i, 1);
        }
      }

      if (hasLiked === false) {
        this.post.likes += 1;
        usersLiked.push(constants.USER_ID);
      }

      let post = new FormData();
      post.append("id", this.post._id);
      post.append("title", this.post.title);
      post.append("likes", this.post.likes);
      post.append("usersLiked", usersLiked);

      this.$serve.putData(`/api/posts/${post.get("id")}`, post)
        .then(() => {
          if (hasLiked === true) {
            alert(post.get("title") + " disliked !");
          } else {
            alert(post.get("title") + " liked !");
          }
        })
        .catch(err => { console.log(err) });
    }
  }
}
</script>
