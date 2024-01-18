import { enableAutoUnmount, mount } from "@vue/test-utils"
import NavElt from "../../../components/elements/NavElt"

let wrapper;

enableAutoUnmount(afterEach)

/**
 * ! NAVBAR
 * @jest-environment jsdom
 */
describe("Default NavElt", () => {
  beforeEach(() => {
    wrapper = mount(NavElt, {
      slots: {
        brand: "Test Brand",
        admin: "Test Admin"
      }
    })
  })

  test("must create a nav", () => {
    expect(wrapper.find("nav").exists()).toBe(true)
  })

  test("must have a props 'class' with 'navbar' as default value", () => {
    expect(wrapper.props("class")).toBe("navbar")
    expect(wrapper.find("nav").attributes("class")).toBe("navbar")
  })

  test("must have a slot 'brand' with 'Test Brand' as value", () => {
    expect(wrapper.find("a").text()).toBe("Test Brand")
  })

  test("must return true if the 2 slots exist", () => {
    expect(wrapper.vm.hasSlot("brand")).toBe(true)
    expect(wrapper.vm.hasSlot("admin")).toBe(true)
  })

  test("must return false if the test slot doesn't exist", () => {
    expect(wrapper.vm.hasSlot("test")).toBe(false)
  })
})

/**
 * ! SIDEBAR
 * @jest-environment jsdom
 */
describe("NavElt as a sidebar", () => {
  beforeEach(() => {
    wrapper = mount(NavElt, {
      props: {
        class: "sidebar"
      },
      slots: {
        hide: "Test Hide",
        first: "Test First",
        top: "Test Top"
      }
    })
  })

  test("must create a nav", () => {
    expect(wrapper.find("nav").exists()).toBe(true)
  })
  
  test("must have a props 'class' with 'sidebar' as value", () => {
    expect(wrapper.props("class")).toBe("sidebar")
    expect(wrapper.find("nav").attributes("class")).toBe("sidebar")
  })

  test("must have a slot 'hide' with 'Test Hide' as value", () => {
    expect(wrapper.find("button").text()).toBe("Test Hide")
  })
  
  test("must have a slot 'first' with 'Test First' as value", () => {
    expect(wrapper.find("li").text()).toBe("Test First")
  })

  test("must have a slot 'top' with 'Test Top' as value", () => {
    expect(wrapper.find("a").text()).toBe("Test Top")
    expect(wrapper.find("a").attributes("href")).toBe("#top")
  })

  test('hasSlot("top") must return true', () => {
    expect(wrapper.vm.hasSlot("top")).toBe(true)
  })

  test("must return true if the 3 slots exist", () => {
    expect(wrapper.vm.hasSlot("hide")).toBe(true)
    expect(wrapper.vm.hasSlot("first")).toBe(true)
    expect(wrapper.vm.hasSlot("top")).toBe(true)
  })

  test("must return false if the test slot doesn't exist", () => {
    expect(wrapper.vm.hasSlot("test")).toBe(false)
  })
})

/**
 * ! GET NAV CLASS
 * @jest-environment jsdom
 */
describe("getNavClass() method", () => {
  beforeEach(() => {
    wrapper = mount(NavElt)
  })
  
  test("must return 'navbar' if 'class' props is not provided", () => {
    expect(wrapper.vm.getNavClass()).toBe("navbar")
  })

  test("must return 'navbar' if 'class' props is not 'sidebar'", () => {
    wrapper.setProps({ class: "test" })
    expect(wrapper.vm.getNavClass()).toBe("navbar")
  })

  test("must return 'sidebar' if 'class' props is 'sidebar'", () => {
    wrapper = mount(NavElt, {
      props: {
        class: "sidebar"
      }
    })
    expect(wrapper.vm.getNavClass()).toBe("sidebar")
  })
})

/**
 * @jest-environment jsdom
 */
describe('NavElt', () => {
  test('renders a navbar with brand and items when class prop is not set to "sidebar"', () => {
    const items = [
      { name: 'Home', href: '/home', icon: 'home', type: 'fas' },
      { name: 'About', href: '/about', icon: 'info-circle', type: 'fas' },
    ];

    const wrapper = mount(NavElt, {
      propsData: {
        items,
      },
      slots: {
        brand: '<span>My Brand</span>',
      },
    });

    expect(wrapper.find('nav.navbar').exists()).toBe(true);
    expect(wrapper.find('a[href="/"]').text()).toBe('My Brand');
    expect(wrapper.findAll('ul li').length).toBe(2);
    expect(wrapper.findAll('ul li').at(0).find('b').text()).toBe('Home');
    expect(wrapper.findAll('ul li').at(1).find('b').text()).toBe('About');
  });

  test('renders a sidebar with items when class prop is set to "sidebar"', () => {
    const items = ['Home', 'About'];

    const wrapper = mount(NavElt, {
      propsData: {
        class: 'sidebar',
        items,
      },
    });

    expect(wrapper.find('nav.sidebar').exists()).toBe(true);
    expect(wrapper.findAll('ul li').length).toBe(3);
    expect(wrapper.findAll('ul li').at(0).text()).toBe('Home');
    expect(wrapper.findAll('ul li').at(1).text()).toBe('About');
  });

  test('toggles the sidebar when the hide button is clicked', async () => {
    const items = ['Home', 'About'];

    const wrapper = mount(NavElt, {
      propsData: {
        class: 'sidebar',
        items,
      },
      slots: {
        hide: '<span>Hide</span>',
      },
    });

    expect(wrapper.find('nav.sidebar #side.show').exists()).toBe(true);
    expect(wrapper.find('nav.sidebar #side.hide').exists()).toBe(false);
  });
});
