<template>
  <CardElt id="top">
    <template #header>
      <i class="blue anima-slideB fa-solid fa-cogs fa-4x"></i>
      <h1 class="sky anima-slideT">
        Admin
      </h1>

      <!-- Sidebar -->
      <NavElt class="sidebar">
        <template #first>
          <a href="#shop"
            title="Manage products, reviews & orders">
            <i class="fa-solid fa-shop fa-fw"></i>
          </a>
          <a href="#blog"
            title="Manage articles & comments">
            <i class="fa-solid fa-blog fa-fw"></i>
          </a>
          <a href="#users"
            title="Manage users">
            <i class="fa-solid fa-user-astronaut fa-fw"></i>
          </a>
          <a href="#links"
            title="Manage links">
            <i class="fa-solid fa-link fa-fw"></i>
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
          <ListProducts v-if="products.length > 0"
            :products="products"/>

          <ListReviews v-if="reviews.length > 0"
            :reviews="reviews"
            :products="products"
            :users="users"/>

          <ListOrders v-if="orders.length > 0"
            :orders="orders"/>
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
          <ListArticles v-if="articles.length > 0"
            :articles="articles"
            :users="users"/>

          <ListComments v-if="comments.length > 0"
            :comments="comments"
            :articles="articles"
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
          <ListUsers v-if="users.length > 0"
            :users="users"/>
        </template>
      </CardElt>

      <hr>

      <!-- Links Part -->
      <CardElt>
        <template #header>
          <i class="fa-solid fa-link fa-3x"></i>
          <h2 id="links">
            Links
          </h2>
        </template>

        <template #body>
          <ListLinks v-if="links.length > 0"
            :links="links"/>
        </template>
      </CardElt>
    </template>
  </CardElt>
</template>

<script>
import ListProducts from "@/components/managers/ListProducts"
import ListReviews from "@/components/managers/ListReviews"
import ListOrders from "@/components/managers/ListOrders"
import ListArticles from "@/components/managers/ListArticles"
import ListComments from "@/components/managers/ListComments"
import ListUsers from "@/components/managers/ListUsers"
import ListLinks from "@/components/managers/ListLinks"

export default {
  name: "AdminView",
  components: {
    ListProducts,
    ListReviews,
    ListOrders,
    ListArticles,
    ListComments,
    ListUsers,
    ListLinks
  },

  data() {
    return {
      products: [],
      reviews: [],
      orders: [],
      articles: [],
      comments: [],
      users: [],
      links: []
    }
  },

  beforeMount () {
    if (localStorage.userId) {

      this.$serve.getData("/api/products")
        .then(res => { this.products = res })
        .catch(err => { console.log(err) });

      this.$serve.getData("/api/reviews")
        .then(res => { this.reviews = res })
        .catch(err => { console.log(err) });

      this.$serve.getData("/api/orders")
        .then(res => { this.orders = res })
        .catch(err => { console.log(err) });

      this.$serve.getData("/api/articles")
        .then(res => { this.articles = res })
        .catch(err => { console.log(err) });
      
      this.$serve.getData("/api/comments")
        .then(res => { this.comments = res })
        .catch(err => { console.log(err) });

      this.$serve.getData("/api/users")
        .then(res => { this.users = res })
        .catch(err => { console.log(err) });

      this.$serve.getData("/api/links")
        .then(res => { this.links = res })
        .catch(err => { console.log(err) });

    } else {
      alert("Go back Home !");
      this.$router.push("/");
    }
  }
}
</script>
