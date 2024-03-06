<template>
  <main id="top">
    <NavElt :items="getCategories" class="sidebar">
      <template #hide>
        <i class="fa-solid fa-eye fa-fw" :title="val.TITLE_TOGGLE"></i>
      </template>

      <template #last v-if="checkSession('admin')">
        <a href="#product-set" :title="val.PRODUCT_MANAGER">
          <i class="fa-regular fa-lightbulb fa-fw"></i>
        </a>
      </template>

      <template #top>
        <i class="fa-solid fa-chevron-circle-up fa-fw" :title="val.TITLE_TOP"></i>
      </template>
    </NavElt>

    <CardElt :isArticle="true" class="container-90sm-80lg">
      <template #header>
        <h1 class="sky-dark"><i class="fa-solid fa-store fa-lg"></i> {{ val.SHOP_VIEW }}</h1>
        <b>{{ val.INTRO_PRODUCT }}</b>
        <br />
        <i>{{ val.INFO_PRODUCT }}</i>
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
                <a
                  :href="`product/${slotProps.value.id}`"
                  itemprop="url"
                  :title="val.TITLE_WATCH + slotProps.value.name"
                >
                  <MediaElt
                    :id="`${slotProps.value.name.toLowerCase()}-${slotProps.value.cat.toLowerCase()}`"
                    :src="`img/thumbnails/products/${slotProps.value.image}`"
                    :alt="`${slotProps.value.alt}`"
                    :width="val.THUMB_WIDTH"
                    :height="val.THUMB_HEIGHT"
                    itemprop="image"
                  >
                  </MediaElt>

                  <p
                    v-html="slotProps.value.description.split(':')[0]"
                    itemprop="description"
                    class="shop"
                  ></p>

                  <p itemprop="offers" itemscope itemtype="https://schema.org/Offer">
                    <b itemprop="price" :content="slotProps.value.price + '.00'">
                      {{ slotProps.value.price }}
                    </b>
                    <i itemprop="priceCurrency" :content="val.CURRENCY_ISO">
                      {{ val.CURRENCY_SYMBOL }}
                    </i>
                  </p>
                </a>
              </template>
            </CardElt>
          </template>
        </ListElt>
      </template>

      <template #aside v-if="checkSession('admin')">
        <ProductSet :token="token" :val="val" />
      </template>
    </CardElt>
  </main>
</template>

<script lang="ts">
import CardElt from '../components/CardElt.vue'
import ListElt from '../components/ListElt.vue'
import MediaElt from '../components/MediaElt.vue'
import NavElt from '../components/NavElt.vue'
import ProductSet from '../components/ProductSet.vue'

import { checkRole, getCats, getItemsByCat, setMeta } from '../assets/services'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ShopView',
  components: { CardElt, ListElt, MediaElt, NavElt, ProductSet },
  props: ['avatar', 'val'],

  /**
   * ? CREATED
   * * Retrieves the products from the server.
   * * Sets the meta tags.
   */
  created(): void {
    const { HEAD_SHOP, LOGO_SRC, META_SHOP, UI_URL }: ValType = this.val

    this.$store.dispatch('listProducts')
    setMeta(HEAD_SHOP, META_SHOP, `${UI_URL}/shop`, `${UI_URL}${LOGO_SRC}`)
  },

  /**
   * ? UPDATED
   * * Sets the itemprop of the description elements.
   */
  updated(): void {
    const descriptionArray: HTMLCollectionOf<HTMLElement> =
      document.getElementsByClassName('figcaption')

    for (let descriptionElt of descriptionArray) {
      ;(descriptionElt.firstChild as HTMLElement).setAttribute('itemprop', 'description')
    }
  },

  computed: {
    ...mapState(['products', 'token']),

    /**
     * ? GET CATEGORIES
     * * Retrieves the categories of the products.
     *
     * @param {Array<Product>} products - The array of products.
     * @return {Array<Category>} The categories of the products.
     */
    getCategories(products: Array<Product>): Array<Category> {
      return getCats(products)
    }
  },

  methods: {
    ...mapActions(['listProducts']),

    /**
     * ? CHECK SESSION
     * * Check the session for the given role.
     *
     * @param {string} role - The role to check.
     * @return {boolean} The result of the session check.
     */
    checkSession(role: string): boolean {
      return checkRole(this.avatar.role, role)
    },

    /**
     * ? GET ITEMS BY CATEGORY
     * * Retrieves items by category.
     *
     * @param {Array<Item>} items - The array of items.
     * @return {Array<Item>} The items filtered by category.
     */
    getItemsByCategory(items: Array<Item>): Array<Item> {
      return getItemsByCat(items)
    }
  }
}
</script>

<style>
.shop {
  height: 70px;
  max-width: 212px;
}

.shop > * {
  font-size: 2rem;
}

[itemprop='price'] {
  font-size: 2.5rem;
}
</style>
