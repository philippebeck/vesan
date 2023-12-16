# Vesan 

UI with Vue-Elt, Servidio & Animadio

[![NPM Version](https://badgen.net/npm/v/vesan)](https://www.npmjs.com/package/vesan)
[![NPM Downloads](https://badgen.net/npm/dt/vesan)](https://www.npmjs.com/package/vesan)

[![GitHub Last Commit](https://badgen.net/github/last-commit/philippebeck/vesan)](https://github.com/philippebeck/vesan/commits/master)

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/cfde730eaf0f48a587afc8b95a2ac119)](https://www.codacy.com/gh/philippebeck/vesan/dashboard)
[![Maintainability](https://api.codeclimate.com/v1/badges/61debaf8cefe10b19cc6/maintainability)](https://codeclimate.com/github/philippebeck/vesan/maintainability)

[![GitHub Top Language](https://img.shields.io/github/languages/top/philippebeck/vesan)](https://github.com/philippebeck/vesan)
[![Code Size](https://img.shields.io/github/languages/code-size/philippebeck/vesan)](https://github.com/philippebeck/vesan/tree/master)

## Overview

Vesan is a complete User Interface made from Vue & built with 3 complementary "homemade" packages :
-  Vue-Elt, for the SFC components, as main structure  
-  Servidio, for Axios calls & front securities, as frontend services  
-  Animadio, a CSS library built with Sass, as design  

## Summary

- [Vesan](#vesan)
  - [Overview](#overview)
  - [Summary](#summary)
  - [Download](#download)
  - [Package](#package)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Usage](#usage)
  - [Production](#production)
  - [Content](#content)
  - [Documentation](#documentation)

---

## Download

[Use this Template](https://github.com/philippebeck/vesan/generate)  
or  
`git clone https://github.com/philippebeck/vesan.git`  
or  
[Latest Release](https://github.com/philippebeck/vesan/releases)  

---

## Package

NPM : `npm i vesan`  
or  
Yarn : `yarn add vesan`  

**If you choose to get Vesan from NPM or Yarn : you need to copy Vesan from *node_modules/vesan* to the root of your App**

---

## Installation

Install the frontend dependencies & create assets components :  
`$ npm install`  
`$ grunt`  

---

## Configuration

To configure the frontend, replace values :  
`values.en.js || values.fr.js` *(then rename it values.js)*  

---

## Usage

To run the frontend :  
`$ npm start`  

---

## Production

1. Compile the frontend :  
`$ npm run build`  

2. Then use the files of the dist folder for your prod UI

---
## Content

Main Views :  
-   **HomeView** *(Home)*  
-   **ContactView** *(Contact)*  
-   **LegalView** *(Legal notice)*  
-   **LoginView** *(Sign in, Sign up, Forgot password)*  
-   **ProfileView** *(User profile)*  
-   **ErrorView** *(Error)*  

Data Views :  
-   **BlogView** *(Blog with articles list)*  
-   **ArticleView** *(Article of the blog)*  
-   **ShopView** *(Shop with products list)*  
-   **ProductView** *(Product of the shop)*  
-   **BasketView** *(Basket & order process)*  
-   **GalleryView** *(Galleries list)*  
-   **ImageView** *(Images of a gallery)*  
-   **LinkView** *(Links list)*  

---

## Documentation

Available Demo :
-   [**Animadio**](https://philippebeck.github.io/animadio)  

Available Readme :  
-   [**Vue-Elt**](https://github.com/philippebeck/vue-elt)  
-   [**Servidio**](https://github.com/philippebeck/servidio)  
-   [**Animadio**](https://github.com/philippebeck/animadio)  
