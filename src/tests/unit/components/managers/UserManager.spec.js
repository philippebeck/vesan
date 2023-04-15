import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import UserManager from "@/components/managers/UserManager"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(UserManager, {
    propsData: {},
    mocks: {},
    stubs: {},
    methods: {},
  });
});

enableAutoUnmount(afterEach)

describe("UserManager", () => {
  test("name", () => { 
    expect(UserManager.name).toBe("UserManager") 
  })

  test("components", () => { 
    expect(typeof UserManager.components).toBe("object") 
    expect(typeof UserManager.components.BtnElt).toBe("object") 
    expect(typeof UserManager.components.CardElt).toBe("object") 
    expect(typeof UserManager.components.FieldElt).toBe("object") 
    expect(typeof UserManager.components.MediaElt).toBe("object") 
    expect(typeof UserManager.components.TableElt).toBe("object")
  })

  test("props", () => {
    expect(typeof UserManager.props).toBe("object")
    expect(UserManager.props).toContain("constants") 
    expect(UserManager.props).toContain("users") 
  })

  test("methods", () => { 
    expect(typeof UserManager.methods.getUsers).toBe("function") 
    expect(typeof UserManager.methods.getUser).toBe("function") 
    expect(typeof UserManager.methods.checkUser).toBe("function") 
    expect(typeof UserManager.methods.updateUser).toBe("function") 
    expect(typeof UserManager.methods.deleteUser).toBe("function") 
  })
})

describe('Mounted UserManager', () => {

  test('wrapper', () => {
    expect(wrapper.exists()).toBe(true)
  })

  test('wrapper components', () => { 
    expect(wrapper.findComponent({ name: 'BtnElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'CardElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'FieldElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'MediaElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'TableElt' })).toBeDefined() 
  })

  test("wrapper methods", () => {
    expect(typeof wrapper.vm.getUsers).toBe("function")
    expect(typeof wrapper.vm.getUser).toBe("function")
    expect(typeof wrapper.vm.checkUser).toBe("function")
    expect(typeof wrapper.vm.updateUser).toBe("function")
    expect(typeof wrapper.vm.deleteUser).toBe("function")
  })
})
