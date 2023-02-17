<template>
  <NavElt :items="setCats"
    class="sidebar">

    <template #last v-if="checkRole('editor')">
      <a href="#create-product"
        title="Create an product">
        <i class="fa-solid fa-basket-shopping fa-fw"></i>
      </a>
    </template>

    <template #top>
      <i class="fa-solid fa-chevron-circle-up fa-fw"></i>
    </template>
  </NavElt>

  <CardElt id="top">
    <template #header>
      <i class="blue anima-openX fa-solid fa-shop fa-4x"></i>
      <h1 class="sky anima-openY">Shop</h1>
      <b>Products to buy !</b>
    </template>

    <template #body>
      <ListElt :items="sortItemsByCat(products)"
        :dynamic="true">

        <template #items="slotProps">
          <h2 :id="slotProps.item[0].cat"
            class="anima-openX">
            {{ slotProps.item[0].cat }}
          </h2>
        </template>

        <template #nested="slotProps">

          <CardElt itemscope
            itemtype="https://schema.org/Product">
            <template #header>
                <h3 itemprop="name">
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
                :title="`Read reviews about ${slotProps.value.name}`">
                <template #btn>
                  <b itemprop="ratingValue">
                    {{ calculateScoresAverage(slotProps.value._id) }}
                  </b> <i class="fa-solid fa-star"></i>
                </template>
              </BtnElt>

              <BtnElt v-else-if="checkRole('user')" 
                :href="`product/${slotProps.value._id}#review`"
                class="btn-violet"
                content="Write a Review"
                :title="`Be the first to write a review about ${slotProps.value.name}`" />

              <BtnElt v-else 
                href="/login"
                class="btn-violet"
                content="Login to write a review"
                :title="`Be the first to write a Review about ${slotProps.value.name}`" />

              <a :href="`product/${slotProps.value._id}`"
                itemprop="url"
                :title="`Watch ${slotProps.value.name}`">

                <MediaElt :id="`${slotProps.value.name.toLowerCase()}-${slotProps.value.cat.toLowerCase()}`"
                  :src="`img/thumbnails/products/${slotProps.value.image}`" 
                  :alt="`${slotProps.value.description}`" 
                  itemprop="image">

                  <template #figcaption>
                    <p itemprop="description">
                      {{ slotProps.value.description }}
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
      <CreateProduct />
    </template>
  </CardElt>
</template>

<script>
import { mapState, mapActions } from "vuex"
import CreateProduct from "@/components/creators/CreateProduct"
import constants from "/constants"

export default {
  name: "ShopView",
  components: {
    CreateProduct
  },

  data() {
    return {
      scores: [],
      priceCurrency: "",
      userId: null
    }
  },

  mounted () {
    this.priceCurrency = constants.CURRENCY_ISO;

    this.$store.dispatch("listProducts");
    this.$store.dispatch("listReviews");
    this.$store.dispatch("checkUsers");
  },

  computed: {
    ...mapState([
      "user",
      "products", 
      "reviews", 
      "users"
    ]),

    /**
     * SET CATEGORIES
     * @returns
     */
    setCats() {
      return this.$serve.setCats(this.products);
    }
  },

  methods: {
    ...mapActions([
      "checkUsers", 
      "listProducts", 
      "listReviews"
    ]),

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
