import { mount } from "@vue/test-utils"
import ProductEditor from "@/views/private/ProductEditor"

describe("ProductEditor", () => {

  test("has data", () => {
    expect(typeof ProductEditor.data).toBe("function")
  })
})
