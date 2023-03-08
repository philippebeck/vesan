<template>

  <!-- HOME PAGE -->
  <CardElt>
    <template #header>

      <!-- Slider -->
      <SliderElt  v-if="constants.HOME_MEDIA === 'slider'"
        :slides="constants.SLIDES"
        :delay="constants.SLIDER_DELAY"
        class="ani-grow-it">

        <template #slide="slotProps">
          <i :class="`fa-${constants.SLIDER_FA} fa-${slotProps.slide.toLowerCase()} fa-9x blue`"></i>
        </template>
        <template #gallery="slotProps">
          <i :class="`fa-${constants.SLIDER_FA} fa-${slotProps.slide.toLowerCase()}`"></i>
        </template>
      </SliderElt>

      <!-- Video or Image -->
      <MediaElt v-else
        :type="constants.HOME_MEDIA"
        :src="constants.HOME_SRC"
        :alt="constants.HOME_ALT"
        :width="constants.HOME_WIDTH"
        :loop="constants.HOME_LOOP"/>

      <!-- Title -->
      <h1 class="blue ani-shrink-it">
        {{ constants.HOME_VIEW }}
      </h1>
    </template>

    <!-- Main Content -->
    <template #body>
      <strong>{{ constants.INTRO_HOME }}</strong>
      <ListElt :dynamic="true"
        :items="constants.HOME_CONTENT"/>
    </template>
  </CardElt>
</template>

<script>
export default {
  name: "HomeView",
  props: ["constants"]
}
</script>
