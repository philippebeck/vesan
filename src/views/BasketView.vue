<template>
  <CardElt>
    <template #header>
      <h1 class="sky anima-flipperY">
        <i class="fa-solid fa-basket-shopping fa-lg"
          aria-hidden="true">
        </i>
        Basket
      </h1>
    </template>

    <template #body>
      <form>
        <TableElt :items="order">
          <template #head>
            Total
          </template>

          <!-- Product Name -->
          <template #cell-name="slotProps">
            <a :href="`/product/${sale[slotProps.index].id}`">
              <strong>{{ slotProps.item.name }}</strong>
            </a>
          </template>

          <!-- Product Image -->
          <template #cell-image="slotProps">
            <a :href="`/product/${sale[slotProps.index].id}`">
              <MediaElt :src="'img/thumbnails/products/' + slotProps.item.image"
                :alt="slotProps.item.name"
                :title="slotProps.item.name">
              </MediaElt>
            </a>
          </template>

          <!-- Product Option -->
          <template #cell-option="slotProps">
            <a :href="`/product/${sale[slotProps.index].id}`">
              <b>{{ slotProps.item.option }}</b>
            </a>
          </template>

          <!-- Product Quantity -->
          <template #cell-quantity="slotProps">
            <FieldElt :id="`quantity-${slotProps.index}`"
              type="number"
              v-model:value="slotProps.item.quantity"
              @change="updateQuantity(`${slotProps.item.name}`, `${slotProps.item.option}`)"
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
            <p>
              <b>
                {{ slotProps.item.price * slotProps.item.quantity }} €
              </b>
            </p>

            <!-- Delete Item -->
            <BtnElt type="button"
              @click="deleteItem(`${slotProps.item.name}`, `${slotProps.item.option}`)"
              class="btn-orange"
              content="Remove"
              :title="`Remove ${slotProps.item.name}`">
              <template #btn>
                <i class="fa-solid fa-trash fa-lg"></i>
              </template>
            </BtnElt>
          </template>
          </TableElt>

          <!-- Basket Total -->
          <p class="bord bord-violet black container-60sm-50md">
            {{ constants.BASKET_TOTAL }}
            <b>
              {{ total }}
              {{ constants.CURRENCY_SYMBOL }}
            </b>
          </p>

          <!-- Clear Basket -->
          <BtnElt type="button"
            @click="clearBasket()"
            class="btn-red"
            content="Clear"
            :title="constants.BASKET_CLEAR">
            <template #btn>
              <i class="fa-solid fa-trash-can fa-lg"></i>
            </template>
          </BtnElt>

          <!-- Order Products -->
          <BtnElt v-if="checkRole('user')"
            type="button"
            @click="orderProducts()"
            class="btn-green"
            content="Order"
            :title="constants.BASKET_ORDER">
            <template #btn>
              <i class="fa-solid fa-cash-register fa-lg"></i>
            </template>
          </BtnElt>

          <BtnElt v-else
            href="/login"
            class="btn-green"
            content="Order"
            :title="constants.BASKET_LOGIN">
            <template #btn>
              <i class="fa-solid fa-cash-register fa-lg"></i>
            </template>
          </BtnElt>
      </form>
    </template>
  </CardElt>
</template>

<script>
import { mapState, mapActions } from "vuex"
import constants from "/constants"

export default {
  name: "BasketView",

  data() {
    return {
      products: [],
      basket: [],
      order: [],
      sale: [],
      constants: {},
      total: 0,
      userId: null
    }
  },

  mounted() {
    this.constants = constants;
    this.$store.dispatch("checkUsers");

    this.$serve.getData("/api/products")
      .then(res => { 
        this.products = res;
        this.getBasket();
        this.setOrder();
        this.calculateTotal();
      })
      .catch(err => { console.log(err) });
  },

  computed: {
    ...mapState([
      "user",
      "users"
    ]),
  },

  methods: {
    ...mapActions(["checkUsers"]),

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
            let thing = {};
            let sale  = {};

            thing.name      = product.name;
            thing.image     = product.image;
            thing.option    = item.option;
            thing.quantity  = Number(item.quantity);
            thing.price     = Number(product.price);

            sale.id       = item.id;
            sale.name     = product.name;
            sale.option   = item.option;
            sale.quantity = Number(item.quantity);
            sale.price    = Number(product.price);

            this.order.push(thing);
            this.sale.push(sale);
          }
        }
      }
    },

    /**
     * UPDATE QUANTITY
     * @param {string} name 
     * @param {string} option 
     */
    updateQuantity(name, option) {
      for (let i = 0; i < this.order.length; i++) {
        let element = this.order[i];

        if (element.name === name && element.option === option) {
          for (let j = 0; j < this.basket.length; j++) {
            let item = this.basket[j];

            if (item.name === element.name && item.option === element.option) {
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
     * @param {string} name 
     * @param {string} option 
     */
    deleteItem(name, option) {
      for (let i = 0; i < this.order.length; i++) {
        let element = this.order[i];

        if (element.name === name && element.option === option) {
          this.order.splice(i, 1);

          for (let j = 0; j < this.basket.length; j++) {
            let item = this.basket[j];

            if (item.name === element.name && item.option === element.option) {
              this.basket.splice(j, 1);
            }
          }
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
     * CLEAR BASKET
     */
    clearBasket() {
      if (confirm(constants.CONFIRM_BASKET) === true) {
        localStorage.removeItem("basket");
        this.$router.go();
      }
    },

    /**
     * ORDER PRODUCTS
     */
    orderProducts() {
      let order     = new FormData();

      order.append("products", JSON.stringify(this.sale));
      order.append("total", this.total);
      order.append("payment", "cb");
      order.append("status", "Pending");
      order.append("user", constants.USER_ID);
      order.append("created", Date.now());
      order.append("updated", Date.now());

      this.$serve.postData("/api/orders", order)
        .then(() => {
          alert(constants.ALERT_ORDER);
          this.$router.go();
        })
        .catch(err => { console.log(err) });
    }
  }
}
</script>
