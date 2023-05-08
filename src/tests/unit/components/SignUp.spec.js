import SignUp from "../../../components/SignUp"

describe("SignUp", () => {
  test("name", () => { 
    expect(SignUp.name).toBe("SignUp") 
  })

  test("components", () => { 
    expect(typeof SignUp.components).toBe("object") 
    expect(typeof SignUp.components.BtnElt).toBe("object") 
    expect(typeof SignUp.components.FieldElt).toBe("object") 
    expect(typeof SignUp.components.ListElt).toBe("object") 
    expect(typeof SignUp.components.VueRecaptcha).toBe("object") 
  })

  test("props", () => { 
    expect(typeof SignUp.props).toBe("object") 
    expect(SignUp.props).toContain("constants") 
  })

  test("data", () => { 
    expect(typeof SignUp.data).toBe("function") 
    expect(SignUp.data()).toEqual({ 
      name: "", 
      email: "", 
      image: "", 
      pass: ""
    }) 
  })

  test("methods", () => { 
    expect(typeof SignUp.methods.onVerify).toBe("function") 
    expect(typeof SignUp.methods.createUser).toBe("function") 
  })
})
