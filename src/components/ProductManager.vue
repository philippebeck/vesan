<template>
  <CardElt>
    <template #header>
      <h2 id="product">
        <i class="fa-regular fa-rectangle-list fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.PRODUCT_MANAGER }}
      </h2>
    </template>

    <template #body>
      <form enctype="multipart/form-data">
        <TableElt :items="products">

          <template #cell-_id="slotProps">
            <a :href="`/product/${products[slotProps.index]._id}`">
              <b>#{{ slotProps.index + 1 }}</b>
              ({{ products[slotProps.index]._id }})
            </a>
          </template>

          <template #cell-name="slotProps">
            <FieldElt v-model:value="getProducts()[slotProps.index].name"
              @keyup.enter="updateProduct(products[slotProps.index]._id)"
              :info="constants.INFO_UP_NAME"/>
          </template>

          <template #cell-description="slotProps">
            <BtnElt :href="`/product/edit/${products[slotProps.index]._id}`"
              class="btn-cyan"
              :title="constants.TITLE_UPDATE + products[slotProps.index].name">

              <template #btn>
                <i class="fa-regular fa-edit fa-lg"></i>
              </template>
            </BtnElt>
          </template>

          <template #cell-image="slotProps">
            <MediaElt :src="'/img/thumbnails/products/' + products[slotProps.index].image"
              :alt="products[slotProps.index].alt"
              :title="products[slotProps.index].name">
            </MediaElt>

            <FieldElt :id="products[slotProps.index]._id"
              type="file"
              :info="constants.INFO_UP_IMAGE"/>
          </template>

          <template #cell-alt="slotProps">
            <FieldElt type="textarea"
              v-model:value="getProducts()[slotProps.index].alt"
              @keyup.enter="updateProduct(products[slotProps.index]._id)"
              :info="constants.INFO_UP_ALT"/>
          </template>

          <template #cell-price="slotProps">
            <FieldElt type="number"
              v-model:value="getProducts()[slotProps.index].price"
              @keyup.enter="updateProduct(products[slotProps.index]._id)"
              :info="constants.INFO_UP_PRICE"
              :min="constants.PRICE_MIN"
              :max="constants.PRICE_MAX"/>
          </template>

          <template #cell-options="slotProps">
            <FieldElt type="textarea"
              v-model:value="getProducts()[slotProps.index].options"
              @keyup.enter="updateProduct(products[slotProps.index]._id)"
              :info="constants.INFO_UP_OPTIONS"
              :min="constants.TEXT_MIN"
              :max="constants.TEXT_MAX"/>
          </template>

          <template #cell-cat="slotProps">
            <FieldElt type="select"
              :list="constants.CATS_PRODUCT"
              v-model:value="getProducts()[slotProps.index].cat"
              @keyup.enter="updateProduct(products[slotProps.index]._id)"
              :info="constants.INFO_UP_CATEGORY"/>
          </template>

          <template #cell-created="slotProps">
            <p>
              {{ new Date(products[slotProps.index].created).toLocaleString() }}
            </p>

            <BtnElt type="button"
              @click="deleteProduct(products[slotProps.index]._id)" 
              class="btn-red"
              :title="constants.TITLE_DELETE + products[slotProps.index].name">

              <template #btn>
                <i class="fa-solid fa-trash-arrow-up fa-lg fa-fw"></i>
              </template>
            </BtnElt>
          </template>

          <template #cell-updated="slotProps">
            <p>
              {{ new Date(products[slotProps.index].updated).toLocaleString() }}
            </p>

            <BtnElt type="button"
              @click="updateProduct(products[slotProps.index]._id)" 
              class="btn-sky"
              :title="constants.TITLE_UPDATE + products[slotProps.index].name">

              <template #btn>
                <i class="fa-solid fa-cloud-arrow-up fa-lg fa-fw"></i>
              </template>
            </BtnElt>
          </template>
        </TableElt>
      </form>
    </template>
  </CardElt>
</template>

<script>
import { checkError, checkRange, fetchSet, getItemName } from "../assets/serve"

import BtnElt from "../assets/BtnElt"
import CardElt from "../assets/CardElt"
import FieldElt from "../assets/FieldElt"
import MediaElt from "../assets/MediaElt"
import TableElt from "../assets/TableElt"

export default {
  name: "ProductManager",
  components: {
    BtnElt,
    CardElt,
    FieldElt,
    MediaElt,
    TableElt
  },

  props: [
    "constants", 
    "products"
  ],

  methods: {
    /**
     * GET ALL PRODUCTS
     * @returns
     */
    getProducts() {
      return this.products;
    },

    /**
     * GET PRODUCT
     * @param {string} id 
     * @param {object} product 
     */
    getProduct(id, product) {
      let data  = new FormData();
      let image = document.getElementById(id).files[0] ?? product.image;

      data.append("name", product.name);
      data.append("description", product.description);
      data.append("image", image);
      data.append("alt", product.alt);
      data.append("price", product.price);
      data.append("options", product.options);
      data.append("cat", product.cat);
      data.append("created", product.created);
      data.append("updated", Date.now());

      return data;
    },

    /**
     * CHECK PRODUCT
     * @param {string} id 
     * @param {object} product 
     */
    checkProduct(id, product) {
      const PRICE_MAX   = this.constants.PRICE_MAX;
      const PRICE_MIN   = this.constants.PRICE_MIN;
      const PRICE_MSG   = this.constants.CHECK_NUMBER;
      const STRING_MSG  = this.constants.CHECK_STRING;
      const TEXT_MAX    = this.constants.TEXT_MAX;
      const TEXT_MIN    = this.constants.TEXT_MIN;

      if (checkRange(product.name, STRING_MSG) && 
          checkRange(product.description, STRING_MSG, TEXT_MIN, TEXT_MAX) && 
          checkRange(product.alt, STRING_MSG) && 
          checkRange(product.price, PRICE_MSG, PRICE_MIN, PRICE_MAX) && 
          checkRange(product.options, STRING_MSG, TEXT_MIN, TEXT_MAX)) {

        let url     = this.constants.API_URL + "/products/" + id;
        let options = {
          method: "PUT",
          mode: "cors",
          headers: { "Authorization": `Bearer ${this.constants.TOKEN}` },
          body: this.getProduct(id, product)
        };

        fetchSet(url, options)
          .then(() => {
            alert(product.name + this.constants.ALERT_UPDATED);
          })
          .catch(err => { checkError(err) });
      }
    },

    /**
     * UPDATE PRODUCT
     * @param {string} id 
     */
    updateProduct(id) {
      for (let product of this.products) {
        if (product._id === id) { this.checkProduct(id, product) }
      }
    },

    /**
     * DELETE PRODUCT
     * @param {string} id 
     */
    deleteProduct(id) {
      let name = getItemName(id, this.products);

      if (confirm(`${this.constants.TITLE_DELETE} ${name} ?`) === true) {

        let url     = this.constants.API_URL + "/products/" + id;
        let options = {
          method: "DELETE",
          mode: "cors",
          headers: { "Authorization": `Bearer ${this.constants.TOKEN}` }
        };

        fetchSet(url, options)
          .then(() => {
            alert(name + this.constants.ALERT_DELETED);
            this.$router.go();
          })
          .catch(err => { checkError(err) });
      }
    }
  }
}
</script>
