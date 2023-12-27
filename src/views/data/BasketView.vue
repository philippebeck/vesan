<template>
  <main>
    <header>
      <h1 class="sky-dark">
        <i class="fa-solid fa-basket-shopping fa-lg"></i>
        {{ val.BASKET_VIEW }}
      </h1>
    </header>

    <CardElt v-if="basket[0] !== undefined">
      <template #header>
        <h2>{{ val.BASKET_SUB }}</h2>
        <b>{{ val.INTRO_BASKET }}</b>
      </template>

      <template #body>
        <form>
          <TableElt :items="order">
            <template #head>{{ val.TOTAL }}</template>

            <template #cell-id="slotProps">
              <a :href="`/product/${order[slotProps.index].id}`">
                #{{ slotProps.index + 1 }}
                ({{ slotProps.item.id }})
              </a>
            </template>

            <template #cell-name="slotProps">
              <a :href="`/product/${order[slotProps.index].id}`">
                <strong>{{ slotProps.item.name }}</strong>
              </a>
            </template>

            <template #cell-image="slotProps">
              <a :href="`/product/${order[slotProps.index].id}`">
                <MediaElt :src="'img/thumbnails/products/' + slotProps.item.image"
                  :alt="slotProps.item.name"
                  :title="slotProps.item.name"/>
              </a>
            </template>

            <template #cell-option="slotProps">
              <a :href="`/product/${order[slotProps.index].id}`">
                <b>{{ slotProps.item.option }}</b>
              </a>
            </template>

            <template #cell-quantity="slotProps">
              <FieldElt :id="`quantity-${slotProps.index}`"
                type="number"
                v-model:value="slotProps.item.quantity"
                @change="updateProductQuantity(`${slotProps.item.id}`, `${slotProps.item.option}`)"
                :info="val.INFO_UP_QUANTITY"
                :min="1"
                :max="100">
              </FieldElt>
            </template>

            <template #cell-price="slotProps">
              <b>{{ slotProps.item.price }} €</b>
            </template>

            <template #body="slotProps">
              <b>{{ slotProps.item.price * slotProps.item.quantity }} €</b>
              <br>

              <BtnElt type="button"
                @click="deleteProduct(`${slotProps.item.id}`, `${slotProps.item.option}`)"
                class="btn-orange"
                :content="val.TITLE_DELETE"
                :title="val.TITLE_DELETE + slotProps.item.name">
                <template #btn>
                  <i class="fa-solid fa-trash fa-lg"></i>
                </template>
              </BtnElt>
            </template>
          </TableElt>

          <p class="bord bord-violet container-60sm-50md">
            {{ val.BASKET_TOTAL }}
            <b class="black">{{ total }} {{ val.CURRENCY_SYMBOL }}</b>
          </p>

          <div v-if="checkSession('user')" id="paypal" class="mar-lg"></div>

          <BtnElt v-else
            href="/login"
            class="btn-green width-sm"
            :content="val.CONTENT_ORDER"
            :title="val.TITLE_ORDER">
            <template #btn>
              <i class="fa-solid fa-cash-register fa-lg"></i>
            </template>
          </BtnElt>

          <BtnElt type="button"
            @click="deleteBasket()"
            class="btn-red width-sm"
            :content="val.CONTENT_CLEAR"
            :title="val.TITLE_CLEAR">
            <template #btn>
              <i class="fa-solid fa-trash-can fa-lg"></i>
            </template>
          </BtnElt>
        </form>
      </template>
    </CardElt>

    <b v-else>{{ val.BASKET_EMPTY }}</b>

    <CardElt v-if="orders.length !== 0">
      <template #header>
        <h2>{{ val.ORDERS_SUB }}</h2>
      </template>

      <template #body>
        <TableElt :items="orders">

          <template #cell-id="slotProps">
            <b>#{{ slotProps.index + 1 }}</b>
            ({{ orders[slotProps.index].id }})
          </template>

          <template #cell-products="slotProps">
            <ul>
              <li v-for="(item, index) in orders[slotProps.index].products" :key="index">
                <a :href="`/product/${item.id}`">

                  <ul :title="val.TITLE_GO + item.name">
                    <li>
                      <b>{{ item.name }}</b>
                    </li>
                    <li>
                      <i>({{ item.option }})</i>
                    </li>
                    <li class="black">
                      {{ item.quantity }}x {{ item.price }}€
                    </li>
                  </ul>
                </a>
              </li>
            </ul>
          </template>

          <template #cell-total="slotProps">
            <b>{{ orders[slotProps.index].total }} €</b>
          </template>

          <template #cell-created="slotProps">
            {{ new Date(orders[slotProps.index].created).toLocaleString() }}
          </template>

          <template #cell-updated="slotProps">
            {{ new Date(orders[slotProps.index].updated).toLocaleString() }}
          </template>
        </TableElt>
      </template>

      <template #aside v-if="checkSession('user')">
        <OrderSet :token="token" :val="val"/>
      </template>
    </CardElt>
  </main>
