<template>
  <main>
    <CardElt v-if="checkSession('editor')">
      <template #header>
        <h1>{{ val.EDIT }} {{ product.name }}</h1>
        <h2>{{ product.cat }}</h2>
      </template>

      <template #body>
        <form enctype="multipart/form-data">
          <ListElt :items="val.PRODUCT_FORM">

            <template #item-1="slotProps">
              <FieldElt :id="`name-${slotProps.index.id}`"
                v-model:value="product.name"
                @keyup.enter="updateProduct()"
                :info="val.INFO_NAME"
                :min="2">
                <template #legend>{{ val.LEGEND_NAME }}</template>
                <template #label>{{ val.LABEL_NAME }}</template>
              </FieldElt>
            </template>

            <template #item-2="slotProps">
              <label :for="`description-${slotProps.index.id}`">
                {{ val.LEGEND_DESCRIPTION }}
              </label>

              <Editor :id="`description-${slotProps.index.id}`"
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

            <template #item-4="slotProps">
              <FieldElt :id="`alt-${slotProps.index.id}`"
                type="textarea"
                v-model:value="product.alt"
                :info="val.INFO_ALT">
                <template #legend>{{ val.LEGEND_ALT }}</template>
                <template #label>{{ val.LABEL_ALT }}</template>
              </FieldElt>
            </template>

            <template #item-5="slotProps">
              <FieldElt :id="`price-${slotProps.index.id}`"
                type="number"
                v-model:value="product.price"
                @keyup.enter="updateProduct()"
                :info="val.INFO_PRICE"
                :min="1"
                :max="1000">
                <template #legend>{{ val.LEGEND_PRICE }}</template>
                <template #label>{{ val.LABEL_PRICE }}</template>
              </FieldElt>
            </template>

            <template #item-6="slotProps">
              <FieldElt :id="`options-${slotProps.index.id}`"
                type="textarea"
                v-model:value="product.options"
                @keyup.enter="updateProduct()"
                :info="val.INFO_OPTIONS"
                :max="100">
                <template #legend>{{ val.LEGEND_OPTIONS }}</template>
                <template #label>{{ val.LABEL_OPTIONS }}</template>
              </FieldElt>
            </template>

            <template #item-7="slotProps">
              <FieldElt :id="`cat-${slotProps.index.id}`"
                type="select"
                :list="val.CATS_PRODUCT"
                v-model:value="product.cat"
                @keyup.enter="updateProduct()"
                :info="val.INFO_CAT">
                <template #legend>{{ val.LEGEND_CAT }}</template>
                <template #label>{{ val.LABEL_CAT }}</template>
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

          <BtnElt type="button"
            @click="deleteProduct()" 
            class="btn-red"
            :content="val.TITLE_DELETE"
            :title="val.TITLE_DELETE + product.name">
            <template #btn>
              <i class="fa-solid fa-cloud-arrow-up fa-lg"></i>
            </template>
          </BtnElt>
        </form>
      </template>
    </CardElt>

    <CardElt v-else itemscope itemtype="https://schema.org/Product">
      <template #header>
        <h1 itemprop="name">{{ product.name }}</h1>
        <h2 itemprop="category">{{ product.cat }}</h2>
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
  </main>
</template>

<script>
import { checkRange, checkRole, deleteData, getData, putData, setError, setMeta } from "servidio"

import BtnElt from "@/assets/elements/BtnElt"
import CardElt from "@/assets/elements/CardElt"
import FieldElt from "@/assets/elements/FieldElt"
import ListElt from "@/assets/elements/ListElt"
import MediaElt from "@/assets/elements/MediaElt"
import Editor from "@tinymce/tinymce-vue"

export default {
  name: "ProductView",
  components: { BtnElt, CardElt, FieldElt, ListElt, MediaElt, Editor },
  props: ["user", "val"],
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
        product.options = product.options.split(",");
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
     * ? CHECK SESSION
     * * Checks the session for the specified role.
     * @param {string} role - The role to check.
     * @return {boolean} The result of the session check.
     */
    checkSession(role) {
      return checkRole(this.user.role, role);
    },

    /**
     * ? ADD TO BASKET
     * * Adds the selected item to the basket.
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
     * ? CREATE ORDER
     * * Create an order based on the selected product, option & quantity.
     */
    createOrder() {
      this.order = {
        id: this.product.id,
        option: this.option,
        quantity: this.quantity
      };
    },

    /**
     * ? GET BASKET
     * * Retrieves the basket from the local storage.
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
     * ? CHECK BASKET
     * * Updates the basket quantity by checking if the order is already in it. 
     * @return {Object} The updated item.
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
     * ? SET BASKET
     * * Sets the basket by adding the order to the basket array & storing it in local storage.
     */
    setBasket() {
      if (!this.isInBasket) this.basket.push(this.order);
      if (this.basket[0] === "") this.basket.shift();

      localStorage.setItem("basket", JSON.stringify(this.basket));
      alert(`${this.order.quantity} "${this.product.name}" (${this.order.option}) ${this.val.ALERT_BASKET_ADDED}`);

      this.$router.push("/shop");
    },

    /**
     * ? UPDATE PRODUCT
     * * Updates the product by sending a PUT request to the API.
     */
    updateProduct() {
      const { CHECK_STRING, TEXT_MIN, TEXT_MAX, CHECK_NUMBER, PRICE_MIN, PRICE_MAX, API_URL, TOKEN, ALERT_UPDATED } = this.val;
      let { id, name, description, image, alt, price, options, cat } = this.product;

      if (checkRange(name, CHECK_STRING) && 
          checkRange(description, CHECK_STRING, TEXT_MIN, TEXT_MAX) && 
          checkRange(alt, CHECK_STRING) && 
          checkRange(price, CHECK_NUMBER, PRICE_MIN, PRICE_MAX)) {

        const URL   = `${API_URL}/products/${id}`;
        const data  = new FormData();
        const img   = document.getElementById("image")?.files[0] ?? image;

        data.append("name", name);
        data.append("description", description);
        data.append("image", img);
        data.append("alt", alt);
        data.append("price", price);
        data.append("options", options);
        data.append("cat", cat);

        putData(URL, data, TOKEN)
          .then(() => {
            alert(name + ALERT_UPDATED);
            this.$router.push("/shop");
          })
          .catch(setError);
      }
    },

    /**
     * ? DELETE PRODUCT
     * * Deletes a product from the system.
     */
    deleteProduct() {
      const { TITLE_DELETE, API_URL, TOKEN, ALERT_DELETED } = this.val;
      let { id, name } = this.product;

      if (confirm(`${TITLE_DELETE} ${name} ?`) === true) {
        const URL = `${API_URL}/products/${id}`;

        deleteData(URL, TOKEN)
          .then(() => {
            alert(name + ALERT_DELETED);
            this.$router.push("/shop");
          })
          .catch(setError);
      }
    }
  }
}
</script>
