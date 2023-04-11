import { mount } from "@vue/test-utils"
import LoginView from "@/views/public/LoginView"

describe("LoginView", () => {

  test("has data", () => {
    expect(typeof LoginView.data).toBe("function")
  })

  test("has props", () => {
    expect(typeof LoginView.props).toBe("object")
  })
})
