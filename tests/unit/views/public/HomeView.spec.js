import { mount } from "@vue/test-utils"
import HomeView from "@/views/public/HomeView"

describe("HomeView", () => {

  test("has data", () => {
    expect(typeof HomeView.data).toBe("function")
  })

  test("has props", () => {
    expect(typeof HomeView.props).toBe("object")
  })
})
