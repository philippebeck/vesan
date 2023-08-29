import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import * as axios from "../../../assets/axios"
import * as serve from "../../../assets/serve"
import LinkManager from "../../../components/LinkManager"

let wrapper;

beforeEach(() => {
  jest.spyOn(axios, "deleteData").mockImplementation(() => {});
  jest.spyOn(axios, "putData").mockImplementation(() => {});

  jest.spyOn(serve, "checkRange").mockImplementation(() => {});
  jest.spyOn(serve, "checkRegex").mockImplementation(() => {});
  jest.spyOn(serve, "getItemName").mockImplementation(() => {});
  jest.spyOn(serve, "getItemsByCat").mockImplementation(() => {});
  jest.spyOn(serve, "setError").mockImplementation(() => {});

  wrapper = shallowMount(LinkManager, {
    props: {
      constants: {
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
describe("LinkManager", () => {
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
    expect(wrapper.props("constants")).toStrictEqual({
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
    expect(typeof wrapper.vm.getLinks).toBe("function") 
    expect(typeof wrapper.vm.getItemsByCategory).toBe("function") 
    expect(typeof wrapper.vm.getLink).toBe("function") 
    expect(typeof wrapper.vm.checkLink).toBe("function") 
    expect(typeof wrapper.vm.updateLink).toBe("function") 
    expect(typeof wrapper.vm.deleteLink).toBe("function") 
  })

  test("getLinks()", () => {
    expect(wrapper.vm.getLinks()).toStrictEqual([
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
    expect(serve.getItemsByCat).toHaveBeenCalledTimes(1)
    expect(serve.getItemsByCat).toHaveBeenCalledWith([
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
    expect(serve.getItemsByCat).toHaveReturned()
  })

  test('getLink() must create an instance of FormData() & append the link infos', () => {
    const link = {
      name: 'Link Name',
      url: 'https://example.com',
      cat: 'Category',
    };

    const result = wrapper.vm.getLink(link);

    expect(result instanceof FormData).toBe(true);
    expect(result.get('name')).toBe(link.name);
    expect(result.get('url')).toBe(link.url);
    expect(result.get('cat')).toBe(link.cat);
  });
});
