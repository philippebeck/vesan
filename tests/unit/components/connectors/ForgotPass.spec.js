import { mount } from "@vue/test-utils"
import ForgotPass from "@/components/connectors/ForgotPass"

describe("ForgotPass", () => {

  test("has data", () => {
    expect(typeof ForgotPass.data).toBe("function")
  })

  test("has props", () => {
    expect(typeof ForgotPass.props).toBe("object")
  })
})
