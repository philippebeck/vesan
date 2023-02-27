<template>
  <CardElt id="top">
    <template #header>
      <h1 class="sky anima-turn3D">
        <i class="fa-solid fa-cogs fa-2x"
          aria-hidden="true">
        </i>
        {{ constants.ADMIN_TITLE }}
      </h1>
      <p>{{ constants.ADMIN_INTRO }}</p>

      <!-- Sidebar -->
      <NavElt class="sidebar">
        <template #first>
          <a href="#shop"
            :title="constants.MANAGE_SHOP">
            <i class="fa-solid fa-shop fa-fw"></i>
          </a>
          <a href="#blog"
            :title="constants.MANAGE_BLOG">
            <i class="fa-solid fa-blog fa-fw"></i>
          </a>
          <a v-if="checkRole('admin')"
            href="#users"
            :title="constants.MANAGE_USERS">
            <i class="fa-solid fa-user-astronaut fa-fw"></i>
          </a>
          <a v-if="checkRole('admin')"
            href="#links"
            :title="constants.MANAGE_LINKS">
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
          
          <h2 id="shop"
            class="blue anima-bounce">
            <i class="fa-solid fa-shop fa-lg"
              aria-hidden="true">
            </i>
            {{ constants.SHOP_TITLE }}
          </h2>
          <p>{{ constants.MANAGE_SHOP }}</p>
        </template>

        <template #body>
          <ProductManager v-if="products.length > 0"
            :constants="constants"
            :products="products"/>

          <ReviewManager v-if="reviews.length > 0"
            :constants="constants"
            :products="products"
            :reviews="reviews"
            :users="users"/>

          <OrderManager v-if="orders.length > 0"
            :constants="constants"
            :orders="orders"
            :users="users"/>
        </template>
      </CardElt>

      <!-- Blog Part -->
      <CardElt>
        <template #header>
          <h2 id="blog"
            class="blue anima-bounce">
            <i class="fa-solid fa-blog fa-lg"
              aria-hidden="true">
            </i>
            {{ constants.BLOG_TITLE }}
          </h2>
          <p>{{ constants.MANAGE_BLOG }}</p>
        </template>

        <template #body>
          <ArticleManager v-if="articles.length > 0"
            :articles="articles"
            :constants="constants"
            :users="users"/>

          <CommentManager v-if="comments.length > 0"
            :articles="articles"
            :comments="comments"
            :constants="constants"
            :users="users"/>
        </template>
      </CardElt>

      <!-- Users Part -->
      <CardElt v-if="checkRole('admin')">
        <template #header>
          <h2 id="users"
            class="blue anima-bounce">
            <i class="fa-solid fa-user-astronaut fa-lg"
              aria-hidden="true">
            </i>
            {{ constants.USER_TITLE }}
          </h2>
          <p>{{ constants.MANAGE_USERS }}</p>
        </template>

        <template #body>
          <UserManager v-if="users.length > 0"
            :constants="constants"
            :users="users"/>
        </template>
      </CardElt>

      <!-- Links Part -->
      <CardElt v-if="checkRole('admin')">
        <template #header>
          <h2 id="links"
            class="blue anima-bounce">
            <i class="fa-solid fa-link fa-lg"
              aria-hidden="true">
            </i>
            {{ constants.LINK_TITLE }}
          </h2>
          <p>{{ constants.MANAGE_LINKS }}</p>
        </template>

        <template #body>
          <LinkManager v-if="links.length > 0"
            :constants="constants"
            :links="links"/>
        </template>
      </CardElt>
    </template>
  </CardElt>
</template>

<script>
import { mapState, mapActions } from "vuex"

import ProductManager from "@/components/managers/ProductManager"
import ReviewManager from "@/components/managers/ReviewManager"
import OrderManager from "@/components/managers/OrderManager"
import ArticleManager from "@/components/managers/ArticleManager"
import CommentManager from "@/components/managers/CommentManager"
import UserManager from "@/components/managers/UserManager"
import LinkManager from "@/components/managers/LinkManager"

export default {
  name: "AdminView",
  components: {
    ProductManager,
    ReviewManager,
    OrderManager,
    ArticleManager,
    CommentManager,
    UserManager,
    LinkManager
  },

  props: ["constants"],
  data() {
    return {
      user: {}
    }
  },

  mounted () {
    if (this.constants.USER_ID) {
      this.$serve.getData("/api/users/avatar/" + this.constants.USER_ID)
        .then((res) => { 
          this.user = res;

          if (this.checkRole("editor")) {
            this.$store.dispatch("listArticles");
            this.$store.dispatch("listComments");
            this.$store.dispatch("listLinks");
            this.$store.dispatch("listOrders");
            this.$store.dispatch("listProducts");
            this.$store.dispatch("listReviews");
            this.$store.dispatch("listUsers");
          }
        })
        .catch(err => { console.log(err) });

    } else {
      alert(this.constants.HOME_GO);
      this.$router.push("/");
    }
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
    ])
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
     * CHECK ROLE
     * @param {string} role
     * @returns
     */
    checkRole(role) {
      return this.$serve.checkRole(this.user.role, role);
    }
  }
}
</script>
