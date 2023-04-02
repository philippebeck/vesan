<template>
  <main>
    <CardElt>
      <template #header>
        <h1 class="sky-dark">
          <i class="fa-regular fa-images fa-lg"
            aria-hidden="true">
          </i>
          {{ constants.GALLERY_VIEW }}
        </h1>
        <b>{{ constants.INTRO_GALLERY }}</b>
      </template>

      <template #body>
        <ListElt :items="galleries"
          :dynamic="true"
          class="flex-wrap content-center">

          <template #items="slotProps">
            <a :href="`gallery/${slotProps.item._id}`"
              :title="constants.TITLE_WATCH + slotProps.item.name">

              <MediaElt :id="`${slotProps.item.name.toLowerCase()}`"
                :src="`/img/thumbnails/galleries/${slotProps.item.cover}`" 
                :alt="`${slotProps.item.name}`" 
                :width="constants.THUMB_WIDTH"
                :height="constants.THUMB_HEIGHT">

                <template #figcaption>
                  {{ slotProps.item.name }}
                </template>

              </MediaElt>
            </a>
          </template>
        </ListElt>
      </template>

      <template #aside v-if="checkRole('admin')">
        <GalleryCreator :constants="constants"/>
      </template>
    </CardElt>
  </main>
</template>

<script>
import { mapState, mapActions } from "vuex"

import ListElt from "@/assets/ListElt"
import MediaElt from "@/assets/MediaElt"
import CardElt from "@/assets/CardElt"

import GalleryCreator from "@/components/creators/GalleryCreator"

export default {
  name: "GalleryView",
  components: {
    ListElt,
    MediaElt,
    CardElt,
    GalleryCreator
  },
  props: ["constants", "user"],

  created() {
    this.$store.dispatch("listGalleries");

    this.$serve.setMeta(
      this.constants.HEAD_GALLERY, 
      this.constants.META_GALLERY,
      this.constants.UI_URL + "/galleries",
      this.constants.UI_URL + this.constants.LOGO_SRC
    );
  },

  computed: {
    ...mapState(["galleries"]),
  },

  methods: {
    ...mapActions(["listGalleries"]),

    /**
     * CHECK ROLE
     * @param {string} role
     * @returns
     */
    checkRole(role) {
      return this.$serve.checkRole(this.user.role, role);
    }
  }
}
</script>
