<template>
  <main>
    <header>
      <h1 class="sky-dark">{{ val.HOME_VIEW }}</h1>
    </header>

    <CardElt>
      <template #header>
        <h2 class="ani-flipperX-loop-altrev-into">{{ val.HOME_SUB }}</h2>
        <b>{{ val.INTRO_HOME }}</b>
      </template>

      <template #body>
        <ListElt :dynamic="true" :items="val.HOME_CONTENT" class="ani-grow-it"/>
      </template>
    </CardElt>
  </main>
</template>

<script>
import { setMeta } from "servidio"

import CardElt from "@/assets/elements/CardElt"
import ListElt from "@/assets/elements/ListElt"

export default {
  name: "HomeView",
  components: { CardElt, ListElt },
  props: ["user", "val"],

  created() {
    const { HEAD_HOME, LOGO_SRC, META_HOME, UI_URL } = this.val;
    setMeta(HEAD_HOME, META_HOME, UI_URL, UI_URL + LOGO_SRC);
  }
}
</script>
