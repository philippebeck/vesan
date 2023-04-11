import { mount } from "@vue/test-utils"
import ShopView from "@/views/public/ShopView"

describe("ShopView", () => {

  test("has props", () => {
    expect(typeof ShopView.props).toBe("object")
  })
})
