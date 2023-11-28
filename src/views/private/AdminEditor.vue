<template>
  <main id="admin">
    <CardElt id="top">
      <template #header>
        <h1 class="sky-dark">
          <i class="fa-solid fa-gears fa-2x"
            aria-hidden="true">
          </i>
          {{ constants.ADMIN_EDITOR }}
        </h1>
        <p>{{ constants.INTRO_ADMIN }}</p>

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

            <a v-if="checkSession('admin') && galleries.length > 0"
              href="#gallery"
              :title="constants.INTRO_GALLERIES">
              <i class="fa-regular fa-images fa-fw"></i>
            </a>
            <a v-if="checkSession('admin') && images.length > 0"
              href="#image"
              :title="constants.INTRO_IMAGES">
              <i class="fa-regular fa-image fa-fw"></i>
            </a>
            <a v-if="checkSession('admin') && links.length > 0"
              href="#link"
              :title="constants.INTRO_LINKS">
              <i class="fa-solid fa-link fa-fw"></i>
            </a>
            <a v-if="checkSession('admin')"
              href="#user"
              :title="constants.INTRO_USERS">
              <i class="fa-solid fa-users-gear fa-fw"></i>
            </a>
          </template>

          <template #top>
            <i class="fa-solid fa-chevron-circle-up fa-fw" 
              :title="constants.TITLE_TOP"></i>
          </template>
        </NavElt>
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

        <ArticleManager v-if="articles.length > 0"
          :articles="articles"
          :constants="constants"
          :users="users"/>

        <CommentManager v-if="comments.length > 0"
          :articles="articles"
          :comments="comments"
          :constants="constants"
          :users="users"/>

        <GalleryManager v-if="galleries.length > 0"
          :constants="constants"
          :galleries="galleries"/>

        <ImageManager v-if="images.length > 0"
          :constants="constants"
          :galleries="galleries"
          :images="images"/>

        <LinkManager v-if="links.length > 0"
          :constants="constants"
          :links="links"/>

        <UserManager v-if="users.length > 0"
          :constants="constants"
          :users="users"/>
      </template>
    </CardElt>
  </main>
</template>

<script>
import ArticleManager from "@/assets/managers/ArticleManager"
import GalleryManager from "@/assets/managers/GalleryManager"
import ImageManager from "@/assets/managers/ImageManager"
import LinkManager from "@/assets/managers/LinkManager"
import OrderManager from "@/assets/managers/OrderManager"
import ProductManager from "@/assets/managers/ProductManager"
import UserManager from "@/assets/managers/UserManager"

import CardElt from "@/assets/elements/CardElt"
import NavElt from "@/assets/elements/NavElt"

import { checkRole, getData, setError, setMeta } from "servidio"
import { mapState, mapActions } from "vuex"

export default {
  name: "AdminEditor",
  components: {
    CardElt,
    NavElt,
    ArticleManager,
    GalleryManager,
    ImageManager,
    LinkManager,
    OrderManager,
    ProductManager,
    UserManager
  },

  props: ["constants"],
  data() {
    return {
      user: {}
    }
  },

  created() {
    if (this.constants.USER_ID) {
      getData(this.constants.API_URL + "/auth/" + this.constants.USER_ID)
        .then((res) => { 
          this.user = res;

          if (this.checkSession("editor")) {
            this.$store.dispatch("listArticles");
            this.$store.dispatch("listComments");
            this.$store.dispatch("listOrders");
            this.$store.dispatch("listProducts");
            this.$store.dispatch("listReviews");
          } 

          if (this.checkSession("admin")) {
            this.$store.dispatch("listGalleries");
            this.$store.dispatch("listImages");
            this.$store.dispatch("listLinks");
            this.$store.dispatch("listUsers");
          }
        })
        .catch(err => { setError(err) });

    } else {
      alert(this.constants.ALERT_HOME);
      this.$router.push("/");
    }

    setMeta(
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
      "galleries", 
      "images", 
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
      "listGalleries", 
      "listImages", 
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
    checkSession(role) {
      return checkRole(this.user.role, role);
    }
  }
}
</script>
