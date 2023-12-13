<template>
  <main>
    <CardElt itemscope itemtype="https://schema.org/Product">
      <template #header>
        <h1 itemprop="name">{{ product.name }}</h1>
        <strong itemprop="category">{{ product.cat }}</strong>
      </template>

      <template #body>
        <MediaElt v-if="product.image"
          :src="`/img/products/${product.image}`"
          :alt="product.alt"
          :width="val.IMG_WIDTH"
          :height="val.IMG_HEIGHT"
          itemprop="image">

          <template #figcaption>
            <p id="figcaption" v-html="product.description"></p>
            <p itemprop="offers" itemscope itemtype="https://schema.org/Offer">
              <b itemprop="price">{{ product.price }}</b>
              <b itemprop="priceCurrency">{{ this.priceCurrency }}</b>
            </p>
          </template>
        </MediaElt>

        <form>
          <FieldElt id="basket-option"
            type="select"
            :list="product.options"
            v-model:value="option"
            @keyup.enter="addToBasket()"
            :info="val.INFO_OPTION">
            <template #legend>{{ val.LEGEND_OPTION }}</template>
            <template #label>{{ val.LABEL_OPTION }}</template>
          </FieldElt>

          <FieldElt id="basket-quantity"
            type="number"
            v-model:value="quantity"
            @keyup.enter="addToBasket()"
            :info="val.INFO_QUANTITY"
            :min="1">
            <template #legend>{{ val.LEGEND_QUANTITY }}</template>
            <template #label>{{ val.LABEL_QUANTITY }}</template>
          </FieldElt>

          <BtnElt type="button"
            @click="addToBasket()"
            class="btn-green width-sm"
            :content="val.CONTENT_ADD"
            :title="val.CONTENT_ADD + product.name">
            <template #btn>
              <i class="fa-solid fa-basket-shopping fa-lg"></i>
            </template>
          </BtnElt>
        </form>
      </template>
    </CardElt>

    <CardElt v-if="checkSession('editor')">
      <template #header>
        <h2>{{ val.EDIT }} {{ product.name }}</h2>
      </template>

      <template #body>
        <form enctype="multipart/form-data">
          <ListElt :items="val.PRODUCT_FORM">

            <template #item-1>
              <FieldElt v-model:value="product.name"
                @keyup.enter="updateProduct()"
                :info="val.INFO_NAME"
                :min="2">
                <template #legend>{{ val.LEGEND_NAME }}</template>
                <template #label>{{ val.LABEL_NAME }}</template>
              </FieldElt>
            </template>

            <template #item-2>
              <label for="description">{{ val.LEGEND_DESCRIPTION }}</label>
              <Editor id="description"
                :api-key="val.TINY_KEY"
                v-model="product.description"
                :init="{ toolbar:
                  'undo redo outdent indent align lineheight | \
                  bold italic underline strikethrough backcolor | \
                  blocks fontfamily fontsize'
                }"/>
            </template>

            <template #item-3>
              <MediaElt v-if="product.image"
                :src="'/img/thumbnails/products/' + product.image"
                :alt="product.alt" />

              <FieldElt id="image"
                type="file"
                v-model:value="image"
                :info="val.INFO_IMAGE">
                <template #legend>{{ val.LEGEND_IMAGE }}</template>
                <template #label>{{ val.LABEL_IMAGE }}</template>
              </FieldElt>
            </template>

            <template #item-4>
              <FieldElt type="textarea"
                v-model:value="product.alt"
                :info="val.INFO_ALT">
                <template #legend>{{ val.LEGEND_ALT }}</template>
                <template #label>{{ val.LABEL_ALT }}</template>
              </FieldElt>
            </template>

            <template #item-5>
              <FieldElt type="number"
                v-model:value="product.price"
                @keyup.enter="updateProduct()"
                :info="val.INFO_PRICE"
                :min="1"
                :max="1000">
                <template #legend>{{ val.LEGEND_PRICE }}</template>
                <template #label>{{ val.LABEL_PRICE }}</template>
              </FieldElt>
            </template>

            <template #item-6>
              <FieldElt type="textarea"
                v-model:value="product.options"
                @keyup.enter="updateProduct()"
                :info="val.INFO_OPTIONS"
                :max="100">
                <template #legend>{{ val.LEGEND_OPTIONS }}</template>
                <template #label>{{ val.LABEL_OPTIONS }}</template>
              </FieldElt>
            </template>

            <template #item-7>
              <FieldElt type="select"
                :list="val.CATS_PRODUCT"
                v-model:value="product.cat"
                @keyup.enter="updateProduct()"
                :info="val.INFO_CATEGORY">
                <template #legend>{{ val.LEGEND_CATEGORY }}</template>
                <template #label>{{ val.LABEL_CATEGORY }}</template>
              </FieldElt>
            </template>
          </ListElt>

          <BtnElt type="button"
            @click="updateProduct()" 
            class="btn-sky"
            :content="val.CONTENT_UPDATE"
            :title="val.TITLE_UPDATE + product.name">
            <template #btn>
              <i class="fa-solid fa-cloud-arrow-up fa-lg"></i>
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
import ListElt from "@/assets/elements/ListElt"
import MediaElt from "@/assets/elements/MediaElt"

