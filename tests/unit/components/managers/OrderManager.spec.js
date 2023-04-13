import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import OrderManager from "@/components/managers/OrderManager"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(OrderManager, {
    propsData: {},
    mocks: {},
    stubs: {},
    methods: {},
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

describe('Mounted OrderManager', () => {

  test('wrapper', () => {
    expect(wrapper.exists()).toBe(true)
  })

  test('wrapper components', () => { 
    expect(wrapper.findComponent({ name: 'BtnElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'CardElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'FieldElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'TableElt' })).toBeDefined() 
  })
})
