<template>

  <!-- ERROR PAGE -->
  <CardElt>
    <template #header>
      <h1>{{ constants.ERROR_TITLE }}</h1>
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
import constants from "/constants"

export default {
  name: 'ErrorView',

  data() {
    return {
      constants: {}
    }
  },

  mounted() {
    this.constants = constants;
  }
}
</script>
