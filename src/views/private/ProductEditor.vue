<template>
  <main>
    <header>
      <h1>
        <i class="fa-regular fa-pen-to-square fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.EDITOR }}
      </h1>
    </header>

    <CardElt id="create-product">
      <template #header>
        <h2>{{ product.name }}</h2>
      </template>

      <template #body>
        <form method="post"
          enctype="multipart/form-data">
          <ListElt :items="constants.PRODUCT_FORM">

            <template #item-1>
              <FieldElt v-model:value="product.name"
                @keyup.enter="updateProduct()"
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

            <template #item-2>
              <label for="description">
                {{ constants.LEGEND_DESCRIPTION }}
              </label>

              <Editor id="description"
                :api-key="constants.TINY_KEY"
                v-model="product.description"
                :init="{
                  toolbar:
                    'undo redo outdent indent align lineheight | \
                    bold italic underline strikethrough backcolor | \
                    blocks fontfamily fontsize'
                }"/>
            </template>

            <template #item-3>
              <MediaElt v-if="product.image"
                :src="'/img/thumbnails/products/' + product.image"
                :alt="product.alt" />

              <FieldElt id="image"
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

            <template #item-4>
              <FieldElt type="textarea"
                v-model:value="product.alt"
                :info="constants.INFO_ALT">

                <template #legend>
                  {{ constants.LEGEND_ALT }}
                </template>
                <template #label>
                  {{ constants.LABEL_ALT }}
                </template>
              </FieldElt>
            </template>

            <template #item-5>
              <FieldElt type="number"
                v-model:value="product.price"
                @keyup.enter="updateProduct()"
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

            <template #item-6>
              <FieldElt type="textarea"
                v-model:value="product.options"
                @keyup.enter="updateProduct()"
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

            <template #item-7>
              <FieldElt type="select"
                :list="constants.CATS_PRODUCT"
                v-model:value="product.cat"
                @keyup.enter="updateProduct()"
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

          <BtnElt type="button"
            @click="updateProduct()" 
            class="btn-sky"
            :content="constants.CONTENT_UPDATE"
            :title="constants.TITLE_UPDATE + product.name">

            <template #btn>
              <i class="fa-solid fa-cloud-arrow-up fa-lg"></i>
            </template>
          </BtnElt>
        </form>
      </template>
    </CardElt>
  </main>
</template>

<script>
import BtnElt from "@/assets/elements/BtnElt"
import CardElt from "@/assets/elements/CardElt"
import FieldElt from "@/assets/elements/FieldElt"
import ListElt from "@/assets/elements/ListElt"
import MediaElt from "@/assets/elements/MediaElt"

import Editor from "@tinymce/tinymce-vue"
import { checkRange, checkRole, getData, putData, setError, setMeta } from "servidio"
import { mapState, mapActions } from "vuex"

export default {
  name: "ProductEditor",
  components: {
    BtnElt,
    CardElt,
    FieldElt,
    ListElt,
    MediaElt,
    Editor
  },

  props: ["constants"],
  data() {
    return {
      user: {}
    }
  },

  created() {
    setMeta(
      this.constants.HEAD_PRODUCT, 
      this.constants.META_PRODUCT,
      this.constants.UI_URL,
      this.constants.UI_URL + this.constants.LOGO_SRC
    );
  
    if (this.constants.USER_ID) {
      getData(this.constants.API_URL + "/auth/" + this.constants.USER_ID)
        .then((res) => { 
          this.user = res;

          if (checkRole(this.user.role, "editor")) {
            this.$store.dispatch("readProduct", this.$route.params.id);
          }
        })
        .catch(err => { 
          setError(err);
          this.$router.push("/admin");
        });

    } else {
      alert(this.constants.ALERT_HOME);
      this.$router.push("/");
    }
  },

  computed: {
    ...mapState(["product"])
  },

  methods: {
    ...mapActions(["readProduct"]),

    /**
     * UPDATE PRODUCT
     */
    updateProduct() {
      const PRICE_MAX  = this.constants.PRICE_MAX;
      const PRICE_MIN  = this.constants.PRICE_MIN;
      const PRICE_MSG  = this.constants.CHECK_NUMBER;
      const STRING_MSG = this.constants.CHECK_STRING;
      const TEXT_MAX   = this.constants.TEXT_MAX;
      const TEXT_MIN   = this.constants.TEXT_MIN;

      if (checkRange(this.product.name, STRING_MSG) && 
          checkRange(this.product.description, STRING_MSG, TEXT_MIN, TEXT_MAX) && 
          checkRange(this.product.alt, STRING_MSG) && 
          checkRange(this.product.price, PRICE_MSG, PRICE_MIN, PRICE_MAX) && 
          checkRange(this.product.options, STRING_MSG, TEXT_MIN, TEXT_MAX)) {

        let data  = new FormData();
        let image = document.getElementById("image").files[0] ?? this.product.image;

        data.append("name", this.product.name);
        data.append("description", this.product.description);
        data.append("image", image);
        data.append("alt", this.product.alt);
        data.append("price", this.product.price);
        data.append("options", this.product.options);
        data.append("cat", this.product.cat);
        data.append("created", this.product.created);
        data.append("updated", Date.now());

        putData(this.constants.API_URL + "/products/" + this.product._id, data)
          .then(() => {
            alert(this.product.name + this.constants.ALERT_UPDATED);
            this.$router.push("/admin");
          })
          .catch(err => { setError(err) });
      }
    }
  }
}
</script>
