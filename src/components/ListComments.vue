<template>

  <!-- COMMENT ADMIN MANAGER -->
  <form method="post">
    <TableElt :items="comments"
      id="comments">

      <!-- Last Table Head -->
      <template #head>
        up/del
      </template>

      <!-- Comment Text -->
      <template #cell-text="slotProps">
        <FieldElt :id="'text-' + comments[slotProps.index]._id"
          v-model:value="getComments()[slotProps.index].text"
          info="Update the comment text"
          @keyup.enter="updateComment(comments[slotProps.index]._id)">
        </FieldElt>
      </template>

      <template #body="slotProps">

      <!-- Update Button -->
      <BtnElt type="button"
          @click="updateComment(comments[slotProps.index]._id)" 
          class="btn-sky"
          :title="'Update comment #' + comments[slotProps.index]._id">
          <template #btn>
            <i class="fa-solid fa-edit"></i>
          </template>
        </BtnElt>

        <!-- Delete Button -->
        <BtnElt type="button"
          @click="deleteComment(comments[slotProps.index]._id)" 
          class="btn-red"
          :title="'Delete comment #' + comments[slotProps.index]._id">
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
  name: "ListComments",
  props: ["comments"],

  methods: {
    /**
     * GET ALL COMMENTS
     */
    getComments() {
      return this.comments;
    },

    /**
     * UPDATE COMMENT
     * @param {string} id 
     */
    updateComment(id) {
      for (let i = 0; i < this.comments.length; i++ ) {
        if (this.comments[i]._id === id) {

          let comment = new FormData();
          comment.append("id", id);
          comment.append("text", this.comments[i].text);

          this.$serve.putData(`/api/comments/${id}`, comment)
            .then(() => {
              alert(`Comment #${id} updated !`);
              this.$router.go();
            })
            .catch(err => { console.log(err) });
        }
      }
    },

    /**
     * DELETE COMMENT
     * @param {string} id 
     */
    deleteComment(id) {
      if (confirm(`Delete comment #${id} ?`) === true) {
        this.$serve.deleteData(`/api/comments/${id}`)
          .then(() => {
            alert(`Comment #${id} deleted !`);
            this.$router.go();
          })
          .catch(err => { console.log(err) });
      }
    }
  }
}
</script>
