import { mount } from "@vue/test-utils"
import GalleryView from "@/views/public/GalleryView"

describe("GalleryView", () => {

  test("has props", () => {
    expect(typeof GalleryView.props).toBe("object")
  })
})
