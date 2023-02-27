<template>
  <NavElt :items="setCats"
    class="sidebar">

    <template #last v-if="checkRole('editor')">
      <a href="#create-product"
        :title="constants.CREATE_PRODUCT">
        <i class="fa-solid fa-basket-shopping fa-fw"></i>
      </a>
    </template>

    <template #top>
      <i class="fa-solid fa-chevron-circle-up fa-fw"></i>
    </template>
  </NavElt>

  <CardElt id="top">
    <template #header>
      <h1 class="sky anima-openY">
        <i class="fa-solid fa-shop fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.SHOP_TITLE }}
      </h1>
      <b>{{ constants.SHOP_INTRO }}</b>
    </template>

    <template #body>
      <ListElt :items="sortItemsByCat(products)"
        :dynamic="true">

        <template #items="slotProps">
          <h2 :id="slotProps.item[0].cat"
            class="blue anima-openX">
            {{ slotProps.item[0].cat }}
          </h2>
        </template>

        <template #nested="slotProps">

          <CardElt itemscope
            itemtype="https://schema.org/Product">
            <template #header>
                <h3 itemprop="name"
                  class="sky">
                  {{ slotProps.value.name }}
                </h3>
            </template>

            <template #body>
              <BtnElt v-if="calculateScoresAverage(slotProps.value._id) !== undefined"
                :href="`product/${slotProps.value._id}#reviews`"
                itemprop="aggregateRating"
                itemscope
                itemtype="https://schema.org/AggregateRating"
                class="btn-violet"
                :title="constants.REVIEW_READ + slotProps.value.name">

                <template #btn>
                  <b itemprop="ratingValue">
                    {{ calculateScoresAverage(slotProps.value._id) }}
                  </b> <i class="fa-solid fa-star"></i>
                </template>
              </BtnElt>

              <BtnElt v-else-if="checkRole('user')" 
                :href="`product/${slotProps.value._id}#review`"
                class="btn-violet"
                :content="constants.REVIEW_WRITE"
                :title="constants.REVIEW_FIRST + slotProps.value.name" />

              <BtnElt v-else 
                href="/login"
                class="btn-violet"
                :content="constants.REVIEW_LOGIN"
                :title="constants.REVIEW_FIRST + slotProps.value.name" />

              <a :href="`product/${slotProps.value._id}`"
                itemprop="url"
                :title="constants.WATCH + slotProps.value.name">

                <MediaElt :id="`${slotProps.value.name.toLowerCase()}-${slotProps.value.cat.toLowerCase()}`"
                  :src="`img/thumbnails/products/${slotProps.value.image}`" 
                  :alt="`${slotProps.value.description}`" 
                  itemprop="image">

                  <template #figcaption>
                    <p v-html="slotProps.value.description.slice(0, 40)"
                      itemprop="description"
                      class="monospace">
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

    <template #aside v-if="checkRole('editor')">
      <ProductCreator :constants="constants"/>
    </template>
  </CardElt>
</template>

<script>
import { mapState, mapActions } from "vuex"
import ProductCreator from "@/components/creators/ProductCreator"

export default {
  name: "ShopView",
  components: {
    ProductCreator
  },
  props: ["constants"],

  data() {
    return {
      scores: [],
      priceCurrency: ""
    }
  },

  mounted () {
    this.priceCurrency = this.constants.CURRENCY_ISO;

    this.$store.dispatch("listProducts");
    this.$store.dispatch("listReviews");
  },

  computed: {
    ...mapState(["products", "reviews", "user"]),

    /**
     * SET CATEGORIES
     * @returns
     */
    setCats() {
      return this.$serve.setCats(this.products);
    }
  },

  methods: {
    ...mapActions(["listProducts", "listReviews"]),

    /**
     * CHECK ROLE
     * @param {string} role
     * @returns
     */
    checkRole(role) {
      return this.$serve.checkRole(this.user.role, role);
    },

    /**
     * SORT ITEMS BY CATEGORY
     * @param {array} items 
     */
    sortItemsByCat(items) {
      return this.$serve.sortItemsByCat(items);
    },

    /** 
     * CALCULATE SCORES AVERAGE
     * @returns
     */
    calculateScoresAverage(productId) {
      let sumData     = {};
      let averageData = [];

      for (let review of this.reviews) {

        if (sumData[review.product]) {
          sumData[review.product].sum += review.score;
          sumData[review.product].n++;

        } else {
          sumData[review.product] = {
            sum: review.score,
            n: 1
          };
        }
      }

      for (let element of Object.keys(sumData)) {
          averageData.push({
            product: element,
              score: sumData[element].sum / sumData[element].n
          });
      }

      for (let data of averageData) {
        if (productId === data.product) {

          return data.score;
        }
      }
    }
  }
}
</script>
