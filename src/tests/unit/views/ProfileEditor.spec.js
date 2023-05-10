import ProfileEditor from "../../../views/ProfileEditor"

describe("ProfileEditor", () => {
  test("name", () => { 
    expect(ProfileEditor.name).toBe("ProfileEditor") 
  })

  test("components", () => { 
    expect(typeof ProfileEditor.components).toBe("object") 
    expect(typeof ProfileEditor.components.BtnElt).toBe("object") 
    expect(typeof ProfileEditor.components.CardElt).toBe("object") 
    expect(typeof ProfileEditor.components.FieldElt).toBe("object") 
    expect(typeof ProfileEditor.components.ListElt).toBe("object") 
    expect(typeof ProfileEditor.components.MediaElt).toBe("object") 
    expect(typeof ProfileEditor.components.TableElt).toBe("object") 
  })

  test("props", () => { 
    expect(typeof ProfileEditor.props).toBe("object") 
    expect(ProfileEditor.props).toContain("constants") 
  })

  test("data", () => { 
    expect(typeof ProfileEditor.data).toBe("function") 
  })

  test("created()", () => {
    expect(typeof ProfileEditor.created).toBe("function")
  })

  test("computed", () => {
    expect(typeof ProfileEditor.computed).toBe("object")
  })

  test("methods", () => { 
    expect(typeof ProfileEditor.methods.checkSession).toBe("function") 
    expect(typeof ProfileEditor.methods.logout).toBe("function") 
    expect(typeof ProfileEditor.methods.updateUser).toBe("function") 
    expect(typeof ProfileEditor.methods.deleteUser).toBe("function") 
  })
})
