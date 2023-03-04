<template>
  <CardElt>
    <template #header>
      <h1 class="sky anima-flipperY">
        <i class="fa-solid fa-basket-shopping fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.BASKET_VIEW }}
      </h1>
      <p>{{ constants.INTRO_BASKET }}</p>
    </template>

    <template #body>
      <form v-if="basket[0] !== undefined">
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
              @change="updateQuantity(`${slotProps.item.id}`, `${slotProps.item.option}`)"
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
              @click="deleteItem(`${slotProps.item.id}`, `${slotProps.item.option}`)"
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
            @click="clearBasket()"
            class="btn-red width-sm"
            :content="constants.CONTENT_CLEAR"
            :title="constants.TITLE_CLEAR">

            <template #btn>
              <i class="fa-solid fa-trash-can fa-lg"></i>
            </template>
          </BtnElt>
      </form>

      <b v-else>{{ constants.BASKET_EMPTY }}</b>
    </template>
  </CardElt>
</template>

<script>
import { mapState } from "vuex"
import { loadScript } from "@paypal/paypal-js";

export default {
  name: "BasketView",
  props: ["constants"],

  data() {
    return {
      products: [],
      basket: [],
      order: [],
      total: 0
    }
  },

  mounted() {
    this.$serve.getData("/api/products")
      .then(res => { 
        this.products = res;
        this.getBasket();

        if (this.basket[0] !== undefined) {
          this.setOrder();
          this.calculateTotal();

          if (this.constants.USER_ID) {
            this.setPaypal(this.constants, this.getTotal, this.orderProducts);
          }
        }
      })
      .catch(err => { console.log(err) });
  },

  computed: {
    ...mapState(["user"]),
  },

  methods: {
    /**
     * CHECK ROLE
     * @param {string} role
     * @returns
     */
    checkRole(role) {
      return this.$serve.checkRole(this.user.role, role);
    },

    /**
     * GET BASKET
     */
    getBasket() {
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
     * UPDATE QUANTITY
     * @param {string} id 
     * @param {string} option 
     */
    updateQuantity(id, option) {
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
      this.calculateTotal();
      localStorage.setItem("basket", JSON.stringify(this.basket));
    },

    /**
     * DELETE ITEM
     * @param {string} id 
     * @param {string} option 
     */
    deleteItem(id, option) {
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

      this.calculateTotal();
      localStorage.setItem("basket", JSON.stringify(this.basket));
    },

    /**
     * CALCULATE TOTAL
     */
    calculateTotal() {
      this.total = 0;

      for (let i = 0; i < this.order.length; i++) {
        let productTotal = this.order[i].price * this.order[i].quantity
        this.total += Number(productTotal);
      }
    },

    /**
     * GET TOTAL
     * @returns
     */
    getTotal() {
      return this.total;
    },

    /**
     * SET PAYPAL
     * @param {object} constants
     * @param {function} getTotal
     * @param {function} orderProducts
     */
    setPaypal(constants, getTotal, orderProducts) {
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
                      orderProducts(orderData.id);
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
     * ORDER PRODUCTS
     * @param {string} orderId
     */
    orderProducts(orderId) {
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

      this.$serve.postData("/api/orders", order)
        .then(() => {
          alert(this.constants.ALERT_ORDER_CREATED);
          localStorage.removeItem("basket");
          this.$router.push("/profile");
        })
        .catch(err => { alert(err.response.data.message) });
    },

    /**
     * CLEAR BASKET
     */
    clearBasket() {
      if (confirm(this.constants.CONFIRM_BASKET) === true) {
        localStorage.removeItem("basket");
        this.$router.go();
      }
    }
  }
}
</script>
