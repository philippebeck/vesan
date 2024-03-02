<template>
  <CardElt>
    <template #header>
      <h2>
        <i class="fa-solid fa-gifts fa-lg"></i>
        {{ val.ORDER_MANAGER }}
      </h2>
    </template>

    <template #body>
      <form>
        <TableElt :items="orders">

          <template #cell-id="slotProps">
            <b>{{ slotProps.item.id }}</b>
          </template>

          <template #cell-products="slotProps">
            <ul :id="'products-' + slotProps.item.id">
              <li v-for="(item, index) in slotProps.item.products"
                :key="index">
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
            <b>{{ slotProps.item.total }} €</b>
          </template>

          <template #cell-payment="slotProps">
            <b>{{ slotProps.item.payment }}</b>
          </template>

          <template #cell-status="slotProps">
            <FieldElt type="select"
              :list="val.CATS_ORDER"
              v-model:value="slotProps.item.status"
              @keyup.enter="updateStatus(slotProps.item.id)"
              :info="val.INFO_UP_STATUS"/>
          </template>

          <template #cell-userId="slotProps">
            <b>{{ slotProps.item.userId }}</b>
          </template>

          <template #cell-createdAt="slotProps">
            <p>{{ new Date(slotProps.item.createdAt).toLocaleString() }}</p>
            <BtnElt type="button"
              @click="deleteOrder(slotProps.item.id)" 
              class="btn-red"
              :title="val.TITLE_DELETE_ORDER + slotProps.item.id">
              <template #btn>
                <i class="fa-solid fa-trash-arrow-up fa-lg fa-fw"></i>
              </template>
            </BtnElt>
          </template>

          <template #cell-updatedAt="slotProps">
            <p>{{ new Date(slotProps.item.updatedAt).toLocaleString() }}</p>
            <BtnElt type="button"
              @click="updateStatus(slotProps.item.id)" 
              class="btn-green"
              :title="val.TITLE_UPDATE_ORDER + slotProps.item.id">
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
import BtnElt from "./BtnElt"
import CardElt from "./CardElt"
import FieldElt from "./FieldElt"
import TableElt from "./TableElt"

import { deleteData, putData, setError } from "../app/services"

export default {
  name: "OrderSet",
  components: { BtnElt, CardElt, FieldElt, TableElt },
  props: ["orders", "token", "val"],

  methods: {
    /**
    * ? UPDATE STATUS
    * * Updates the status of an order.
    * @param {number} id - The ID of the order to update.
    */
    async updateStatus(id) {
      const { ALERT_ORDER, ALERT_UPDATED, API_URL } = this.val;
      const order = this.orders.find(o => o.id === id);

      if (order) {
        const URL  = `${API_URL}/orders/${id}`
        const data = new FormData();

        data.append("status", order.status);

        try {
          await putData(URL, data, this.token);
          alert(ALERT_ORDER + id + ALERT_UPDATED);

        } catch (err) {
          setError(err);
        } finally {
          this.$router.go();
        }
      }
    },

    /**
     * ? DELETE ORDER
     * * Deletes an order from the API.
     * @param {number} id - the ID of the order to delete
     */
    async deleteOrder(id) {
      const { TITLE_DELETE_ORDER, API_URL, ALERT_ORDER, ALERT_DELETED } = this.val;

      if (confirm(`${TITLE_DELETE_ORDER} ${id} ?`)) {
        const URL = `${API_URL}/orders/${id}`

        try {
          await deleteData(URL, this.token);
          alert(ALERT_ORDER + id + ALERT_DELETED);

        } catch (err) {
          setError(err);
        } finally {
          this.$router.go();
        }
      }
    }

  }
}
</script>