import Editor from "@tinymce/tinymce-vue"

import { checkRange, checkRole, getData, putData, setError, setMeta } from "servidio"

export default {
  name: "ProductView",
  components: {
    BtnElt,
    CardElt,
    FieldElt,
    ListElt,
    MediaElt,
    Editor
  },
  props: ["val", "user"],

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
    getData(this.val.API_URL + "/products/" + this.$route.params.id)
      .then((product => {
        this.product = product;

        setMeta(
          product.name + this.val.HEAD, 
          (product.description || "").slice(0, 160).replace(/(<([^>]+)>)/gi, ""),
          this.val.UI_URL + "/product/" + product.id,
          this.val.UI_URL + "/img/thumbnails/products/" + product.image
        );
      }))
      .catch(err => { 
        setError(err);
        this.$router.push("/shop");
      });

    this.priceCurrency = this.val.CURRENCY_ISO;
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
        alert(this.val.ALERT_OPTION);
      }
    },

    /**
     * CREATE ORDER
     */
    createOrder() {
      this.order = {
        id: this.product.id,
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
      alert(`${this.order.quantity} "${this.product.name}" (${this.order.option}) ${this.val.ALERT_BASKET_ADDED}`);

      this.$router.push("/shop");
    },

    /**
     * UPDATE PRODUCT
     */
    updateProduct() {
      const PRICE_MAX  = this.val.PRICE_MAX;
      const PRICE_MIN  = this.val.PRICE_MIN;
      const PRICE_MSG  = this.val.CHECK_NUMBER;
      const STRING_MSG = this.val.CHECK_STRING;
      const TEXT_MAX   = this.val.TEXT_MAX;
      const TEXT_MIN   = this.val.TEXT_MIN;

      if (checkRange(this.product.name, STRING_MSG) && 
          checkRange(this.product.description, STRING_MSG, TEXT_MIN, TEXT_MAX) && 
          checkRange(this.product.alt, STRING_MSG) && 
          checkRange(this.product.price, PRICE_MSG, PRICE_MIN, PRICE_MAX) && 
          checkRange(this.product.options, STRING_MSG, TEXT_MIN, TEXT_MAX)) {

        let data  = new FormData();
        let image = document.getElementById("image").files[0] ?? this.product.image;

        data.append("name", this.product.name);
        data.append("description", this.product.description);
        data.append("image", image);
        data.append("alt", this.product.alt);
        data.append("price", this.product.price);
        data.append("options", this.product.options);
        data.append("cat", this.product.cat);
        data.append("created", this.product.created);

        putData(this.val.API_URL + "/products/" + this.product.id, data)
          .then(() => {
            alert(this.product.name + this.val.ALERT_UPDATED);
            this.$router.push("/admin");
          })
          .catch(err => { setError(err) });
      }
    }
  }
}
</script>
