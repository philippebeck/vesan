<template>
  <main>
    <NavElt :items="getCategories"
      class="sidebar">
      <template #hide>
        <i class="fa-solid fa-eye fa-fw" 
        :title="constants.TITLE_TOGGLE"></i>
      </template>

      <template #first>
        <a href="/basket"
          :title="constants.TITLE_BASKET">
          <i class="fa-solid fa-basket-shopping fa-fw"></i>
        </a>
      </template>

      <template #last v-if="checkSession('editor')">
        <a href="#create-product"
          :title="constants.PRODUCT_CREATOR">
          <i class="fa-regular fa-lightbulb fa-fw"></i>
        </a>
      </template>

      <template #top>
        <i class="fa-solid fa-chevron-circle-up fa-fw" 
          :title="constants.TITLE_TOP"></i>
      </template>
    </NavElt>

    <CardElt id="top"
      :isArticle="true"
      class="container-90md-80lg-70wd">
      <template #header>
        <h1 class="sky-dark">
          <i class="fa-solid fa-store fa-lg"
            aria-hidden="true">
          </i>
          {{ constants.SHOP_VIEW }}
        </h1>
        <b>{{ constants.INTRO_PRODUCT }}</b>
      </template>

      <template #body>
        <ListElt :items="getItemsByCategory(products)"
          :dynamic="true">

          <template #items="slotProps">
            <h2 :id="slotProps.item[0].cat"
              class="sky-dark ani-turn3D-loop-altrev-into">
              {{ slotProps.item[0].cat }}
            </h2>
          </template>

          <template #nested="slotProps">

            <CardElt itemscope
              itemtype="https://schema.org/Product">
              <template #header>
                  <h3 itemprop="name"
                    class="sky-dark">
                    {{ slotProps.value.name }}
                  </h3>
              </template>

              <template #body>
                <a :href="`product/${slotProps.value.id}`"
                  itemprop="url"
                  :title="constants.TITLE_WATCH + slotProps.value.name">

                  <MediaElt :id="`${slotProps.value.name.toLowerCase()}-${slotProps.value.cat.toLowerCase()}`"
                    :src="`img/thumbnails/products/${slotProps.value.image}`" 
                    :alt="`${slotProps.value.alt}`" 
                    :width="constants.THUMB_WIDTH"
                    :height="constants.THUMB_HEIGHT"
                    itemprop="image">

                    <template #figcaption>
                      <p v-html="slotProps.value.description.split(':')[0]"
                        class="monospace figcaption">
                      </p>

                      <p itemprop="offers"
                        itemscope
                        itemtype="https://schema.org/Offer">
                        <b itemprop="price">
                          {{ slotProps.value.price }}
                        </b> <b itemprop="priceCurrency">
                          {{ this.priceCurrency }}
                        </b>
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
        <ProductCreator :constants="constants"/>
      </template>
    </CardElt>
  </main>
</template>

<script>
import ProductCreator from "@/assets/creators/ProductCreator"
import CardElt from "@/assets/elements/CardElt"
import ListElt from "@/assets/elements/ListElt"
import MediaElt from "@/assets/elements/MediaElt"
import NavElt from "@/assets/elements/NavElt"

import { checkRole, getCats, getItemsByCat, setMeta } from "servidio"
import { mapState, mapActions } from "vuex"

export default {
  name: "ShopView",
  components: {
    CardElt,
    ListElt,
    MediaElt,
    NavElt,
    ProductCreator
  },
  props: ["constants", "user"],

  data() {
    return {
      scores: [],
      priceCurrency: ""
    }
  },

  created() {
    this.$store.dispatch("listProducts");

    setMeta(
      this.constants.HEAD_SHOP, 
      this.constants.META_SHOP,
      this.constants.UI_URL + "/shop",
      this.constants.UI_URL + this.constants.LOGO_SRC
    );

    this.priceCurrency = this.constants.CURRENCY_ISO;
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
     * SET CATEGORIES
     * @returns
     */
    getCategories() {
      return getCats(this.products);
    }
  },

  methods: {
    ...mapActions(["listProducts"]),

    /**
     * CHECK ROLE
     * @param {string} role
     * @returns
     */
    checkSession(role) {
      return checkRole(this.user.role, role);
    },

    /**
     * SORT ITEMS BY CATEGORY
     * @param {array} items 
     */
    getItemsByCategory(items) {
      return getItemsByCat(items);
    }
  }
}
</script>
