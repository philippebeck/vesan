<template>
  <main id="admin">
    <CardElt id="top">
      <template #header>
        <h1 class="sky-dark">
          <i class="fa-solid fa-gears fa-2x"
            aria-hidden="true">
          </i>
          {{ val.ADMIN_EDITOR }}
        </h1>
        <p>{{ val.INTRO_ADMIN }}</p>

        <NavElt class="sidebar">
          <template #hide>
            <i class="fa-solid fa-eye fa-fw" 
            :title="val.TITLE_TOGGLE"></i>
          </template>

          <template #first>
            <a v-if="products.length > 0" 
              href="#product"
              :title="val.INTRO_PRODUCTS">
              <i class="fa-regular fa-rectangle-list fa-fw"></i>
            </a>
            <a v-if="orders.length > 0" 
              href="#order"
              :title="val.INTRO_ORDERS">
              <i class="fa-solid fa-gifts fa-fw"></i>
            </a>
            <a v-if="articles.length > 0" 
              href="#article"
              :title="val.INTRO_ARTICLES">
              <i class="fa-regular fa-newspaper fa-fw"></i>
            </a>
            <a v-if="checkSession('admin') && galleries.length > 0"
              href="#gallery"
              :title="val.INTRO_GALLERIES">
              <i class="fa-regular fa-images fa-fw"></i>
            </a>
            <a v-if="checkSession('admin') && images.length > 0"
              href="#image"
              :title="val.INTRO_IMAGES">
              <i class="fa-regular fa-image fa-fw"></i>
            </a>
            <a v-if="checkSession('admin') && links.length > 0"
              href="#link"
              :title="val.INTRO_LINKS">
              <i class="fa-solid fa-link fa-fw"></i>
            </a>
            <a v-if="checkSession('admin')"
              href="#user"
              :title="val.INTRO_USERS">
              <i class="fa-solid fa-users-gear fa-fw"></i>
            </a>
          </template>

          <template #top>
            <i class="fa-solid fa-chevron-circle-up fa-fw" 
              :title="val.TITLE_TOP"></i>
          </template>
        </NavElt>
      </template>

      <template #body>

        <ProductManager v-if="products.length > 0"
          :val="val"
          :products="products"/>

        <OrderManager v-if="orders.length > 0"
          :val="val"
          :orders="orders"
          :users="users"/>

        <ArticleManager v-if="articles.length > 0"
          :articles="articles"
          :val="val"
          :users="users"/>

        <GalleryManager v-if="galleries.length > 0"
          :val="val"
          :galleries="galleries"/>

        <ImageManager v-if="images.length > 0"
          :val="val"
          :galleries="galleries"
          :images="images"/>

        <LinkManager v-if="links.length > 0"
          :val="val"
          :links="links"/>

        <UserManager v-if="users.length > 0"
          :val="val"
          :users="users"/>
      </template>
    </CardElt>
  </main>
</template>

<script>
import CardElt from "@/assets/elements/CardElt"
import NavElt from "@/assets/elements/NavElt"

import ArticleManager from "@/assets/managers/ArticleManager"
import GalleryManager from "@/assets/managers/GalleryManager"
import ImageManager from "@/assets/managers/ImageManager"
import LinkManager from "@/assets/managers/LinkManager"
import OrderManager from "@/assets/managers/OrderManager"
import ProductManager from "@/assets/managers/ProductManager"
import UserManager from "@/assets/managers/UserManager"

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

  props: ["val"],
  data() {
    return {
      user: {}
    }
  },

  created() {
    if (this.val.USER_ID) {
      getData(this.val.API_URL + "/auth/" + this.val.USER_ID)
        .then((res) => { 
          this.user = res;

          if (this.checkSession("editor")) {
            this.$store.dispatch("listArticles");
            this.$store.dispatch("listOrders");
            this.$store.dispatch("listProducts");
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
      alert(this.val.ALERT_HOME);
      this.$router.push("/");
    }

    setMeta(
      this.val.HEAD_ADMIN, 
      this.val.META_ADMIN,
      this.val.UI_URL,
      this.val.UI_URL + this.val.LOGO_SRC
    );
  },

  computed: {
    ...mapState([
      "articles", 
      "galleries", 
      "images", 
      "links", 
      "orders",
      "products", 
      "users"
    ])
  },

  methods: {
    ...mapActions([
      "listArticles", 
      "listGalleries", 
      "listImages", 
      "listLinks", 
      "listOrders", 
      "listProducts", 
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
