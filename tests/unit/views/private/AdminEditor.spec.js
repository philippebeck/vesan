import { mount } from "@vue/test-utils"
import AdminEditor from "@/views/private/AdminEditor"

describe("AdminEditor", () => {

  test("has data", () => {
    expect(typeof AdminEditor.data).toBe("function")
  })
})
