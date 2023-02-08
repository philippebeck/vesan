# Vesan 
[![NPM Version](https://badgen.net/npm/v/vesan)](https://www.npmjs.com/package/vesan)

CMS with Vue-Elt, Servidio, Animadio & NemJS

[![NPM Downloads](https://badgen.net/npm/dt/vesan)](https://www.npmjs.com/package/vesan)
[![GitHub Last Commit](https://badgen.net/github/last-commit/philippebeck/vesan)](https://github.com/philippebeck/vesan/commits/master)

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/cfde730eaf0f48a587afc8b95a2ac119)](https://www.codacy.com/gh/philippebeck/vesan/dashboard)
[![Maintainability](https://api.codeclimate.com/v1/badges/b57960e85b431ab740e3/maintainability)](https://codeclimate.com/github/philippebeck/vesan/maintainability)

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
  - [Usage](#usage)
  - [Content](#content)
  - [Documentation](#documentation)

---

## Download

[Use this Template](https://github.com/philippebeck/vesan/generate)  

or

[Latest Release](https://github.com/philippebeck/vesan/releases)  

or

`git clone https://github.com/philippebeck/vesan.git`  
  
---

## Package

NPM : `npm i vesan`  

or

Yarn : `yarn add vesan`  

**If you choose to get Vesan from NPM or Yarn : you need copy Vesan from *node_modules/vesan* to the root of your App**

---

## Installation

From the root of your App with Vesan :  
`$ npm install` *(install frontend dependencies)*  
`$ cd api`  
`$ npm install` *(install backend dependencies)*  

---

## Usage

To run the backend server, from the root of your App with Vesan :  
`$ cd api`  
`$ npm run start` *(serve backend)*  

To run the frontend server, from the root of your App with Vesan :  
`$ npm run serve` *(serve frontend)*  

---

## Content

Available API Files *(UNDER CONSTRUCTION)* :
-   **ProductModel, ProductCtrl, ProductRoute** *(Products)*  
-   **ReviewModel, ReviewCtrl, ReviewRoute** *(Product Reviews)*  
-   **OrderModel, OrderCtrl, OrderRoute** *(Product Orders)*  
-   **ArticleModel, ArticleCtrl, ArticleRoute** *(Articles)*  
-   **CommentModel, CommentCtrl, CommentRoute** *(Article Comments)*  
-   **UserModel, UserCtrl, UserRoute** *(Users)*  
-   **LinkModel, LinkCtrl, LinkRoute** *(Links)*  

Available Views *(UNDER CONSTRUCTION)* :  
-   **HomeView** *(Home)*  
-   **ShopView** *(Shop with products list)*  
-   **ProductView** *(Product of the shop)*  
-   **BlogView** *(Blog with articles list)*  
-   **ArticleView** *(Article of the blog)*  
-   **ContactView** *(Contact)*  
-   **BasketView** *(Basket & orders)*  
-   **LoginView** *(Login with connectors)*  
-   **ProfileView** *(User profile)*  
-   **AdminView** *(Admin with managers)*  
-   **LinkView** *(Links list)*  
-   **LegalView** *(Legal notice)*  
-   **ErrorView** *(Error)*  

Available Components *(UNDER CONSTRUCTION)* :  
-   **ForgotPass** *(Connector)*  
-   **SignIn** *(Connector*  
-   **SignUp** *(Connector)*  
-   **CreateProduct** *(Creator)*  
-   **CreateReview** *(Creator)*  
-   **CreateArticle** *(Creator)*  
-   **CreateComment** *(Creator)*  
-   **CreateLink** *(Creator)*  
-   **ListProducts** *(Manager)*  
-   **ListReviews** *(Manager)*  
-   **ListOrders** *(Manager)*  
-   **ListArticles** *(Manager)*  
-   **ListComments** *(Manager)*  
-   **ListUsers** *(Manager)*  
-   **ListLinks** *(Manager)*  

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
