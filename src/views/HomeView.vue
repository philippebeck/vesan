<template>
  <main>
    <header>
      <h1 class="sky-dark">{{ val.HOME_VIEW }}</h1>
    </header>

    <CardElt class="container-90sm-80md-70lg-60xl-50wd flex-col gap-tn4">
      <template #header>
        <h2>{{ val.HOME_SUB }}</h2>
        <b>{{ val.INTRO_HOME }}</b>
      </template>

      <template #body>
        <ListElt :dynamic="true" :items="val.HOME_CONTENT" />

        <ListElt :dynamic="true" :items="val.HOME_LINKS" class="flex-wrap content-center">
          <template #items="slotProps">
            <BtnElt
              :href="slotProps.item.href"
              class="btn-blue"
              :content="slotProps.item.content"
              :title="slotProps.item.title"
            >
              <template #btn>
                <i :class="`fa-solid fa-${slotProps.item.fa} fa-lg fa-fw`"></i>
              </template>
            </BtnElt>
          </template>
        </ListElt>
      </template>
    </CardElt>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { setMeta } from '../assets/services'

import BtnElt from '../components/BtnElt.vue'
import CardElt from '../components/CardElt.vue'
import ListElt from '../components/ListElt.vue'

interface Val {
  HEAD_HOME: string
  LOGO_SRC: string
  META_HOME: string
  UI_URL: string
}

export default defineComponent({
  name: 'HomeView',
  components: { BtnElt, CardElt, ListElt },
  props: ['val'],

  /**
   * ? CREATED
   * * Set meta data
   */
  created() {
    const { HEAD_HOME, LOGO_SRC, META_HOME, UI_URL }: Val = this.val
    setMeta(HEAD_HOME, META_HOME, UI_URL, UI_URL + LOGO_SRC)
  }
})
</script>
