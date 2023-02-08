<template>
  <NavElt
    type="sidebar"
    :items="setCats"
    class="sidebar">

    <template #last v-if="checkSession('author')">
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

          <BtnElt v-if="calculateScoresAverage(slotProps.value._id) !== undefined"
            :href="`product/${slotProps.value._id}#reviews`"
            class="btn-violet"
            :title="`Read reviews about ${slotProps.value.name}`">
            <template #btn>
              {{ calculateScoresAverage(slotProps.value._id) }}
              <i class="fa-solid fa-star"></i>
            </template>
          </BtnElt>

          <BtnElt v-else-if="userId" 
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
            :title="`Watch ${slotProps.value.name}`">
            <MediaElt :src="`img/thumbnails/products/${slotProps.value.image}`" 
              :alt="`${slotProps.value.description}`" 
              :id="`${slotProps.value.name.toLowerCase()}-${slotProps.value.cat.toLowerCase()}`">

              <template #figcaption>
                <h3>{{ slotProps.value.name }}</h3>
                <p>{{ slotProps.value.description }}</p>
                <b>{{ slotProps.value.price }} €</b>
              </template>

            </MediaElt>
          </a>
        </template>

      </ListElt>
    </template>

    <template #aside v-if="checkSession('author')">
      <CreateProduct />
    </template>
  </CardElt>
</template>

<script>
import CreateProduct from "@/components/creators/CreateProduct"

export default {
  name: "ShopView",
  components: {
    CreateProduct
  },

  data() {
    return {
      products: [],
      reviews: [],
      scores: [],
      users: [],
      userId: null
    }
  },

  mounted () {
    this.$serve.getData("/api/users/check")
      .then(res => { this.users = res })
      .catch(err => { console.log(err) });

    this.$serve.getData("/api/products")
      .then(res => { this.products = res })
      .catch(err => { console.log(err) });

    this.$serve.getData("/api/reviews")
      .then(res => { this.reviews = res })
      .catch(err => { console.log(err) });
  },

  computed: {
    /**
     * SET CATEGORIES
     * @returns
     */
    setCats() {
      return this.$serve.setCats(this.products);
    }
  },

  methods: {
    /**
     * CHECK SESSION
     * @param {string} role
     * @returns
     */
    checkSession(role) {
      return this.$serve.checkSession(this.users, role);
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
