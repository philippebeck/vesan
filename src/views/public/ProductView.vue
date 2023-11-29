<template>
  <main>
    <CardElt itemscope
      itemtype="https://schema.org/Product">
      <template #header>
        <h1 itemprop="name">{{ product.name }}</h1>
        <strong itemprop="category">{{ product.cat }}</strong>
      </template>

      <template #body>
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
      </template>
    </CardElt>
  </main>
</template>

<script>
import BtnElt from "@/assets/elements/BtnElt"
import CardElt from "@/assets/elements/CardElt"
import FieldElt from "@/assets/elements/FieldElt"
import MediaElt from "@/assets/elements/MediaElt"

import { checkRole, getData, setError, setMeta } from "servidio"

export default {
  name: "ProductView",
  components: {
    BtnElt,
    CardElt,
    FieldElt,
    MediaElt
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
    getData(this.constants.API_URL + "/products/" + this.$route.params.id)
      .then((product => {
        this.product = product;

        setMeta(
          product.name + this.constants.HEAD, 
          (product.description || "").slice(0, 160).replace(/(<([^>]+)>)/gi, ""),
          this.constants.UI_URL + "/product/" + product._id,
          this.constants.UI_URL + "/img/thumbnails/products/" + product.image
        );
      }))
      .catch(err => { 
        setError(err);
        this.$router.push("/shop");
      });

    this.priceCurrency = this.constants.CURRENCY_ISO;
  },

  updated() {
    if (document.getElementById("figcaption")) {
      const descriptionElt = document.getElementById("figcaption");
      descriptionElt.firstChild.setAttribute("itemprop", "description");
    }
  },

  methods: {
    /**
     * CHECK SESSION
     * @param {string} role
     * @returns
     */
    checkSession(role) {
      return checkRole(this.user.role, role);
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
