import { config } from "@vue/test-utils"
import serve from "servidio/dist/serve.js"
import axios from "axios"

config.global.mocks = {
  serve: (setMeta) => serve.setMeta()
}
