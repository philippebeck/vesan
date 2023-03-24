<template>
  <main>
    <header>
      <h1 class="sky-dark">
        <i class="fa-solid fa-basket-shopping fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.BASKET_VIEW }}
      </h1>
    </header>

    <CardElt v-if="basket[0] !== undefined">
      <template #header>
        <h2>{{ constants.BASKET_SUB }}</h2>
        <b>{{ constants.INTRO_BASKET }}</b>
      </template>

      <template #body>
        <form>
          <TableElt :items="order">
            <template #head>
              {{ constants.TOTAL }}
            </template>

            <!-- Id -->
            <template #cell-id="slotProps">
              <a :href="`/product/${order[slotProps.index].id}`">
                #{{ slotProps.index + 1 }}
                ({{ slotProps.item.id }})
              </a>
            </template>

            <!-- Name -->
            <template #cell-name="slotProps">
              <a :href="`/product/${order[slotProps.index].id}`">
                <strong>{{ slotProps.item.name }}</strong>
              </a>
            </template>

            <!-- Image -->
            <template #cell-image="slotProps">
              <a :href="`/product/${order[slotProps.index].id}`">
                <MediaElt :src="'img/thumbnails/products/' + slotProps.item.image"
                  :alt="slotProps.item.name"
                  :title="slotProps.item.name">
                </MediaElt>
              </a>
            </template>

            <!-- Option -->
            <template #cell-option="slotProps">
              <a :href="`/product/${order[slotProps.index].id}`">
                <b>{{ slotProps.item.option }}</b>
              </a>
            </template>

            <!-- Quantity -->
            <template #cell-quantity="slotProps">
              <FieldElt :id="`quantity-${slotProps.index}`"
                type="number"
                v-model:value="slotProps.item.quantity"
                @change="updateProductQuantity(`${slotProps.item.id}`, `${slotProps.item.option}`)"
                :info="constants.INFO_UP_QUANTITY"
                :min="1"
                :max="100">
              </FieldElt>
            </template>

            <!-- Price -->
            <template #cell-price="slotProps">
              <b>{{ slotProps.item.price }} €</b>
            </template>

            <!-- Total -->
            <template #body="slotProps">
              <b>
                {{ slotProps.item.price * slotProps.item.quantity }} €
              </b>
              <br>

              <!-- Delete -->
              <BtnElt type="button"
                @click="deleteProduct(`${slotProps.item.id}`, `${slotProps.item.option}`)"
                class="btn-orange"
                :content="constants.TITLE_DELETE"
                :title="constants.TITLE_DELETE + slotProps.item.name">

                <template #btn>
                  <i class="fa-solid fa-trash fa-lg"></i>
                </template>
              </BtnElt>
            </template>
            </TableElt>

            <!-- Total -->
            <p class="bord bord-violet container-60sm-50md">
              {{ constants.BASKET_TOTAL }}
              <b class="black">
                {{ total }}
                {{ constants.CURRENCY_SYMBOL }}
              </b>
            </p>

            <!-- Order -->
            <div v-if="checkRole('user')"
              id="paypal"
              class="mar-lg">
            </div>

            <BtnElt v-else
              href="/login"
              class="btn-green width-sm"
              :content="constants.CONTENT_ORDER"
              :title="constants.TITLE_BASKET">

              <template #btn>
                <i class="fa-solid fa-cash-register fa-lg"></i>
              </template>
            </BtnElt>

            <!-- Clear -->
            <BtnElt type="button"
              @click="deleteBasket()"
              class="btn-red width-sm"
              :content="constants.CONTENT_CLEAR"
              :title="constants.TITLE_CLEAR">

              <template #btn>
                <i class="fa-solid fa-trash-can fa-lg"></i>
              </template>
            </BtnElt>
        </form>
      </template>
    </CardElt>

    <b v-else>{{ constants.BASKET_EMPTY }}</b>
  </main>
</template>

<script>
import { mapState } from "vuex"
import { loadScript } from "@paypal/paypal-js";

import BtnElt from "@/assets/BtnElt"
import CardElt from "@/assets/CardElt"
import FieldElt from "@/assets/FieldElt"
import MediaElt from "@/assets/MediaElt"
import TableElt from "@/assets/TableElt"

export default {
  name: "BasketView",
  components: {
    BtnElt,
    CardElt,
    FieldElt,
    MediaElt,
    TableElt
  },

  props: ["constants"],
  data() {
    return {
      products: [],
      basket: [],
      order: [],
      total: 0
    }
  },

  created() {
    this.$serve.getData("/products")
      .then(res => { 
        this.products = res;
        this.setBasket();

        this.$serve.setMeta(
          this.constants.HEAD_BASKET, 
          this.constants.META_BASKET,
          this.constants.UI_URL + "/basket",
          this.constants.UI_URL + "/img/logo.svg"
        );

        if (this.basket[0] !== undefined) {
          this.setOrder();
          this.setTotal();

          if (this.constants.USER_ID) {
            this.setPaypal(this.constants, this.getTotal, this.createOrder);
          }
        }
      })
      .catch(err => { this.$serve.checkError(err) });
  },

  computed: {
    ...mapState(["user"]),
  },

  methods: {
    //! ****************************** CHECKER ******************************
    /**
     * CHECK ROLE
     * @param {string} role
     * @returns
     */
    checkRole(role) {
      return this.$serve.checkRole(this.user.role, role);
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

          if (product._id === item.id) {
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
     * @param {object} constants
     * @param {function} getTotal
     * @param {function} createOrder
     */
    setPaypal(constants, getTotal, createOrder) {
      loadScript({ 
        "client-id": constants.PAYPAL_ID, 
        "data-namespace": constants.PAYPAL_NAMESPACE,
        currency: constants.CURRENCY_ISO 
      })

        .then((paypal) => {
          paypal
            .Buttons({
              style: {
                color: constants.PAYPAL_COLOR,
                shape: constants.PAYPAL_SHAPE,
                label: constants.PAYPAL_LABEL
              },

              createOrder: function(data, actions) {
                return actions.order.create({
                  purchase_units: [{ 
                    "amount": {
                      "currency_code": constants.CURRENCY_ISO,
                      "value": getTotal()
                    }
                  }]
                });
              },

              onApprove: function(data, actions) {
                return actions.order.capture()
                  .then((orderData) => {
                      alert(constants.PAYPAL_STATUS + orderData.id + " : " + orderData.status);
                      createOrder(orderData.id);
                    }
                  );
              },

              onCancel : function () {
                alert(constants.PAYPAL_CANCEL);
              },

              onError: function(err) {
                alert(constants.PAYPAL_ERROR);
                throw new Error(err);
              }
            })

            .render("#paypal")

            .catch((error) => {
              console.error(constants.PAYPAL_BTN, error);
            });
        })

        .catch((error) => {
          console.error(constants.PAYPAL_SDK, error);
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
      order.append("status", this.constants.ORDER_STATUS);
      order.append("user", this.constants.USER_ID);
      order.append("created", Date.now());
      order.append("updated", Date.now());

      this.$serve.postData("/orders", order)
        .then(() => {
          alert(this.constants.ALERT_ORDER_CREATED);
          localStorage.removeItem("basket");
          this.$router.push("/profile");
        })
        .catch(err => { this.$serve.checkError(err) });
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
      if (confirm(this.constants.CONFIRM_BASKET) === true) {
        localStorage.removeItem("basket");
        this.$router.go();
      }
    }
  }
}
</script>
