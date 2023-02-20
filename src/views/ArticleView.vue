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
        :title="`Login to like ${article.name}`">
        <template #btn>
          <i class="fa-regular fa-thumbs-up fa-lg">
          </i> <b itemprop="contentRating">
            {{ article.likes }}
          </b>
        </template>
      </BtnElt>

      <BtnElt v-else-if="checkLikes() === false"
        id="likes"
        type="button"
        @click="addLike()"
        class="btn-blue"
        :title="`Like ${article.name} ?`">
        <template #btn>
          <i class="fa-regular fa-thumbs-up fa-lg">
          </i> <b itemprop="contentRating">
            {{ article.likes }}
          </b>
        </template>
      </BtnElt>

      <BtnElt v-else-if="checkLikes() === true"
        id="likes"
        type="button"
        @click="addLike()"
        class="btn-sky"
        :title="`Dislike ${article.name} ?`">
        <template #btn>
          <i class="fa-regular fa-thumbs-up fa-lg">
          </i> <b itemprop="contentRating">
            {{ article.likes }}
          </b>
        </template>
      </BtnElt>

      <MediaElt :src="`/img/articles/${article.image}`"
        :alt="article.alt"
        itemprop="image">

        <template #figcaption>
          <blockquote itemprop="text"
            class="container width-sm bord bord-sky blue">
            {{ article.text }}
          </blockquote>
          
          <p class="silver">
            Created by 
            <b itemprop="author">
              {{ getArticleUser() }}
            </b>
            on 
            <i itemprop="dateCreated">
              {{ new Date(article.created).toLocaleDateString() }}
            </i>
            / Updated on 
            <i itemprop="dateModified">
              {{ new Date(article.updated).toLocaleDateString() }}
            </i>
          </p>
        </template>
      </MediaElt>

      <ListComments v-if="comments.length > 0"
        :comments="comments"
        :users="users"/>
    </template>

    <template #aside  v-if="checkRole('user')">
      <CreateComment />
    </template>
  </CardElt>
</template>

<script>
import { mapState, mapActions } from "vuex"
import constants from "/constants"
import CreateComment from "@/components/creators/CreateComment"
import ListComments from "@/components/managers/ListComments"

export default {
  name: "ArticleView",
  components: {
    CreateComment,
    ListComments
  },

  data() {
    return {
      constants: {}
    }
  },

  mounted () {
    this.constants = constants;
    this.$store.dispatch("readArticle", this.$route.params.id);
    this.$store.dispatch("listArticleComments", this.$route.params.id);
    this.$store.dispatch("listUsersName");
},

  computed: {
    ...mapState(["article", "comments", "user", "users"])
  },

  methods: {
    ...mapActions(["readArticle", "listArticleComments", "listUsersName"]),

    /**
     * CHECK SESSION
     * @param {string} role
     * @returns
     */
    checkRole(role) {
      return this.$serve.checkRole(this.user.role, role);
    },

    /**
     * GET ARTICLE USER
     * @param {}  
     */
    getArticleUser() {
      for (let i = 0; i < this.users.length; i++ ) {
        if (this.article.user === this.users[i]._id) {

          return this.users[i].name;
        }
      }
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
        if (constants.USER_ID === usersLiked[i]) {
          hasLiked = true;
          this.article.likes -= 1;
          usersLiked.splice(i, 1);
        }
      }

      if (hasLiked === false) {
        this.article.likes += 1;
        usersLiked.push(constants.USER_ID);
      }

      let article = new FormData();
      article.append("id", this.article._id);
      article.append("name", this.article.name);
      article.append("likes", this.article.likes);
      article.append("usersLiked", usersLiked);

      this.$serve.putData(`/api/articles/${article.get("id")}`, article)
        .then(() => {
          if (hasLiked === true) {
            console.log(article.get("name") + " disliked !");
          } else {
            console.log(article.get("name") + " liked !");
          }
        })
        .catch(err => { console.log(err) });
    }
  }
}
</script>
