import ErrorView from "@/views/public/ErrorView"

describe("ErrorView", () => {
  test("name", () => { 
    expect(ErrorView.name).toBe("ErrorView") 
  })

  test("components", () => { 
    expect(typeof ErrorView.components).toBe("object") 
    expect(typeof ErrorView.components.BtnElt).toBe("object") 
    expect(typeof ErrorView.components.CardElt).toBe("object") 
    expect(typeof ErrorView.components.MediaElt).toBe("object") 
  })

  test("props", () => { 
    expect(typeof ErrorView.props).toBe("object") 
    expect(ErrorView.props).toContain("constants") 
  })
})
