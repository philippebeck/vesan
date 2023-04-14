import ShopView from "@/views/public/ShopView"

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

  test("methods", () => { 
    expect(typeof ShopView.methods.checkRole).toBe("function") 
    expect(typeof ShopView.methods.getItemsByCat).toBe("function") 
    expect(typeof ShopView.methods.getAverage).toBe("function") 
  })
})
