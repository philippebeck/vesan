<template>
  <CardElt itemscope
    itemtype="https://schema.org/Article">
    <template #header>
      <h1 itemprop="name">{{ article.name }}</h1>
      <strong>{{ article.cat }}</strong>
    </template>

    <template #body>

      <BtnElt v-if="!checkRole('user')"
        id="likes"
        href="/login"
        class="btn-blue"
        :title="constants.TITLE_LIKE_LOGIN + article.name">

        <template #btn>
          <i class="fa-regular fa-thumbs-up fa-lg">
          </i> <b v-if="article.usersLiked"
            itemprop="contentRating">
            {{ article.usersLiked.length }}
          </b>
        </template>
      </BtnElt>

      <BtnElt v-else-if="checkLikes() === false"
        id="likes"
        type="button"
        @click="addLike()"
        class="btn-blue"
        :title="constants.TITLE_LIKE + article.name">

        <template #btn>
          <i class="fa-regular fa-thumbs-up fa-lg">
          </i> <b v-if="article.usersLiked"
            itemprop="contentRating">
            {{ article.usersLiked.length }}
          </b>
        </template>
      </BtnElt>

      <BtnElt v-else-if="checkLikes() === true"
        id="likes"
        type="button"
        @click="addLike()"
        class="btn-sky"
        :title="constants.TITLE_DISLIKE + article.name">

        <template #btn>
          <i class="fa-regular fa-thumbs-up fa-lg">
          </i> <b v-if="article.usersLiked"
            itemprop="contentRating">
            {{ article.usersLiked.length }}
          </b>
        </template>
      </BtnElt>

      <MediaElt v-if="article.image"
        :src="`/img/articles/${article.image}`"
        :alt="article.alt"
        itemprop="image">

        <template #figcaption>
          <blockquote v-html="article.text"
            itemprop="text"
            class="container width-sm bord bord-sky blue">
          </blockquote>
          
          <p class="silver">
            {{ constants.CREATE_BY }}
            <b itemprop="author">
              {{ article.user }}
            </b>
            {{ constants.ON }} 
            <i itemprop="dateCreated">
              {{ new Date(article.created).toLocaleDateString() }}
            </i>
            / {{ constants.UPDATE_ON }}
            <i itemprop="dateModified">
              {{ new Date(article.updated).toLocaleDateString() }}
            </i>
          </p>
        </template>
      </MediaElt>

      <CommentList v-if="comments.length > 0"
        :comments="comments"
        :constants="constants"/>
    </template>

    <template #aside  v-if="checkRole('user')">
      <CommentCreator :constants="constants"/>
    </template>
  </CardElt>
</template>

<script>
import { mapState, mapActions } from "vuex"
import CommentCreator from "@/components/creators/CommentCreator"
import CommentList from "@/components/lists/CommentList"

export default {
  name: "ArticleView",
  components: {
    CommentCreator,
    CommentList
  },
  props: ["constants"],

  mounted () {
    this.$store.dispatch("readArticle", this.$route.params.id);
    this.$store.dispatch("listArticleComments", this.$route.params.id);
},

  computed: {
    ...mapState(["article", "comments", "user"])
  },

  methods: {
    ...mapActions(["readArticle", "listArticleComments"]),

    /**
     * CHECK SESSION
     * @param {string} role
     * @returns
     */
    checkRole(role) {
      return this.$serve.checkRole(this.user.role, role);
    },

    /**
     * CHECK LIKES
     * @returns
     */
    checkLikes() {
      if (this.article.usersLiked) {
        return this.$serve.checkLikes(this.article.usersLiked);
      }
    },

    /**
     * ADD LIKE
     */
    addLike() {
      let hasLiked = false;
      let usersLiked = this.article.usersLiked;

      for (let i = 0; i < usersLiked.length; i++) {
        if (this.constants.USER_ID === usersLiked[i]) {

          hasLiked = true;
          usersLiked.splice(i, 1);
        }
      }

      if (hasLiked === false) {
        usersLiked.push(this.constants.USER_ID);
      }

      let article = new FormData();

      article.append("id", this.article._id);
      article.append("name", this.article.name);
      article.append("usersLiked", usersLiked);

      this.$serve.putData(`/api/articles/${article.get("id")}`, article)
        .then(() => {

          if (hasLiked === true) {
            alert(article.get("name") + this.constants.ALERT_DISLIKED);
          } else {
            alert(article.get("name") + this.constants.ALERT_LIKED);
          }
        })
        .catch(err => { console.log(err) });
    }
  }
}
</script>
