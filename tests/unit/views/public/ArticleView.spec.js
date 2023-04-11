import { mount } from "@vue/test-utils"
import ArticleView from "@/views/public/ArticleView"

describe("ArticleView", () => {

  test("has data", () => {
    expect(typeof ArticleView.data).toBe("function")
  })

  test("has props", () => {
    expect(typeof ArticleView.props).toBe("object")
  })
});
