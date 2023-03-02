<template>
  <CardElt>
    <template #header>
      <h3>
        <i class="fa-solid fa-shopping-cart fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.PRODUCT_MANAGER }}
      </h3>
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
            <FieldElt :id="'name-' + products[slotProps.index]._id"
              v-model:value="getProducts()[slotProps.index].name"
              @keyup.enter="validateUpdatedProduct(products[slotProps.index]._id)"
              :info="constants.INFO_UP_NAME"/>
          </template>

          <!-- Description -->
          <template #cell-description="slotProps">
            <FieldElt :id="'description-' + products[slotProps.index]._id"
              type="textarea"
              v-model:value="getProducts()[slotProps.index].description"
              @keyup.enter="validateUpdatedProduct(products[slotProps.index]._id)"
              :info="constants.INFO_UP_DESCRIPTION"
              :max="5000"/>
          </template>

          <!-- Image -->
          <template #cell-image="slotProps">
            <MediaElt :src="'/img/thumbnails/products/' + products[slotProps.index].image"
              :alt="products[slotProps.index].alt"
              :title="products[slotProps.index].name">
            </MediaElt>

            <FieldElt :id="'image-' + products[slotProps.index]._id"
              type="file"
              :info="constants.INFO_UP_IMAGE"/>
          </template>

          <!-- Alt -->
          <template #cell-alt="slotProps">
            <FieldElt :id="'alt-' + products[slotProps.index]._id"
              type="textarea"
              v-model:value="getProducts()[slotProps.index].alt"
              @keyup.enter="validateUpdatedProduct(products[slotProps.index]._id)"
              :info="constants.INFO_UP_ALT"/>
          </template>

          <!-- Price -->
          <template #cell-price="slotProps">
            <FieldElt :id="'price-' + products[slotProps.index]._id"
              type="number"
              v-model:value="getProducts()[slotProps.index].price"
              @keyup.enter="validateUpdatedProduct(products[slotProps.index]._id)"
              :info="constants.INFO_UP_PRICE"
              :min="1"
              :max="1000"/>
          </template>

          <!-- Options -->
          <template #cell-options="slotProps">
            <FieldElt :id="'options-' + products[slotProps.index]._id"
              type="textarea"
              v-model:value="getProducts()[slotProps.index].options"
              @keyup.enter="validateUpdatedProduct(products[slotProps.index]._id)"
              :info="constants.INFO_UP_OPTIONS"/>
          </template>

          <!-- Category -->
          <template #cell-cat="slotProps">
            <FieldElt :id="'cat-' + products[slotProps.index]._id"
              type="select"
              :list="constants.CATS_PRODUCT"
              v-model:value="getProducts()[slotProps.index].cat"
              @keyup.enter="validateUpdatedProduct(products[slotProps.index]._id)"
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
              @click="validateUpdatedProduct(products[slotProps.index]._id)" 
              class="btn-sky"
              :title="constants.TITLE_UPDATE + products[slotProps.index].name">

              <template #btn>
                <i class="fa-solid fa-edit"></i>
              </template>
            </BtnElt>

            <!-- Delete -->
            <BtnElt type="button"
              @click="deleteProduct(products[slotProps.index]._id)" 
              class="btn-red"
              :title="constants.TITLE_DELETE + products[slotProps.index].name">

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
     * VALIDATE UPDATED PRODUCT
     * @param {string} id 
     */
    validateUpdatedProduct(id) {
      for (let i = 0; i < this.products.length; i++ ) {
        if (this.products[i]._id === id) {

          if (this.$serve.checkName(this.products[i].name) &&
            this.$serve.checkText(this.products[i].description)) {

            this.checkUpdatedProduct(i);
          }
        }
      }
    },

    /**
     * CHECK UPDATED PRODUCT IF NAME | DESCRIPTION ARE REFERENCED
     * @param {number} i 
     */
    checkUpdatedProduct(i) {
      this.$serve.getData("/api/products")
        .then((products) => {
          let isReferenced = false;

          for (let j = 0; j < products.length; j++) {
            if (products[j]._id === this.products[i]._id) {
              products.splice(j, 1);
            }

            if (products[j] && products[j].name === this.products[i].name) {
              alert(this.products[i].name + this.constants.ALERT_AVAILABLE);
              isReferenced = true;
            }

            if (products[j] && products[j].description === this.products[i].description) {
              alert(this.products[i].description+ this.constants.ALERT_REFERENCED);
              isReferenced = true;
            }
          }
          this.updateProduct(isReferenced, i);
        })
        .catch(err => { console.log(err) });
    },

    /**
     * UPDATE PRODUCT IF NO INFO IS REFERENCED
     * @param {boolean} isReferenced 
     * @param {number} i 
     */
    updateProduct(isReferenced, i) {
      if (!isReferenced) {

        let product  = new FormData();
        let image = document.getElementById('image-' + this.products[i]._id).files[0];

        if (image === undefined) {
          image = this.products[i].image;
        }

        product.append("name", this.products[i].name);
        product.append("description", this.products[i].description);
        product.append("image", image);
        product.append("alt", this.products[i].alt);
        product.append("price", this.products[i].price);
        product.append("options", this.products[i].options);
        product.append("cat", this.products[i].cat);
        product.append("updated", Date.now());

        this.$serve.putData(`/api/products/${this.products[i]._id}`, product)
          .then(() => {
            alert(product.get("name") + this.constants.ALERT_UPDATED);
            this.$router.go();
          })
          .catch(err => { console.log(err) });
      }
    },

    /**
     * DELETE PRODUCT
     * @param {string} id 
     */
    deleteProduct(id) {
      let productName = "";

      for (let i = 0; i < this.products.length; i++ ) {
        if (this.products[i]._id === id) {
          productName = this.products[i].name;
        }
      }
      
      if (confirm(`${this.constants.TITLE_DELETE} ${productName} ?`) === true) {
        this.$serve.deleteData(`/api/products/${id}`)
          .then(() => {
            alert(productName + this.constants.ALERT_DELETED);
            this.$router.go();
          })
          .catch(err => { console.log(err) });
      }
    }
  }
}
</script>
