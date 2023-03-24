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
      <form method="post"
        enctype="multipart/form-data">
        <TableElt :items="products">

          <!-- Id -->
          <template #cell-_id="slotProps">
            <a :href="`/product/${products[slotProps.index]._id}`">
              <b>#{{ slotProps.index + 1 }}</b>
              ({{ products[slotProps.index]._id }})
            </a>
          </template>

          <!-- Name -->
          <template #cell-name="slotProps">
            <FieldElt v-model:value="getProducts()[slotProps.index].name"
              @keyup.enter="updateProduct(products[slotProps.index]._id)"
              :info="constants.INFO_UP_NAME"/>
          </template>

          <!-- Description -->
          <template #cell-description="slotProps">
            <BtnElt :href="`/product/edit/${products[slotProps.index]._id}`"
              class="btn-cyan"
              :title="constants.TITLE_UPDATE + products[slotProps.index].name">

              <template #btn>
                <i class="fa-regular fa-edit fa-lg"></i>
              </template>
            </BtnElt>
          </template>

          <!-- Image -->
          <template #cell-image="slotProps">
            <MediaElt :src="'/img/thumbnails/products/' + products[slotProps.index].image"
              :alt="products[slotProps.index].alt"
              :title="products[slotProps.index].name">
            </MediaElt>

            <FieldElt :id="products[slotProps.index]._id"
              type="file"
              :info="constants.INFO_UP_IMAGE"/>
          </template>

          <!-- Alt -->
          <template #cell-alt="slotProps">
            <FieldElt type="textarea"
              v-model:value="getProducts()[slotProps.index].alt"
              @keyup.enter="updateProduct(products[slotProps.index]._id)"
              :info="constants.INFO_UP_ALT"/>
          </template>

          <!-- Price -->
          <template #cell-price="slotProps">
            <FieldElt type="number"
              v-model:value="getProducts()[slotProps.index].price"
              @keyup.enter="updateProduct(products[slotProps.index]._id)"
              :info="constants.INFO_UP_PRICE"
              :min="constants.PRICE_MIN"
              :max="constants.PRICE_MAX"/>
          </template>

          <!-- Options -->
          <template #cell-options="slotProps">
            <FieldElt type="textarea"
              v-model:value="getProducts()[slotProps.index].options"
              @keyup.enter="updateProduct(products[slotProps.index]._id)"
              :info="constants.INFO_UP_OPTIONS"
              :min="constants.TEXT_MIN"
              :max="constants.TEXT_MAX"/>
          </template>

          <!-- Category -->
          <template #cell-cat="slotProps">
            <FieldElt type="select"
              :list="constants.CATS_PRODUCT"
              v-model:value="getProducts()[slotProps.index].cat"
              @keyup.enter="updateProduct(products[slotProps.index]._id)"
              :info="constants.INFO_UP_CATEGORY"/>
          </template>

          <!-- Created -->
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

          <!-- Updated -->
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
     * UPDATE PRODUCT
     * @param {string} id 
     */
    updateProduct(id) {
      for (let product of this.products) {
        if (product._id === id) {

          if (this.$serve.checkString(product.name) && 
            this.$serve.checkString(product.description, this.constants.TEXT_MIN, this.constants.TEXT_MAX) && 
            this.$serve.checkString(product.alt) && 
            this.$serve.checkNumber(product.price, this.constants.PRICE_MIN, this.constants.PRICE_MAX) && 
            this.$serve.checkString(product.options, this.constants.TEXT_MIN, this.constants.TEXT_MAX)) {

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

            this.$serve.putData(`/products/${id}`, data)
              .then(() => {
                alert(product.name + this.constants.ALERT_UPDATED);
              })
              .catch(err => { this.$serve.checkError(err) });
          }
        }
      }
    },

    /**
     * DELETE PRODUCT
     * @param {string} id 
     */
    deleteProduct(id) {
      let productName = this.$serve.getItemName(id, this.products);

      if (confirm(`${this.constants.TITLE_DELETE} ${productName} ?`) === true) {
        this.$serve.deleteData(`/products/${id}`)
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
