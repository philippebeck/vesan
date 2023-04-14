import ContactView from "@/views/public/ContactView"

describe("ContactView", () => {
  test("name", () => { 
    expect(ContactView.name).toBe("ContactView") 
  })

  test("components", () => { 
    expect(typeof ContactView.components).toBe("object") 
    expect(typeof ContactView.components.BtnElt).toBe("object") 
    expect(typeof ContactView.components.CardElt).toBe("object") 
    expect(typeof ContactView.components.FieldElt).toBe("object") 
    expect(typeof ContactView.components.ListElt).toBe("object") 
    expect(typeof ContactView.components.VueRecaptcha).toBe("object") 
  })

  test("props", () => { 
    expect(typeof ContactView.props).toBe("object") 
    expect(ContactView.props).toContain("constants") 
    expect(ContactView.props).toContain("user") 
  })

  test("data", () => { 
    expect(typeof ContactView.data).toBe("function") 
    expect(ContactView.data()).toEqual({ 
      email: "", 
      subject: "", 
      text: "" 
    }) 
  })

  test("methods", () => { 
    expect(typeof ContactView.methods.onVerify).toBe("function") 
    expect(typeof ContactView.methods.send).toBe("function") 
  })
})
