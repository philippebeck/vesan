import ProductView from "../../../views/ProductView"

describe("ProductView", () => {
  test("name", () => { 
    expect(ProductView.name).toBe("ProductView") 
  })

  test("components", () => { 
    expect(typeof ProductView.components).toBe("object") 
    expect(typeof ProductView.components.BtnElt).toBe("object") 
    expect(typeof ProductView.components.CardElt).toBe("object") 
    expect(typeof ProductView.components.FieldElt).toBe("object") 
    expect(typeof ProductView.components.MediaElt).toBe("object") 
    expect(typeof ProductView.components.ReviewCreator).toBe("object") 
    expect(typeof ProductView.components.ReviewList).toBe("object") 
  })

  test("props", () => { 
    expect(typeof ProductView.props).toBe("object") 
    expect(ProductView.props).toContain("constants") 
    expect(ProductView.props).toContain("user") 
  })

  test("data", () => { 
    expect(typeof ProductView.data).toBe("function") 
    expect(ProductView.data()).toEqual({ 
      basket: [], 
      product: {}, 
      order: {}, 
      option: "",
      priceCurrency: "",
      quantity: 1,
      isInBasket: false
    }) 
  })

  test("created()", () => {
    expect(typeof ProductView.created).toBe("function")
  })

  test("updated()", () => {
    expect(typeof ProductView.created).toBe("function")
  })

  test("computed", () => {
    expect(typeof ProductView.computed).toBe("object")
  })

  test("methods", () => { 
    expect(typeof ProductView.methods.checkRole).toBe("function") 
    expect(typeof ProductView.methods.getAverage).toBe("function") 
    expect(typeof ProductView.methods.addToBasket).toBe("function") 
    expect(typeof ProductView.methods.createOrder).toBe("function") 
    expect(typeof ProductView.methods.getBasket).toBe("function") 
    expect(typeof ProductView.methods.checkBasket).toBe("function") 
    expect(typeof ProductView.methods.setBasket).toBe("function") 
  })
})
