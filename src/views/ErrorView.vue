<template>

  <!-- ERROR PAGE -->
  <CardElt>
    <template #header>
      <h1>{{ constants.ERROR_VIEW }}</h1>
      <b>{{ constants.INTRO_ERROR }}</b>
    </template>

    <template #body>

      <!-- Image 404 -->
      <MediaElt src="/img/errors/error-404.webp" 
        :alt="constants.ERROR_ALT">
      </MediaElt>

      <!-- Link to Home -->
      <BtnElt href="/">
        <template #btn>
          <i class="fa-regular fa-hand-point-right"></i>
          {{ constants.ERROR_LINK }}
          <i class="fa-regular fa-hand-point-left"></i>
        </template>
      </BtnElt>
    </template>
  </CardElt>
</template>

<script>
export default {
  name: 'ErrorView',
  props: ["constants"]
}
</script>
