import { mount } from "@vue/test-utils"
import ProfileEditor from "@/views/private/ProfileEditor"

describe("ProfileEditor", () => {

  test("has data", () => {
    expect(typeof ProfileEditor.data).toBe("function")
  })
})
