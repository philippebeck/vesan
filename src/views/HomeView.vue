<template>

  <!-- HOME PAGE -->
  <CardElt>
    <template #header>

      <!-- Slider -->
      <SliderElt :slides="['vuejs', 'sass', 'node-js', 'html5', 'js', 'css3']"
        class="anima-grow">
        <template #slide="slotProps">
          <i :class="`fa-brands fa-${slotProps.slide.toLowerCase()} fa-10x blue`"></i>
        </template>
        <template #gallery="slotProps">
          <i :class="`fa-brands fa-${slotProps.slide.toLowerCase()}`"></i>
        </template>
      </SliderElt>

      <!-- Main Title -->
      <h1 class="blue anima-shrink">
        Vesan
      </h1>
    </template>

    <!-- Main Content -->
    <template #body>
      <strong class="gray">
        CMS with Vue-Elt, Servidio, Animadio & NemJS
      </strong>
    </template>
  </CardElt>
</template>

<script>
export default {
  name: "HomeView"
}
</script>
