import App from "../../App"

describe("App", () => {
  test("name", () => { 
    expect(App.name).toBe("App") 
  })

  test("components", () => { 
    expect(typeof App.components).toBe("object") 
    expect(typeof App.components.FootElt).toBe("object") 
    expect(typeof App.components.ListElt).toBe("object") 
    expect(typeof App.components.NavElt).toBe("object") 
  })

  test("data", () => { 
    expect(typeof App.data).toBe("function") 
    expect(App.data()).toEqual({ constants: {} }) 
  })

  test("methods", () => { 
    expect(typeof App.methods.checkSession).toBe("function") 
  })
})
