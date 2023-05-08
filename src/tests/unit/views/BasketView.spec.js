import BasketView from "../../../views/BasketView"

describe("BasketView", () => {
  test("name", () => { 
    expect(BasketView.name).toBe("BasketView") 
  })

  test("components", () => { 
    expect(typeof BasketView.components).toBe("object") 
    expect(typeof BasketView.components.BtnElt).toBe("object") 
    expect(typeof BasketView.components.CardElt).toBe("object") 
    expect(typeof BasketView.components.FieldElt).toBe("object") 
    expect(typeof BasketView.components.MediaElt).toBe("object") 
    expect(typeof BasketView.components.TableElt).toBe("object") 
  })

  test("props", () => { 
    expect(typeof BasketView.props).toBe("object") 
    expect(BasketView.props).toContain("constants") 
    expect(BasketView.props).toContain("user") 
  })

  test("data", () => { 
    expect(typeof BasketView.data).toBe("function") 
    expect(BasketView.data()).toEqual({ 
      products: [], 
      basket: [], 
      order: [], 
      total: 0 
    }) 
  })

  test("created()", () => {
    expect(typeof BasketView.created).toBe("function")
  })

  test("methods", () => { 
    expect(typeof BasketView.methods.checkRole).toBe("function") 
    expect(typeof BasketView.methods.getTotal).toBe("function") 
    expect(typeof BasketView.methods.setBasket).toBe("function") 
    expect(typeof BasketView.methods.setOrder).toBe("function") 
    expect(typeof BasketView.methods.setPaypal).toBe("function") 
    expect(typeof BasketView.methods.setTotal).toBe("function") 
    expect(typeof BasketView.methods.createOrder).toBe("function") 
    expect(typeof BasketView.methods.updateProductQuantity).toBe("function") 
    expect(typeof BasketView.methods.deleteProduct).toBe("function") 
    expect(typeof BasketView.methods.deleteBasket).toBe("function") 
  })
})
