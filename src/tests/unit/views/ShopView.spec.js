import ShopView from "../../../views/ShopView"

describe("ShopView", () => {
  test("name", () => { 
    expect(ShopView.name).toBe("ShopView") 
  })

  test("components", () => { 
    expect(typeof ShopView.components).toBe("object") 
    expect(typeof ShopView.components.BtnElt).toBe("object") 
    expect(typeof ShopView.components.CardElt).toBe("object") 
    expect(typeof ShopView.components.ListElt).toBe("object") 
    expect(typeof ShopView.components.MediaElt).toBe("object") 
    expect(typeof ShopView.components.NavElt).toBe("object") 
    expect(typeof ShopView.components.ProductCreator).toBe("object") 
  })

  test("props", () => { 
    expect(typeof ShopView.props).toBe("object") 
    expect(ShopView.props).toContain("constants") 
    expect(ShopView.props).toContain("user") 
  })

  test("data", () => { 
    expect(typeof ShopView.data).toBe("function") 
    expect(ShopView.data()).toEqual({ 
      scores: [], 
      priceCurrency: "" 
    }) 
  })

  test("created()", () => {
    expect(typeof ShopView.created).toBe("function")
  })

  test("updated()", () => {
    expect(typeof ShopView.created).toBe("function")
  })

  test("computed", () => {
    expect(typeof ShopView.computed).toBe("object")
    expect(typeof ShopView.computed.getCategories).toBe("function")
  })

  test("methods", () => { 
    expect(typeof ShopView.methods.checkSession).toBe("function") 
    expect(typeof ShopView.methods.getItemsByCategory).toBe("function") 
    expect(typeof ShopView.methods.getScoresAverage).toBe("function") 
  })
})
