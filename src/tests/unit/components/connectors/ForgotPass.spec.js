import ForgotPass from "@/components/connectors/ForgotPass"

describe("ForgotPass", () => {
  test("name", () => { 
    expect(ForgotPass.name).toBe("ForgotPass") 
  })

  test("components", () => { 
    expect(typeof ForgotPass.components).toBe("object") 
    expect(typeof ForgotPass.components.BtnElt).toBe("object") 
    expect(typeof ForgotPass.components.FieldElt).toBe("object") 
    expect(typeof ForgotPass.components.VueRecaptcha).toBe("object") 
  })

  test("props", () => { 
    expect(typeof ForgotPass.props).toBe("object") 
    expect(ForgotPass.props).toContain("constants") 
  })

  test("data", () => { 
    expect(typeof ForgotPass.data).toBe("function") 
    expect(ForgotPass.data()).toEqual({ email: "" }) 
  })

  test("methods", () => { 
    expect(typeof ForgotPass.methods.onVerify).toBe("function") 
    expect(typeof ForgotPass.methods.forgotPass).toBe("function") 
  })
})
