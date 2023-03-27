<template>
  <main>
    <CardElt id="top">
      <template #header>
        <h1 class="sky-dark">
          <i class="fa-solid fa-gears fa-2x"
            aria-hidden="true">
          </i>
          {{ constants.ADMIN_EDITOR }}
        </h1>
        <p>{{ constants.INTRO_ADMIN }}</p>

        <!-- Sidebar -->
        <NavElt class="sidebar">
          <template #hide>
            <i class="fa-solid fa-eye fa-fw" 
            :title="constants.TITLE_TOGGLE"></i>
          </template>

          <template #first>
            <a v-if="products.length > 0" 
              href="#product"
              :title="constants.INTRO_PRODUCTS">
              <i class="fa-regular fa-rectangle-list fa-fw"></i>
            </a>
            <a v-if="reviews.length > 0" 
              href="#review"
              :title="constants.INTRO_REVIEWS">
              <i class="fa-solid fa-ranking-star fa-fw"></i>
            </a>
            <a v-if="orders.length > 0" 
              href="#order"
              :title="constants.INTRO_ORDERS">
              <i class="fa-solid fa-gifts fa-fw"></i>
            </a>
            <a v-if="articles.length > 0" 
              href="#article"
              :title="constants.INTRO_ARTICLES">
              <i class="fa-regular fa-newspaper fa-fw"></i>
            </a>
            <a v-if="comments.length > 0" 
              href="#comment"
              :title="constants.INTRO_COMMENTS">
              <i class="fa-regular fa-comments fa-fw"></i>
            </a>
            <a v-if="checkRole('admin')"
              href="#user"
              :title="constants.INTRO_USERS">
              <i class="fa-solid fa-users-gear fa-fw"></i>
            </a>
            <a v-if="checkRole('admin')"
              href="#link"
              :title="constants.INTRO_LINKS">
              <i class="fa-solid fa-link fa-fw"></i>
            </a>
          </template>

          <template #top>
            <i class="fa-solid fa-chevron-circle-up fa-fw" 
              :title="constants.TITLE_TOP"></i>
          </template>
        </NavElt>
      </template>

      <template #body>

        <!-- Shop Part -->
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

        <!-- Blog Part -->
        <ArticleManager v-if="articles.length > 0"
          :articles="articles"
          :constants="constants"
          :users="users"/>

        <CommentManager v-if="comments.length > 0"
          :articles="articles"
          :comments="comments"
          :constants="constants"
          :users="users"/>

        <!-- Users Part -->
        <UserManager v-if="users.length > 0"
          :constants="constants"
          :users="users"/>

        <!-- Links Part -->
        <LinkManager v-if="links.length > 0"
          :constants="constants"
          :links="links"/>
      </template>
    </CardElt>
  </main>
</template>

<script>
import { mapState, mapActions } from "vuex"

import CardElt from "@/assets/CardElt"
import NavElt from "@/assets/NavElt"

import ProductManager from "@/components/managers/ProductManager"
import ReviewManager from "@/components/managers/ReviewManager"
import OrderManager from "@/components/managers/OrderManager"
import ArticleManager from "@/components/managers/ArticleManager"
import CommentManager from "@/components/managers/CommentManager"
import UserManager from "@/components/managers/UserManager"
import LinkManager from "@/components/managers/LinkManager"

export default {
  name: "AdminEditor",
  components: {
    CardElt,
    NavElt,
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

  created() {
    if (this.constants.USER_ID) {
      this.$serve.getData("/auth/" + this.constants.USER_ID)
        .then((res) => { 
          this.user = res;

          if (this.checkRole("editor")) {
            this.$store.dispatch("listArticles");
            this.$store.dispatch("listComments");
            this.$store.dispatch("listOrders");
            this.$store.dispatch("listProducts");
            this.$store.dispatch("listReviews");
          } 

          if (this.checkRole("admin")) {
            this.$store.dispatch("listLinks");
            this.$store.dispatch("listUsers");
          }
        })
        .catch(err => { this.$serve.checkError(err) });

    } else {
      alert(this.constants.ALERT_HOME);
      this.$router.push("/");
    }

    this.$serve.setMeta(
      this.constants.HEAD_ADMIN, 
      this.constants.META_ADMIN,
      this.constants.UI_URL,
      this.constants.UI_URL + this.constants.LOGO_SRC
    );
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
