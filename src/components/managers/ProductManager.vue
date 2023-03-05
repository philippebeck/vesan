<template>
  <CardElt>
    <template #header>
      <h2>
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

          <template #head>
            {{ constants.HEAD_UP }}
          </template>

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
              class="btn-blue"
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
              :min="1"
              :max="1000"/>
          </template>

          <!-- Options -->
          <template #cell-options="slotProps">
            <FieldElt type="textarea"
              v-model:value="getProducts()[slotProps.index].options"
              @keyup.enter="updateProduct(products[slotProps.index]._id)"
              :info="constants.INFO_UP_OPTIONS"/>
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
            {{ new Date(products[slotProps.index].created).toLocaleString() }}
          </template>

          <!-- Updated -->
          <template #cell-updated="slotProps">
            {{ new Date(products[slotProps.index].updated).toLocaleString() }}
          </template>

          <template #body="slotProps">

            <!-- Update -->
            <BtnElt type="button"
              @click="updateProduct(products[slotProps.index]._id)" 
              class="btn-sky"
              :title="constants.TITLE_UPDATE + products[slotProps.index].name">

              <template #btn>
                <i class="fa-solid fa-cloud-arrow-up fa-lg fa-fw"></i>
              </template>
            </BtnElt>

            <!-- Delete -->
            <BtnElt type="button"
              @click="deleteProduct(products[slotProps.index]._id)" 
              class="btn-red"
              :title="constants.TITLE_DELETE + products[slotProps.index].name">

              <template #btn>
                <i class="fa-solid fa-trash-arrow-up fa-lg fa-fw"></i>
              </template>
            </BtnElt>

          </template>
        </TableElt>
      </form>
    </template>
  </CardElt>
</template>

<script>
export default {
  name: "ProductManager",
  props: ["constants", "products"],

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
            this.$serve.checkString(product.alt, this.constants.TEXT_MIN, this.constants.TEXT_MAX)) {

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

            this.$serve.putData(`/api/products/${id}`, data)
              .then(() => {
                alert(product.name + this.constants.ALERT_UPDATED);
                this.$router.go();
              })
              .catch(err => { alert(err.response.data.message) });
          }
        }
      }
    },

    /**
     * DELETE PRODUCT
     * @param {string} id 
     */
    deleteProduct(id) {
      let productName = "";

      for (let product of this.products) {
        if (product._id === id) {
          productName = product.name;
        }
      }
      
      if (confirm(`${this.constants.TITLE_DELETE} ${productName} ?`) === true) {
        this.$serve.deleteData(`/api/products/${id}`)
          .then(() => {
            alert(productName + this.constants.ALERT_DELETED);
            this.$router.go();
          })
          .catch(err => { alert(err.response.data.message) });
      }
    }
  }
}
</script>
