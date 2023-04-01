<template>
  <main>
    <header>
      <h1>{{ constants.LEGAL_VIEW }}</h1>
      <p>{{ constants.INTRO_LEGAL }}</p>

      <a v-if="constants.LEGAL_LINK" 
        :href="constants.LEGAL_LINK">
        {{ constants.LEGAL_LINK }}
      </a>
    </header>

    <CardElt class="container-90sm-80lg-70xl">
      <template #header>
        <h2>{{ constants.LEGAL_SUB }}</h2>
      </template>

      <template #body>
        <pre>{{ constants.LEGAL_CONTENT }}</pre>
      </template>
    </CardElt>
  </main>
</template>

<script>
import CardElt from "@/assets/CardElt"

export default {
  name: "LegalView",
  components: { CardElt },
  props: ["constants", "user"],

  created() {
    this.$serve.setMeta(
      this.constants.HEAD_LEGAL, 
      this.constants.META_LEGAL,
      this.constants.UI_URL + "/legal",
      this.constants.UI_URL + this.constants.LOGO_SRC
    );
  }
}
</script>