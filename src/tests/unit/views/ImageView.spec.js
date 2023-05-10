import ImageView from "../../../views/ImageView"

describe("ImageView", () => {
  test("name", () => { 
    expect(ImageView.name).toBe("ImageView") 
  })

  test("components", () => { 
    expect(typeof ImageView.components).toBe("object") 
    expect(typeof ImageView.components.CardElt).toBe("object") 
    expect(typeof ImageView.components.ListElt).toBe("object") 
    expect(typeof ImageView.components.MediaElt).toBe("object") 
    expect(typeof ImageView.components.SliderElt).toBe("object") 
    expect(typeof ImageView.components.ImageCreator).toBe("object") 
  })

  test("props", () => { 
    expect(typeof ImageView.props).toBe("object") 
    expect(ImageView.props).toContain("constants") 
    expect(ImageView.props).toContain("user") 
  })

  test("data", () => { 
    expect(typeof ImageView.data).toBe("function") 
    expect(ImageView.data()).toEqual({ gallery: {} }) 
  })

  test("created()", () => {
    expect(typeof ImageView.created).toBe("function")
  })

  test("computed", () => {
    expect(typeof ImageView.computed).toBe("object")
  })

  test("methods", () => { 
    expect(typeof ImageView.methods.checkSession).toBe("function") 
  })
})
