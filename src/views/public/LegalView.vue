<template>
  <CardElt class="container-90sm-80lg-70xl">
    <template #header>
      <h1>{{ constants.LEGAL_VIEW }}</h1>
      <p>{{ constants.INTRO_LEGAL }}</p>
      <a :href="constants.LEGAL_LINK">
        {{ constants.LEGAL_LINK }}
      </a>
    </template>

    <template #body>
      <pre>{{ constants.LEGAL_CONTENT }}</pre>
    </template>
  </CardElt>
</template>

<script>
export default {
  name: "LegalView",
  props: ["constants"]
}
</script>