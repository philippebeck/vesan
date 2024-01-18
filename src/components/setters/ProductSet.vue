<template>
  <CardElt id="product-set">
    <template #header>
      <h2>
        <i class="fa-regular fa-lightbulb fa-lg"></i>
        {{ val.PRODUCT_MANAGER }}
      </h2>
    </template>

    <template #body>
      <form enctype="multipart/form-data">
        <ListElt :items="val.PRODUCT_FORM">

          <template #item-1>
            <FieldElt id="name"
              v-model:value="name"
              @keyup.enter="createProduct()"
              :info="val.INFO_NAME">
              <template #legend>{{ val.LEGEND_NAME }}</template>
              <template #label>{{ val.LABEL_NAME }}</template>
            </FieldElt>
          </template>

          <template #item-2>
            <label for="description">{{ val.LEGEND_DESCRIPTION }}</label>
            <Editor id="description"
              :api-key="val.TINY_KEY"
              v-model="description"
              @keyup.enter="createProduct()"
              :init="val.TINY_INIT"/>
          </template>

          <template #item-3>
            <FieldElt id="image"
              type="file"
              v-model:value="image"
              :info="val.INFO_IMAGE">
              <template #legend>{{ val.LEGEND_IMAGE }}</template>
              <template #label>{{ val.LABEL_IMAGE }}</template>
            </FieldElt>
          </template>

          <template #item-4>
            <FieldElt id="alt"
              type="textarea"
              v-model:value="alt"
              :info="val.INFO_ALT">
              <template #legend>{{ val.LEGEND_ALT }}</template>
              <template #label>{{ val.LABEL_ALT }}</template>
            </FieldElt>
          </template>

          <template #item-5>
            <FieldElt id="price"
              type="number"
              v-model:value="price"
              @keyup.enter="createProduct()"
              :info="val.INFO_PRICE"
              :min="val.PRICE_MIN"
              :max="val.PRICE_MAX">
              <template #legend>{{ val.LEGEND_PRICE }}</template>
              <template #label>{{ val.LABEL_PRICE }}</template>
            </FieldElt>
          </template>

          <template #item-6>
            <FieldElt id="options"
              type="textarea"
              v-model:value="options"
              @keyup.enter="createProduct()"
              :info="val.INFO_OPTIONS"
              :max="100">
              <template #legend>{{ val.LEGEND_OPTIONS }}</template>
              <template #label>{{ val.LABEL_OPTIONS }}</template>
            </FieldElt>
          </template>

          <template #item-7>
            <FieldElt id="cat"
              type="select"
              :list="val.CATS_PRODUCT"
              v-model:value="cat"
              @keyup.enter="createProduct()"
              :info="val.INFO_CAT">
              <template #legend>{{ val.LEGEND_CAT }}</template>
              <template #label>{{ val.LABEL_CAT }}</template>
            </FieldElt>
          </template>
        </ListElt>

        <BtnElt type="button"
          @click="createProduct()" 
          class="btn-green"
          :content="val.CONTENT_CREATE"
          :title="val.TITLE_PRODUCT">
          <template #btn>
            <i class="fa-solid fa-square-plus fa-lg"></i>
          </template>
        </BtnElt>
      </form>
    </template>
  </CardElt>
</template>

<script>
import { checkRange, postData, setError } from "servidio"

import BtnElt from "../elements/BtnElt"
import CardElt from "../elements/CardElt"
import FieldElt from "../elements/FieldElt"
import ListElt from "../elements/ListElt"
import Editor from "@tinymce/tinymce-vue"

export default {
  name: "ProductSet",
  components: { BtnElt, CardElt, FieldElt, ListElt, Editor },
  props: ["token", "val"],
  data() {
    return {
      name: "",
      description:"",
      image: "",
      alt: "",
      price: null,
      options: [],
      cat: ""
    }
  },

  methods: {
    /**
     * ? CREATE PRODUCT
     * * Create a product by sending a POST request to the server.
     */
    createProduct() {
      const { ALERT_CREATED, ALERT_IMG, API_URL, CAT_PRODUCT, CHECK_STRING, TEXT_MAX, TEXT_MIN } = this.val;

      if (this.price < 1) this.price = 1;
      if (this.cat === "") this.cat = CAT_PRODUCT;

      const IS_NAME_CHECKED = checkRange(this.name, CHECK_STRING);
      const IS_DESC_CHECKED = checkRange(this.description, CHECK_STRING, TEXT_MIN, TEXT_MAX);
      const IS_ALT_CHECKED  = checkRange(this.alt, CHECK_STRING);

      if (IS_NAME_CHECKED && IS_DESC_CHECKED && IS_ALT_CHECKED) {
        const img = document.getElementById("image")?.files[0];

        if (img !== undefined) {
          const URL   = `${API_URL}/products`;
          const data  = new FormData();

          data.append("name", this.name);
          data.append("description", this.description);
          data.append("image", img);
          data.append("alt", this.alt);
          data.append("price", this.price);
          data.append("options", this.options);
          data.append("cat", this.cat);

          postData(URL, data, this.token)
            .then(() => {
              alert(this.name + ALERT_CREATED);
              this.$router.go();
            })
            .catch(err => setError(err));

        } else {
          alert(ALERT_IMG);
        }
      }
    }
  }
}
</script>
