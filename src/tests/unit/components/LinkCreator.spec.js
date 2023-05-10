import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import LinkCreator from "../../../components/LinkCreator"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(LinkCreator, {
    props: {
      constants: {
        TEST: "test"
      },
      name: "Link name", 
      url: "Link url", 
      cat: "Link cat" 
    },
    global: {
      mocks: {},
      stubs: {}
    }
  });
});

enableAutoUnmount(afterEach)

describe("LinkCreator", () => {
  test("wrapper", () => { 
    expect(wrapper.exists()).toBe(true) 
  })

  test("components", () => { 
    expect(typeof wrapper.findComponent({ name: "BtnElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "CardElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "FieldElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "ListElt" })).toBe("object")
  })

  test("props", () => {
    expect(wrapper.props("constants")).toStrictEqual({ TEST: "test" })
  })

  test("data", () => {
    expect(wrapper.vm.name).toBe("")
    expect(wrapper.vm.url).toBe("")
    expect(wrapper.vm.cat).toBe("")

    expect(wrapper.attributes("name")).toBe("Link name")
    expect(wrapper.attributes("url")).toBe("Link url")
    expect(wrapper.attributes("cat")).toBe("Link cat")
  })

  test("methods", () => { 
    expect(typeof wrapper.vm.createLink).toBe("function") 
  })
});
