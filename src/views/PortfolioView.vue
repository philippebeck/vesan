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
                <a
                  :href="`https://${slotProps.value.url}`"
                  :title="val.TITLE_SEE_CODE + slotProps.value.name"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h3 itemprop="name" class="sky-dark">{{ slotProps.value.name }}</h3>
                </a>
              </template>

              <template #body>
                <a
                  :href="`img/projects/${slotProps.value.image}`"
                  :title="val.TITLE_WATCH_PROJECT + slotProps.value.name"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MediaElt
                    :id="`${slotProps.value.name.toLowerCase()}-${slotProps.value.cat.toLowerCase()}`"
                    :src="`img/thumbnails/projects/${slotProps.value.image}`"
                    :alt="`${slotProps.value.alt}`"
                    :width="val.THUMB_WIDTH"
                    :height="val.THUMB_HEIGHT"
                    itemprop="image"
                  >
                    <template #figcaption>
                      <a
                        :href="`https://${slotProps.value.url}`"
                        :title="val.TITLE_SEE_CODE + slotProps.value.name"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
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
        <ProjectSet :projects="projects" :token="token" :val="val" />
      </template>
    </CardElt>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'vuex'
import { checkRole, getCats, getItemsByCat, setMeta } from '../assets/services'

import CardElt from '../components/CardElt.vue'
import ListElt from '../components/ListElt.vue'
import MediaElt from '../components/MediaElt.vue'
import NavElt from '../components/NavElt.vue'
import ProjectSet from '../components/ProjectSet.vue'

interface Val {
  HEAD_PORTFOLIO: string
  LOGO_SRC: string
  META_PORTFOLIO: string
  UI_URL: string
}

export default defineComponent({
  name: 'PortfolioView',
  components: { CardElt, ListElt, MediaElt, NavElt, ProjectSet },
  props: ['avatar', 'val'],

  /**
   * ? CREATED
   * * Retrieves projects from the API.
   * * Sets the meta tags.
   */
  async created(): Promise<void> {
    const { HEAD_PORTFOLIO, LOGO_SRC, META_PORTFOLIO, UI_URL }: Val = this.val
    setMeta(HEAD_PORTFOLIO, META_PORTFOLIO, `${UI_URL}/portfolio`, UI_URL + LOGO_SRC)

    await this.$store.dispatch('listProjects')
  },

  /**
   * ? UPDATED
   * * A function that updates the text elements by setting the "itemprop" attribute to "description".
   *
   * @returns {void}
   */
  updated(): void {
    const descriptionArray: HTMLCollectionOf<Element> = document.getElementsByClassName('figcaption')

    for (let descriptionElt of descriptionArray) {
      if (descriptionElt?.firstChild) {
        ;(descriptionElt.firstChild as Element).setAttribute('itemprop', 'description')
      }
    }
  },

  computed: {
    ...mapState(['projects', 'id', 'token']),

    /**
     * ? GET CATEGORIES
     * * Retrieves the categories of projects.
     *
     * @return {string[]} An array of project categories.
     */
    getCategories(): string[] {
      return getCats(this.projects)
    }
  },

  methods: {
    ...mapActions(['listProjects']),

    /**
     * ? CHECK SESSION
     * * Checks the session for the specified role.
     *
     * @param {string} role - the role to check
     * @return {boolean} the result of the role check
     */
    checkSession(role: string): boolean {
      return checkRole(this.avatar.role, role)
    },

    /**
     * ? GET ITEMS BY CATEGORY
     * * Retrieves items by category.
     *
     * @param {{id: number, name: string, cat: string}[]} items - The array of items.
     * @return {Record<string, { id: number; name: string }[]>} The items filtered by category.
     */
    getItemsByCategory(
      items: { id: number; name: string; cat: string }[]
    ): Record<string, { id: number; name: string }[]> {
      return getItemsByCat(items)
    }
  }
})
</script>

<style>
.portfolio {
  --ve-card-width: 350px;
}
</style>
