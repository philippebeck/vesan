<template>
  <CardElt>
    <template #header>
      <h1>Basket</h1>
    </template>

    <template #body>
      <h2>Products</h2>
      <form>
        <TableElt :items="order">

          <template #head>
            Total
          </template>

          <!-- Product Name -->
          <template #cell-name="slotProps">
            <h3>{{ slotProps.item.name }}</h3>
          </template>

          <template #cell-image="slotProps">
            <MediaElt :src="'img/thumbnails/products/' + slotProps.item.image"
              :alt="slotProps.item.alt"
              :title="slotProps.item.name">
            </MediaElt>
          </template>

          <template #cell-option="slotProps">
            <b>{{ slotProps.item.option }}</b>
          </template>

          <template #cell-quantity="slotProps">
            <FieldElt :id="'quantity-' + slotProps.item._id"
              type="number"
              v-model:value="slotProps.item.quantity"
              info="Update the product quantity"
              :min="1"
              :max="100">
            </FieldElt>
          </template>

          <template #cell-price="slotProps">
            <b>{{ slotProps.item.price }} €</b>
          </template>

          <template #body="slotProps">
            <b>{{ slotProps.item.price * slotProps.item.quantity }} €</b>
          </template>

          <template #foot>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <b>TOTAL QUANTITY</b>
              </td>
              <td></td>
              <td>
                <b>TOTAL</b>
              </td>
            </tr>
          </template>

        </TableElt>
      </form>
    </template>
  </CardElt>
</template>

<script>
export default {
  name: "BasketView",

  data() {
    return {
      products: [],
      basket: [],
      order: []
    }
  },

  created() {
    this.$serve.getData("/api/products")
      .then(res => { 
        this.products = res;
        this.getBasket();
        this.setOrder();
      })
      .catch(err => { console.log(err) });
  },

  methods: {
    getBasket() {
      if (localStorage.getItem("basket") === null) {
        localStorage.setItem("basket", []);
        this.basket = localStorage.getItem("basket").split();

      } else {
        this.basket = JSON.parse(localStorage.getItem("basket"));
      }
    },

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
            thing.quantity  = item.quantity;
            thing.price     = product.price;

            this.order.push(thing);
          }
        }
      }
    }
  }
}
</script>
