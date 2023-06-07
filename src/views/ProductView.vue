<template>
  <main>
    <CardElt itemscope
      itemtype="https://schema.org/Product">
      <template #header>
        <h1 itemprop="name">{{ product.name }}</h1>
        <strong itemprop="category">{{ product.cat }}</strong>
      </template>

      <template #body>

        <BtnElt v-if="getScoresAverage(product._id) !== undefined"
          href="#reviews"
          itemprop="aggregateRating"
          itemscope
          itemtype="https://schema.org/AggregateRating" 
          class="btn-violet"
          :title="constants.TITLE_REVIEW_READ + product.name">

          <template #btn>
            <b itemprop="ratingValue">
              {{ getScoresAverage(product._id) }}
            </b> <i class="fa-solid fa-star fa-lg"></i>
          </template>
        </BtnElt>

        <BtnElt v-else-if="checkSession('user')" 
          href="#review"
          class="btn-violet"
          :content="constants.CONTENT_REVIEW_WRITE"
          :title="constants.TITLE_REVIEW_FIRST + product.name" />

        <BtnElt v-else 
            href="/login"
            class="btn-violet"
            :content="constants.CONTENT_REVIEW_LOGIN"
            :title="constants.TITLE_REVIEW_FIRST + product.name" />

        <MediaElt v-if="product.image"
          :src="`/img/products/${product.image}`"
          :alt="product.alt"
          :width="constants.IMG_WIDTH"
          :height="constants.IMG_HEIGHT"
          itemprop="image">

          <template #figcaption>
            <p id="figcaption"
              v-html="product.description">
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
            

            <p class="gray">
              {{ constants.RELEASE_ON }}
              <i itemprop="releaseDate">
                {{ new Date(product.created).toLocaleDateString() }}
              </i>
              / {{ constants.UPDATE_ON }}
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
            :info="constants.INFO_OPTION">

            <template #legend>
              {{ constants.LEGEND_OPTION }}
            </template>
            <template #label>
              {{ constants.LABEL_OPTION }}
            </template>
          </FieldElt>

          <FieldElt id="basket-quantity"
            type="number"
            v-model:value="quantity"
            @keyup.enter="addToBasket()"
            :info="constants.INFO_QUANTITY"
            :min="1">

            <template #legend>
              {{ constants.LEGEND_QUANTITY }}
            </template>
            <template #label>
              {{ constants.LABEL_QUANTITY }}
            </template>
          </FieldElt>

          <BtnElt type="button"
            @click="addToBasket()"
            class="btn-green width-sm"
            :content="constants.CONTENT_ADD"
            :title="constants.CONTENT_ADD + product.name">

            <template #btn>
              <i class="fa-solid fa-basket-shopping fa-lg"></i>
            </template>
          </BtnElt>
        </form>

        <ReviewList v-if="reviews.length > 0"
          id="reviews"
          :constants="constants"
          :reviews="reviews"/>
      </template>

      <template #aside  v-if="checkSession('user')">
        <ReviewCreator id="review"
          :constants="constants"/>
      </template>
    </CardElt>
  </main>
</template>

<script>
import { mapState, mapActions } from "vuex"
import { checkError, checkRole, fetchGet, getAverage, setMeta } from "../assets/serve"

import BtnElt from "../assets/BtnElt"
import CardElt from "../assets/CardElt"
import FieldElt from "../assets/FieldElt"
import MediaElt from "../assets/MediaElt"
import ReviewCreator from "../components/ReviewCreator"
import ReviewList from "../components/ReviewList"

export default {
  name: "ProductView",
  components: {
    BtnElt,
    CardElt,
    FieldElt,
    MediaElt,
    ReviewCreator,
    ReviewList
  },
  props: ["constants", "user"],

  data() {
    return {
      basket: [],
      product: {},
      order: {},
      option: "",
      priceCurrency: "",
      quantity: 1,
      isInBasket: false
    }
  },

  created() {
    let url = this.constants.API_URL + "/products/" + this.$route.params.id;

    fetchGet(url)
      .then((product => {
        this.product = product;

        setMeta(
          product.name + this.constants.HEAD, 
          product.description.slice(0, 160).replace(/(<([^>]+)>)/gi, ""),
          this.constants.UI_URL + "/product/" + product._id,
          this.constants.UI_URL + "/img/thumbnails/products/" + product.image
        );
      }))
      .catch(err => { 
        checkError(err);
        this.$router.push("/shop");
      });

    this.$store.dispatch("listProductReviews", this.$route.params.id);
    this.priceCurrency = this.constants.CURRENCY_ISO;
  },

  updated() {
    if (document.getElementById("figcaption")) {
      const descriptionElt = document.getElementById("figcaption");
      descriptionElt.firstChild.setAttribute("itemprop", "description");
    }
  },

  computed: {
    ...mapState(["reviews"]),
  },

  methods: {
    ...mapActions(["listProductReviews"]),

    /**
     * CHECK SESSION
     * @param {string} role
     * @returns
     */
    checkSession(role) {
      return checkRole(this.user.role, role);
    },

    /** 
     * GET SCORES AVERAGE
     * @param {string} productId
     * @returns
     */
    getScoresAverage(productId) {
      return getAverage(productId, this.reviews);
    },

    /**
     * ADD TO BASKET
     */
    addToBasket() {
      if (this.option !== "") {

        this.createOrder();
        this.getBasket();
        this.checkBasket();
        this.setBasket();

      } else {
        alert(this.constants.ALERT_OPTION);
      }
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
      if (!this.isInBasket) { this.basket.push(this.order) }
      if (this.basket[0] === "") { this.basket.shift() }

      localStorage.setItem("basket", JSON.stringify(this.basket));
      alert(`${this.order.quantity} "${this.product.name}" (${this.order.option}) ${this.constants.ALERT_BASKET_ADDED}`);

      this.$router.push("/shop");
    }
  }
}
</script>
