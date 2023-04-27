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
import BtnElt from "@/assets/BtnElt"
import CardElt from "@/assets/CardElt"
import FieldElt from "@/assets/FieldElt"
import MediaElt from "@/assets/MediaElt"
import TableElt from "@/assets/TableElt"

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
      let message = this.constants.CHECK_STRING;
      let textMin = this.constants.TEXT_MIN;
      let textMax = this.constants.TEXT_MAX;
      let priceMin = this.constants.PRICE_MIN;
      let priceMax = this.constants.PRICE_MAX;
      let url = this.constants.API_URL;

      if (this.$serve.checkRange(product.name, message) && 
        this.$serve.checkRange(product.description, message, textMin, textMax) && 
        this.$serve.checkRange(product.alt, message) && 
        this.$serve.checkRange(product.price, message, priceMin, priceMax) && 
        this.$serve.checkRange(product.options, message, textMin, textMax)) {

        let options = {
          method: "PUT",
          mode: "cors",
          headers: { "Authorization": `Bearer ${this.constants.TOKEN}` },
          body: this.getProduct(id, product)
        };

        this.$serve.fetchSet(`${url}/products/${id}`, options)
          .then(() => {
            alert(product.name + this.constants.ALERT_UPDATED);
          })
          .catch(err => { this.$serve.checkError(err) });
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
      let productName = this.$serve.getItemName(id, this.products);
      let url = this.constants.API_URL;

      if (confirm(`${this.constants.TITLE_DELETE} ${productName} ?`) === true) {
        let options = {
          method: "DELETE",
          mode: "cors",
          headers: { "Authorization": `Bearer ${this.constants.TOKEN}` }
        };

        this.$serve.fetchSet(`${url}/products/${id}`, options)
          .then(() => {
            alert(productName + this.constants.ALERT_DELETED);
            this.$router.go();
          })
          .catch(err => { this.$serve.checkError(err) });
      }
    }
  }
}
</script>
