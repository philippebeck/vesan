import ProductEditor from "@/views/private/ProductEditor"

describe("ProductEditor", () => {
  test("name", () => { 
    expect(ProductEditor.name).toBe("ProductEditor") 
  })

  test("components", () => { 
    expect(typeof ProductEditor.components).toBe("object") 
    expect(typeof ProductEditor.components.BtnElt).toBe("object") 
    expect(typeof ProductEditor.components.CardElt).toBe("object") 
    expect(typeof ProductEditor.components.FieldElt).toBe("object") 
    expect(typeof ProductEditor.components.ListElt).toBe("object") 
    expect(typeof ProductEditor.components.MediaElt).toBe("object") 
    expect(typeof ProductEditor.components.Editor).toBe("object") 
  })

  test("props", () => { 
    expect(typeof ProductEditor.props).toBe("object") 
    expect(ProductEditor.props).toContain("constants") 
  })

  test("data", () => { 
    expect(typeof ProductEditor.data).toBe("function") 
    expect(ProductEditor.data()).toEqual({ user: {} }) 
  })

  test("methods", () => { 
    expect(typeof ProductEditor.methods.checkRole).toBe("function") 
    expect(typeof ProductEditor.methods.updateProduct).toBe("function") 
  })
})
