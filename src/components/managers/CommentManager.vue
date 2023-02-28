<template>
  <CardElt>
    <template #header>
      <h3>
        <i class="fa-regular fa-comments fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.COMMENT_MANAGER }}
      </h3>
    </template>

    <template #body>
      <form method="post">
        <TableElt :items="comments">

          <template #head>
            {{ constants.HEAD_MOD }}
          </template>

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
            <b>{{ getUserName(comments[slotProps.index].user) }}</b>
            ({{ comments[slotProps.index].user }})
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
            {{ new Date(comments[slotProps.index].created).toLocaleString() }}
          </template>

          <!-- Updated -->
          <template #cell-updated="slotProps">
            {{ new Date(comments[slotProps.index].updated).toLocaleString() }}
          </template>

          <template #body="slotProps">

            <!-- Moderate -->
            <BtnElt type="button"
              @click="moderateComment(comments[slotProps.index]._id)" 
              class="btn-green"
              :title="constants.TITLE_COMMENT_MODERATE + comments[slotProps.index]._id">

              <template #btn>
                <i class="fa-solid fa-spell-check"></i>
              </template>
            </BtnElt>

            <!-- Delete -->
            <BtnElt type="button"
              @click="deleteComment(comments[slotProps.index]._id)" 
              class="btn-red"
              :title="constants.DELETE_COMMENT + comments[slotProps.index]._id">

              <template #btn>
                <i class="fa-solid fa-trash-alt"></i>
              </template>
            </BtnElt>
          </template>
        </TableElt>
      </form>
    </template>
  </CardElt>
</template>

<script>
export default {
  name: "CommentManager",
  props: ["articles", "comments", "constants", "users"],

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
     * GET USER NAME
     * @param {string} id
     * @returns
     */
    getUserName(id) {
      return this.$serve.getItemName(id, this.users);
    },

    /**
     * MODERATE COMMENT
     * @param {string} id 
     */
    moderateComment(id) {
      for (let comment of this.comments) {
        if (comment._id === id) {

          let commentData = new FormData();
          commentData.append("id", id);
          commentData.append("moderate", comment.moderate);

          this.$serve.putData(`/api/comments/${id}`, commentData)
            .then(() => {
              alert(this.constants.ALERT_COMMENT + id + this.constants.MODERATED);
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
      if (confirm(`${this.constants.DELETE_COMMENT}${id} ?`) === true) {

        this.$serve.deleteData(`/api/comments/${id}`)
          .then(() => {
            alert(this.constants.ALERT_COMMENT + id + this.constants.DELETED);
            this.$router.go();
          })
          .catch(err => { console.log(err) });
      }
    }
  }
}
</script>
