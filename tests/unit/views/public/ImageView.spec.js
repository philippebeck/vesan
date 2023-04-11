import { mount } from "@vue/test-utils"
import ImageView from "@/views/public/ImageView"

describe("ImageView", () => {

  test("has data", () => {
    expect(typeof ImageView.data).toBe("function")
  })

  test("has props", () => {
    expect(typeof ImageView.props).toBe("object")
  })
})
