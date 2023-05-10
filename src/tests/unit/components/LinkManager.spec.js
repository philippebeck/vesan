import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import LinkManager from "../../../components/LinkManager"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(LinkManager, {
    props: {
      constants: {
        TEST: "test"
      },
      links: {
        name: "Link name",
        url: "Link url",
        cat: "Link cat",
      }
    }
  });
});

enableAutoUnmount(afterEach)

describe("LinkManager", () => {
  test("wrapper", () => {
    expect(wrapper.exists()).toBe(true)
  })

  test("components", () => { 
    expect(typeof wrapper.findComponent({ name: "BtnElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "CardElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "FieldElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "TableElt" })).toBe("object")
  })

  test("props", () => {
    expect(wrapper.props("constants")).toStrictEqual({ TEST: "test" })
    expect(wrapper.props("links")).toStrictEqual({
      name: "Link name",
      url: "Link url",
      cat: "Link cat",
    })
  })

  test("methods", () => { 
    expect(typeof wrapper.vm.getLinks).toBe("function") 
    expect(typeof wrapper.vm.getItemsByCategory).toBe("function") 
    expect(typeof wrapper.vm.getLink).toBe("function") 
    expect(typeof wrapper.vm.checkLink).toBe("function") 
    expect(typeof wrapper.vm.updateLink).toBe("function") 
    expect(typeof wrapper.vm.deleteLink).toBe("function") 
  })
})
