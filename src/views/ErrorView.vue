<template>
  <main>
    <CardElt>
      <template #header>
        <h1>{{ val.ERROR_VIEW }}</h1>
        <b>{{ val.INTRO_ERROR }}</b>
      </template>

      <template #body>
        <MediaElt src="/img/errors/error-404.webp" :alt="val.ERROR_ALT" />

        <BtnElt href="/">
          <template #btn>
            <i class="fa-regular fa-hand-point-right"></i>
            {{ val.ERROR_LINK }}
            <i class="fa-regular fa-hand-point-left"></i>
          </template>
        </BtnElt>
      </template>
    </CardElt>
  </main>
</template>

<script>
import BtnElt from "../components/BtnElt"
import CardElt from "../components/CardElt"
import MediaElt from "../components/MediaElt"

export default {
  name: 'ErrorView',
  components: { BtnElt, CardElt, MediaElt },
  props: ["val"]
}
</script>
