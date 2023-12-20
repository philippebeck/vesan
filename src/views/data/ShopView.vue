<template>
  <main>
    <NavElt :items="getCategories" class="sidebar">
      <template #hide>
        <i class="fa-solid fa-eye fa-fw" :title="val.TITLE_TOGGLE"></i>
      </template>

      <template #first>
        <a href="/basket" :title="val.TITLE_BASKET">
          <i class="fa-solid fa-basket-shopping fa-fw"></i>
        </a>
      </template>

      <template #last v-if="checkSession('editor')">
        <a href="#product-set" :title="val.PRODUCT_CREATOR">
          <i class="fa-regular fa-lightbulb fa-fw"></i>
        </a>
      </template>

      <template #top>
        <i class="fa-solid fa-chevron-circle-up fa-fw" :title="val.TITLE_TOP"></i>
      </template>
    </NavElt>

    <CardElt id="top" :isArticle="true" class="container-90md-80lg-70wd">
      <template #header>
        <h1 class="sky-dark">
          <i class="fa-solid fa-store fa-lg"></i> {{ val.SHOP_VIEW }}
        </h1>
        <b>{{ val.INTRO_PRODUCT }}</b>
      </template>

      <template #body>
        <ListElt :items="getItemsByCategory(products)" :dynamic="true">
          <template #items="slotProps">
            <h2 :id="slotProps.item[0].cat" class="sky-dark ani-turn3D-loop-altrev-into">
              {{ slotProps.item[0].cat }}
            </h2>
          </template>

          <template #nested="slotProps">
            <CardElt itemscope itemtype="https://schema.org/Product">
              <template #header>
                  <h3 itemprop="name" class="sky-dark">{{ slotProps.value.name }}</h3>
              </template>

              <template #body>
                <a :href="`product/${slotProps.value.id}`"
                  itemprop="url"
                  :title="val.TITLE_WATCH + slotProps.value.name">

                  <MediaElt :id="`${slotProps.value.name.toLowerCase()}-${slotProps.value.cat.toLowerCase()}`"
                    :src="`img/thumbnails/products/${slotProps.value.image}`" 
                    :alt="`${slotProps.value.alt}`" 
                    :width="val.THUMB_WIDTH"
                    :height="val.THUMB_HEIGHT"
                    itemprop="image">

                    <template #figcaption>
                      <p v-html="slotProps.value.description.split(':')[0]" class="monospace figcaption"></p>
                      <p itemprop="offers" itemscope itemtype="https://schema.org/Offer">
                        <b itemprop="price">{{ slotProps.value.price }}</b>
                        <b itemprop="priceCurrency">{{ this.priceCurrency }}</b>
                      </p>
                    </template>
                  </MediaElt>
                </a>
              </template>
            </CardElt>
          </template>
        </ListElt>
      </template>

      <template #aside v-if="checkSession('editor')">
        <ProductSet :val="val"/>
      </template>
    </CardElt>
  </main>
</template>

<script>
import { checkRole, getCats, getItemsByCat, setMeta } from "servidio"
import { mapState, mapActions } from "vuex"

import CardElt from "@/assets/elements/CardElt"
import ListElt from "@/assets/elements/ListElt"
import MediaElt from "@/assets/elements/MediaElt"
import NavElt from "@/assets/elements/NavElt"
import ProductSet from "@/assets/setters/ProductSet"

export default {
  name: "ShopView",
  components: { CardElt, ListElt, MediaElt, NavElt, ProductSet },
  props: ["val", "user"],
  data() {
    return {
      scores: [],
      priceCurrency: ""
    }
  },

  created() {
    const { CURRENCY_ISO, HEAD_SHOP, LOGO_SRC, META_SHOP, UI_URL } = this.val;
    this.$store.dispatch("listProducts");

    setMeta(HEAD_SHOP, META_SHOP, `${UI_URL}/shop`, UI_URL + LOGO_SRC);
    this.priceCurrency = CURRENCY_ISO;
  },

  updated() {
    const descriptionArray = document.getElementsByClassName("figcaption");

    for (let descriptionElt of descriptionArray) {
      descriptionElt.firstChild.setAttribute("itemprop", "description");
    }
  },

  computed: {
    ...mapState(["products"]),

    /**
     * ? GET CATEGORIES
     * * Retrieves the categories of the products.
     * @return {type} The categories of the products.
     */
    getCategories() {
      return getCats(this.products);
    }
  },

  methods: {
    ...mapActions(["listProducts"]),

    /**
     * ? CHECK SESSION
     * * Check the session for the given role.
     * @param {string} role - The role to check.
     * @return {boolean} The result of the session check.
     */
    checkSession(role) {
      return checkRole(this.user.role, role);
    },

    /**
     * ? GET ITEMS BY CATEGORY
     * * Retrieves items by category.
     * @param {Array} items - The array of items.
     * @return {Array} The items filtered by category.
     */
    getItemsByCategory(items) {
      return getItemsByCat(items);
    }
  }
}
</script>
