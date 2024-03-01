import { createApp } from "vue"
import App from "./App.vue"

import router from "./app/router.js"
import store from "./store"

import font from '@fortawesome/fontawesome-free/css/all.min.css'
import anima from "animadio/dist/animadio.min.css"

import style from "../public/css/style.css"

const app = createApp(App)

app
  .use(router)
  .use(store)
  .use(font)
  .use(anima)
  .use(style)
  .mount("#app")
