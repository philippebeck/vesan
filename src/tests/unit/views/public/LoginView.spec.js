import LoginView from "@/views/public/LoginView"

describe("LoginView", () => {
  test("name", () => { 
    expect(LoginView.name).toBe("LoginView") 
  })

  test("components", () => { 
    expect(typeof LoginView.components).toBe("object") 
    expect(typeof LoginView.components.BtnElt).toBe("object") 
    expect(typeof LoginView.components.CardElt).toBe("object") 
    expect(typeof LoginView.components.SignUp).toBe("object") 
    expect(typeof LoginView.components.SignIn).toBe("object") 
    expect(typeof LoginView.components.ForgotPass).toBe("object") 
  })

  test("props", () => { 
    expect(typeof LoginView.props).toBe("object") 
    expect(LoginView.props).toContain("constants") 
  })

  test("data", () => { 
    expect(typeof LoginView.data).toBe("function") 
    expect(LoginView.data()).toEqual({ type: "SignIn" }) 
  })

  test("created()", () => {
    expect(typeof LoginView.created).toBe("function")
  })

  test("methods", () => { 
    expect(typeof LoginView.methods.setType).toBe("function") 
  })
})
