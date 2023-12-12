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

    <CardElt v-if="checkSession('editor')"
      id="create-product">
      <template #header>
        <h2>{{ constants.EDIT }} {{ product.name }}</h2>
      </template>

      <template #body>
        <form method="post"
          enctype="multipart/form-data">
          <ListElt :items="constants.PRODUCT_FORM">

            <template #item-1>
              <FieldElt v-model:value="product.name"
                @keyup.enter="updateProduct()"
                :info="constants.INFO_NAME"
                :min="2">

                <template #legend>
                  {{ constants.LEGEND_NAME }}
                </template>
                <template #label>
                  {{ constants.LABEL_NAME }}
                </template>
              </FieldElt>
            </template>

            <template #item-2>
              <label for="description">
                {{ constants.LEGEND_DESCRIPTION }}
              </label>

              <Editor id="description"
                :api-key="constants.TINY_KEY"
                v-model="product.description"
                :init="{
                  toolbar:
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
                :info="constants.INFO_IMAGE">

                <template #legend>
                  {{ constants.LEGEND_IMAGE }}
                </template>
                <template #label>
                  {{ constants.LABEL_IMAGE }}
                </template>
              </FieldElt>
            </template>

            <template #item-4>
              <FieldElt type="textarea"
                v-model:value="product.alt"
                :info="constants.INFO_ALT">

                <template #legend>
                  {{ constants.LEGEND_ALT }}
                </template>
                <template #label>
                  {{ constants.LABEL_ALT }}
                </template>
              </FieldElt>
            </template>

            <template #item-5>
              <FieldElt type="number"
                v-model:value="product.price"
                @keyup.enter="updateProduct()"
                :info="constants.INFO_PRICE"
                :min="1"
                :max="1000">

                <template #legend>
                  {{ constants.LEGEND_PRICE }}
                </template>
                <template #label>
                  {{ constants.LABEL_PRICE }}
                </template>
              </FieldElt>
            </template>

            <template #item-6>
              <FieldElt type="textarea"
                v-model:value="product.options"
                @keyup.enter="updateProduct()"
                :info="constants.INFO_OPTIONS"
                :max="100">

                <template #legend>
                  {{ constants.LEGEND_OPTIONS }}
                </template>
                <template #label>
                  {{ constants.LABEL_OPTIONS }}
                </template>
              </FieldElt>
            </template>

            <template #item-7>
              <FieldElt type="select"
                :list="constants.CATS_PRODUCT"
                v-model:value="product.cat"
                @keyup.enter="updateProduct()"
                :info="constants.INFO_CATEGORY">

                <template #legend>
                  {{ constants.LEGEND_CATEGORY }}
                </template>
                <template #label>
                  {{ constants.LABEL_CATEGORY }}
                </template>
              </FieldElt>
            </template>
          </ListElt>

          <BtnElt type="button"
            @click="updateProduct()" 
            class="btn-sky"
            :content="constants.CONTENT_UPDATE"
            :title="constants.TITLE_UPDATE + product.name">

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
          this.constants.UI_URL + "/product/" + product.id,
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
      alert(`${this.order.quantity} "${this.product.name}" (${this.order.option}) ${this.constants.ALERT_BASKET_ADDED}`);

      this.$router.push("/shop");
    },

    /**
     * UPDATE PRODUCT
     */
    updateProduct() {
      const PRICE_MAX  = this.constants.PRICE_MAX;
      const PRICE_MIN  = this.constants.PRICE_MIN;
      const PRICE_MSG  = this.constants.CHECK_NUMBER;
      const STRING_MSG = this.constants.CHECK_STRING;
      const TEXT_MAX   = this.constants.TEXT_MAX;
      const TEXT_MIN   = this.constants.TEXT_MIN;

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

        putData(this.constants.API_URL + "/products/" + this.product.id, data)
          .then(() => {
            alert(this.product.name + this.constants.ALERT_UPDATED);
            this.$router.push("/admin");
          })
          .catch(err => { setError(err) });
      }
    }
  }
}
</script>
