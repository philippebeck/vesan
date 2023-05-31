<template>
    <CardElt>
    <template #header>
      <h2 id="link">
        <i class="fa-solid fa-link fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.LINK_MANAGER }}
      </h2>
    </template>

    <template #body>
      <form>
        <TableElt :title="table[0].cat"
          :items="table"
          v-for="table in getItemsByCategory(links)"
          :key="table"
          :id="table[0].cat">

          <template #title>
            <i :class="`fa-brands fa-${table[0].cat.toLowerCase()} fa-5x sky`"></i>
          </template>

          <template #head>{{ constants.HEAD_UP }}</template>

          <template #cell-_id="slotProps">
            #{{ slotProps.index + 1 }}
            ({{ slotProps.item._id }})
          </template>

          <template #cell-name="slotProps">
            <FieldElt v-model:value="table[slotProps.index].name"
              @keyup.enter="updateLink(table[slotProps.index]._id)"
              :info="constants.INFO_UP_NAME"/>
          </template>

          <template #cell-url="slotProps">
            <FieldElt type="url"
              v-model:value="table[slotProps.index].url"
              @keyup.enter="updateLink(table[slotProps.index]._id)"
              :info="constants.INFO_UP_URL"
              :max="parseInt('100')"/>
          </template>

          <template #cell-cat="slotProps">
            <FieldElt type="select"
              :list="constants.CATS_LINK"
              v-model:value="table[slotProps.index].cat"
              @keyup.enter="updateLink(table[slotProps.index]._id)"
              :info="constants.INFO_UP_CATEGORY"/>
          </template>

          <template #body="slotProps">
            <BtnElt type="button"
              @click="updateLink(table[slotProps.index]._id)" 
              class="btn-sky"
              :title="'Update ' + table[slotProps.index].name">
              <template #btn>
                <i class="fa-solid fa-cloud-arrow-up fa-lg fa-fw"></i>
              </template>
            </BtnElt>

            <BtnElt type="button"
              @click="deleteLink(table[slotProps.index]._id)" 
              class="btn-red"
              :title="'Delete ' + table[slotProps.index].name">
              <template #btn>
                <i class="fa-solid fa-trash-arrow-up fa-lg fa-fw"></i>
              </template>
            </BtnElt>
          </template>
        </TableElt>
      </form>
    </template>
  </CardElt>
</template>

<script>
import { deleteData, putData } from "../assets/axios"
import { checkError, checkRange, checkRegex, getItemName, getItemsByCat } from "../assets/serve"

import BtnElt from "../assets/BtnElt"
import CardElt from "../assets/CardElt"
import FieldElt from "../assets/FieldElt"
import TableElt from "../assets/TableElt"

export default {
  name: "LinkManager",
  components: {
    BtnElt,
    CardElt,
    FieldElt,
    TableElt
  },

  props: [
    "constants", 
    "links"
  ],

  methods: {
    /**
     * GET LINKS
     */
    getLinks() {
      return this.links;
    },

    /**
     * SORT ITEMS BY CATEGORY
     * @param {array} items 
     */
    getItemsByCategory(items) {
      return getItemsByCat(items);
    },

    /**
     * GET LINK
     * @param {object} link 
     */
    getLink(link) {
      let data = new FormData();

      data.append("name", link.name);
      data.append("url", link.url);
      data.append("cat", link.cat);

      return data;
    },

    /**
     * CHECK LINK
     * @param {object} link 
     */
    checkLink(link) {
      if (link.url.startsWith("http")) { link.url = link.url.split('//')[1] }

      const NAME_MSG  = this.constants.CHECK_STRING;
      const REGEX     = this.constants.REGEX_URL;
      const URL_MSG   = this.constants.CHECK_URL;

      if (checkRange(link.name, NAME_MSG) && 
          checkRegex(`https://${link.url}`, URL_MSG, REGEX)) {

        putData("/links/" + link._id, this.getLink(link))
          .then(() => {
            alert(link.name + this.constants.ALERT_UPDATED);
          })
          .catch(err => { checkError(err) });
      }
    },

    /**
     * UPDATE LINK
     * @param {string} id
     */
    updateLink(id) {
      for (let link of this.links) {
        if (link._id === id) { this.checkLink(link) }
      }
    },

    /**
     * DELETE LINK
     * @param {string} id 
     */
    deleteLink(id) {
      let name = getItemName(id, this.links);

      if (confirm(`${this.constants.TITLE_DELETE} ${name} ?`) === true) {
        deleteData("/links/" + id)
          .then(() => {
            alert(name + this.constants.ALERT_DELETED);
            this.$router.go();
          })
          .catch(err => { checkError(err) });
      }
    }
  }
}
</script>
