<template>
  <main>
    <header>
      <h1 class="sky-dark">
        {{ constants.HOME_VIEW }}
      </h1>
    </header>

    <CardElt>
      <template #header>
        <h2 class="ani-flipperX-loop-altrev-into">
          {{ constants.HOME_SUB }}
        </h2>
        <b>{{ constants.INTRO_HOME }}</b>
      </template>

      <template #body>
        <ListElt :dynamic="true"
          :items="constants.HOME_CONTENT"/>
      </template>
    </CardElt>
  </main>
</template>

<script>
import { setMeta } from "servidio"
import { CardElt, ListElt } from "vue-elt"

export default {
  name: "HomeView",
  components: {
    CardElt,
    ListElt
  },
  props: [
    "constants",
    "user"
  ],

  created() {
    setMeta(
      this.constants.HEAD_HOME, 
      this.constants.META_HOME,
      this.constants.UI_URL,
      this.constants.UI_URL + this.constants.LOGO_SRC
    );
  }
}
</script>
