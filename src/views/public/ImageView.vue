<template>
  <main>
    <CardElt>
      <template #header>
        <h1 class="sky-dark">
          <i class="fa-regular fa-image fa-lg"
            aria-hidden="true">
          </i>
          {{ gallery.name }}
        </h1>
        <b>{{ gallery.author }}</b>
      </template>

      <template #body>
        <ListElt :items="images"
          :dynamic="true"
          class="grid-2sm-3md-4lg-6xl-8wd content-center">

          <template #items="slotProps">
            <a :href="`/img/galleries/${slotProps.item.name}`"
              :title="constants.TITLE_WATCH + slotProps.item.name">

              <MediaElt :id="`${slotProps.item.name.toLowerCase()}`"
                :src="`/img/thumbnails/galleries/${slotProps.item.name}`" 
                :alt="`${slotProps.item.description}`" 
                :width="constants.THUMB_WIDTH"
                :height="constants.THUMB_HEIGHT">

                <template #figcaption>
                  <p class="monospace figcaption">
                    {{ slotProps.item.description }}
                  </p>
                </template>

              </MediaElt>
            </a>
          </template>
        </ListElt>
      </template>

      <template #aside v-if="checkRole('admin')">
        <ImageCreator :constants="constants"/>
      </template>
    </CardElt>
  </main>
</template>

<script>
import { mapState, mapActions } from "vuex"

import ListElt from "@/assets/ListElt"
import MediaElt from "@/assets/MediaElt"
import CardElt from "@/assets/CardElt"

import ImageCreator from "@/components/creators/ImageCreator"

export default {
  name: "ImageView",
  components: {
    ListElt,
    MediaElt,
    CardElt,
    ImageCreator
  },

  props: ["constants", "user"],

  created() {
    this.$store.dispatch("readGallery", this.$route.params.id);
    this.$store.dispatch("listGalleryImages", this.$route.params.id);

    this.$serve.setMeta(
      this.constants.HEAD_IMAGE, 
      this.constants.META_IMAGE,
      this.constants.UI_URL + "/images",
      this.constants.UI_URL + this.constants.LOGO_SRC
    );
  },

  computed: {
    ...mapState(["gallery", "images"])
  },

  methods: {
    ...mapActions(["readGallery", "listGalleryImages"]),

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
