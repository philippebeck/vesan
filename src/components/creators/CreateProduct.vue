<template>
  <CardElt id="create-product">
    <template #header>
      <i class="fa-solid fa-basket-shopping fa-2x"></i>
      <h3>Create Product</h3>
    </template>

    <template #body>
      <form method="post"
        enctype="multipart/form-data">
        <ListElt :items="['name', 'description', 'image', 'alt', 'price', 'options', 'cat']">

          <!-- Product Name -->
          <template #item-1>
            <FieldElt id="product-name"
              v-model:value="name"
              @keyup.enter="validateNewProduct()"
              info="My beautiful product"
              :min="2">
              <template #legend>
                Name
              </template>
              <template #label>
                Indicate the product name
              </template>
            </FieldElt>
          </template>

          <!-- Product Description -->
          <template #item-2>
            <FieldElt id="product-description"
              type="textarea"
              v-model:value="description"
              @keyup.enter="validateNewProduct()"
              info="This product is wonderful !">
              <template #legend>
                Description
              </template>
              <template #label>
                Indicate the product description
              </template>
            </FieldElt>
          </template>
          
          <!-- Product Image -->
          <template #item-3>
            <FieldElt id="product-image"
              type="file"
              v-model:value="image"
              info="Image file only">
              <template #legend>
                Image
              </template>
              <template #label>
                Provide product image
              </template>
            </FieldElt>
          </template>
          
          <!-- Product Alt -->
          <template #item-4>
            <FieldElt id="product-alt"
              type="textarea"
              v-model:value="alt"
              info="Alternative text">
              <template #legend>
                Alt
              </template>
              <template #label>
                Provide product alt
              </template>
            </FieldElt>
          </template>

          <!-- Product Price -->
          <template #item-5>
            <FieldElt id="product-price"
              type="number"
              v-model:value="price"
              @keyup.enter="validateNewProduct()"
              info="100 €"
              :min="1"
              :max="1000">
              <template #legend>
                Price
              </template>
              <template #label>
                Indicate the product price
              </template>
            </FieldElt>
          </template>

          <!-- Product Options -->
          <template #item-6>
            <FieldElt id="product-options"
              type="textarea"
              v-model:value="options"
              @keyup.enter="validateNewProduct()"
              info="option-1,option-2,option-3,etc"
              :max="100">
              <template #legend>
                Options
              </template>
              <template #label>
                Indicate the product options
              </template>
            </FieldElt>
          </template>

          <!-- Product Category -->
          <template #item-7>
            <FieldElt id="product-cat"
              type="select"
              v-model:value="cat"
              info="Choose a category"
              @keyup.enter="validateNewProduct()"
              :list="cats">
              <template #legend>
                Category
              </template>
              <template #label>
                Choose the product category
              </template>
            </FieldElt>
          </template>
        </ListElt>

        <!-- Create Button -->
        <BtnElt type="button"
          content="Create"
          @click="validateNewProduct()" 
          class="btn-green"
          title="Create a new Product">
          <template #btn>
            <i class="fa-solid fa-square-plus fa-lg"></i>
          </template>
        </BtnElt>
      </form>
    </template>
  </CardElt>
</template>

<script>
import constants from "/constants"

export default {
  name: "CreateProduct",

  data() {
    return {
      name: "",
      description:"",
      image: "",
      alt: "",
      price: null,
      options: [],
      cat: "",
      constants: []
    }
  },

  mounted() {
    this.constants = constants;
  },

  methods: {
    /**
     * VALIDATE NEW PRODUCT IF DATA ARE VALID
     */
    validateNewProduct() {
      if (this.$serve.checkName(this.name)) {
        if (typeof document.getElementById('product-image').files[0] !== "undefined") {

          if (this.cat === "") {
            this.cat = constants.CAT_PRODUCT;
          }
          this.checkNewProduct();

        } else {
          alert("A photo of the product must be uploaded !");
        }
      }
    },

    /**
     * CHECK NEW PRODUCT IF NAME | DESCRIPTION ARE REFERENCED
     */
    checkNewProduct() {
      this.$serve.getData("/api/products")
        .then((products) => {
          let isReferenced = false;

          for (let i = 0; i < products.length; i++) {

            if (products[i].name === this.name) {
              alert(this.name + constants.CHECK_AVAILABLE);
              isReferenced = true;
            }

            if (products[i].description === this.description) {
              alert(this.description + constants.CHECK_REFERENCE);
              isReferenced = true;
            }
          }

          this.createProduct(isReferenced);
        })
        .catch(err => { console.log(err) });
    },

    /**
     * CREATE PRODUCT IF NO INFO IS REFERENCED
     * @param {boolean} isReferenced 
     */
    createProduct(isReferenced) {
      if (!isReferenced) {
        let product  = new FormData();
        let image = document.getElementById('product-image').files[0];

        product.append("name", this.name);
        product.append("description", this.description);
        product.append("image", image);
        product.append("alt", this.alt);
        product.append("price", this.price);
        product.append("options", this.options);
        product.append("cat", this.cat);
        product.append("created", Date.now());
        product.append("updated", Date.now());

        this.$serve.postData("/api/products", product)
          .then(() => {
            alert(product.get("name") + " created !");
            this.$router.go();
          })
          .catch(err => { console.log(err) });
      }
    }
  }
}
</script>