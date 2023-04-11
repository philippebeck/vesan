import { mount } from "@vue/test-utils"
import ArticleEditor from "@/views/private/ArticleEditor"

describe("ArticleEditor", () => {

  test("has data", () => {
    expect(typeof ArticleEditor.data).toBe("function")
  })
})
