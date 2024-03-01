import { mount, enableAutoUnmount } from "@vue/test-utils"
import BtnElt from "../../components/BtnElt"

let wrapper;

enableAutoUnmount(afterEach)

/**
 * ! DEFAULT LINK
 * @jest-environment jsdom
 */
describe("Default BtnElt as a link", () => {
  beforeEach(() => {
    wrapper = mount(BtnElt, {
      props: {
        href: "https://www.test.com",
        class: "Test Class",
        title: "Test Title",
        content: "Test Content"
      }
    })
  })

  test("must create a link", () => {
    expect(wrapper.find("a").exists()).toBe(true)
  })

  test("must have a props 'href' with 'String' as type & 'https://www.test.com' as value", () => {
    expect(typeof wrapper.props("href")).toBe("string")
    expect(wrapper.props("href")).toBe("https://www.test.com")
    expect(wrapper.find("a").attributes("href")).toBe("https://www.test.com")
  })

  test("must have a attrs 'class' with 'Test Class' as value", () => {
    expect(wrapper.find("a").attributes("class")).toBe("Test Class")
  })

  test("must have a props 'title' with 'String' as type & 'Test Title' as value", () => {
    expect(typeof wrapper.props("title")).toBe("string")
    expect(wrapper.props("title")).toBe("Test Title")
    expect(wrapper.find("a").attributes("title")).toBe("Test Title")
  })

  test("must have a props 'content' with 'String' as type & 'Test Content' as value", () => {
    expect(typeof wrapper.props("content")).toBe("string")
    expect(wrapper.props("content")).toBe("Test Content")
    expect(wrapper.find("a").text()).toBe("Test Content")
  })
})

/**
 * ! BUTTON
 * @jest-environment jsdom
 */
describe("BtnElt as a button", () => {
  beforeEach(() => {
    wrapper = mount(BtnElt, {
      props: {
        type: "button",
        value: "Test Value",
        class: "Test Class",
        title: "Test Title",
        content: "Test Content"
      }
    })
  })

  test("must create a button", () => {
    expect(wrapper.find("button").exists()).toBe(true)
  })

  test("must have a props 'type' with 'String' as type & 'button' as value", () => {
    expect(typeof wrapper.props("type")).toBe("string")
    expect(wrapper.props("type")).toBe("button")
    expect(wrapper.find("button").attributes("type")).toBe("button")
  })

  test("must have a props 'value' with 'String' as type & 'Test Value' as value", () => {
    expect(typeof wrapper.props("value")).toBe("string")
    expect(wrapper.props("value")).toBe("Test Value")
    expect(wrapper.find("button").attributes("value")).toBe("Test Value")
  })

  test("must have a attrs 'class' with 'Test Class' as value", () => {
    expect(wrapper.find("button").attributes("class")).toBe("Test Class")
  })

  test("must have a props 'title' with 'String' as type & 'Test Title' as value", () => {
    expect(typeof wrapper.props("title")).toBe("string")
    expect(wrapper.props("title")).toBe("Test Title")
    expect(wrapper.find("button").attributes("title")).toBe("Test Title")
  })

  test("must have a props 'content' with 'String' as type & 'Test Content' as value", () => {
    expect(typeof wrapper.props("content")).toBe("string")
    expect(wrapper.props("content")).toBe("Test Content")
    expect(wrapper.find("button").text()).toBe("Test Content")
  })
})
