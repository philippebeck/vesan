<template>
    <CardElt id="create-link">
    <template #header>
      <h3>
        <i class="fa-solid fa-link fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.CREATE_LINK }}
      </h3>
    </template>

    <template #body>
      <form>
        <ListElt :items="['name', 'url', 'cat']">

          <template #item-1>
            <FieldElt id="name"
              v-model:value="name"
              @keyup.enter="validateNewLink()"
              :info="constants.CREATE_NAME"
              :min="parseInt('2')">
              <template #legend>
                Name
              </template>
              <template #label>
                {{ constants.LABEL_NAME }}
              </template>
            </FieldElt>
          </template>

          <template #item-2>
            <FieldElt id="url"
              type="url"
              v-model:value="url"
              @keyup.enter="validateNewLink()"
              :info="constants.CREATE_URL"
              :min="parseInt('5')"
              :max="parseInt('100')">
              <template #legend>
                URL
              </template>
              <template #label>
                {{ constants.LABEL_URL }}
              </template>
            </FieldElt>
          </template>
          
          <template #item-3>
            <FieldElt id="cat"
              type="select"
              :list="constants.CATS_LINK"
              v-model:value="cat"
              @keyup.enter="validateNewLink()"
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

        <BtnElt type="button"
          @click="validateNewLink()" 
          class="btn-green"
          content="Create"
          :title="constants.CREATE_LINK"/>
      </form>
    </template>
  </CardElt>
</template>

<script>
import constants from "/constants"

export default {
  name: "LinkCreator",

  data() {
    return {
      name: "",
      url: "",
      cat: "",
      constants: {}
    }
  },

  mounted() {
    this.constants = constants;
  },

  methods: {
    /**
     * VALIDATE NEW LINK IF DATA ARE VALID
     */
    validateNewLink() {
      if (this.url.startsWith("http")) {
        this.url = this.url.split('//')[1];
      }

      if (this.$serve.checkName(this.name) &&
        this.$serve.checkUrl(`https://${this.url}`)) {
        if (this.cat === "") {
          this.cat = constants.CAT_LINK;
        }
        this.checkNewLink();
      }
    },

    /**
     * CHECK NEW LINK IF NAME | URL ARE REFERENCED
     */
    checkNewLink() {
      this.$serve.getData("/api/links")
        .then((links) => {
          let isReferenced = false;

          for (let link of links) {

            if (link.name === this.name) {
              alert(this.name + constants.CHECK_AVAILABLE);
              isReferenced = true;
            }
            if (link.url === this.url) {
              alert(this.url + constants.CHECK_REFERENCE);
              isReferenced = true;
            }
          }
          this.createLink(isReferenced);
        })
        .catch(err => { console.log(err) });
    },

    /**
     * CREATE LINK IF NO INFO IS REFERENCED
     * @param {boolean} isReferenced 
     */
    createLink(isReferenced) {
      if (!isReferenced) {
        let link = new FormData();

        link.append("name", this.name);
        link.append("url", this.url);
        link.append("cat", this.cat);

        this.$serve.postData("/api/links", link)
          .then(() => {
            alert(link.get("name") + " created !");
            this.$router.go();
          })
          .catch(err => { console.log(err) });
      }
    }
  }
}
</script>
