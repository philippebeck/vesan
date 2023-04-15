import LegalView from "@/views/public/LegalView"

describe("LegalView", () => {
  test("name", () => { 
    expect(LegalView.name).toBe("LegalView") 
  })

  test("components", () => { 
    expect(typeof LegalView.components).toBe("object") 
    expect(typeof LegalView.components.CardElt).toBe("object") 
  })

  test("props", () => { 
    expect(typeof LegalView.props).toBe("object") 
    expect(LegalView.props).toContain("constants") 
    expect(LegalView.props).toContain("user") 
  })

  test("created()", () => {
    expect(typeof LegalView.created).toBe("function")
  })
})
