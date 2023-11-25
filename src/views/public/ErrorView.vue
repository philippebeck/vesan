<template>
  <main>
    <CardElt>
      <template #header>
        <h1>{{ constants.ERROR_VIEW }}</h1>
        <b>{{ constants.INTRO_ERROR }}</b>
      </template>

      <template #body>

        <MediaElt src="/img/errors/error-404.webp" 
          :alt="constants.ERROR_ALT">
        </MediaElt>

        <BtnElt href="/">
          <template #btn>
            <i class="fa-regular fa-hand-point-right"></i>
            {{ constants.ERROR_LINK }}
            <i class="fa-regular fa-hand-point-left"></i>
          </template>
        </BtnElt>
      </template>
    </CardElt>
  </main>
</template>

<script>
import { BtnElt, CardElt, MediaElt } from "vue-elt"

export default {
  name: 'ErrorView',
  components: {
    BtnElt,
    CardElt,
    MediaElt
  },

  props: ["constants"]
}
</script>
