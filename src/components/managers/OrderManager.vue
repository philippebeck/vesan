<template>
  <CardElt>
    <template #header>
      <h2>
        <i class="fa-solid fa-gifts fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.ORDER_MANAGER }}
      </h2>
    </template>

    <template #body>
      <form method="post">
        <TableElt :items="orders">

          <!-- Id -->
          <template #cell-_id="slotProps">
            <b>#{{ slotProps.index + 1 }}</b>
            ({{ orders[slotProps.index]._id }})
          </template>

          <!-- Products -->
          <template #cell-products="slotProps">
            <ul :id="'products-' + orders[slotProps.index]._id">
              <li v-for="(item, index) in orders[slotProps.index].products"
                :key="index">
                <a :href="`/product/${item.id}`">
                  <ul :title="constants.TITLE_GO + item.name">
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
            <FieldElt type="select"
              :list="constants.CATS_ORDER"
              v-model:value="getOrders()[slotProps.index].status"
              @keyup.enter="updateStatus(orders[slotProps.index]._id)"
              :info="constants.INFO_UP_STATUS"/>
          </template>

          <!-- User -->
          <template #cell-user="slotProps">
            <b>{{ orders[slotProps.index].user.split('-')[0] }}</b>
            ({{ orders[slotProps.index].user.split('-')[1] }})
          </template>

          <!-- Created -->
          <template #cell-created="slotProps">
            <p>
              {{ new Date(orders[slotProps.index].created).toLocaleString() }}
            </p>

            <BtnElt type="button"
              @click="deleteOrder(orders[slotProps.index]._id)" 
              class="btn-red"
              :title="constants.TITLE_DELETE_ORDER + orders[slotProps.index]._id">
              <template #btn>
                <i class="fa-solid fa-trash-arrow-up fa-lg fa-fw"></i>
              </template>
            </BtnElt>
          </template>

          <!-- Updated -->
          <template #cell-updated="slotProps">
            <p>
              {{ new Date(orders[slotProps.index].updated).toLocaleString() }}
            </p>

            <BtnElt type="button"
              @click="updateStatus(orders[slotProps.index]._id)" 
              class="btn-green"
              :title="constants.INFO_UP_ORDER + orders[slotProps.index]._id">
              <template #btn>
                <i class="fa-regular fa-calendar-check fa-lg fa-fw"></i>
              </template>
            </BtnElt>
          </template>
        </TableElt>
      </form>
    </template>
  </CardElt>
</template>

<script>
import BtnElt from "@/assets/BtnElt"
import CardElt from "@/assets/CardElt"
import FieldElt from "@/assets/FieldElt"
import TableElt from "@/assets/TableElt"

export default {
  name: "OrderManager",
  components: {
    BtnElt,
    CardElt,
    FieldElt,
    TableElt
  },

  props: [
    "constants", 
    "orders", 
    "users"
  ],

  methods: {
    /**
     * GET ALL ORDERS
     */
    getOrders() {
      return this.orders;
    },

    /**
     * UPDATE ORDER STATUS
     * @param {string} id 
     */
    updateStatus(id) {
      for (let order of this.orders) {
        if (order._id === id) {

          let data = new FormData();
          data.append("status", order.status);
          data.append("updated", Date.now());

          this.$serve.putData(`/orders/${id}`, data)
            .then(() => {
              alert(this.constants.ALERT_ORDER + id + this.constants.ALERT_UPDATED);
            })
            .catch(err => {
              if (err.response) {
                alert(err.response.data.message) 
              } else {
                console.log(err);
              }
            });
        }
      }
    },

    /**
     * DELETE ORDER
     * @param {string} id 
     */
    deleteOrder(id) {
      if (confirm(`${this.constants.TITLE_DELETE_ORDER}${id} ?`) === true) {

        this.$serve.deleteData(`/orders/${id}`)
          .then(() => {
            alert(this.constants.ALERT_ORDER + id + this.constants.ALERT_DELETED);
            this.$router.go();
          })
          .catch(err => {
            if (err.response) {
              alert(err.response.data.message) 
            } else {
              console.log(err);
            }
          });
      }
    }
  }
}
</script>
