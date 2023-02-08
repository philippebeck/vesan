<template>
  <CardElt>
    <template #header>
      <i class="fa-solid fa-shopping-cart fa-2x"></i>
      <h3>List Products</h3>
    </template>

    <template #body>
      <form method="post"
        enctype="multipart/form-data">
        <TableElt :items="products">

          <!-- Last Table Head -->
          <template #head>
            up/del
          </template>

          <!-- Product Id -->
          <template #cell-_id="slotProps">
            <b>#{{ slotProps.index + 1 }}</b>
            ({{ products[slotProps.index]._id }})
          </template>

          <!-- Product Name -->
          <template #cell-name="slotProps">
            <FieldElt :id="'name-' + products[slotProps.index]._id"
              v-model:value="getProducts()[slotProps.index].name"
              info="Update the product name"
              @keyup.enter="validateUpdatedProduct(products[slotProps.index]._id)">
            </FieldElt>
          </template>

          <!-- Product Description -->
          <template #cell-description="slotProps">
            <FieldElt :id="'description-' + products[slotProps.index]._id"
              type="textarea"
              v-model:value="getProducts()[slotProps.index].description"
              info="Update the product description"
              @keyup.enter="validateUpdatedProduct(products[slotProps.index]._id)">
            </FieldElt>
          </template>

          <!-- Product Image -->
          <template #cell-image="slotProps">
            <MediaElt :src="'/img/thumbnails/products/' + products[slotProps.index].image"
              :alt="products[slotProps.index].alt"
              :title="products[slotProps.index].name">
            </MediaElt>
            <FieldElt :id="'image-' + products[slotProps.index]._id"
              type="file"
              info="Update the product image">
            </FieldElt>
          </template>

          <!-- Product Alt -->
          <template #cell-alt="slotProps">
            <FieldElt :id="'alt-' + products[slotProps.index]._id"
              type="textarea"
              v-model:value="getProducts()[slotProps.index].alt"
              info="Update the product alt"
              @keyup.enter="validateUpdatedProduct(products[slotProps.index]._id)">
            </FieldElt>
          </template>

          <!-- Product Price -->
          <template #cell-price="slotProps">
            <FieldElt :id="'price-' + products[slotProps.index]._id"
              type="number"
              v-model:value="getProducts()[slotProps.index].price"
              @keyup.enter="validateUpdatedProduct(products[slotProps.index]._id)"
              info="Update the product price"
              :min="1"
              :max="1000">
            </FieldElt>
          </template>

          <!-- Product Options -->
          <template #cell-options="slotProps">
            <FieldElt :id="'options-' + products[slotProps.index]._id"
              type="textarea"
              v-model:value="getProducts()[slotProps.index].options"
              @keyup.enter="validateUpdatedProduct(products[slotProps.index]._id)"
              info="Update the options">
              {{ value }}
            </FieldElt>
          </template>

          <!-- Product Category -->
          <template #cell-cat="slotProps">
            <FieldElt :id="'cat-' + products[slotProps.index]._id"
              type="select"
              v-model:value="getProducts()[slotProps.index].cat"
              info="Update the category"
              @keyup.enter="validateUpdatedProduct(products[slotProps.index]._id)"
              :list="cats">
              {{ value }}
            </FieldElt>
          </template>

          <!-- Product Created -->
          <template #cell-created="slotProps">
            {{ new Date(products[slotProps.index].created).toLocaleString() }}
          </template>

          <!-- Product Updated -->
          <template #cell-updated="slotProps">
            {{ new Date(products[slotProps.index].updated).toLocaleString() }}
          </template>

          <template #body="slotProps">

            <!-- Update Button -->
            <BtnElt type="button"
              @click="validateUpdatedProduct(products[slotProps.index]._id)" 
              class="btn-sky"
              :title="'Update ' + products[slotProps.index].name">
              <template #btn>
                <i class="fa-solid fa-edit"></i>
              </template>
            </BtnElt>

            <!-- Delete Button -->
            <BtnElt type="button"
              @click="deleteProduct(products[slotProps.index]._id)" 
              class="btn-red"
              :title="'Delete ' + products[slotProps.index].name">
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
  name: "ListProducts",
  props: ["products"],

  data() {
    return {
      cats: []
    }
  },

  mounted() {
    this.cats = constants.CATS_PRODUCT;
  },

  methods: {
    /**
     * GET ALL PRODUCTS
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

          if (this.$serve.checkName(this.products[i].name)) {
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
              alert(this.products[i].name + constants.CHECK_AVAILABLE);
              isReferenced = true;
            }

            if (products[j] && products[j].description === this.products[i].description) {
              alert(this.products[i].description+ constants.CHECK_REFERENCE);
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

        if (typeof image !== "undefined") {
          product.append("image", image);
        }

        product.append("id", this.products[i]._id);
        product.append("name", this.products[i].name);
        product.append("description", this.products[i].description);
        product.append("alt", this.products[i].alt);
        product.append("price", this.products[i].price);
        product.append("options", this.products[i].options);
        product.append("cat", this.products[i].cat);
        product.append("updated", Date.now());

        this.$serve.putData(`/api/products/${product.get("id")}`, product)
          .then(() => {
            alert(product.get("name") + " updated !");
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
      
      if (confirm(`Delete ${productName} ?`) === true) {
        this.$serve.deleteData(`/api/products/${id}`)
          .then(() => {
            alert(productName + " deleted !");
            this.$router.go();
          })
          .catch(err => { console.log(err) });
      }
    }
  }
}
</script>
