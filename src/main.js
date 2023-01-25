import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import serve from "servidio"
import element from "vue-elt"
import "./style/style.css"

const app = createApp(App)
app.config.globalProperties.$serve = serve
app.use(router).use(element).mount("#app")
