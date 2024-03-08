<template>
  <main id="top">
    <NavElt v-if="checkSession('admin')" class="sidebar">
      <template #hide>
        <i class="fa-solid fa-eye fa-fw" :title="val.TITLE_TOGGLE"></i>
      </template>

      <template #last>
        <a href="#image-set" :title="val.IMAGE_MANAGER">
          <i class="fa-solid fa-image fa-fw"></i>
        </a>
      </template>

      <template #top>
        <i class="fa-solid fa-chevron-circle-up fa-fw" :title="val.TITLE_TOP"></i>
      </template>
    </NavElt>

    <CardElt itemscope itemtype="https://schema.org/CreativeWork">
      <template #header>
        <h1 class="sky-dark" itemprop="name"><i class="fa-regular fa-image fa-lg"></i> {{ gallery.name }}</h1>
        <b itemprop="author">{{ gallery.author }}</b>
      </template>

      <template #body>
        <SliderElt :slides="images">
          <template #slide="slotProps">
            <a
              :href="`/img/galleries/${slotProps.slide.name}`"
              :title="val.TITLE_WATCH + slotProps.slide.name"
              itemprop="url"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MediaElt
                :src="`/img/galleries/${slotProps.slide.name}`"
                :alt="val.IMAGE_OF + slotProps.slide.description"
                :width="val.MEDIA_WIDTH"
              >
                <template #figcaption>{{ slotProps.slide.description }}</template>
              </MediaElt>
            </a>
          </template>
        </SliderElt>

        <ListElt :items="images" :dynamic="true" class="grid-2sm-3md-4lg-5xl-6wd content-center">
          <template #items="slotProps">
            <a
              :href="`/img/galleries/${slotProps.item.name}`"
              :title="val.TITLE_WATCH + slotProps.item.name"
              itemprop="url"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MediaElt
                :id="`${slotProps.item.name.toLowerCase()}`"
                :src="`/img/thumbnails/galleries/${slotProps.item.name}`"
                :alt="val.IMAGE_OF + slotProps.item.description"
                :width="val.THUMB_WIDTH"
                :height="val.THUMB_HEIGHT"
              >
                <template #figcaption>
                  <p class="gallery">{{ slotProps.item.description }}</p>
                </template>
              </MediaElt>
            </a>
          </template>
        </ListElt>
      </template>

      <template #aside v-if="checkSession('admin')">
        <ImageSet :images="images" :galleries="galleries" :token="token" :val="val" />
      </template>
    </CardElt>
  </main>
</template>

<script lang="ts">
import CardElt from '../components/CardElt.vue'
import ImageSet from '../components/ImageSet.vue'
import ListElt from '../components/ListElt.vue'
import MediaElt from '../components/MediaElt.vue'
import NavElt from '../components/NavElt.vue'
import SliderElt from '../components/SliderElt.vue'

import { checkRole, getData, setError, setMeta } from '../assets/services'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ImageView',
  components: { CardElt, ListElt, MediaElt, NavElt, SliderElt, ImageSet },

  props: ['avatar', 'val'],
  data() {
    return {
      gallery: {}
    }
  },

  /**
   * ? CREATED
   * * Retrieves the gallery from the API and sets the meta tags
   * * Lists the images of the gallery
   * * Lists the other galleries
   *
   * @returns {Promise<void>}
   */
  async created(): Promise<void> {
    const { API_URL, HEAD, META_IMAGE, UI_URL }: { API_URL: string; HEAD: string; META_IMAGE: string; UI_URL: string } =
      this.val

    try {
      const gallery: { id: number; name: string; author: string; cover: string } = await getData(
        `${API_URL}/galleries/${this.$route.params.id}`
      )
      this.gallery = gallery

      setMeta(
        gallery.name + HEAD,
        META_IMAGE + gallery.author,
        `${UI_URL}/gallery/${gallery.id}`,
        `${UI_URL}/img/thumbnails/galleries/${gallery.cover}`
      )
    } catch (err) {
      setError(err)
      this.$router.push('/galleries')
    }

    await this.$store.dispatch('listGalleryImages', this.$route.params.id)
    await this.$store.dispatch('listGalleries')
  },

  computed: {
    ...mapState(['images', 'galleries', 'token'])
  },

  methods: {
    ...mapActions(['listGalleryImages', 'listGalleries']),

    /**
     * ? CHECK SESSION
     * * Checks the session for the specified role.
     *
     * @param {string} role - The role to check the session against.
     * @return {boolean} Returns true if the session has the specified role, otherwise false.
     */
    checkSession(role: string): boolean {
      return checkRole(this.avatar.role, role)
    }
  }
}
</script>

<style>
.gallery {
  max-width: 200px;
}
</style>
