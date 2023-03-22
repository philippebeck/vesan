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
          v-for="table in getItemsByCat(links)"
          :key="table"
          :id="table[0].cat">

          <template #title>
            <i :class="`fa-brands fa-${table[0].cat.toLowerCase()} fa-5x sky`"></i>
          </template>

          <template #head>up/del</template>

          <!-- Id -->
          <template #cell-_id="slotProps">
            #{{ slotProps.index + 1 }}
            ({{ slotProps.item._id }})
          </template>

          <!-- Name -->
          <template #cell-name="slotProps">
            <FieldElt v-model:value="table[slotProps.index].name"
              @keyup.enter="updateLink(table[slotProps.index]._id)"
              :info="constants.INFO_UP_NAME"/>
          </template>

          <!-- URL -->
          <template #cell-url="slotProps">
            <FieldElt type="url"
              v-model:value="table[slotProps.index].url"
              @keyup.enter="updateLink(table[slotProps.index]._id)"
              :info="constants.INFO_UP_URL"
              :max="parseInt('100')"/>
          </template>

          <!-- Category -->
          <template #cell-cat="slotProps">
            <FieldElt type="select"
              :list="constants.CATS_LINK"
              v-model:value="table[slotProps.index].cat"
              @keyup.enter="updateLink(table[slotProps.index]._id)"
              :info="constants.INFO_UP_CATEGORY"/>
          </template>

          <!-- Update -->
          <template #body="slotProps">
            <BtnElt type="button"
              @click="updateLink(table[slotProps.index]._id)" 
              class="btn-sky"
              :title="'Update ' + table[slotProps.index].name">
              <template #btn>
                <i class="fa-solid fa-cloud-arrow-up fa-lg fa-fw"></i>
              </template>
            </BtnElt>

          <!-- Delete -->
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
import BtnElt from "@/assets/BtnElt"
import CardElt from "@/assets/CardElt"
import FieldElt from "@/assets/FieldElt"
import TableElt from "@/assets/TableElt"

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
    getItemsByCat(items) {
      return this.$serve.getItemsByCat(items);
    },

    /**
     * UPDATE LINK
     * @param {string} id
     */
    updateLink(id) {
      for (let i = 0; i < this.links.length; i++ ) {
        if (this.links[i]._id === id) {

          if (this.links[i].url.startsWith("http")) {
            this.getLinks()[i].url = this.links[i].url.split('//')[1];
          }

          if (this.$serve.checkString(this.links[i].name) && this.$serve.checkUrl(`https://${this.links[i].url}`)) {

            let link = new FormData();
            link.append("name", this.links[i].name);
            link.append("url", this.links[i].url);
            link.append("cat", this.links[i].cat);

            this.$serve.putData(`/links/${this.links[i]._id}`, link)
              .then(() => {
                alert(link.get("name") + this.constants.ALERT_UPDATED);
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
    },

    /**
     * DELETE LINK
     * @param {string} id 
     */
    deleteLink(id) {
      let linkName = "";
      
      for (let link of this.links) {
        if (link._id === id) {
          linkName = link.name;
        }
      }

      if (confirm(`${this.constants.TITLE_DELETE} ${linkName} ?`) === true) {
        this.$serve.deleteData(`/links/${id}`)
          .then(() => {
            alert(linkName + this.constants.ALERT_DELETED);
            this.$router.go();
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
