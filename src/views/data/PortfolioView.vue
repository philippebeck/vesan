<template>
  <main id="top">
    <NavElt :items="getCategories" class="sidebar">
      <template #hide>
        <i class="fa-solid fa-eye fa-fw" :title="val.TITLE_TOGGLE"></i>
      </template>

      <template #last v-if="checkSession('editor')">
        <a href="#project-set" :title="val.PROJECT_MANAGER">
          <i class="fa-solid fa-clipboard-check fa-fw"></i>
        </a>
      </template>

      <template #top>
        <i class="fa-solid fa-chevron-circle-up fa-fw" :title="val.TITLE_TOP"></i>
      </template>
    </NavElt>

    <CardElt :isArticle="true" class="container-90lg">
      <template #header>
        <h1 class="sky-dark">
          <i class="fa-solid fa-briefcase fa-lg"></i>
          {{ val.PORTFOLIO_VIEW }}
        </h1>
        <p>{{ val.INTRO_PROJECT }}</p>
      </template>

      <template #body>
        <ListElt :items="getItemsByCategory(projects)" :dynamic="true">
          <template #items="slotProps">
            <h2 :id="slotProps.item[0].cat" class="sky-dark ani-turnXZ-loop-altrev-into">
              {{ slotProps.item[0].cat }}
            </h2>
          </template>

          <template #nested="slotProps">
            <CardElt itemscope itemtype="https://schema.org/CreativeWork" class="portfolio">
              <template #header>
                <a :href="`https://${slotProps.value.url}`"
                  :title="val.TITLE_SEE_CODE + slotProps.value.name"
                  target="_blank"
                  rel="noopener noreferrer">
                  <h3 itemprop="name" class="sky-dark">{{ slotProps.value.name }}</h3>
                </a>
              </template>

              <template #body>
                <a :href="`img/projects/${slotProps.value.image}`" 
                  :title="val.TITLE_WATCH_PROJECT + slotProps.value.name"
                  target="_blank"
                  rel="noopener noreferrer">
                  <MediaElt :id="`${slotProps.value.name.toLowerCase()}-${slotProps.value.cat.toLowerCase()}`"
                    :src="`img/thumbnails/projects/${slotProps.value.image}`" 
                    :alt="`${slotProps.value.alt}`" 
                    :width="val.THUMB_WIDTH"
                    :height="val.THUMB_HEIGHT"
                    itemprop="image">
                    <template #figcaption>
                      <a :href="`https://${slotProps.value.url}`"
                        :title="val.TITLE_SEE_CODE + slotProps.value.name"
                        target="_blank"
                        rel="noopener noreferrer">
                        <p v-html="slotProps.value.description.split(':')[0]" class="blog"></p>
                      </a>
                    </template>
                  </MediaElt>
                </a>
              </template>
            </CardElt>
          </template>
        </ListElt>
      </template>

      <template #aside v-if="checkSession('editor')">
        <ProjectSet :projects="projects" :token="token" :val="val"/>
      </template>
    </CardElt>
  </main>
</template>

<script>
import { checkRole, getCats, getItemsByCat, setMeta } from "servidio"
import { mapState, mapActions } from "vuex"

import CardElt from "@/assets/elements/CardElt"
import ListElt from "@/assets/elements/ListElt"
import MediaElt from "@/assets/elements/MediaElt"
import NavElt from "@/assets/elements/NavElt"
import ProjectSet from "@/assets/setters/ProjectSet"

export default {
  name: "PortfolioView",
  components: { CardElt, ListElt, MediaElt, NavElt, ProjectSet },
  props: ["avatar", "val"],

  created() {
    const { HEAD_PORTFOLIO, LOGO_SRC, META_PORTFOLIO, UI_URL } = this.val;
    this.$store.dispatch("listProjects");

    setMeta(HEAD_PORTFOLIO, META_PORTFOLIO, `${UI_URL}/portfolio`, UI_URL + LOGO_SRC);
  },

  updated() {
    const textArray = document.getElementsByClassName("figcaption");
    for (let textElt of textArray) textElt.firstChild.setAttribute("itemprop", "description");
  },

  computed: {
    ...mapState(["projects", "id", "token"]),

    /**
     * ? GET CATEGORIES
     * * Retrieves the categories of projects.
     * @return {Array} An array of project categories.
     */
    getCategories() {
      return getCats(this.projects);
    }
  },

  methods: {
    ...mapActions(["listProjects"]),

    /**
     * ? CHECK SESSION
     * * Checks the session for the specified role.
     * @param {type} role - the role to check
     * @return {type} the result of the role check
     */
    checkSession(role) {
      return checkRole(this.avatar.role, role);
    },

    /**
     * ? GET ITEMS BY CATEGORY
     * * Retrieves items based on category.
     * @param {Array} items - The list of items to filter.
     * @return {Array} The filtered list of items.
     */
    getItemsByCategory(items) {
      return getItemsByCat(items);
    },
  }
}
</script>
