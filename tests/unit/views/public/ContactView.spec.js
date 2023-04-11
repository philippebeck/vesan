import { mount } from "@vue/test-utils"
import ContactView from "@/views/public/ContactView"

describe("ContactView", () => {

  test("has data", () => {
    expect(typeof ContactView.data).toBe("function")
  })

  test("has props", () => {
    expect(typeof ContactView.props).toBe("object")
  })
})
