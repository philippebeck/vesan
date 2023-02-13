<template>
  <CardElt id="top">
    <template #header>
      <i class="blue anima-bounce fa-solid fa-cogs fa-4x"></i>
      <h1 class="sky anima-turn3D">
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
          <a v-if="checkSession('admin')"
            href="#users"
            title="Manage users">
            <i class="fa-solid fa-user-astronaut fa-fw"></i>
          </a>
          <a v-if="checkSession('admin')"
            href="#links"
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
          <h2 id="shop">Shop</h2>
        </template>

        <template #body>
          <ListProducts v-if="products.length > 0"
            :products="products"/>

          <ListReviews v-if="reviews.length > 0"
            :reviews="reviews"
            :products="products"
            :users="users"/>

          <ListOrders v-if="orders.length > 0"
            :orders="orders"
            :users="users"/>
        </template>
      </CardElt>

      <!-- Blog Part -->
      <CardElt>
        <template #header>
          <i class="fa-solid fa-blog fa-3x"></i>
          <h2 id="blog">Blog</h2>
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

      <!-- Users Part -->
      <CardElt v-if="checkSession('admin')">
        <template #header>
          <i class="fa-solid fa-user-astronaut fa-3x"></i>
          <h2 id="users">Users</h2>
        </template>

        <template #body>
          <ListUsers v-if="users.length > 0"
            :users="users"/>
        </template>
      </CardElt>

      <!-- Links Part -->
      <CardElt v-if="checkSession('admin')">
        <template #header>
          <i class="fa-solid fa-link fa-3x"></i>
          <h2 id="links">Links</h2>
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
import { mapState, mapActions } from "vuex"
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
      usersChecked: []
    }
  },

  beforeMount () {
    this.$serve.getData("/api/users/check")
        .then(res => { 
          this.usersChecked = res;

          if (this.checkSession("editor")) {

            this.$store.dispatch("listArticles");
            this.$store.dispatch("listComments");
            this.$store.dispatch("listOrders");
            this.$store.dispatch("listProducts");
            this.$store.dispatch("listReviews");

          } else {
            alert("Go back Home !");
            this.$router.push("/");
          }

          if (this.checkSession("admin")) {

            this.$store.dispatch("listLinks");
            this.$store.dispatch("listUsers");
          }
        })
        .catch(err => { console.log(err) });
  },

  computed: {
    ...mapState([
      "articles", 
      "comments", 
      "links", 
      "orders",
      "products", 
      "reviews", 
      "users"
    ]),
  },

  methods: {
    ...mapActions([
      "listArticles", 
      "listComments", 
      "listLinks", 
      "listOrders", 
      "listProducts", 
      "listReviews", 
      "listUsers"
    ]),

    /**
     * CHECK SESSION
     * @param {string} role
     * @returns
     */
    checkSession(role) {
      return this.$serve.checkSession(this.usersChecked, role);
    }
  }
}
</script>
