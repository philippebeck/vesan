import { createApp } from "vue"
import App from "./App"
import router from "./app/router"
import store from "./app/store"
import fonts from "../public/css/fonts.css"
import icons from '@fortawesome/fontawesome-free/css/all.min.css'
import style from "animadio/dist/animadio.min.css"

const app = createApp(App)

app
  .use(router)
  .use(store)
  .use(fonts)
  .use(icons)
  .use(style)
  .mount("#app")
