<template>
  <form>
    <TableElt :title="table[0].cat"
      :items="table"
      v-for="table in sortItemsByCat(links)"
      :key="table"
      :id="table[0].cat">

      <template #title>
        <i :class="`fa-brands fa-${table[0].cat.toLowerCase()} fa-5x sky anima-grow`"></i>
      </template>

      <template #head>up/del</template>

      <!-- Id -->
      <template #cell-_id="slotProps">
        #{{ slotProps.index + 1 }}
        ({{ slotProps.item._id }})
      </template>

      <!-- Name -->
      <template #cell-name="slotProps">
        <FieldElt :id="'name-' + table[slotProps.index]._id"
          v-model:value="table[slotProps.index].name"
          @keyup.enter="validateUpdatedLink(table[slotProps.index]._id)"
          :info="constants.INFO_UP_NAME"/>
      </template>

      <!-- URL -->
      <template #cell-url="slotProps">
        <FieldElt :id="'url-' + table[slotProps.index]._id"
          type="url"
          v-model:value="table[slotProps.index].url"
          @keyup.enter="validateUpdatedLink(table[slotProps.index]._id)"
          :info="constants.INFO_UP_URL"
          :max="parseInt('100')"/>
      </template>

      <!-- Category -->
      <template #cell-cat="slotProps">
        <FieldElt :id="'cat-' + table[slotProps.index]._id"
          type="select"
          :list="constants.CATS_LINK"
          v-model:value="table[slotProps.index].cat"
          @keyup.enter="validateUpdatedLink(table[slotProps.index]._id)"
          :info="constants.INFO_UP_CATEGORY"/>
      </template>

      <!-- Update -->
      <template #body="slotProps">
        <BtnElt type="button"
          @click="validateUpdatedLink(table[slotProps.index]._id)" 
          class="btn-sky"
          :title="'Update ' + table[slotProps.index].name">
          <template #btn>
            <i class="fa-solid fa-edit"></i>
          </template>
        </BtnElt>

      <!-- Delete -->
        <BtnElt type="button"
          @click="deleteLink(table[slotProps.index]._id)" 
          class="btn-red"
          :title="'Delete ' + table[slotProps.index].name">
          <template #btn>
            <i class="fa-solid fa-trash-alt"></i>
          </template>
        </BtnElt>
      </template>
    </TableElt>
  </form>
</template>

<script>
export default {
  name: "LinkManager",
  props: ["constants", "links"],

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
    sortItemsByCat(items) {
      return this.$serve.sortItemsByCat(items);
    },

    /**
     * VALIDATE UPDATED LINK IF URL IS VALID
     * @param {string} id 
     */
    validateUpdatedLink(id) {
      for (let i = 0; i < this.links.length; i++ ) {
        if (this.links[i]._id === id) {

          if (this.links[i].url.startsWith("http")) {
            this.getLinks()[i].url = this.links[i].url.split('//')[1];
          }

          if (this.$serve.checkName(this.links[i].name) && 
            this.$serve.checkUrl(`https://${this.links[i].url}`)) {

            this.checkUpdatedLink(i);
          }
        }
      }
    },

    /**
     * CHECK UPDATED LINK IF NAME | URL ARE REFERENCED
     * @param {number} i 
     */
    checkUpdatedLink(i) {
      this.$serve.getData("/api/links")
        .then((links) => {
          let isReferenced = false;

          for (let j = 0; j < links.length; j++) {
            if (links[j]._id === this.links[i]._id) {
              links.splice(j, 1);
            }

            if (links[j] && links[j].name === this.links[i].name) {
              alert(this.links[i].name + this.constants.ALERT_AVAILABLE);
              isReferenced = true;
            }

            if (links[j] && links[j].url === this.links[i].url) {
              alert(this.links[i].url+ this.constants.ALERT_REFERENCED);
              isReferenced = true;
            }
          }
          this.updateLink(isReferenced, i);
        })
        .catch(err => { console.log(err) });
    },

    /**
     * UPDATE LINK IF NO INFO IS REFERENCED
     * @param {boolean} isReferenced 
     * @param {number} i 
     */
    updateLink(isReferenced, i) {
      if (!isReferenced) {
        let link = new FormData();

        link.append("id", this.links[i]._id);
        link.append("name", this.links[i].name);
        link.append("url", this.links[i].url);
        link.append("cat", this.links[i].cat);

        this.$serve.putData(`/api/links/${link.get("id")}`, link)
          .then(() => {
            alert(link.get("name") + this.constants.ALERT_UPDATED);
            this.$router.go();
          })
          .catch(err => { console.log(err) });
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
        this.$serve.deleteData(`/api/links/${id}`)
          .then(() => {
            alert(linkName + this.constants.ALERT_DELETED);
            this.$router.go();
          })
          .catch(err => { console.log(err) });
      }
    }
  }
}
</script>
