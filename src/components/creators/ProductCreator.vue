<template>
  <CardElt id="create-product">
    <template #header>
      <h3>
        <i class="fa-solid fa-basket-shopping fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.CREATE_PRODUCT }}
      </h3>
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
              :info="constants.CREATE_NAME"
              :min="2">
              <template #legend>
                Name
              </template>
              <template #label>
                {{ constants.LABEL_NAME }}
              </template>
            </FieldElt>
          </template>

          <!-- Product Description -->
          <template #item-2>
            <FieldElt id="product-description"
              type="textarea"
              v-model:value="description"
              @keyup.enter="validateNewProduct()"
              :info="constants.CREATE_DESCRIPTION"
              :max="5000">
              <template #legend>
                Description
              </template>
              <template #label>
                {{ constants.LABEL_DESCRIPTION }}
              </template>
            </FieldElt>
          </template>
          
          <!-- Product Image -->
          <template #item-3>
            <FieldElt id="product-image"
              type="file"
              v-model:value="image"
              :info="constants.CREATE_IMAGE">
              <template #legend>
                Image
              </template>
              <template #label>
                {{ constants.LABEL_IMAGE }}
              </template>
            </FieldElt>
          </template>
          
          <!-- Product Alt -->
          <template #item-4>
            <FieldElt id="product-alt"
              type="textarea"
              v-model:value="alt"
              :info="constants.CREATE_ALT">
              <template #legend>
                Alt
              </template>
              <template #label>
                {{ constants.LABEL_ALT }}
              </template>
            </FieldElt>
          </template>

          <!-- Product Price -->
          <template #item-5>
            <FieldElt id="product-price"
              type="number"
              v-model:value="price"
              @keyup.enter="validateNewProduct()"
              :info="constants.CREATE_PRICE"
              :min="1"
              :max="1000">
              <template #legend>
                Price
              </template>
              <template #label>
                {{ constants.LABEL_PRICE }}
              </template>
            </FieldElt>
          </template>

          <!-- Product Options -->
          <template #item-6>
            <FieldElt id="product-options"
              type="textarea"
              v-model:value="options"
              @keyup.enter="validateNewProduct()"
              :info="constants.CREATE_OPTIONS"
              :max="100">
              <template #legend>
                Options
              </template>
              <template #label>
                {{ constants.LABEL_OPTIONS }}
              </template>
            </FieldElt>
          </template>

          <!-- Product Category -->
          <template #item-7>
            <FieldElt id="product-cat"
              type="select"
              :list="constants.CATS_PRODUCT"
              v-model:value="cat"
              @keyup.enter="validateNewProduct()"
              :info="constants.CREATE_CATEGORY">
              <template #legend>
                Category
              </template>
              <template #label>
                {{ constants.LABEL_CATEGORY }}
              </template>
            </FieldElt>
          </template>
        </ListElt>

        <!-- Create Button -->
        <BtnElt type="button"
          @click="validateNewProduct()" 
          class="btn-green"
          content="Create"
          :title="constants.CREATE_PRODUCT">
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
  name: "ProductCreator",

  data() {
    return {
      name: "",
      description:"",
      image: "",
      alt: "",
      price: null,
      options: "",
      cat: "",
      constants: {}
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
      if (this.$serve.checkName(this.name) &&
        this.$serve.checkText(this.description)) {

        if (document.getElementById('product-image').files[0] !== undefined) {

          if (this.cat === "") {
            this.cat = constants.CAT_PRODUCT;
          }
          this.checkNewProduct();

        } else {
          alert(constants.IMG_PRODUCT);
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

          for (let product of products) {

            if (product.name === this.name) {
              alert(this.name + constants.CHECK_AVAILABLE);
              isReferenced = true;
            }

            if (product.description === this.description) {
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