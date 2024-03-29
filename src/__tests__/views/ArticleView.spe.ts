import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { shallowMount, enableAutoUnmount } from '@vue/test-utils'
import { createStore } from 'vuex'
import * as services from '../../assets/services'
import ArticleView from '../../views/ArticleView.vue'

global.fetch = vi.fn(() =>
  Promise.resolve({
    formData: () => Promise.resolve({}),
    ok: true,
    headers: {
      get: (header) => {
        if (header === 'Content-Type') {
          return 'multipart/form-data'
        }
      }
    }
  })
)

const mockRoute = {
  params: {
    id: 1
  }
}

const mockRouter = {
  push: vi.fn()
}

const role = 'user'
const user = {
  name: 'John Doe',
  role: role
}

let wrapper: any
let store: any
let actions: any
let state: any

/**
 * @vi-environment jsdom
 */
beforeEach(() => {
  vi.spyOn(services, 'setMeta').mockImplementation(() => {})

  actions = {
    listArticleComments: vi.fn(),
    readArticle: vi.fn()
  }

  state = {
    article: {},
    comments: []
  }

  store = createStore({
    state() {
      return state
    },
    actions: actions
  })

  mockRouter.push(mockRoute)

  wrapper = shallowMount(ArticleView, {
    props: {
      val: {
        TEST: 'test'
      },
      user: user
    },
    global: {
      plugins: [store],
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      }
    }
  })
})

enableAutoUnmount(afterEach)

/**
 * @vi-environment jsdom
 */
describe('ArticleView', () => {
  test('wrapper must be a vue instance', () => {
    expect(wrapper.exists()).toBe(true)
  })

  test('components', () => {
    expect(typeof wrapper.findComponent({ name: 'BtnElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'CardElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'MediaElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'CommentCreator' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'CommentList' })).toBe('object')
  })

  test('props', () => {
    expect(wrapper.props().val).toStrictEqual({ TEST: 'test' })
  })

  test('methods', () => {
    expect(typeof wrapper.vm.checkSession).toBe('function')
    expect(typeof wrapper.vm.checkLikes).toBe('function')
    expect(typeof wrapper.vm.addLike).toBe('function')
    expect(typeof wrapper.vm.updateArticle).toBe('function')
    expect(typeof wrapper.vm.deleteArticle).toBe('function')
  })

  test('updateArticle()', () => {
    wrapper.vm.articles[0] = {
      id: 'Article Id 1 Updated',
      name: 'Article Name 1 Updated',
      text: 'Article Text 1 Updated',
      image: 'Article Image 1 Updated',
      alt: 'Article Alt 1 Updated',
      cat: 'Article Cat 1 Updated'
    }
    expect(wrapper.vm.getArticles()[0]).toStrictEqual({
      id: 'Article Id 1 Updated',
      name: 'Article Name 1 Updated',
      text: 'Article Text 1 Updated',
      image: 'Article Image 1 Updated',
      alt: 'Article Alt 1 Updated',
      cat: 'Article Cat 1 Updated'
    })
  })
})
