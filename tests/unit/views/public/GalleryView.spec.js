import GalleryView from "@/views/public/GalleryView"

describe("GalleryView", () => {
  test("name", () => { 
    expect(GalleryView.name).toBe("GalleryView") 
  })

  test("components", () => { 
    expect(typeof GalleryView.components).toBe("object") 
    expect(typeof GalleryView.components.CardElt).toBe("object") 
    expect(typeof GalleryView.components.ListElt).toBe("object") 
    expect(typeof GalleryView.components.MediaElt).toBe("object") 
  })

  test("props", () => { 
    expect(typeof GalleryView.props).toBe("object") 
    expect(GalleryView.props).toContain("constants") 
    expect(GalleryView.props).toContain("user") 
  })

  test("methods", () => { 
    expect(typeof GalleryView.methods.checkRole).toBe("function") 
  })
})
