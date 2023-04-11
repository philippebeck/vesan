import { mount } from "@vue/test-utils"
import App from "@/App"

describe("App", () => {

  test("has data", () => {
    expect(typeof App.data).toBe("function")
  })
})
