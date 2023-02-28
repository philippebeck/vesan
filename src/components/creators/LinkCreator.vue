<template>
    <CardElt id="create-link">
    <template #header>
      <h3>
        <i class="fa-solid fa-link fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.LINK_CREATOR }}
      </h3>
    </template>

    <template #body>
      <form>
        <ListElt :items="constants.LINK_FORM">

          <template #item-1>
            <FieldElt id="name"
              v-model:value="name"
              @keyup.enter="validateNewLink()"
              :info="constants.INFO_NAME"
              :min="parseInt('2')">

              <template #legend>
                {{ constants.LEGEND_NAME }}
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
              :info="constants.INFO_URL"
              :min="parseInt('5')"
              :max="parseInt('100')">

              <template #legend>
                {{ constants.LEGEND_URL }}
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
          @click="validateNewLink()" 
          class="btn-green"
          :content="constants.CONTENT_CREATE"
          :title="constants.LINK_CREATOR">

          <template #btn>
            <i class="fa-solid fa-square-plus fa-lg"></i>
          </template>
        </BtnElt>
      </form>
    </template>
  </CardElt>
</template>

<script>
export default {
  name: "LinkCreator",
  props: ["constants"],

  data() {
    return {
      name: "",
      url: "",
      cat: ""
    }
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
          this.cat = this.constants.CAT_LINK;
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
              alert(this.name + this.constants.ALERT_AVAILABLE);
              isReferenced = true;
            }
            if (link.url === this.url) {
              alert(this.url + this.constants.ALERT_REFERENCED);
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
            alert(this.name + this.constants.ALERT_CREATED);
            this.$router.go();
          })
          .catch(err => { console.log(err) });
      }
    }
  }
}
</script>
