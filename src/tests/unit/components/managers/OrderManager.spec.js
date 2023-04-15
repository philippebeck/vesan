import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import OrderManager from "@/components/managers/OrderManager"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(OrderManager, {
    props: {
      constants: {
        TEST: "test"
      },
      orders: [{
        products: [{
          name: "Product name",
          price: "Product price",
          quantity: "Product quantity"
        }],
        total: "Order total",
        payment: "Order payment",
        status: "Order status"
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

describe("OrderManager", () => {
  test("name", () => { 
    expect(OrderManager.name).toBe("OrderManager") 
  })

  test("components", () => { 
    expect(typeof OrderManager.components).toBe("object") 
    expect(typeof OrderManager.components.BtnElt).toBe("object") 
    expect(typeof OrderManager.components.CardElt).toBe("object") 
    expect(typeof OrderManager.components.FieldElt).toBe("object") 
    expect(typeof OrderManager.components.TableElt).toBe("object")
  })

  test("props", () => {
    expect(typeof OrderManager.props).toBe("object")
    expect(OrderManager.props).toContain("constants") 
    expect(OrderManager.props).toContain("orders") 
    expect(OrderManager.props).toContain("users") 
  })

  test("methods", () => { 
    expect(typeof OrderManager.methods.getOrders).toBe("function") 
    expect(typeof OrderManager.methods.updateStatus).toBe("function") 
    expect(typeof OrderManager.methods.deleteOrder).toBe("function") 
  })
})

describe("Mounted OrderManager", () => {

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
    expect(wrapper.props("orders")).toStrictEqual([{ 
      products: [{
        name: "Product name",
        price: "Product price",
        quantity: "Product quantity"
      }],
      total: "Order total",
      payment: "Order payment",
      status: "Order status"
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
    expect(typeof wrapper.vm.getOrders).toBe("function") 
    expect(typeof wrapper.vm.updateStatus).toBe("function") 
    expect(typeof wrapper.vm.deleteOrder).toBe("function") 
  })
})
