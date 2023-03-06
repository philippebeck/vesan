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
            <FieldElt v-model:value="name"
              @keyup.enter="createLink()"
              :info="constants.INFO_NAME">

              <template #legend>
                {{ constants.LEGEND_NAME }}
              </template>
              <template #label>
                {{ constants.LABEL_NAME }}
              </template>
            </FieldElt>
          </template>

          <template #item-2>
            <FieldElt type="url"
              v-model:value="url"
              @keyup.enter="createLink()"
              :info="constants.INFO_URL"
              :min="constants.URL_MIN"
              :max="constants.URL_MAX">

              <template #legend>
                {{ constants.LEGEND_URL }}
              </template>
              <template #label>
                {{ constants.LABEL_URL }}
              </template>
            </FieldElt>
          </template>
          
          <template #item-3>
            <FieldElt type="select"
              :list="constants.CATS_LINK"
              v-model:value="cat"
              @keyup.enter="createLink()"
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
          @click="createLink()" 
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
     * CREATE LINK
     */
    createLink() {
      if (this.url.startsWith("http")) { this.url = this.url.split('//')[1] }
      if (this.cat === "") { this.cat = this.constants.CAT_LINK }

      if (this.$serve.checkString(this.name) && this.$serve.checkUrl(`https://${this.url}`)) {
        let link = new FormData();

        link.append("name", this.name);
        link.append("url", this.url);
        link.append("cat", this.cat);

        this.$serve.postData("/api/links", link)
          .then(() => {
            alert(this.name + this.constants.ALERT_CREATED);
            this.$router.go();
          })
          .catch(err => { alert(err.response.data.message) });
      }
    }
  }
}
</script>
