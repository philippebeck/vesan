import { mount } from "@vue/test-utils"
import SignUp from "@/components/connectors/SignUp"

describe("ForgotPass", () => {

  test("has data", () => {
    expect(typeof SignUp.data).toBe("function")
  })

  test("has props", () => {
    expect(typeof SignUp.props).toBe("object")
  })
})