</template>

<script>
import { loadScript } from "@paypal/paypal-js"
import { checkRole, getData, postData, setError, setMeta } from "servidio"
import { mapState, mapActions } from "vuex"

import BtnElt from "@/assets/elements/BtnElt"
import CardElt from "@/assets/elements/CardElt"
import FieldElt from "@/assets/elements/FieldElt"
import MediaElt from "@/assets/elements/MediaElt"
import TableElt from "@/assets/elements/TableElt"

export default {
  name: "BasketView",
  components: { BtnElt, CardElt, FieldElt, MediaElt, TableElt },
  props: ["avatar", "val"],
  data() {
    return {
      products: [],
      basket: [],
      order: [],
      total: 0
    }
  },

  created() {
    const { API_URL, HEAD_BASKET, META_BASKET, LOGO_SRC, UI_URL } = this.val;

    getData(`${API_URL}/products`)
      .then(res => { 
        this.products = res;
        this.setBasket();

        setMeta(HEAD_BASKET, META_BASKET, `${UI_URL}/basket`, UI_URL + LOGO_SRC);

        if (this.basket[0] !== undefined) {
          this.setOrder();
          this.setTotal();

          if (this.token) this.setPaypal(this.val, this.getTotal, this.createOrder);
        }
      })
      .catch(err => setError(err));

      if (this.token) {
        this.$store.dispatch("readUser", this.id);
        this.$store.dispatch("listUserOrders", this.id);
      }
  },

  computed: {
    ...mapState(["id", "orders", "token"])
  },

  methods: {
    ...mapActions(["listUserOrders"]),

    /**
     * ? CHECK SESSION
     * * Checks the session for the specified role.
     * @param {string} role - The role to check.
     * @return {boolean} Returns true if the user has the specified role, otherwise false.
     */
    checkSession(role) {
      return checkRole(this.avatar.role, role);
    },

    /**
     * ? GET TOTAL
     * * Get the total value.
     * @return {number} The total value.
     */
    getTotal() {
      return this.total;
    },

    /**
     * ? SET BASKET
     * * Sets the value of the "basket" property by retrieving it from local storage.
     * @param {type} None
     * @return {type} None
     */
    setBasket() {
      if (localStorage.getItem("basket") !== null) {
        this.basket = JSON.parse(localStorage.getItem("basket"));
      }
    },

    /**
     * ? SET ORDER
     * * Sets the order by matching the products in the basket with the products in the store.
     */
    setOrder() {
      for (let i = 0; i < this.products.length; i++) {
        const product = this.products[i];

        for (let j = 0; j < this.basket.length; j++) {
          const item = this.basket[j];

          if (product.id === item.id) {
            let order = {};

            order.id        = item.id;
            order.name      = product.name;
            order.image     = product.image;
            order.option    = item.option;
            order.quantity  = Number(item.quantity);
            order.price     = Number(product.price);

            this.order.push(order);
          }
        }
      }
    },

    /**
     * ? SET PAYPAL
     * * Sets up the Paypal payment option and renders the Paypal button on the page.
     * @param {Object} val - The object containing Paypal configuration values.
     * @param {Function} getTotal - The function to get the total value for the Paypal payment.
     * @param {Function} createOrder - The function to create an order with Paypal.
     */
    setPaypal(val, getTotal, createOrder) {
      loadScript({ 
        "client-id": val.PAYPAL_ID, 
        "data-namespace": val.PAYPAL_NAMESPACE,
        currency: val.CURRENCY_ISO 
      })
        .then((paypal) => {
          paypal
            .Buttons({
              style: {
                color: val.PAYPAL_COLOR,
                shape: val.PAYPAL_SHAPE,
                label: val.PAYPAL_LABEL
              },
              createOrder: function(data, actions) {
                return actions.order.create({
                  purchase_units: [{ 
                    "amount": {
                      "currency_code": val.CURRENCY_ISO,
                      "value": getTotal()
                    }
                  }]
                });
              },
              onApprove: function(data, actions) {
                return actions.order.capture()
                  .then((orderData) => {
                      alert(val.PAYPAL_STATUS + orderData.id + " : " + orderData.status);
                      createOrder(orderData.id);
                    }
                  );
              },
              onCancel : function () { alert(val.PAYPAL_CANCEL) },
              onError: function(err) {
                alert(val.PAYPAL_ERROR);
                throw new Error(err);
              }
            })
            .render("#paypal")
            .catch((error) => console.error(val.PAYPAL_BTN, error));
        })
        .catch((error) => console.error(val.PAYPAL_SDK, error));
    },

    /**
     * ? SET TOTAL
     * * Sets the total value based on the prices and quantities of the items in the order.
     */
    setTotal() {
      this.total = 0;

      for (let i = 0; i < this.order.length; i++) {
        const productTotal = this.order[i].price * this.order[i].quantity
        this.total += Number(productTotal);
      }
    },

    /**
     * ? CREATE ORDER
     * * Creates an order with the given orderId.
     * @param {number} orderId - The ID of the order.
     * @return {void} This function does not return a value.
     */
    createOrder(orderId) {
      const URL       = `${this.val.API_URL}/orders/`;
      const order     = new FormData();
      const products  = [];

      for (const product of this.order) {
        delete product.image;
        products.push(product);
      }

      order.append("products", JSON.stringify(products));
      order.append("total", this.total);
      order.append("paymentId", orderId);
      order.append("status", this.val.ORDER_STATUS);
      order.append("userId", this.id);

      postData(URL, order, this.token)
        .then(() => {
          alert(this.val.ALERT_ORDER_CREATED);
          localStorage.removeItem("basket");
          this.$router.go();
        })
        .catch(err => setError(err));
    },

    /**
     * ? UPDATE PRODUCT QUANTITY
     * * Updates the quantity of a product in the basket based on the provided ID and option.
     * @param {number} id - The ID of the product.
     * @param {string} option - The option of the product.
     */
    updateProductQuantity(id, option) {
      for (let i = 0; i < this.order.length; i++) {
        const element = this.order[i];

        if (element.id === id && element.option === option) {
          for (let j = 0; j < this.basket.length; j++) {
            const item = this.basket[j];

            if (item.id === element.id && item.option === element.option) {
              this.basket[j].quantity = Number(element.quantity);
            }
          }
        }
      }
      this.setTotal();
      localStorage.setItem("basket", JSON.stringify(this.basket));
    },

    /**
     * ? DELETE PRODUCT
     * Deletes a product from the order and basket arrays based on the given id and option.
     * @param {number} id - The id of the product to be deleted.
     * @param {string} option - The option of the product to be deleted.
     */
    deleteProduct(id, option) {
      for (let i = 0; i < this.order.length; i++) {
        const element = this.order[i];
        if (element.id === id && element.option === option) this.order.splice(i, 1);
      }

      for (let i = 0; i < this.basket.length; i++) {
        const item = this.basket[i];
        if (item.id === id && item.option === option) this.basket.splice(i, 1);
      }

      this.setTotal();
      localStorage.setItem("basket", JSON.stringify(this.basket));
    },

    /**
     * ? DELETE BASKET
     * Deletes the basket.
     */
    deleteBasket() {
      if (confirm(this.val.CONFIRM_BASKET)) {
        localStorage.removeItem("basket");
        this.$router.go();
      }
    }
  }
}
</script>
