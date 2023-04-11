import { mount } from "@vue/test-utils"
import LinkView from "@/views/public/LinkView"

describe("LinkView", () => {

  test("has props", () => {
    expect(typeof LinkView.props).toBe("object")
  })
})
