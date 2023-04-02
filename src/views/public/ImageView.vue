<template>
  <main>
    <CardElt>
      <template #header>
        <h1 class="sky-dark">
          <i class="fa-regular fa-image fa-lg"
            aria-hidden="true">
          </i>
          {{ constants.IMAGE_VIEW }}
        </h1>
        <b>{{ constants.INTRO_IMAGE }}</b>
      </template>

      <template #body>
        <ListElt :items="images"
          :dynamic="true">

          <template #items="slotProps">

            <CardElt>
              <template #header>
                  <h2 class="sky-dark">
                    {{ slotProps.item.author }}
                  </h2>
              </template>

              <template #body>
                <a :href="`image/${slotProps.item._id}`"
                  :title="constants.TITLE_WATCH + slotProps.item.name">

                  <MediaElt :id="`${slotProps.item.name.toLowerCase()}`"
                    :src="`img/thumbnails/images/${slotProps.item.name}`" 
                    :alt="`${slotProps.item.name}`" 
                    :width="constants.THUMB_WIDTH"
                    :height="constants.THUMB_HEIGHT">

                    <template #figcaption>
                      <p class="monospace figcaption">
                        {{ slotProps.item.name }}
                      </p>
                    </template>

                  </MediaElt>
                </a>
              </template>
            </CardElt>
          </template>
        </ListElt>
      </template>

      <template #aside v-if="checkRole('admin')">
        <ImageCreator :constants="constants"
          :galleries="galleries"/>
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
    this.$store.dispatch("readGallery");
    this.$store.dispatch("listGalleryImages", this.$route.params.id);
    this.$store.dispatch("listGalleries");

    this.$serve.setMeta(
      this.constants.HEAD_IMAGE, 
      this.constants.META_IMAGE,
      this.constants.UI_URL + "/images",
      this.constants.UI_URL + this.constants.LOGO_SRC
    );
  },

  computed: {
    ...mapState(["gallery", "images", "galleries"])
  },

  methods: {
    ...mapActions(["readGallery", "listGalleryImages", "listGalleries"]),

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
