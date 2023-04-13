# Vesan 

CMS with Vue-Elt, Servidio, Animadio & NemJS

[![NPM Version](https://badgen.net/npm/v/vesan)](https://www.npmjs.com/package/vesan)
[![NPM Downloads](https://badgen.net/npm/dt/vesan)](https://www.npmjs.com/package/vesan)

[![GitHub Last Commit](https://badgen.net/github/last-commit/philippebeck/vesan)](https://github.com/philippebeck/vesan/commits/master)

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/cfde730eaf0f48a587afc8b95a2ac119)](https://www.codacy.com/gh/philippebeck/vesan/dashboard)
[![Maintainability](https://api.codeclimate.com/v1/badges/61debaf8cefe10b19cc6/maintainability)](https://codeclimate.com/github/philippebeck/vesan/maintainability)

[![GitHub Top Language](https://img.shields.io/github/languages/top/philippebeck/vesan)](https://github.com/philippebeck/vesan)
[![Code Size](https://img.shields.io/github/languages/code-size/philippebeck/vesan)](https://github.com/philippebeck/vesan/tree/master)

## Overview

Vesan is a Content Manager System, where you can find 4 "homemade" packages complementary :
-  Vue-Elt, for the SFC components, as the main structure  
-  Servidio, for Axios calls & front securities, as the frontend services  
-  Animadio, a CSS library built with Sass, as the design  
-  Nemjs, for JWT, Nodemailer, Sharp & back securities, as the backend services  

Vesan uses many other well-known packages, like ExpressJS, Mongoose, etc...

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
  - [Tests](#tests)

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

From the root of your App with Vesan :  

1. Install the frontend dependencies & create assets components :  
`$ npm install`  
`$ grunt`  

1. Install the backend dependencies :  
`$ cd api`  
`$ npm install`  

---

## Configuration

From the root of your App with Vesan :  

1. To configure the backend, replace values :  
`api/.env.en  || api/.env.fr` *(then rename it .env)*  

2. To configure the frontend, replace values :  
`constants.en.js || constants.fr.js` *(then rename it constants.js)*  

3. To configure the design, replaces values :  
`src/style/style.ui.css` *(then rename it style.css)*  

---

## Usage

From the root of your App with Vesan :  

1. To run the backend server :  
`$ cd api`  
`$ npm run start`  

1. To run the frontend :  
`$ npm run serve`  

---

## Production

From the root of your App with Vesan :  

1. To compile all style (import.css + packages + overload.css) :  
`$ grunt`  

2. So you can copy the content of style.ui.css to style.css  

3. Then compile the frontend :  
`$ npm run build`  

4. Finally, use the files of the dist folder for your prod UI

5. Nothing special for the API, except maybe your own server configuration (for myself, Passenger app in server.js)

---
## Content

Available API Files :
-   **ProductModel, ProductCtrl, ProductRoute** *(Products)*  
-   **ReviewModel, ReviewCtrl, ReviewRoute** *(Product Reviews)*  
-   **OrderModel, OrderCtrl, OrderRoute** *(Product Orders)*  
-   **ArticleModel, ArticleCtrl, ArticleRoute** *(Articles)*  
-   **CommentModel, CommentCtrl, CommentRoute** *(Article Comments)*  
-   **GalleryModel, GalleryCtrl, GalleryRoute** *(Galleries)*  
-   **ImageModel, ImageCtrl, ImageRoute** *(Gallery Images)*  
-   **AuthCtrl, AuthRoute** *(Auth)*  
-   **UserModel, UserCtrl, UserRoute** *(Users)*  
-   **LinkModel, LinkCtrl, LinkRoute** *(Links)*  

Public Views :  
-   **HomeView** *(Home)*  
-   **BlogView** *(Blog with articles list)*  
-   **ArticleView** *(Article of the blog)*  
-   **ShopView** *(Shop with products list)*  
-   **ProductView** *(Product of the shop)*  
-   **BasketView** *(Basket & order process)*  
-   **GalleryView** *(Galleries list)*  
-   **ImageView** *(Images of a gallery)*  
-   **LinkView** *(Links list)*  
-   **LoginView** *(Login with connector components)*  
-   **ContactView** *(Contact)*  
-   **LegalView** *(Legal notice)*  
-   **ErrorView** *(Error)*  

Connector Components *(public)* :  
-   **ForgotPass** *(Forgot password)*  
-   **SignIn** *(Connection)*  
-   **SignUp** *(Create user)*  

List Components *(public)* :  
-   **CommentList** *(Comment list for article)*  
-   **ReviewList** *(Review list for product)*  

Private Views :  
-   **ProfileEditor** *(User profile & user orders)*  
-   **AdminEditor** *(Admin with manager components & editor views)*  
-   **ArticleEditor** *(Editor for article)*  
-   **ProductEditor** *(Editor for product)*  

Creator Components *(private)* :  
-   **ArticleCreator** *(Create article)*  
-   **CommentCreator** *(Create comment)*  
-   **ProductCreator** *(Create product)*  
-   **ReviewCreator** *(Create review)*  
-   **GalleryCreator** *(Create gallery)*  
-   **ImageCreator** *(Create image)*  
-   **LinkCreator** *(Create link)*  

Manager Components *(private)* :  
-   **ArticleManager** *(Manage articles)*  
-   **CommentManager** *(Manage comments)*  
-   **ProductManager** *(Manage products)*  
-   **ReviewManager** *(Manage reviews)*  
-   **OrderManager** *(Manage orders)*  
-   **GalleryManager** *(Manage galleries)*  
-   **ImageManager** *(Manage images)*  
-   **LinkManager** *(Manage links)*  
-   **UserManager** *(Manage users)*  

---

## Documentation

Available Demos :
-   **Vue-Elt** *(Local Dev only)*  
-   [**Animadio**](https://philippebeck.github.io/animadio)  

Available Readme :  
-   [**Vue-Elt**](https://github.com/philippebeck/vue-elt)  
-   [**Servidio**](https://github.com/philippebeck/servidio)  
-   [**Animadio**](https://github.com/philippebeck/animadio)  
-   [**NemJS**](https://github.com/philippebeck/nemjs)  

---

## Tests

Tests are "on the road" (incomplete for the moment), but you can launch them with :  
`npm test`  
