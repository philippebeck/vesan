<template>
  <CardElt>
    <template #header>
      <h2 id="comment">
        <i class="fa-regular fa-comments fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.COMMENT_MANAGER }}
      </h2>
    </template>

    <template #body>
      <form method="post">
        <TableElt :items="comments">

          <!-- Id -->
          <template #cell-_id="slotProps">
            <a :href="`/article/${comments[slotProps.index].article}`">
              <b>#{{ slotProps.index + 1 }}</b>
              ({{ comments[slotProps.index]._id }})
            </a>
          </template>

          <!-- Article -->
          <template #cell-article="slotProps">
            <a :href="`/article/${comments[slotProps.index].article}`">
              <b>{{ getArticleName(comments[slotProps.index].article) }}</b>
              ({{ comments[slotProps.index].article }})
            </a>
            </template>

          <!-- User -->
          <template #cell-user="slotProps">
            <b>{{ comments[slotProps.index].user.split('-')[0] }}</b>
            ({{ comments[slotProps.index].user.split('-')[1] }})
          </template>

          <!-- Moderate -->
          <template #cell-moderate="slotProps">
            <FieldElt :id="'text-' + comments[slotProps.index]._id"
              type="select"
              :list="constants.IS_MODERATE"
              v-model:value="getComments()[slotProps.index].moderate"
              @keyup.enter="moderateComment(comments[slotProps.index]._id)"
              :info="constants.INFO_UP_MODERATE"/>
          </template>

          <!-- Created -->
          <template #cell-created="slotProps">
            <p>
              {{ new Date(comments[slotProps.index].created).toLocaleString() }}
            </p>

            <BtnElt type="button"
              @click="deleteComment(comments[slotProps.index]._id)" 
              class="btn-red"
              :title="constants.TITLE_DELETE_COMMENT + comments[slotProps.index]._id">

              <template #btn>
                <i class="fa-solid fa-trash-arrow-up fa-lg fa-fw"></i>
              </template>
            </BtnElt>
          </template>

          <!-- Updated -->
          <template #cell-updated="slotProps">
            <p>
              {{ new Date(comments[slotProps.index].updated).toLocaleString() }}
            </p>

            <BtnElt type="button"
              @click="moderateComment(comments[slotProps.index]._id)" 
              class="btn-green"
              :title="constants.TITLE_COMMENT_MODERATE + comments[slotProps.index]._id">

              <template #btn>
                <i class="fa-solid fa-spell-check fa-lg fa-fw"></i>
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
  name: "CommentManager",
  components: {
    BtnElt,
    CardElt,
    FieldElt,
    TableElt
  },

  props: [
    "articles", 
    "comments", 
    "constants", 
    "users"
  ],

  methods: {
    /**
     * GET ALL COMMENTS
     * @returns
     */
    getComments() {
      return this.comments;
    },
    
    /**
     * GET ARTICLE NAME
     * @param {string} id
     * @returns
     */
    getArticleName(id) {
      return this.$serve.getItemName(id, this.articles);
    },

    /**
     * MODERATE COMMENT
     * @param {string} id 
     */
    moderateComment(id) {
      for (let comment of this.comments) {
        if (comment._id === id) {

          let data = new FormData();
          data.append("text", comment.text);
          data.append("moderate", comment.moderate);

          this.$serve.putData(`/comments/${id}`, data)
            .then(() => {
              alert(this.constants.ALERT_COMMENT + id + this.constants.ALERT_MODERATED);
            })
            .catch(err => { this.$serve.checkError(err) });
        }
      }
    },

    /**
     * DELETE COMMENT
     * @param {string} id 
     */
    deleteComment(id) {
      if (confirm(`${this.constants.TITLE_DELETE_COMMENT}${id} ?`) === true) {

        this.$serve.deleteData(`/comments/${id}`)
          .then(() => {
            alert(this.constants.ALERT_COMMENT + id + this.constants.ALERT_DELETED);
            this.$router.go();
          })
          .catch(err => { this.$serve.checkError(err) });
      }
    }
  }
}
</script>
