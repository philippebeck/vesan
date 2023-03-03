<template>
  <CardElt id="create-product">
    <template #header>
      <h3>
        <i class="fa-solid fa-basket-shopping fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.PRODUCT_CREATOR }}
      </h3>
    </template>

    <template #body>
      <form method="post"
        enctype="multipart/form-data">
        <ListElt :items="constants.PRODUCT_FORM">

          <!-- Product Name -->
          <template #item-1>
            <FieldElt v-model:value="name"
              @keyup.enter="createProduct()"
              :info="constants.INFO_NAME"
              :min="2">

              <template #legend>
                {{ constants.LEGEND_NAME }}
              </template>
              <template #label>
                {{ constants.LABEL_NAME }}
              </template>
            </FieldElt>
          </template>

          <!-- Product Description -->
          <template #item-2>
            <label for="product-description">
              {{ constants.LEGEND_DESCRIPTION }}
            </label>

            <Editor id="product-description"
              :api-key="constants.TINY_KEY"
              v-model="description"
              @keyup.enter="createProduct()"
              :init="{
                toolbar:
                  'undo redo outdent indent align | \
                  bold italic underline strikethrough backcolor'
              }"/>
          </template>

          <!-- Product Image -->
          <template #item-3>
            <FieldElt id="product-image"
              type="file"
              v-model:value="image"
              :info="constants.INFO_IMAGE">

              <template #legend>
                {{ constants.LEGEND_IMAGE }}
              </template>
              <template #label>
                {{ constants.LABEL_IMAGE }}
              </template>
            </FieldElt>
          </template>

          <!-- Product Alt -->
          <template #item-4>
            <FieldElt type="textarea"
              v-model:value="alt"
              :info="constants.INFO_ALT">

              <template #legend>
                {{ constants.LEGEND_ALT }}
              </template>
              <template #label>
                {{ constants.LABEL_ALT }}
              </template>
            </FieldElt>
          </template>

          <!-- Product Price -->
          <template #item-5>
            <FieldElt type="number"
              v-model:value="price"
              @keyup.enter="createProduct()"
              :info="constants.INFO_PRICE"
              :min="1"
              :max="1000">

              <template #legend>
                {{ constants.LEGEND_PRICE }}
              </template>
              <template #label>
                {{ constants.LABEL_PRICE }}
              </template>
            </FieldElt>
          </template>

          <!-- Product Options -->
          <template #item-6>
            <FieldElt type="textarea"
              v-model:value="options"
              @keyup.enter="createProduct()"
              :info="constants.INFO_OPTIONS"
              :max="100">

              <template #legend>
                {{ constants.LEGEND_OPTIONS }}
              </template>
              <template #label>
                {{ constants.LABEL_OPTIONS }}
              </template>
            </FieldElt>
          </template>

          <!-- Product Category -->
          <template #item-7>
            <FieldElt type="select"
              :list="constants.CATS_PRODUCT"
              v-model:value="cat"
              @keyup.enter="createProduct()"
              :info="constants.INFO_CATEGORY">

              <template #legend>
                {{ constants.LEGEND_CATEGORY }}
              </template>
              <template #label>
                {{ constants.LABEL_CATEGORY }}
              </template>
            </FieldElt>
          </template>
        </ListElt>

        <!-- Create Button -->
        <BtnElt type="button"
          @click="createProduct()" 
          class="btn-green"
          :content="constants.CONTENT_CREATE"
          :title="constants.PRODUCT_CREATOR">

          <template #btn>
            <i class="fa-solid fa-square-plus fa-lg"></i>
          </template>
        </BtnElt>
      </form>
    </template>
  </CardElt>
</template>

<script>
import Editor from "@tinymce/tinymce-vue"

export default {
  name: "ProductCreator",
  components: {
    Editor
  },
  props: ["constants"],

  data() {
    return {
      name: "",
      description:"",
      image: "",
      alt: "",
      price: null,
      options: "",
      cat: ""
    }
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
            this.cat = this.constants.CAT_PRODUCT;
          }
          this.checkNewProduct();

        } else {
          alert(this.constants.ALERT_IMG);
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
              alert(this.name + this.constants.ALERT_AVAILABLE);
              isReferenced = true;
            }

            if (product.description === this.description) {
              alert(this.description + this.constants.ALERT_REFERENCED);
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
            alert(this.name + this.constants.ALERT_CREATED);
            this.$router.go();
          })
          .catch(err => { console.log(err) });
      }
    }
  }
}
</script>