<template>

  <!-- ADMIN PAGE -->
  <CardElt id="top">
    <template #header>
      <i class="blue fa-solid fa-cogs fa-2x"></i>
      <h1 class="blue anima-slideB">
        Admin
      </h1>
      
      <p>Under construction !</p>

      <!-- Sidebar -->
      <NavElt class="sidebar">
        <template #first>
          <a href="#article"
            title="Create an article">
            <i class="fas fa-basket-shopping fa-fw"></i>
          </a>
          <a href="#articles"
            title="Manage articles">
            <i class="fas fa-cart-shopping fa-fw"></i>
          </a>
          <a href="#review"
            title="Create a review">
            <i class="fas fa-check fa-fw"></i>
          </a>
          <a href="#reviews"
            title="Manage reviews">
            <i class="fas fa-list-check fa-fw"></i>
          </a>
          <a href="#post"
            title="Create a post">
            <i class="fas fa-envelope fa-fw"></i>
          </a>
          <a href="#posts"
            title="Manage posts">
            <i class="fas fa-envelopes-bulk fa-fw"></i>
          </a>
          <a href="#comment"
            title="Create a comment">
            <i class="fas fa-comment fa-fw"></i>
          </a>
          <a href="#comments"
            title="Manage comments">
            <i class="fas fa-comments fa-fw"></i>
          </a>
          <a href="#user"
            title="Create a user">
            <i class="fas fa-user fa-fw"></i>
          </a>
          <a href="#users"
            title="Manage users">
            <i class="fas fa-users fa-fw"></i>
          </a>
        </template>

        <template #top>
          <i class="fa-solid fa-chevron-circle-up fa-fw"></i>
        </template>
      </NavElt>
    </template>

    <template #body>

      <!-- Article Part -->
      <CardElt>
        <template #header>
          <i class="fa-solid fa-cart-shopping fa-2x"></i>
          <h2 id="article">
            Articles
          </h2>
        </template>

        <template #body>
          <CreateArticle />

          <ListArticles v-if="articles.length > 0"
            :articles="articles"/>
        </template>
      </CardElt>

      <!-- Review Part -->
      <CardElt>
        <template #header>
          <i class="fa-solid fa-list-check fa-2x"></i>
          <h2 id="review">
            Reviews
          </h2>
        </template>

        <template #body>
          <CreateReview />

          <ListReviews v-if="reviews.length > 0"
            :reviews="reviews"/>
        </template>
      </CardElt>

      <!-- Post Part -->
      <CardElt>
        <template #header>
          <i class="fa-solid fa-envelopes-bulk fa-2x"></i>
          <h2 id="post">
            Posts
          </h2>
        </template>

        <template #body>
          <CreatePost />

          <ListPosts v-if="posts.length > 0"
            :posts="posts"/>
        </template>
      </CardElt>

      <!-- Comment Part -->
      <CardElt>
        <template #header>
          <i class="fa-solid fa-comments fa-2x"></i>
          <h2 id="comment">
            Comments
          </h2>
        </template>

        <template #body>
          <CreateComment />

          <ListComments v-if="comments.length > 0"
            :comments="comments"/>
        </template>
      </CardElt>

      <!-- User Part -->
      <CardElt>
        <template #header>
          <i class="fa-solid fa-users fa-2x"></i>
          <h2 id="user">
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
import CreateArticle from "@/components/CreateArticle"
import ListArticles from "@/components/ListArticles"
import CreateReview from "@/components/CreateReview"
import ListReviews from "@/components/ListReviews"
import CreateComment from "@/components/CreateComment"
import ListComments from "@/components/ListComments"
import CreatePost from "@/components/CreatePost"
import ListPosts from "@/components/ListPosts"
import CreateUser from "@/components/CreateUser"
import ListUsers from "@/components/ListUsers"

export default {
  name: "AdminView",
  components: {
    CreateArticle,
    ListArticles,
    CreateReview,
    ListReviews,
    CreateComment,
    ListComments,
    CreatePost,
    ListPosts,
    CreateUser,
    ListUsers
  },

  data() {
    return {
      articles: [],
      reviews: [],
      comments: [],
      posts: [],
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
      
      this.$serve.getData("/api/comments")
        .then(res => { this.comments = res })
        .catch(err => { console.log(err) });

      this.$serve.getData("/api/posts")
        .then(res => { this.posts = res })
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
