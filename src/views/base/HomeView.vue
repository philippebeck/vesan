<template>
  <main>
    <header>
      <h1 class="sky-dark">
        {{ val.HOME_VIEW }}
      </h1>
    </header>

    <CardElt>
      <template #header>
        <h2 class="ani-flipperX-loop-altrev-into">
          {{ val.HOME_SUB }}
        </h2>
        <b>{{ val.INTRO_HOME }}</b>
      </template>

      <template #body>
        <ListElt :dynamic="true"
          :items="val.HOME_CONTENT"/>
      </template>
    </CardElt>
  </main>
</template>

<script>
import CardElt from "@/assets/elements/CardElt"
import ListElt from "@/assets/elements/ListElt"

import { setMeta } from "servidio"

export default {
  name: "HomeView",
  components: { CardElt, ListElt },
  props: ["val", "user"],

  created() {
    setMeta(
      this.val.HEAD_HOME, 
      this.val.META_HOME,
      this.val.UI_URL,
      this.val.UI_URL + this.val.LOGO_SRC
    );
  }
}
</script>
