<template>
    <CardElt id="create-link">
    <template #header>
      <i class="fa-solid fa-link fa-2x"></i>
      <h3>{{ constants.CREATE_LINK }}</h3>
    </template>

    <template #body>
      <form>
        <ListElt :items="['name', 'url', 'cat']">

          <template #item-1>
            <FieldElt id="name"
              v-model:value="name"
              :info="constants.CREATE_NAME"
              @keyup.enter="validateNewLink()"
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
              :info="constants.CREATE_URL"
              @keyup.enter="validateNewLink()"
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
              v-model:value="cat"
              :info="constants.CREATE_CATEGORY"
              @keyup.enter="validateNewLink()"
              :list="constants.CATS_LINK">
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
          content="Create"
          @click="validateNewLink()" 
          class="btn-green"
          :title="constants.CREATE_LINK"/>
      </form>
    </template>
  </CardElt>
</template>

<script>
import constants from "/constants"

export default {
  name: "CreateLink",

  data() {
    return {
      name: "",
      url: "",
      cat: "",
      constants: []
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
      if (this.$serve.checkName(this.name) /*&&
        this.$serve.checkUrl(this.url)*/) {
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

          for (let i = 0; i < links.length; i++) {
            if (links[i].name === this.name) {
              alert(this.name + constants.CHECK_AVAILABLE);
              isReferenced = true;
            }
            if (links[i].url === this.url) {
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
