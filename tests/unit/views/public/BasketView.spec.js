import { mount } from "@vue/test-utils"
import BasketView from "@/views/public/BasketView"

describe("BasketView", () => {

  test("has data", () => {
    expect(typeof BasketView.data).toBe("function")
  })

  test("has props", () => {
    expect(typeof BasketView.props).toBe("object")
  })
})
