import { mount } from "@vue/test-utils"
import LegalView from "@/views/public/LegalView"

describe("LegalView", () => {

  test("has props", () => {
    expect(typeof LegalView.props).toBe("object")
  })
})
