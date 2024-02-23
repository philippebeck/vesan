import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import * as checkers from "../../../services/checkers"
import * as fetchers from "../../../services/fetchers"
import * as getters from "../../../services/getters"
import * as setters from "../../../services/setters"
import LinkSet from "../../../components/setters/LinkSet"

let wrapper;

jest.mock("axios");

beforeEach(() => {
  jest.spyOn(fetchers, "deleteData").mockImplementation(() => {});
  jest.spyOn(fetchers, "putData").mockImplementation(() => {});

  jest.spyOn(checkers, "checkRange").mockImplementation(() => {});
  jest.spyOn(checkers, "checkRegex").mockImplementation(() => {});
  jest.spyOn(getters, "getItemName").mockImplementation(() => {});
  jest.spyOn(getters, "getItemsByCat").mockImplementation(() => {});
  jest.spyOn(setters, "setError").mockImplementation(() => {});

  wrapper = shallowMount(LinkSet, {
    props: {
      val: {
        CHECK_STRING: 'Check String',
        REGEX_URL: /your-regex-pattern/,
        CHECK_URL: 'Check URL',
        ALERT_UPDATED: ' updated'
      },
      links: [
        {
          name: "Link Name 1",
          url: "Link Url 1",
          cat: "Link Cat 1",
        },
        {
          name: "Link Name 2",
          url: "Link Url 2",
          cat: "Link Cat 2",
        }
      ]
    }
  });
});

enableAutoUnmount(afterEach)

/**
 * @jest-environment jsdom
 */
describe("LinkSet", () => {
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
    expect(wrapper.props("val")).toStrictEqual({
      CHECK_STRING: 'Check String',
      REGEX_URL: /your-regex-pattern/,
      CHECK_URL: 'Check URL',
      ALERT_UPDATED: ' updated'
    })
    expect(wrapper.props("links")).toStrictEqual([
      {
        name: "Link Name 1",
        url: "Link Url 1",
        cat: "Link Cat 1",
      },
      {
        name: "Link Name 2",
        url: "Link Url 2",
        cat: "Link Cat 2",
      }
    ])
  })

  test("methods", () => { 
    expect(typeof wrapper.vm.getItemsByCategory).toBe("function") 
    expect(typeof wrapper.vm.createLink).toBe("function") 
    expect(typeof wrapper.vm.updateLink).toBe("function") 
    expect(typeof wrapper.vm.deleteLink).toBe("function") 
  })

  test("getItemsByCategory()", () => {
    wrapper.vm.getItemsByCategory([
      {
        name: "Link Name 1",
        url: "Link Url 1",
        cat: "Link Cat 1",
      },
      {
        name: "Link Name 2",
        url: "Link Url 2",
        cat: "Link Cat 2",
      }
    ])
    expect(getters.getItemsByCat).toHaveBeenCalledTimes(1)
    expect(getters.getItemsByCat).toHaveReturned()
  })
});
