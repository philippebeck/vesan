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

    <CardElt>
      <template #header>
        <h1 class="sky-dark">
          <i class="fa-regular fa-image fa-lg"></i> {{ gallery.name }}
        </h1>
        <b>{{ gallery.author }}</b>
      </template>

      <template #body>
        <SliderElt :slides="images">
          <template #slide="slotProps">
            <a :href="`/img/galleries/${slotProps.slide.name}`"
              :title="val.TITLE_WATCH + slotProps.slide.name"
              target="_blank"
              rel="noopener noreferrer">

              <MediaElt :src="`/img/galleries/${slotProps.slide.name}`"
                :alt="val.MAP_OF + slotProps.slide.description"
                :width="val.MEDIA_WIDTH">
                <template #figcaption>{{ slotProps.slide.description }}</template>
              </MediaElt>
            </a>
          </template>
        </SliderElt>

        <ListElt :items="images"
          :dynamic="true"
          class="grid-2sm-3md-4lg-5xl-6wd content-center">
          <template #items="slotProps">
            <a :href="`/img/galleries/${slotProps.item.name}`"
              :title="val.TITLE_WATCH + slotProps.item.name"
              target="_blank"
              rel="noopener noreferrer">

              <MediaElt :id="`${slotProps.item.name.toLowerCase()}`"
                :src="`/img/thumbnails/galleries/${slotProps.item.name}`" 
                :alt="val.IMAGE_OF + slotProps.item.description" 
                :width="val.THUMB_WIDTH"
                :height="val.THUMB_HEIGHT"
                loading="lazy">
                <template #figcaption>
                  <p class="gallery">{{ slotProps.item.description }}</p>
                </template>
              </MediaElt>
            </a>
          </template>
        </ListElt>
      </template>

      <template #aside v-if="checkSession('admin')">
        <ImageSet :images="images" :galleries="galleries" :token="token" :val="val"/>
      </template>
    </CardElt>
  </main>
</template>

<script>
import { checkRole, getData, setError, setMeta } from "servidio"
import { mapState, mapActions } from "vuex"

import CardElt from "@/assets/elements/CardElt"
import ListElt from "@/assets/elements/ListElt"
import MediaElt from "@/assets/elements/MediaElt"
import NavElt from "@/assets/elements/NavElt"
import SliderElt from "@/assets/elements/SliderElt"
import ImageSet from "@/assets/setters/ImageSet"

export default {
  name: "ImageView",
  components: { CardElt, ListElt, MediaElt, NavElt, SliderElt, ImageSet },
  props: ["avatar", "val"],
  data() {
    return {
      gallery: {}
    }
  },

  created() {
    const { API_URL, HEAD, META_IMAGE, UI_URL } = this.val;

    getData(`${API_URL}/galleries/${this.$route.params.id}`)
      .then((gallery) => {
        this.gallery = gallery;

        setMeta(
          gallery.name + HEAD, 
          META_IMAGE + gallery.author,
          `${UI_URL}/gallery/${gallery.id}`,
          `${UI_URL}/img/thumbnails/galleries/${gallery.cover}`
        );
      })
      .catch(err => { 
        setError(err);
        this.$router.push("/galleries");
      });

    this.$store.dispatch("listImages", this.$route.params.id);
    this.$store.dispatch("listGalleries");
  },

  computed: {
    ...mapState(["images", "galleries", "token"])
  },

  methods: {
    ...mapActions(["listImages", "listGalleries"]),

    /**
     * ? CHECK SESSION
     * * Checks the session for the specified role.
     * @param {string} role - The role to check the session against.
     * @return {boolean} Returns true if the session has the specified role, otherwise false.
     */
    checkSession(role) {
      return checkRole(this.avatar.role, role);
    }
  }
}
</script>
