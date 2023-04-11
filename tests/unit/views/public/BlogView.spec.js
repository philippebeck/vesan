import { mount } from "@vue/test-utils"
import BlogView from "@/views/public/BlogView"

describe("BlogView", () => {

  test("has props", () => {
    expect(typeof BlogView.props).toBe("object")
  })
})
