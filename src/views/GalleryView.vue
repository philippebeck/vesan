<template>
  <main id="top">
    <NavElt v-if="checkSession('admin')" class="sidebar">
      <template #hide>
        <i class="fa-solid fa-eye fa-fw" :title="val.TITLE_TOGGLE"></i>
      </template>

      <template #last>
        <a href="#gallery-set" :title="val.GALLERY_MANAGER">
          <i class="fa-solid fa-images fa-fw"></i>
        </a>
      </template>

      <template #top>
        <i class="fa-solid fa-chevron-circle-up fa-fw" :title="val.TITLE_TOP"></i>
      </template>
    </NavElt>

    <CardElt itemscope itemtype="https://schema.org/CreativeWork">
      <template #header>
        <h1 class="sky-dark" itemprop="name">
          <i class="fa-regular fa-images fa-lg"></i>
          {{ val.GALLERY_VIEW }}
        </h1>
        <b>{{ val.INTRO_GALLERY }}</b>
      </template>

      <template #body>
        <ListElt :items="galleries" :dynamic="true" class="grid-2sm-3md-4lg-5xl-6wd content-center">
          <template #items="slotProps">
            <a :href="`gallery/${slotProps.item.id}`" :title="val.TITLE_WATCH + slotProps.item.name" itemprop="url">
              <MediaElt
                :id="`${slotProps.item.name.toLowerCase()}`"
                :src="`/img/thumbnails/galleries/${slotProps.item.cover}`"
                :alt="val.COVER_OF + slotProps.item.name"
                :width="val.THUMB_WIDTH"
                :height="val.THUMB_HEIGHT"
              >
                <template #figcaption>
                  <p class="gallery">{{ slotProps.item.name }}</p>
                </template>
              </MediaElt>
            </a>
          </template>
        </ListElt>
      </template>

      <template #aside v-if="checkSession('admin')">
        <GallerySet :galleries="galleries" :images="images" :token="token" :val="val" />
      </template>
    </CardElt>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'vuex'
import { checkRole, setMeta } from '../assets/services'

import CardElt from '../components/CardElt.vue'
import GallerySet from '../components/GallerySet.vue'
import ListElt from '../components/ListElt.vue'
import MediaElt from '../components/MediaElt.vue'
import NavElt from '../components/NavElt.vue'

interface Val {
  HEAD_GALLERY: string
  LOGO_SRC: string
  META_GALLERY: string
  UI_URL: string
}

export default defineComponent({
  name: 'GalleryView',
  components: { CardElt, ListElt, MediaElt, NavElt, GallerySet },
  props: ['avatar', 'val'],

  /**
   * ? CREATED
   * * Fetches the list of galleries and images
   * * Sets the meta tags
   * @returns {Promise<void>}
   */
  async created(): Promise<void> {
    const { HEAD_GALLERY, LOGO_SRC, META_GALLERY, UI_URL }: Val = this.val
    setMeta(HEAD_GALLERY, META_GALLERY, `${UI_URL}/galleries`, UI_URL + LOGO_SRC)

    await this.$store.dispatch('listGalleries')
    await this.$store.dispatch('listImages')
  },

  computed: {
    ...mapState(['galleries', 'images', 'token'])
  },

  methods: {
    ...mapActions(['listGalleries', 'listImages']),

    /**
     * ? CHECK SESSION
     * * Checks the session for a given role.
     *
     * @param {string} role - the role to check the session for
     * @return {boolean} the result of the session check
     */
    checkSession(role: string): boolean {
      return checkRole(this.avatar.role, role)
    }
  }
})
</script>

<style>
.gallery {
  max-width: 200px;
}
</style>
