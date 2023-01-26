<template>
  <CardElt id="top">
    <template #header>

      <SliderElt :slides="['html5', 'css3', 'js', 'vuejs', 'node-js']">
        <template #slide="slotProps">
          <i :class="`fa-brands fa-${slotProps.slide.toLowerCase()} fa-10x blue`"></i>
        </template>
        <template #gallery="slotProps">
          <i :class="`fa-brands fa-${slotProps.slide.toLowerCase()}`"></i>
        </template>
      </SliderElt>

      <!-- Main Title -->
      <h1 class="blue shatex-blur-sm anima-slideB">
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
  name: "HomeView",
}
</script>
