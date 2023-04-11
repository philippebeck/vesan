import { mount } from "@vue/test-utils"
import ErrorView from "@/views/public/ErrorView"

describe("ErrorView", () => {

  test("has props", () => {
    expect(typeof ErrorView.props).toBe("object")
  })
})
