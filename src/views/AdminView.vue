<template>
  <CardElt id="top">
    <template #header>
      <i class="blue fa-solid fa-cogs fa-4x"></i>
      <h1 class="blue anima-slideB">
        Admin
      </h1>

      <!-- Sidebar -->
      <NavElt class="sidebar">
        <template #first>
          <a href="#shop"
            title="Manage articles & reviews">
            <i class="fa-solid fa-shop fa-fw"></i>
          </a>
          <a href="#blog"
            title="Manage posts & comments">
            <i class="fa-solid fa-blog fa-fw"></i>
          </a>
          <a href="#users"
            title="Manage users">
            <i class="fa-solid fa-user-astronaut fa-fw"></i>
          </a>
        </template>

        <template #top>
          <i class="fa-solid fa-chevron-circle-up fa-fw"></i>
        </template>
      </NavElt>
    </template>

    <template #body>

      <!-- Shop Part -->
      <CardElt>
        <template #header>
          <i class="fa-solid fa-shop fa-3x"></i>
          <h2 id="shop">
            Shop
          </h2>
        </template>

        <template #body>
          <ListArticles v-if="articles.length > 0"
            :articles="articles"/>

          <ListReviews v-if="reviews.length > 0"
            :reviews="reviews"
            :articles="articles"
            :users="users"/>
        </template>
      </CardElt>

      <hr>

      <!-- Blog Part -->
      <CardElt>
        <template #header>
          <i class="fa-solid fa-blog fa-3x"></i>
          <h2 id="blog">
            Blog
          </h2>
        </template>

        <template #body>
          <ListPosts v-if="posts.length > 0"
            :posts="posts"
            :users="users"/>

          <ListComments v-if="comments.length > 0"
            :comments="comments"
            :posts="posts"
            :users="users"/>
        </template>
      </CardElt>

      <hr>

      <!-- Users Part -->
      <CardElt>
        <template #header>
          <i class="fa-solid fa-user-astronaut fa-3x"></i>
          <h2 id="users">
            Users
          </h2>
        </template>

        <template #body>
          <CreateUser />

          <ListUsers v-if="users.length > 0"
            :users="users"/>
        </template>
      </CardElt>
    </template>
  </CardElt>
</template>

<script>
import ListArticles from "@/components/ListArticles"
import ListReviews from "@/components/ListReviews"
import ListPosts from "@/components/ListPosts"
import ListComments from "@/components/ListComments"
import CreateUser from "@/components/CreateUser"
import ListUsers from "@/components/ListUsers"

export default {
  name: "AdminView",
  components: {
    ListArticles,
    ListReviews,
    ListPosts,
    ListComments,
    CreateUser,
    ListUsers
  },

  data() {
    return {
      articles: [],
      reviews: [],
      posts: [],
      comments: [],
      users: []
    }
  },

  beforeMount () {
    if (localStorage.userId) {

      this.$serve.getData("/api/articles")
        .then(res => { this.articles = res })
        .catch(err => { console.log(err) });

      this.$serve.getData("/api/reviews")
        .then(res => { this.reviews = res })
        .catch(err => { console.log(err) });

      this.$serve.getData("/api/posts")
        .then(res => { this.posts = res })
        .catch(err => { console.log(err) });
      
      this.$serve.getData("/api/comments")
        .then(res => { this.comments = res })
        .catch(err => { console.log(err) });

      this.$serve.getData("/api/users")
        .then(res => { this.users = res })
        .catch(err => { console.log(err) });

    } else {
      alert("Go back Home !");
      this.$router.push("/");
    }
  }
}
</script>
