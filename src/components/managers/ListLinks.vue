<template>
  <form>
    <TableElt :title="table[0].cat"
      :items="table"
      v-for="table in itemsByCat(links)"
      :key="table"
      :id="table[0].cat">

      <template #title>
        <i :class="`fa-brands fa-${table[0].cat.toLowerCase()} fa-5x sky anima-grow`"></i>
      </template>

      <template #head>
        up/del
      </template>

      <template #cell-_id="slotProps">
        {{ slotProps.index + 1 }}
        ({{ slotProps.item._id }})
      </template>

      <template #cell-name="slotProps">
        <FieldElt :id="'name-' + table[slotProps.index]._id"
          v-model:value="table[slotProps.index].name"
          info="Update the link name"
          @keyup.enter="validateUpdatedLink(table[slotProps.index]._id)">
        </FieldElt>
      </template>

      <template #cell-url="slotProps">
        <FieldElt :id="'url-' + table[slotProps.index]._id"
          type="url"
          v-model:value="table[slotProps.index].url"
          info="Update the link URL"
          @keyup.enter="validateUpdatedLink(table[slotProps.index]._id)"
          :max="parseInt('100')">
        </FieldElt>
      </template>

      <template #cell-cat="slotProps">
        <FieldElt :id="'cat-' + table[slotProps.index]._id"
          type="select"
          v-model:value="table[slotProps.index].cat"
          info="Update the category"
          @keyup.enter="validateUpdatedLink(table[slotProps.index]._id)"
          :list="cats">
          {{ value }}
        </FieldElt>
      </template>

      <template #body="slotProps">
        <BtnElt type="button"
          @click="validateUpdatedLink(table[slotProps.index]._id)" 
          class="btn-sky"
          :title="'Update ' + table[slotProps.index].name">
          <template #btn>
            <i class="fa-solid fa-edit"></i>
          </template>
        </BtnElt>

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
import constants from "/constants"

export default {
  name: "ListLinks",
  props: ["links"],

  data() {
    return {
      cats: []
    }
  },

  mounted() {
    this.cats = constants.CATS_LINK;
  },

  methods: {
    /**
     * RETURN AN ARRAY OF ITEMS BY CATEGORY
     * @param {object} items 
     */
    itemsByCat(items) {
      const itemsByCat = {};
      items.forEach(item => {
        if (!itemsByCat[item.cat]) {
          itemsByCat[item.cat] = [];
        }
        itemsByCat[item.cat].push(item);
        itemsByCat[item.cat].sort((a, b) => (a.name > b.name) ? 1 : -1);
      });
      return itemsByCat;
    },
    /**
     * VALIDATE UPDATED LINK IF URL IS VALID
     * @param {string} id 
     */
    validateUpdatedLink(id) {
      for (let i = 0; i < this.links.length; i++ ) {
        if (this.links[i]._id === id) {
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
              alert(this.links[i].name + " is not available !");
              isReferenced = true;
            }
            if (links[j] && links[j].url === this.links[i].url) {
              alert(this.links[i].url+ " is already referenced !");
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
            alert(link.get("name") + " updated !");
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
      
      for (let i = 0; i < this.links.length; i++ ) {
        if (this.links[i]._id === id) {
          linkName = this.links[i].name;
        }
      }
      if (confirm(`Delete ${linkName} ?`) === true) {
        this.$serve.deleteData(`/api/links/${id}`)
          .then(() => {
            alert(linkName + " deleted !");
            this.$router.go();
          })
          .catch(err => { console.log(err) });
      }
    }
  }
}
</script>
