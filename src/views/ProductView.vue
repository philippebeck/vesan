<template>
  <CardElt>
    <template #header>
      <h1>{{ product.name }}</h1>
      <strong>{{ product.cat }}</strong>
    </template>

    <template #body>
      <BtnElt v-if="calculateScoresAverage(product._id) !== undefined" 
        href="#reviews"
        class="btn-violet"
        :title="`Read Reviews about ${product.name}`">
        <template #btn>
          {{ calculateScoresAverage(product._id) }}
        <i class="fa-solid fa-star fa-lg"></i>
        </template>
      </BtnElt>

      <BtnElt v-else 
        href="#review"
        class="btn-violet"
        content="Need a Review !"
        :title="`Be the first to write a Review about ${product.name}`" />

      <MediaElt :src="`/img/products/${product.image}`"
        :alt="product.alt">

        <template #figcaption>
          <p>{{ product.description }}</p>
          <b>{{ product.price }} €</b>

          <p class="silver">
            Created: {{ new Date(product.created).toLocaleDateString() }}
            (Updated: {{ new Date(product.updated).toLocaleDateString() }})
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

      <ListReviews v-if="reviews.length > 0"
        id="reviews"
        :reviews="getProductReviews()"
        :users="users"/>
    </template>

    <template #aside  v-if="userId">
      <CreateReview id="review"/>
    </template>
  </CardElt>
</template>

<script>
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
      product: {},
      reviews: [],
      users: [],
      option: "",
      quantity: 1,
      order: {},
      basket: [],
      isInBasket: false,
      userId: null
    }
  },

  mounted () {
    this.$serve.getData(`/api/products/${this.$route.params.id}`)
      .then(res => { this.product = res })
      .catch(err => { console.log(err) });

    this.$serve.getData("/api/reviews")
      .then(res => { this.reviews = res })
      .catch(err => { console.log(err) });

    this.$serve.getData("/api/users/check")
      .then(res => { this.users = res })
      .catch(err => { console.log(err) });

    if (localStorage.userId) {
      this.userId = JSON.parse(localStorage.userId);
    }
  },

  methods: {
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
        name: this.product.name,
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
    }
  }
}
</script>
