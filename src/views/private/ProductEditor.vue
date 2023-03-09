<template>
  <CardElt id="create-product">
    <template #header>
      <h3>
        <i class="fa-regular fa-lightbulb fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.EDIT }}
        {{ product.name }}
      </h3>
    </template>

    <template #body>
      <form method="post"
        enctype="multipart/form-data">
        <ListElt :items="constants.PRODUCT_FORM">

          <!-- Name -->
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

          <!-- Description -->
          <template #item-2>
            <label for="description">
              {{ constants.LEGEND_DESCRIPTION }}
            </label>

            <Editor id="description"
              :api-key="constants.TINY_KEY"
              v-model="product.description"
              @keyup.enter="updateProduct()"
              :init="{
                toolbar:
                  'undo redo outdent indent align lineheight | \
                  bold italic underline strikethrough backcolor | \
                  blocks fontfamily fontsize'
              }"/>
          </template>

          <!-- Image -->
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

          <!-- Alt -->
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

          <!-- Price -->
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

          <!-- Options -->
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

          <!-- Category -->
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

        <!-- Create -->
        <BtnElt type="button"
          @click="updateProduct()" 
          class="btn-blue"
          :content="constants.CONTENT_UPDATE"
          :title="constants.TITLE_UPDATE + product.name">

          <template #btn>
            <i class="fa-solid fa-cloud-arrow-up fa-lg"></i>
          </template>
        </BtnElt>
      </form>
    </template>
  </CardElt>
</template>

<script>
import { mapState, mapActions } from "vuex"
import Editor from "@tinymce/tinymce-vue"

export default {
  name: "ProductEditor",
  components: {
    Editor
  },

  props: ["constants"],
  data() {
    return {
      user: {}
    }
  },

  mounted() {
    if (this.constants.USER_ID) {
      this.$serve.getData("/auth/" + this.constants.USER_ID)
        .then((res) => { 
          this.user = res;

          if (this.checkRole("editor")) {
            this.$store.dispatch("readProduct", this.$route.params.id);
          }
        })
        .catch(err => { alert(err.response.data.message) });

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
     * CHECK ROLE
     * @param {string} role
     * @returns
     */
    checkRole(role) {
      return this.$serve.checkRole(this.user.role, role);
    },

    /**
     * UPDATE PRODUCT
     */
    updateProduct() {
      if (this.$serve.checkString(this.product.name) && 
        this.$serve.checkString(this.product.description, this.constants.TEXT_MIN, this.constants.TEXT_MAX) && 
        this.$serve.checkString(this.product.alt) && 
        this.$serve.checkNumber(this.product.price, this.constants.PRICE_MIN, this.constants.PRICE_MAX) && 
        this.$serve.checkString(this.product.options, this.constants.TEXT_MIN, this.constants.TEXT_MAX)) {

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

        this.$serve.putData(`/products/${this.product._id}`, data)
          .then(() => {
            alert(this.product.name + this.constants.ALERT_UPDATED);
            this.$router.push("/admin");
          })
          .catch(err => {
            if (err.response) {
              alert(err.response.data.message) 
            } else {
              console.log(err);
            }
          });
      }
    }
  }
}
</script>
