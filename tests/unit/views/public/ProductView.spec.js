import { mount } from "@vue/test-utils"
import ProductView from "@/views/public/ProductView"

describe("ProductView", () => {

  test("has data", () => {
    expect(typeof ProductView.data).toBe("function")
  })

  test("has props", () => {
    expect(typeof ProductView.props).toBe("object")
  })
})
