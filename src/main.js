import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"

import font from '@fortawesome/fontawesome-free/css/all.min.css'
import anima from "animadio/dist/animadio.min.css"
import style from "/public/css/style.css"
import serve from "servidio/dist/serve.min.js"

const app = createApp(App)

app.config.globalProperties.$serve = serve

app
  .use(router)
  .use(store)
  .use(font)
  .use(anima)
  .use(style)
  .mount("#app")
