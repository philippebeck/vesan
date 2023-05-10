import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import ReviewManager from "../../../components/ReviewManager"

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
    }
  });
});

enableAutoUnmount(afterEach)

/**
 * @jest-environment jsdom
 */
describe("ReviewManager", () => {
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

  test("methods", () => { 
    expect(typeof wrapper.vm.getReviews).toBe("function") 
    expect(typeof wrapper.vm.getProductName).toBe("function") 
    expect(typeof wrapper.vm.moderateReview).toBe("function") 
    expect(typeof wrapper.vm.deleteReview).toBe("function") 
  })
})
