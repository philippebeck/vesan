import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import ReviewManager from "@/components/managers/ReviewManager"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(ReviewManager, {
    props: {
      constants: {
        TEST: "test"
      },
      products: [{
        name: "Product name",
        description: "Product description",
        image: "Product image",
        alt: "Product alt",
        price: "Product price",
        options: "Product options",
        cat: "Product cat"
      }],
      reviews: [{
        text: "Review text",
        score: "Review score"
      }],
      users: [{
        name: "User name",
        email: "User email",
        image: "User image",
        password: "User password",
        role: "User role"
      }]
    },
    global: {
      mocks: {},
      stubs: {}
    }
  });
});

enableAutoUnmount(afterEach)

describe("ReviewManager", () => {
  test("name", () => { 
    expect(ReviewManager.name).toBe("ReviewManager") 
  })

  test("components", () => { 
    expect(typeof ReviewManager.components).toBe("object") 
    expect(typeof ReviewManager.components.BtnElt).toBe("object") 
    expect(typeof ReviewManager.components.CardElt).toBe("object") 
    expect(typeof ReviewManager.components.FieldElt).toBe("object") 
    expect(typeof ReviewManager.components.TableElt).toBe("object")
  })

  test("props", () => {
    expect(typeof ReviewManager.props).toBe("object")
    expect(ReviewManager.props).toContain("constants") 
    expect(ReviewManager.props).toContain("products") 
    expect(ReviewManager.props).toContain("reviews") 
    expect(ReviewManager.props).toContain("users") 
  })

  test("methods", () => { 
    expect(typeof ReviewManager.methods.getReviews).toBe("function") 
    expect(typeof ReviewManager.methods.getProductName).toBe("function") 
    expect(typeof ReviewManager.methods.moderateReview).toBe("function") 
    expect(typeof ReviewManager.methods.deleteReview).toBe("function") 
  })
})

describe("Mounted ReviewManager", () => {

  test("wrapper", () => {
    expect(wrapper.exists()).toBe(true)
  })

  test("wrapper components", () => { 
    expect(typeof wrapper.findComponent({ name: "BtnElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "CardElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "FieldElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "TableElt" })).toBe("object")
  })

  test("wrapper props", () => {
    expect(wrapper.props("constants")).toStrictEqual({ TEST: "test" })
    expect(wrapper.props("products")).toStrictEqual([{
      name: "Product name",
      description: "Product description",
      image: "Product image",
      alt: "Product alt",
      price: "Product price",
      options: "Product options",
      cat: "Product cat"
    }])
    expect(wrapper.props("reviews")).toStrictEqual([{
      text: "Review text",
      score: "Review score"
    }])
    expect(wrapper.props("users")).toStrictEqual([{
      name: "User name",
      email: "User email",
      image: "User image",
      password: "User password",
      role: "User role"
    }])
  })

  test("wrapper methods", () => { 
    expect(typeof wrapper.vm.getReviews).toBe("function") 
    expect(typeof wrapper.vm.getProductName).toBe("function") 
    expect(typeof wrapper.vm.moderateReview).toBe("function") 
    expect(typeof wrapper.vm.deleteReview).toBe("function") 
  })
})
