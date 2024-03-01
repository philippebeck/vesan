import { enableAutoUnmount, mount } from "@vue/test-utils"
import CardElt from "../../components/CardElt"

let wrapper;

enableAutoUnmount(afterEach)

/**
 * ! DEFAULT SECTION
 * @jest-environment jsdom
 */
describe("Default CardElt as a section", () => {
  beforeEach(() => {
    wrapper = mount(CardElt)
  })

  test("must create a section", () => {
    expect(wrapper.find("section").exists()).toBe(true)
  })

  test("must create a header", () => {
    expect(wrapper.find("header").exists()).toBe(true)
  })

  test("must not create an aside", () => {
    expect(wrapper.find("aside").exists()).toBe(false)
  })

  test("must not create a footer", () => {
    expect(wrapper.find("footer").exists()).toBe(false)
  })

  test("must have a props 'isArticle' with 'false' as default value", () => {
    expect(wrapper.props("isArticle")).toBe(false)
  })
})

/**
 * ! DEFAULT SECTION WITH SLOTS
 * @jest-environment jsdom
 */
describe("Default CardElt as a section with slots", () => {
  beforeEach(() => {
    wrapper = mount(CardElt, {
      props: {
        class: "Test Class",
        id: "Test Id"
        },
      slots: {
        header: "<h1>Test Header</h1>",
        body: "<p>Test Body</p>",
        aside: "<p>Test Aside</p>",
        footer: "<p>Test Footer</p>"
      }
    })
  })

  test("must create a section", () => {
    expect(wrapper.find("section").exists()).toBe(true)
  })

  test("must have a props 'isArticle' with 'false' as value", () => {
    expect(wrapper.props("isArticle")).toBe(false)
  })

  test("must have a props 'id' with 'Test Id' as value", () => {
    expect(wrapper.props("id")).toBe("Test Id")
    expect(wrapper.find("section").attributes("id")).toBe("Test Id")
  })

  test("must have a slot header with 'Test Header' as content", () => {
    expect(wrapper.find("header").exists()).toBe(true)
    expect(wrapper.find("header").text()).toBe("Test Header")
  })

  test("must have a slot body with 'Test Body' as content", () => {
    expect(wrapper.find("p").exists()).toBe(true)
    expect(wrapper.find("p").text()).toBe("Test Body")
  })

  test("must have a slot aside with 'Test Aside' as content", () => {
    expect(wrapper.find("aside").exists()).toBe(true)
    expect(wrapper.find("aside").text()).toBe("Test Aside")
  })

  test("must have a slot footer with 'Test Footer' as content", () => {
    expect(wrapper.find("footer").exists()).toBe(true)
    expect(wrapper.find("footer").text()).toBe("Test Footer")
  })

  test("must have a props 'class' with 'Card Test' as value", () => {
    expect(wrapper.find("section").attributes("class")).toBe("Test Class")
  })
})

/**
 * ! ARTICLE
 * @jest-environment jsdom
 */
describe("CardElt as an article", () => {
  beforeEach(() => {
    wrapper = mount(CardElt, {
      props: {
        isArticle: true
        },
      })
    })
    
    test("must create a article", () => {
      expect(wrapper.find("article").exists()).toBe(true)
    })
  
    test("must create a header", () => {
      expect(wrapper.find("header").exists()).toBe(true)
    })
  
    test("must not create an aside", () => {
      expect(wrapper.find("aside").exists()).toBe(false)
    })
  
    test("must not create a footer", () => {
      expect(wrapper.find("footer").exists()).toBe(false)
    })
  
    test("must have a props 'isArticle' with 'true' as value", () => {
      expect(wrapper.props("isArticle")).toBe(true)
    })
})

/**
 * ! ARTICLE WITH SLOTS
 * @jest-environment jsdom
 */
describe("CardElt as an article with slots", () => {
  beforeEach(() => {
    wrapper = mount(CardElt, {
      props: {
        isArticle: true,
        class: "Test Class",
        id: "Test Id"
        },
      slots: {
        header: "<h1>Test Header</h1>",
        body: "<p>Test Body</p>",
        aside: "<p>Test Aside</p>",
        footer: "<p>Test Footer</p>"
      }
    })
  })
  
  test("must create an article", () => {
    expect(wrapper.find("article").exists()).toBe(true)
  })

  test("must have a props 'isArticle' with 'true' as value", () => {
    expect(wrapper.props("isArticle")).toBe(true)
  })

  test("must have a props 'id' with 'Test Id' as value", () => {
    expect(wrapper.props("id")).toBe("Test Id")
    expect(wrapper.find("article").attributes("id")).toBe("Test Id")
  })

  test("must have a slot header with 'Test Header' as content", () => {
    expect(wrapper.find("header").exists()).toBe(true)
    expect(wrapper.find("header").text()).toBe("Test Header")
  })

  test("must have a slot body with 'Test Body' as content", () => {
    expect(wrapper.find("p").exists()).toBe(true)
    expect(wrapper.find("p").text()).toBe("Test Body")
  })

  test("must have a slot aside with 'Test Aside' as content", () => {
    expect(wrapper.find("aside").exists()).toBe(true)
    expect(wrapper.find("aside").text()).toBe("Test Aside")
  })

  test("must have a slot footer with 'Test Footer' as content", () => {
    expect(wrapper.find("footer").exists()).toBe(true)
    expect(wrapper.find("footer").text()).toBe("Test Footer")
  })

  test("must have a props 'class' with 'Card Test' as value", () => {
    expect(wrapper.find("article").attributes("class")).toBe("Test Class")
  })
})
