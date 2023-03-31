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
          :dynamic="true">

          <template #items="slotProps">

            <CardElt>
              <template #header>
                  <h2 class="sky-dark">
                    {{ slotProps.value.author }}
                  </h2>
              </template>

              <template #body>
                <a :href="`gallery/${slotProps.value._id}`"
                  :title="constants.TITLE_WATCH + slotProps.value.name">

                  <MediaElt :id="`${slotProps.value.name.toLowerCase()}`"
                    :src="`img/thumbnails/galleries/${slotProps.value.name}`" 
                    :alt="`${slotProps.value.alt}`" 
                    :width="constants.THUMB_WIDTH"
                    :height="constants.THUMB_HEIGHT">

                    <template #figcaption>
                      <p class="monospace figcaption">
                        {{ slotProps.value.name }}
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
  props: ["constants"],

  created() {
    this.$store.dispatch("listGalleries");

    this.$serve.setMeta(
      this.constants.HEAD_GALLERY, 
      this.constants.META_GALLERY,
      this.constants.UI_URL + "/galleries",
      this.constants.UI_URL + this.constants.LOGO_SRC
    );
  },

  updated() {
    const descriptionArray = document.getElementsByClassName("figcaption");

    for (let descriptionElt of descriptionArray) {
      descriptionElt.firstChild.setAttribute("itemprop", "description");
    }
  },

  computed: {
    ...mapState(["galleries", "user"]),
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
