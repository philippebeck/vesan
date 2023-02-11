<template>
  <CardElt>
    <template #header>
      <i class="fa-regular fa-rectangle-list fa-2x"></i>
      <h3>List Orders</h3>
    </template>

    <template #body>
      <form method="post">
        <TableElt :items="orders">
          <template #head>up/del</template>

          <!-- Id -->
          <template #cell-_id="slotProps">
            <b>#{{ slotProps.index + 1 }}</b>
            ({{ orders[slotProps.index]._id }})
          </template>

          <!-- Products -->
          <template #cell-products="slotProps">
            <ul>
              <li v-for="(item, index) in orders[slotProps.index].products"
                :key="index">
                <ul :title="item.id">
                  <li>
                    <b>{{ item.name }}</b>
                  </li>
                  <li>
                    <i>({{ item.option }})</i>
                  </li>
                  <li class="black">{{ item.quantity }}x {{ item.price }}€</li>
                </ul>
              </li>
            </ul>
          </template>

          <!-- Total -->
          <template #cell-total="slotProps">
            <b>{{ orders[slotProps.index].total }} €</b>
          </template>

          <!-- Payment -->
          <template #cell-payment="slotProps">
            <b>{{ orders[slotProps.index].payment }}</b>
          </template>

          <!-- Status -->
          <template #cell-status="slotProps">
            <FieldElt :id="'status-' + orders[slotProps.index]._id"
              type="select"
              v-model:value="getOrders()[slotProps.index].status"
              :info="constants.UPDATE_STATUS"
              @keyup.enter="updateOrder(orders[slotProps.index]._id)"
              :list="constants.CATS_ORDER"/>
          </template>

          <!-- User -->
          <template #cell-user="slotProps">
            <b>{{ getUserName(orders[slotProps.index].user) }}</b>
            ({{ orders[slotProps.index].user }})
          </template>

          <!-- Created -->
          <template #cell-created="slotProps">
            {{ new Date(orders[slotProps.index].created).toLocaleString() }}
          </template>

          <!-- Updated -->
          <template #cell-updated="slotProps">
            {{ new Date(orders[slotProps.index].updated).toLocaleString() }}
          </template>

          <template #body="slotProps">

          <!-- Update -->
          <BtnElt type="button"
              @click="updateOrder(orders[slotProps.index]._id)" 
              class="btn-sky"
              :title="'Update order #' + orders[slotProps.index]._id">
              <template #btn>
                <i class="fa-solid fa-edit"></i>
              </template>
            </BtnElt>

            <!-- Delete -->
            <BtnElt type="button"
              @click="deleteOrder(orders[slotProps.index]._id)" 
              class="btn-red"
              :title="'Delete order #' + orders[slotProps.index]._id">
              <template #btn>
                <i class="fa-solid fa-trash-alt"></i>
              </template>
            </BtnElt>
          </template>
        </TableElt>
      </form>
    </template>
  </CardElt>
</template>

<script>
import constants from "/constants"

export default {
  name: "ListOrders",
  props: ["orders", "users"],

  data() {
    return {
      constants: []
    }
  },

  mounted() {
    this.constants = constants;
  },


  methods: {
    /**
     * GET ALL ORDERS
     */
    getOrders() {
      return this.orders;
    },
    
    /**
     * GET USER NAME
     * @param {string} id 
     */
    getUserName(id) {
      return this.$serve.getItemName(id, this.users);
    },

    /**
     * UPDATE ORDER
     * @param {string} id 
     */
    updateOrder(id) {
      for (let order of this.orders) {
        if (order._id === id) {
          let orderData = new FormData();

          orderData.append("id", id);
          orderData.append("products", JSON.stringify(order.products));
          orderData.append("status", order.status);
          orderData.append("updated", Date.now());

          this.$serve.putData(`/api/orders/${id}`, orderData)
            .then(() => {
              alert(`Order #${id} updated !`);
              this.$router.go();
            })
            .catch(err => { console.log(err) });
        }
      }
    },

    /**
     * DELETE ORDER
     * @param {string} id 
     */
    deleteOrder(id) {
      if (confirm(`Delete order #${id} ?`) === true) {

        this.$serve.deleteData(`/api/orders/${id}`)
          .then(() => {
            alert(`Order #${id} deleted !`);
            this.$router.go();
          })
          .catch(err => { console.log(err) });
      }
    }
  }
}
</script>
