import HomeView from "@/views/public/HomeView"

describe("HomeView", () => {
  test("name", () => { 
    expect(HomeView.name).toBe("HomeView") 
  })

  test("components", () => { 
    expect(typeof HomeView.components).toBe("object") 
    expect(typeof HomeView.components.CardElt).toBe("object") 
    expect(typeof HomeView.components.ListElt).toBe("object") 
    expect(typeof HomeView.components.MediaElt).toBe("object") 
    expect(typeof HomeView.components.SliderElt).toBe("object") 
  })

  test("props", () => { 
    expect(typeof HomeView.props).toBe("object") 
    expect(HomeView.props).toContain("constants") 
    expect(HomeView.props).toContain("user") 
  })

  test("data", () => { 
    expect(typeof HomeView.data).toBe("function") 
    expect(HomeView.data()).toEqual({ media: {} }) 
  })
})
