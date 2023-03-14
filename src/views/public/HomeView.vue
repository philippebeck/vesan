<template>
  <header>
    <SliderElt  v-if="constants.HOME_MEDIA === 'slider'"
      :slides="constants.SLIDES"
      :delay="constants.SLIDER_DELAY"
      class="ani-grow-it">

      <template #slide="slotProps">
        <i :class="`fa-${constants.SLIDER_FA} fa-${slotProps.slide.toLowerCase()} fa-9x sky`"></i>
      </template>
      <template #gallery="slotProps">
        <i :class="`fa-${constants.SLIDER_FA} fa-${slotProps.slide.toLowerCase()}`"></i>
      </template>
    </SliderElt>

    <MediaElt v-else
      :type="constants.HOME_MEDIA"
      :src="constants.HOME_SRC"
      :alt="constants.HOME_ALT"
      :width="constants.HOME_WIDTH"
      :loop="constants.HOME_LOOP"/>

    <h1 class="blue ani-shrink-it">
      {{ constants.HOME_VIEW }}
    </h1>
  </header>

  <CardElt>
    <template #header>
      <h2>{{ constants.HOME_SUB }}</h2>
      <b>{{ constants.INTRO_HOME }}</b>
    </template>

    <template #body>
      <ListElt :dynamic="true"
        :items="constants.HOME_CONTENT"/>
    </template>
  </CardElt>
</template>

<script>
export default {
  name: "HomeView",
  props: ["constants"],

  created() {
    this.$serve.setMeta(
      this.constants.HEAD_HOME, 
      this.constants.META_HOME,
      this.constants.UI_URL,
      this.constants.UI_URL + "/img/logo.svg"
      );
  }
}
</script>
