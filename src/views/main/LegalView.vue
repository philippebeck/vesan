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

<script>
import CardElt from "@/assets/elements/CardElt"
import { setMeta } from "servidio"

export default {
  name: "LegalView",
  components: { CardElt },
  props: ["val", "user"],

  created() {
    setMeta(
      this.val.HEAD_LEGAL, 
      this.val.META_LEGAL,
      this.val.UI_URL + "/legal",
      this.val.UI_URL + this.val.LOGO_SRC
    );
  }
}
</script>
