import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import * as serve from "servidio"
import LoginView from "../../../views/main/LoginView"

let wrapper;
let setMetaSpy;

/**
 * @jest-environment jsdom
 */
beforeEach(() => {
  setMetaSpy = jest.spyOn(serve, "setMeta").mockImplementation(() => {});

  Object.defineProperty(window, 'localStorage', {
    value: {
      userId: '123456',
    },
  });

  const push = jest.fn();
  const $router = {
    push: push
  };

  wrapper = shallowMount(LoginView, {
    props: {
      val: {
        HEAD_LOGIN: "test head login",
        META_LOGIN: "test meta login",
        UI_URL: "test-ui-url",
        LOGO_SRC: "/test-logo-src",
        SIGN_IN: "Sign In",
        SIGN_UP: "Sign Up",
        FORGOT_PASS: "Forgot Password",
        INTRO_SIGNIN: "Sign in to your account",
        INTRO_SIGNUP: "Sign up to your account",
        INTRO_FORGOTPASS: "Enter your email address and we'll send you a link to reset your password."
      }
    },
    data() {
      return {
        type: "SignUp"
      }
    },
    global: {
      mocks: {
        $router
      }
    }
  });
});

enableAutoUnmount(afterEach)

describe("LoginView", () => {
  test("wrapper must be a vue instance", () => {
    expect(wrapper.exists()).toBe(true)
  })

  test("wrapper components", () => { 
    expect(typeof wrapper.findComponent({ name: "BtnElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "CardElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "SignUp" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "SignIn" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "ForgotPass" })).toBe("object")
  })

  test("wrapper props", () => { 
    expect(wrapper.props().val).toStrictEqual({ 
      HEAD_LOGIN: "test head login",
      META_LOGIN: "test meta login",
      UI_URL: "test-ui-url",
      LOGO_SRC: "/test-logo-src",
      SIGN_IN: "Sign In",
      SIGN_UP: "Sign Up",
      FORGOT_PASS: "Forgot Password",
      INTRO_SIGNIN: "Sign in to your account",
      INTRO_SIGNUP: "Sign up to your account",
      INTRO_FORGOTPASS: "Enter your email address and we'll send you a link to reset your password."
    })
  })

  test("wrapper data", () => { 
    expect(wrapper.vm.type).toBe("SignUp")
  })

  test("wrapper created hook", () => {
    expect(serve.setMeta).toHaveBeenCalled()
  })

  test('calls setMeta with the correct arguments', () => {
    expect(setMetaSpy).toHaveBeenCalledWith(
      wrapper.vm.val.HEAD_LOGIN,
      wrapper.vm.val.META_LOGIN,
      `${wrapper.vm.val.UI_URL}/login`,
      `${wrapper.vm.val.UI_URL}${wrapper.vm.val.LOGO_SRC}`
    );
  });

  test('redirects to "/" if localStorage.userId exists', () => {
    const routerPushSpy = jest.spyOn(wrapper.vm.$router, 'push');
    expect(routerPushSpy).toHaveBeenCalledWith('/');
  });

  test("wrapper methods", () => { 
    expect(typeof wrapper.vm.setType).toBe("function")
  })

  test("setType('SignIn')", () => {
    wrapper.vm.setType("SignIn")
    expect(wrapper.vm.type).toBe("SignIn")
  })

  test("setType('SignUp')", () => {
    wrapper.vm.setType("SignUp")
    expect(wrapper.vm.type).toBe("SignUp")
  })

  test("setType('ForgotPass')", () => {
    wrapper.vm.setType("ForgotPass")
    expect(wrapper.vm.type).toBe("ForgotPass")
  })
})
