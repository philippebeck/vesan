<template>
  <CardElt itemscope
    itemtype="https://schema.org/Product">
    <template #header>
      <h1 itemprop="name">{{ product.name }}</h1>
      <strong itemprop="category">{{ product.cat }}</strong>
    </template>

    <template #body>

      <BtnElt v-if="calculateScoresAverage(product._id) !== undefined"
        itemprop="aggregateRating"
        itemscope
        itemtype="https://schema.org/AggregateRating" 
        href="#reviews"
        class="btn-violet"
        :title="`Read Reviews about ${product.name}`">
        <template #btn>
          <b itemprop="ratingValue">
            {{ calculateScoresAverage(product._id) }}
          </b> <i class="fa-solid fa-star fa-lg"></i>
        </template>
      </BtnElt>

      <BtnElt v-else-if="checkSession('user')" 
        href="#review"
        class="btn-violet"
        content="Need a Review !"
        :title="`Be the first to write a Review about ${product.name}`" />

      <BtnElt v-else 
          href="/login"
          class="btn-violet"
          content="Login to write a review"
          :title="`Be the first to write a Review about ${product.name}`" />

      <MediaElt :src="`/img/products/${product.image}`"
        itemprop="image"
        :alt="product.alt">

        <template #figcaption>
          <p itemprop="description">
            {{ product.description }}
          </p>
          <p itemprop="offers"
            itemscope
            itemtype="https://schema.org/Offer">
            <b itemprop="price">
              {{ product.price }}
            </b> <b itemprop="priceCurrency">
              {{ this.priceCurrency }}
            </b>
          </p>
          

          <p class="silver">
            Release on 
            <i itemprop="releaseDate">
              {{ new Date(product.created).toLocaleDateString() }}
            </i>
            / Updated on 
            <i>
              {{ new Date(product.updated).toLocaleDateString() }}
            </i>
          </p>
        </template>
      </MediaElt>

      <form>
        <FieldElt id="basket-option"
          type="select"
          :list="product.options"
          v-model:value="option"
          @keyup.enter="addToBasket()"
          info="Select an option"
          :min="2">
          <template #legend>
            Option
          </template>
          <template #label>
            Indicate the product option
          </template>
        </FieldElt>

        <FieldElt id="basket-quantity"
          type="number"
          v-model:value="quantity"
          @keyup.enter="addToBasket()"
          info="Choose a quantity"
          :min="1">
          <template #legend>
            Quantity
          </template>
          <template #label>
            Indicate the product quantity
          </template>
        </FieldElt>

        <BtnElt type="button"
          @click="addToBasket()"
          content="Add to Basket"
          class="btn-green width-sm"
          :title="`Add ${product.name} to the basket`">
          <template #btn>
            <i class="fa-solid fa-basket-shopping fa-lg"></i>
          </template>
        </BtnElt>
      </form>

      <ListReviews v-if="getProductReviews().length > 0"
        id="reviews"
        :reviews="getProductReviews()"
        :users="users"/>
    </template>

    <template #aside  v-if="checkSession('user')">
      <CreateReview id="review"/>
    </template>
  </CardElt>
</template>

<script>
import constants from "/constants"

import CreateReview from "@/components/creators/CreateReview"
import ListReviews from "@/components/managers/ListReviews"

export default {
  name: "ProductView",

  components: {
    CreateReview,
    ListReviews
  },

  data() {
    return {
      reviews: [],
      users: [],
      basket: [],
      product: {},
      order: {},
      option: "",
      priceCurrency: "",
      quantity: 1,
      isInBasket: false,
      userId: null
    }
  },

  mounted () {
    this.priceCurrency = constants.PRICE_CURRENCY;

    this.$serve.getData(`/api/products/${this.$route.params.id}`)
      .then(res => { this.product = res })
      .catch(err => { console.log(err) });

    this.$serve.getData("/api/reviews")
      .then(res => { this.reviews = res })
      .catch(err => { console.log(err) });

    this.$serve.getData("/api/users/check")
      .then(res => { this.users = res })
      .catch(err => { console.log(err) });
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
    },

    /**
     * GET PRODUCT REVIEWS
     * @returns
     */
    getProductReviews() {
      let productReviews = [];

      for (let i = 0 ; i < this.reviews.length ; i++) {
        if (this.$route.params.id === this.reviews[i].product) {
          productReviews.push(this.reviews[i]);
        }
      }
      return productReviews;
    },

    /**
     * ADD TO BASKET
     */
    addToBasket() {
      this.createOrder();
      this.getBasket();
      this.checkBasket();
      this.setBasket();
    },

    /**
     * CREATE ORDER
     */
    createOrder() {
      this.order = {
        id: this.product._id,
        option: this.option,
        quantity: this.quantity
      };
    },

    /**
     * GET BASKET
     */
    getBasket() {
      if (localStorage.getItem("basket") === null) {
        localStorage.setItem("basket", []);
        this.basket = localStorage.getItem("basket").split();

        } else {
        this.basket = JSON.parse(localStorage.getItem("basket"));
        }
    },

    /**
     * CHECK BASKET
     */
    checkBasket() {
      this.isInBasket = false;

      this.basket = this.basket.map(item => {
        if (item.id === this.order.id && item.option === this.option) {

          item.quantity = Number(item.quantity) + Number(this.quantity);
          this.isInBasket = true;
        }
        return item;
      })
    },

    /**
     * SET BASKET
     */
    setBasket() {
      if (!this.isInBasket) {
          this.basket.push(this.order);
      }

      if (this.basket[0] === "") {
        this.basket.shift();
      }

      localStorage.setItem("basket", JSON.stringify(this.basket));

      alert(`${this.order.quantity} "${this.product.name}" (${this.order.option}) has been added to the Basket !`);

      this.$router.push("/shop");
    }
  }
}
</script>
