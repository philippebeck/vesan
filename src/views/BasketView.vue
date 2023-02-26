<template>
  <CardElt>
    <template #header>
      <h1 class="sky anima-flipperY">
        <i class="fa-solid fa-basket-shopping fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.BASKET_TITLE }}
      </h1>
      <p>{{ constants.BASKET_INTRO }}</p>
    </template>

    <template #body>
      <form v-if="basket[0] !== undefined">
        <TableElt :items="order">
          <template #head>
            {{ constants.TOTAL }}
          </template>

          <!-- Product Id -->
          <template #cell-id="slotProps">
            <a :href="`/product/${order[slotProps.index].id}`">
              #{{ slotProps.index + 1 }}
              ({{ slotProps.item.id }})
            </a>
          </template>

          <!-- Product Name -->
          <template #cell-name="slotProps">
            <a :href="`/product/${order[slotProps.index].id}`">
              <strong>{{ slotProps.item.name }}</strong>
            </a>
          </template>

          <!-- Product Image -->
          <template #cell-image="slotProps">
            <a :href="`/product/${order[slotProps.index].id}`">
              <MediaElt :src="'img/thumbnails/products/' + slotProps.item.image"
                :alt="slotProps.item.name"
                :title="slotProps.item.name">
              </MediaElt>
            </a>
          </template>

          <!-- Product Option -->
          <template #cell-option="slotProps">
            <a :href="`/product/${order[slotProps.index].id}`">
              <b>{{ slotProps.item.option }}</b>
            </a>
          </template>

          <!-- Product Quantity -->
          <template #cell-quantity="slotProps">
            <FieldElt :id="`quantity-${slotProps.index}`"
              type="number"
              v-model:value="slotProps.item.quantity"
              @change="updateQuantity(`${slotProps.item.id}`, `${slotProps.item.option}`)"
              :info="constants.UPDATE_QUANTITY"
              :min="1"
              :max="100">
            </FieldElt>
          </template>

          <!-- Product Price -->
          <template #cell-price="slotProps">
            <b>{{ slotProps.item.price }} €</b>
          </template>

          <!-- Product Total -->
          <template #body="slotProps">
            <b>
              {{ slotProps.item.price * slotProps.item.quantity }} €
            </b>
            <br>

            <!-- Delete Item -->
            <BtnElt type="button"
              @click="deleteItem(`${slotProps.item.id}`, `${slotProps.item.option}`)"
              class="btn-orange"
              :content="constants.DELETE"
              :title="constants.DELETE + slotProps.item.name">

              <template #btn>
                <i class="fa-solid fa-trash fa-lg"></i>
              </template>
            </BtnElt>
          </template>
          </TableElt>

          <!-- Basket Total -->
          <p class="bord bord-violet container-60sm-50md">
            {{ constants.BASKET_TOTAL }}
            <b class="black">
              {{ total }}
              {{ constants.CURRENCY_SYMBOL }}
            </b>
          </p>

          <!-- Order Products -->
          <div v-if="checkRole('user')"
            id="paypal"
            class="mar-lg">
          </div>

          <BtnElt v-else
            href="/login"
            class="btn-green width-sm"
            :content="constants.CONTENT_ORDER"
            :title="constants.BASKET_LOGIN">

            <template #btn>
              <i class="fa-solid fa-cash-register fa-lg"></i>
            </template>
          </BtnElt>

          <!-- Clear Basket -->
          <BtnElt type="button"
            @click="clearBasket()"
            class="btn-red width-sm"
            :content="constants.CONTENT_CLEAR"
            :title="constants.BASKET_CLEAR">

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
import constants from "/constants"
import { loadScript } from "@paypal/paypal-js";

export default {
  name: "BasketView",

  data() {
    return {
      products: [],
      basket: [],
      order: [],
      constants: {},
      total: 0
    }
  },

  mounted() {
    this.constants = constants;

    this.$serve.getData("/api/products")
      .then(res => { 
        this.products = res;
        this.getBasket();

        if (this.basket[0] !== undefined) {
          this.setOrder();
          this.calculateTotal();

          if (constants.USER_ID) {
            this.setPaypal(this.getTotal, this.orderProducts);
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
     * @param {function} getTotal
     * @param {function} orderProducts
     */
    setPaypal(getTotal, orderProducts) {
      loadScript({ 
        "client-id": constants.PAYPAL_ID, 
        "data-namespace": "paypal_sdk",
        currency: constants.CURRENCY_ISO 
      })

        .then((paypal) => {
          paypal
            .Buttons({
              style: {
                color: "blue",
                shape: "pill",
                label: "paypal"
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
                      alert("Status of transaction #" + orderData.id + " : " + orderData.status);
                      orderProducts(orderData.id);
                    }
                  );
              },

              onCancel : function () {
                alert("Canceled transaction !");
              },

              onError: function(err) {
                alert("Invalid transaction !");
                throw new Error(err);
              }
            })

            .render("#paypal")

            .catch((error) => {
              console.error("Failed to render the PayPal Buttons", error);
            });
        })

        .catch((error) => {
          console.error("Failed to load the PayPal JS SDK script", error);
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
      order.append("status", "Pending");
      order.append("user", constants.USER_ID);
      order.append("created", Date.now());
      order.append("updated", Date.now());

      this.$serve.postData("/api/orders", order)
        .then(() => {
          alert(constants.ALERT_ORDER);
          localStorage.removeItem("basket");
          this.$router.push("/profile");
        })
        .catch(err => { console.log(err) });
    },

    /**
     * CLEAR BASKET
     */
    clearBasket() {
      if (confirm(constants.CONFIRM_BASKET) === true) {
        localStorage.removeItem("basket");
        this.$router.go();
      }
    }
  }
}
</script>
