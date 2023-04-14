import SignIn from "@/components/connectors/SignIn"

describe("SignIn", () => {
  test("name", () => { 
    expect(SignIn.name).toBe("SignIn") 
  })

  test("components", () => { 
    expect(typeof SignIn.components).toBe("object") 
    expect(typeof SignIn.components.BtnElt).toBe("object") 
    expect(typeof SignIn.components.FieldElt).toBe("object") 
    expect(typeof SignIn.components.VueRecaptcha).toBe("object") 
  })

  test("props", () => { 
    expect(typeof SignIn.props).toBe("object") 
    expect(SignIn.props).toContain("constants") 
  })

  test("data", () => { 
    expect(typeof SignIn.data).toBe("function") 
    expect(SignIn.data()).toEqual({ 
      email: "", 
      pass: ""
    }) 
  })

  test("methods", () => { 
    expect(typeof SignIn.methods.onVerify).toBe("function") 
    expect(typeof SignIn.methods.signIn).toBe("function") 
  })
})
