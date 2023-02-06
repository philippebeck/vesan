<template>
  <CardElt>
    <template #header>
      <i class="blue anima-slideT fa-solid fa-basket-shopping fa-2x"></i>
      <h1 class="sky anima-slideB">Basket</h1>
    </template>

    <template #body>
      <form>
        <TableElt :items="order">
          <template #head>
            Total
          </template>

          <!-- Product Name -->
          <template #cell-name="slotProps">
            <strong>{{ slotProps.item.name }}</strong>
          </template>

          <!-- Product Image -->
          <template #cell-image="slotProps">
            <MediaElt :src="'img/thumbnails/products/' + slotProps.item.image"
              :alt="slotProps.item.name"
              :title="slotProps.item.name">
            </MediaElt>
          </template>

          <!-- Product Option -->
          <template #cell-option="slotProps">
            <b>{{ slotProps.item.option }}</b>
          </template>

          <!-- Product Quantity -->
          <template #cell-quantity="slotProps">
            <FieldElt :id="`quantity-${slotProps.index}`"
              type="number"
              v-model:value="slotProps.item.quantity"
              @change="updateQuantity(`${slotProps.item.name}`, `${slotProps.item.option}`)"
              info="Update the product quantity"
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
          The total of your basket is <b>{{ total }} €</b>
          </p>

          <!-- Clear Basket -->
          <BtnElt type="button"
            @click="clearBasket()"
            class="btn-red"
            content="Clear"
            title="Clear the Basket">
            <template #btn>
              <i class="fa-solid fa-trash-can fa-lg"></i>
            </template>
          </BtnElt>

          <!-- Order Products -->
          <BtnElt type="button"
            @click="orderProducts()"
            class="btn-green"
            content="Order"
            title="Order those Products">
            <template #btn>
              <i class="fa-solid fa-cash-register fa-lg"></i>
            </template>
          </BtnElt>
      </form>
    </template>
  </CardElt>
</template>

<script>
import constants from "/constants"

export default {
  name: "BasketView",

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
        this.setOrder();
        this.calculateTotal();
      })
      .catch(err => { console.log(err) });
  },

  methods: {
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

            thing.name      = product.name;
            thing.image     = product.image;
            thing.option    = item.option;
            thing.quantity  = Number(item.quantity);
            thing.price     = Number(product.price);

            this.order.push(thing);
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
      if (confirm("Do you want to clear your Basket ?") === true) {
        localStorage.removeItem("basket");
        this.$router.go();
      }
    },

    /**
     * ORDER PRODUCTS
     */
    orderProducts() {
      let order = new FormData();

      order.append("products", this.order);
      order.append("total", this.total);
      order.append("payment", "cb");
      order.append("user", constants.USER_ID);
      order.append("created", Date.now());

      this.$serve.postData("/api/orders", order)
        .then(() => {
          alert("Order created !");
          this.$router.go();
        })
        .catch(err => { console.log(err) });
    }
  }
}
</script>
