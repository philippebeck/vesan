# vesan

Vesan is a Frontend Framework made with Vue 3, TypeScript, Vuex, Sass, Animadio & Vitest  

Migration from Option API to Composition API in progress (~ 30%)  
Migration of all scripts from JS to TS in progress (~ 60%)  
Migration of the tests from Jest to Vitest in progress too (~ 60%)  

Migration of the store from Vuex to Pinia soon  
Added e2e tests with Cypress soon too  

[![NPM Version](https://badgen.net/npm/v/vesan)](https://www.npmjs.com/package/vesan)
[![GitHub Top Language](https://img.shields.io/github/languages/top/philippebeck/vesan)](https://github.com/philippebeck/vesan)
[![Code Size](https://img.shields.io/github/languages/code-size/philippebeck/vesan)](https://github.com/philippebeck/vesan/tree/master)

[![NPM Downloads](https://badgen.net/npm/dt/vesan)](https://www.npmjs.com/package/vesan)
[![GitHub Last Commit](https://badgen.net/github/last-commit/philippebeck/vesan)](https://github.com/philippebeck/vesan/commits/master)

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/cfde730eaf0f48a587afc8b95a2ac119)](https://www.codacy.com/gh/philippebeck/vesan/dashboard)
[![Maintainability](https://api.codeclimate.com/v1/badges/61debaf8cefe10b19cc6/maintainability)](https://codeclimate.com/github/philippebeck/vesan/maintainability)

- [vesan](#vesan)
  - [Recommended IDE Setup](#recommended-ide-setup)
  - [Type Support for `.vue` Imports in TS](#type-support-for-vue-imports-in-ts)
  - [Customize configuration](#customize-configuration)
  - [Download](#download)
  - [Package](#package)
  - [Configuration](#configuration)
  - [Project Setup](#project-setup)
    - [Compile and Hot-Reload for Development](#compile-and-hot-reload-for-development)
    - [Type-Check, Compile and Minify for Production](#type-check-compile-and-minify-for-production)
    - [Run Unit Tests with Vitest](#run-unit-tests-with-vitest)
    - [Run End-to-End Tests with Cypress](#run-end-to-end-tests-with-cypress)
    - [Lint with ESLint](#lint-with-eslint)
  - [Content](#content)
    - [Elements Components](#elements-components)
    - [Setters Components](#setters-components)
    - [Main Views](#main-views)
    - [Data Views](#data-views)
    - [Services](#services)
  - [Documentation](#documentation)

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Download

[Use this Template](https://github.com/philippebeck/vesan/generate)  
or  
`git clone https://github.com/philippebeck/vesan.git`  
or  
[Latest Release](https://github.com/philippebeck/vesan/releases)  

## Package

NPM : `npm i vesan`  
or  
Yarn : `yarn add vesan`  

**If you choose to get Vesan from NPM or Yarn : you need to copy Vesan from *node_modules/vesan* to the root of your App**

## Configuration

To configure the frontend constants, replace values :  
`/src/assets/values.example.js` *(then rename it /src/assets/values.js)*  

## Project Setup

```sh
npm i
```

### Compile and Hot-Reload for Development

```sh
npm start
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
## Content

### Elements Components  
-   **BtnElt** *(Link & Button Elements)*  
-   **CardElt** *(Article & Section Elements)*  
-   **FieldElt** *(User Input & User Select Elements)*  
-   **FootElt** *(Footer Element)*  
-   **ListElt** *(List Element)*  
-   **MediaElt** *(Audio, Image, Quote & Video Elements)*  
-   **NavElt** *(Navbar & Sidebar Elements)*  
-   **SliderElt** *(Slider Element)*  
-   **TableElt** *(Table Element)*  

### Setters Components  
-   **ArticleSet** *(Article Setter)*  
-   **GallerySet** *(Gallery Setter)*  
-   **ImageSet** *(Image Setter)*  
-   **LinkSet** *(Link Setter)*  
-   **OrderSet** *(Order Setter)*  
-   **ProductSet** *(Product Setter)*  
-   **ProjectSet** *(Project Setter)*  
-   **UserSet** *(User Setter)*  

### Main Views  
-   **HomeView** *(Home)*  
-   **ContactView** *(Contact)*  
-   **LegalView** *(Legal notice)*  
-   **LoginView** *(Sign in, Sign up, Forgot password)*  
-   **ProfileView** *(User profile)*  
-   **ErrorView** *(Error)*  

### Data Views  
-   **BlogView** *(Blog with articles list)*  
-   **ArticleView** *(Article of the blog)*  
-   **PortfolioView** *(Portfolio of projects)*
-   **ShopView** *(Shop with products list)*  
-   **ProductView** *(Product of the shop)*  
-   **BasketView** *(Basket & order process)*  
-   **GalleryView** *(Galleries list)*  
-   **ImageView** *(Images of a gallery)*  
-   **LinkView** *(Links list)*  

### Services  
-   **Checkers** : checkRange(), checkRegex(), checkRole(), checkSlot()  
-   **Fetchers** : getData(), postData(), putData(), deleteData()  
-   **Getters** : getCats(), getItemName(), getItemsByCat()  
-   **Setters** : setError(), setGlobalMeta(), setMeta()  

---

## Documentation

Available Demo :
-   [**Animadio**](https://philippebeck.github.io/animadio)  

Available Readme :  
-   [**Animadio**](https://github.com/philippebeck/animadio)  
