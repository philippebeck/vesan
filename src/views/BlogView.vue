<template>
  <NavElt
    type="sidebar"
    :items="cats"
    class="sidebar">

    <template #last  v-if="userId">
      <a href="#create-post"
        title="Create a post">
        <i class="fa-regular fa-envelope fa-fw"></i>
      </a>
    </template>

    <template #top>
      <i class="fa-solid fa-chevron-circle-up fa-fw"></i>
    </template>
  </NavElt>

  <CardElt id="top">
    <template #header>
      <i class="blue fa-solid fa-blog fa-4x"></i>
      <h1 class="blue shatex-blur-sm anima-slideB">
        Blog
      </h1>
      <strong class="gray">
        Posts to read !
      </strong>
      <p>Under construction !</p>
    </template>

    <template #aside v-if="userId">
      <CreatePost 
        :cats="cats"/>
    </template>

    <template #body>
      <ListElt :items="itemsByCat(posts)"
        :dynamic="true">

        <template #items="slotProps">
          <h2>{{ slotProps.item[0].cat }}</h2>
        </template>

        <template #nested="slotProps">
          <BtnElt v-if="checkLikes(slotProps.key) === false"
            id="likes"
            type="button"
            @click="addLike(slotProps.value._id)"
            class="btn-blue"
            :title="`Like ${slotProps.value.title} ?`">
            <template #btn>
              <i class="fa-regular fa-thumbs-up fa-lg"></i>
              {{ slotProps.value.likes }}
            </template>
          </BtnElt>

          <BtnElt v-if="checkLikes(slotProps.key) === true"
            id="likes"
            type="button"
            @click="addLike(slotProps.value._id)"
            class="btn-sky"
            :title="`Dislike ${slotProps.value.title} ?`">
            <template #btn>
              <i class="fa-solid fa-thumbs-up fa-lg"></i>
              {{ slotProps.value.likes }}
            </template>
          </BtnElt>

          <a :href="`post/${slotProps.value._id}`"
            :title="`Read ${slotProps.value.title}`">
            <MediaElt :src="`img/posts/${slotProps.value.image}`" 
              :alt="`${slotProps.value.title}`" 
              :id="`${slotProps.value.title.toLowerCase()}-${slotProps.value.cat.toLowerCase()}`">

              <template #figcaption>
                <h3>{{ slotProps.value.title }}</h3>
                <blockquote>{{ slotProps.value.text }}</blockquote>
              </template>

            </MediaElt>
          </a>
        </template>

      </ListElt>
    </template>
  </CardElt>
</template>

<script>
import constants from "/constants"

import CreatePost from "@/components/creators/CreatePost"

export default {
  name: "BlogView",
  components: {
    CreatePost
  },

  data() {
    return {
      posts: [],
      userId: null
    }
  },

  mounted () {
    this.$serve.getData("/api/posts")
      .then(res => { this.posts = res })
      .catch(err => { console.log(err) });

    if (localStorage.userId) {
      this.userId = JSON.parse(localStorage.userId);
    }
  },

  computed: {
    cats() {
      const cats = new Set();
      this.posts.forEach(post => cats.add(post.cat));
      return Array.from(cats); 
    }
  },

  methods: {
    /**
     * GET ITEMS BY CATEGORY
     * @param {*} items 
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
     * CHECK LIKES
     * @returns
     */
    checkLikes(key) {
      let usersLiked = this.posts[key].usersLiked;

      for (let i = 0; i < usersLiked.length; i++) {
        if (constants.USER_ID === usersLiked[i]) {
          return true;
        }
      }
      return false;
    },

    /**
     * ADD LIKE
     * @param {string} id 
     */
    addLike(id) {
      let hasLiked = false;

      for (let i = 0; i < this.posts.length; i++) {
        if (id === this.posts[i]._id) {
          let usersLiked = this.posts[i].usersLiked;

          for (let j = 0; j < usersLiked.length; j++) {
            if (constants.USER_ID === usersLiked[j]) {

              hasLiked = true;
              this.posts[i].likes -= 1;
              usersLiked.splice(j, 1);
            }
          }

          if (hasLiked === false) {
            this.posts[i].likes += 1;
            usersLiked.push(constants.USER_ID);
          }

          let post = new FormData();
          post.append("id", this.posts[i]._id);
          post.append("title", this.posts[i].title);
          post.append("likes", this.posts[i].likes);
          post.append("usersLiked", usersLiked);

          this.$serve.putData(`/api/posts/${post.get("id")}`, post)
            .then(() => {
              if (hasLiked === true) {
                alert(post.get("title") + " disliked !");
              } else {
                alert(post.get("title") + " liked !");
              }
            })
            .catch(err => { console.log(err) });
        }
      }
    }
  }
}
</script>
