<template>
  <main>
    <header>
      <h1>{{ val.LEGAL_VIEW }}</h1>
      <p>{{ val.INTRO_LEGAL }}</p>
      <a v-if="val.LEGAL_LINK" :href="val.LEGAL_LINK">{{ val.LEGAL_LINK }}</a>
    </header>

    <CardElt class="container-90sm-80lg-70xl">
      <template #header>
        <h2>{{ val.LEGAL_SUB }}</h2>
      </template>

      <template #body>
        <pre>{{ val.LEGAL_CONTENT }}</pre>
      </template>
    </CardElt>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { setMeta } from '../assets/services'

import CardElt from '../components/CardElt.vue'

interface Val {
  HEAD_LEGAL: string
  LOGO_SRC: string
  META_LEGAL: string
  UI_URL: string
}

export default defineComponent({
  name: 'LegalView',
  components: { CardElt },
  props: ['val'],

  /**
   * ? CREATED
   * * Set meta data
   */
  created() {
    const { HEAD_LEGAL, LOGO_SRC, META_LEGAL, UI_URL }: Val = this.val
    setMeta(HEAD_LEGAL, META_LEGAL, `${UI_URL}/legal`, UI_URL + LOGO_SRC)
  }
})
</script>
