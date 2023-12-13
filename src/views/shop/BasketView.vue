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
                  :title="slotProps.item.name">
                </MediaElt>
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
  </main>
</template>

<script>
import BtnElt from "@/assets/elements/BtnElt"
import CardElt from "@/assets/elements/CardElt"
import FieldElt from "@/assets/elements/FieldElt"
import MediaElt from "@/assets/elements/MediaElt"
import TableElt from "@/assets/elements/TableElt"

import { loadScript } from "@paypal/paypal-js"
import { checkRole, getData, postData, setError, setMeta } from "servidio"

export default {
  name: "BasketView",
  components: {
    BtnElt,
    CardElt,
    FieldElt,
    MediaElt,
    TableElt
  },

  props: ["val", "user"],
  data() {
    return {
      products: [],
      basket: [],
      order: [],
      total: 0
    }
  },

  created() {
    getData(this.val.API_URL + "/products")
      .then(res => { 
        this.products = res;
        this.setBasket();

        setMeta(
          this.val.HEAD_BASKET, 
          this.val.META_BASKET,
          this.val.UI_URL + "/basket",
          this.val.UI_URL + this.val.LOGO_SRC
        );

        if (this.basket[0] !== undefined) {
          this.setOrder();
          this.setTotal();

          if (this.val.USER_ID) {
            this.setPaypal(this.val, this.getTotal, this.createOrder);
          }
        }
      })
      .catch(err => { setError(err) });
  },

  methods: {
    //! ****************************** CHECKER ******************************
    /**
     * CHECK ROLE
     * @param {string} role
     * @returns
     */
    checkSession(role) {
      return checkRole(this.user.role, role);
    },

    //! ****************************** GETTER ******************************

    /**
     * GET TOTAL
     * @returns
     */
    getTotal() {
      return this.total;
    },

    //! ****************************** SETTERS ******************************

    /**
     * SET BASKET
     */
    setBasket() {
      if (localStorage.getItem("basket") !== null) {
        this.basket = JSON.parse(localStorage.getItem("basket"));
      }
    },

    /**
     * SET ORDER
     */
    setOrder() {
      for (let i = 0; i < this.products.length; i++) {
        let product = this.products[i];

        for (let j = 0; j < this.basket.length; j++) {
          let item = this.basket[j];

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
     * SET PAYPAL
     * @param {object} val
     * @param {function} getTotal
     * @param {function} createOrder
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

              onCancel : function () {
                alert(val.PAYPAL_CANCEL);
              },

              onError: function(err) {
                alert(val.PAYPAL_ERROR);
                throw new Error(err);
              }
            })

            .render("#paypal")

            .catch((error) => {
              console.error(val.PAYPAL_BTN, error);
            });
        })

        .catch((error) => {
          console.error(val.PAYPAL_SDK, error);
        });
    },

    /**
     * SET TOTAL
     */
    setTotal() {
      this.total = 0;

      for (let i = 0; i < this.order.length; i++) {
        let productTotal = this.order[i].price * this.order[i].quantity
        this.total += Number(productTotal);
      }
    },

    //! ****************************** CRUD ******************************

    /**
     * CREATE ORDER
     * @param {string} orderId
     */
    createOrder(orderId) {
      let order     = new FormData();
      let products  = [];

      for (let product of this.order) {
        delete product.image;
        products.push(product);
      }

      order.append("products", JSON.stringify(products));
      order.append("total", this.total);
      order.append("payment", orderId);
      order.append("status", this.val.ORDER_STATUS);
      order.append("user", this.val.USER_ID);
      order.append("created", Date.now());
      order.append("updated", Date.now());

      postData(this.val.API_URL + "/orders/", order)
        .then(() => {
          alert(this.val.ALERT_ORDER_CREATED);
          localStorage.removeItem("basket");
          this.$router.push("/profile");
        })
        .catch(err => { setError(err) });
    },

    /**
     * UPDATE PRODUCT QUANTITY
     * @param {string} id 
     * @param {string} option 
     */
    updateProductQuantity(id, option) {
      for (let i = 0; i < this.order.length; i++) {
        let element = this.order[i];

        if (element.id === id && element.option === option) {
          for (let j = 0; j < this.basket.length; j++) {
            let item = this.basket[j];

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
     * DELETE PRODUCT
     * @param {string} id 
     * @param {string} option 
     */
    deleteProduct(id, option) {
      for (let i = 0; i < this.order.length; i++) {
        let element = this.order[i];

        if (element.id === id && element.option === option) {
          this.order.splice(i, 1);
        }
      }

      for (let i = 0; i < this.basket.length; i++) {
        let item = this.basket[i];

        if (item.id === id && item.option === option) {
          this.basket.splice(i, 1);
        }
      }

      this.setTotal();
      localStorage.setItem("basket", JSON.stringify(this.basket));
    },

    /**
     * DELETE BASKET
     */
    deleteBasket() {
      if (confirm(this.val.CONFIRM_BASKET) === true) {
        localStorage.removeItem("basket");
        this.$router.go();
      }
    }
  }
}
</script>
