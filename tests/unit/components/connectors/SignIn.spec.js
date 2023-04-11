import { mount } from "@vue/test-utils"
import SignIn from "@/components/connectors/SignIn"

describe("SignIn", () => {

  test("has data", () => {
    expect(typeof SignIn.data).toBe("function")
  })

  test("has props", () => {
    expect(typeof SignIn.props).toBe("object")
  })
})
