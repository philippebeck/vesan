<template>
  <CardElt>
    <template #header>
      <h2 id="create-link">
        <i class="fa-solid fa-link fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.LINK_CREATOR }}
      </h2>
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
import BtnElt from "@/assets/BtnElt"
import CardElt from "@/assets/CardElt"
import FieldElt from "@/assets/FieldElt"
import ListElt from "@/assets/ListElt"

export default {
  name: "LinkCreator",
  components: {
    BtnElt,
    CardElt,
    FieldElt,
    ListElt
  },

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
      let nameMsg = this.constants.CHECK_STRING;
      let urlMsg  = this.constants.CHECK_URL;
      let regex   = this.constants.REGEX_URL;

      if (this.url.startsWith("http")) { this.url = this.url.split('//')[1] }
      if (this.cat === "") { this.cat = this.constants.CAT_LINK }

      if (this.$serve.checkRange(this.name, nameMsg) && 
          this.$serve.checkRegex(`https://${this.url}`, urlMsg, regex)) {

        let link = new FormData();
        link.append("name", this.name);
        link.append("url", this.url);
        link.append("cat", this.cat);

        let url = this.constants.API_URL + "/links";
        let options = {
            method: "POST",
            mode: "cors",
            headers: { "Authorization": `Bearer ${this.constants.TOKEN}` },
            body: link
          };

        this.$serve.fetchSet(url, options)
          .then(() => {
            alert(this.name + this.constants.ALERT_CREATED);
            this.$router.go();
          })
          .catch(err => { this.$serve.checkError(err) });
      }
    }
  }
}
</script>
