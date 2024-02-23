# Vesan 

Vesan is a User Interface Framework made with Vue & Animadio

[![NPM Version](https://badgen.net/npm/v/vesan)](https://www.npmjs.com/package/vesan)
[![NPM Downloads](https://badgen.net/npm/dt/vesan)](https://www.npmjs.com/package/vesan)

[![GitHub Last Commit](https://badgen.net/github/last-commit/philippebeck/vesan)](https://github.com/philippebeck/vesan/commits/master)

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/cfde730eaf0f48a587afc8b95a2ac119)](https://www.codacy.com/gh/philippebeck/vesan/dashboard)
[![Maintainability](https://api.codeclimate.com/v1/badges/61debaf8cefe10b19cc6/maintainability)](https://codeclimate.com/github/philippebeck/vesan/maintainability)

[![GitHub Top Language](https://img.shields.io/github/languages/top/philippebeck/vesan)](https://github.com/philippebeck/vesan)
[![Code Size](https://img.shields.io/github/languages/code-size/philippebeck/vesan)](https://github.com/philippebeck/vesan/tree/master)

- [Vesan](#vesan)
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

Install the frontend dependencies :  
`$ npm install`  

---

## Configuration

To configure the frontend constants, replace values :  
`/src/config/values.example.js` *(then rename it /src/config/values.js)*  

---

## Usage

To run the UI :  
`$ npm start`  

---

## Production

1. Compile the frontend :  
`$ npm run build`  

2. Then use the files of the dist folder for your prod UI

---
## Content

Elements Components :  
-   **BtnElt** *(Link & Button Elements)*  
-   **CardElt** *(Article & Section Elements)*  
-   **FieldElt** *(User Input & User Select Elements)*  
-   **FootElt** *(Footer Element)*  
-   **ListElt** *(List Element)*  
-   **MediaElt** *(Audio, Image, Quote & Video Elements)*  
-   **NavElt** *(Navbar & Sidebar Elements)*  
-   **SliderElt** *(Slider Element)*  
-   **TableElt** *(Table Element)*  

Setters Components :  
-   **ArticleSet** *(Article Setter)*  
-   **GallerySet** *(Gallery Setter)*  
-   **ImageSet** *(Image Setter)*  
-   **LinkSet** *(Link Setter)*  
-   **OrderSet** *(Order Setter)*  
-   **ProductSet** *(Product Setter)*  
-   **ProjectSet** *(Project Setter)*  
-   **UserSet** *(User Setter)*  

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
-   **PortfolioView** *(Portfolio of projects)*
-   **ShopView** *(Shop with products list)*  
-   **ProductView** *(Product of the shop)*  
-   **BasketView** *(Basket & order process)*  
-   **GalleryView** *(Galleries list)*  
-   **ImageView** *(Images of a gallery)*  
-   **LinkView** *(Links list)*  

Services :  
-   **Checkers** : checkRange(), checkRegex(), checkRole()  
-   **Fetchers** : getData(), postData(), putData(), deleteData()  
-   **Getters** : getCats(), getItemName(), getItemsByCat()  
-   **Setters** : setError(), setGlobalMeta(), setMeta()  

---

## Documentation

Available Demo :
-   [**Animadio**](https://philippebeck.github.io/animadio)  

Available Readme :  
-   [**Animadio**](https://github.com/philippebeck/animadio)  
