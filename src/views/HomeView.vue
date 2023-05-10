<template>
  <main>
    <header>
      <SliderElt v-if="constants.HOME_MEDIA === 'slider'"
        :slides="constants.SLIDES"
        :delay="constants.SLIDER_DELAY">

        <template #slide="slotProps">
          <i :class="`fa-${constants.SLIDER_FA} fa-${slotProps.slide.toLowerCase()} fa-9x sky`"></i>
        </template>

        <template #gallery="slotProps">
          <i :class="`fa-${constants.SLIDER_FA} fa-${slotProps.slide.toLowerCase()}`"></i>
        </template>
      </SliderElt>

      <MediaElt v-else-if="constants.HOME_MEDIA === 'api'"
        :type="media.media_type"
        :src="media.url"
        :alt="media.title"
        :width="constants.HOME_WIDTH"
        :loop="constants.HOME_LOOP"
        :title="
          media.title + ' : ' + 
          media.explanation + 
          (media.copyright ? ' Credits : ' + media.copyright : '')"/>

      <MediaElt v-else
        :type="media.media_type"
        :src="constants.HOME_SRC"
        :alt="constants.HOME_ALT"
        :width="constants.HOME_WIDTH"
        :loop="constants.HOME_LOOP"
        :title="constants.HOME_ALT"/>

      <h1 class="sky-dark">
        {{ constants.HOME_VIEW }}
      </h1>
    </header>

    <CardElt>
      <template #header>
        <h2 class="ani-flipperX-loop-altrev-into">
          {{ constants.HOME_SUB }}
        </h2>
        <b>{{ constants.INTRO_HOME }}</b>
      </template>

      <template #body>
        <ListElt :dynamic="true"
          :items="constants.HOME_CONTENT"/>
      </template>
    </CardElt>
  </main>
</template>

<script>
import serve from "../assets/serve"
import CardElt from "../assets/CardElt"
import ListElt from "../assets/ListElt"
import MediaElt from "../assets/MediaElt"
import SliderElt from "../assets/SliderElt"

export default {
  name: "HomeView",
  components: {
    CardElt,
    ListElt,
    MediaElt,
    SliderElt
  },
  props: [
    "constants",
    "user"
  ],
  data() {
    return {
      media: {}
    }
  },

  created() {
    serve.setMeta(
      this.constants.HEAD_HOME, 
      this.constants.META_HOME,
      this.constants.UI_URL,
      this.constants.UI_URL + this.constants.LOGO_SRC
    );

    if (this.constants.HOME_MEDIA === "api") {
      let url = this.constants.HOME_API_URL + this.constants.HOME_API_KEY;

      serve.fetchGet(url)
      .then((media) => { this.media = media })
      .catch(err => serve.checkError(err));
    }
  }
}
</script>
