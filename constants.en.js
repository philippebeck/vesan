"use strict";
/* eslint-disable */

export default {
  /******************** CONFIG ********************/

  API_URL : "http://localhost:3000",

  CAT_ARTICLE : "News",
  CAT_LINK : "HTML5",
  CAT_PRODUCT : "Home",

  CURRENCY_ISO : "EUR",
  CURRENCY_SYMBOL : "€",

  ERROR_ALT : "404 Error",

  HOME_ALT : "Home image",
  HOME_API_KEY : "",
  HOME_API_URL : "",
  HOME_LOOP : true,
  HOME_MEDIA : "slider",
  HOME_SRC : "/video/home.mp4",
  HOME_WIDTH : 500,

  ICON : "/img/favicon.png",
  
  IMG_WIDTH : 500,
  IMG_HEIGHT : 500,

  LANG : "en",

  LOGO_ALT : "Logo",
  LOGO_SRC : "/img/logo.png",
  LOGO_WIDTH : "30",

  MEDIA_WIDTH: 300,

  NUM_MAX : 5,
  NUM_MIN : 0,

  ORDER_STATUS : "Pending",

  PASS_INT : 1,
  PASS_MAX : 50,
  PASS_MIN : 8,

  PAYPAL_COLOR : "blue",
  PAYPAL_ID : "{your-paypal-id}",
  PAYPAL_LABEL : "paypal",
  PAYPAL_NAMESPACE : "paypal_sdk",
  PAYPAL_SHAPE : "pill",

  PRICE_MAX : 5000,
  PRICE_MIN : 1,

  RECAPTCHA_KEY : "{your-recaptcha-key}",

  SLIDER_DELAY : 5000,
  SLIDER_FA : "brands",

  STRING_MAX : 50,
  STRING_MIN : 2,

  TEXT_MAX : 5000,
  TEXT_MIN : 8,

  THUMB_WIDTH : 200,
  THUMB_HEIGHT : 200,

  TINY_KEY : "{your-tiny-key}",

  TOKEN : JSON.parse(localStorage.getItem("userToken")),

  TW_ID : "",

  UI_URL : "http://localhost:8080",

  URL_MAX : 100,
  URL_MIN : 5,

  USER_ID : JSON.parse(localStorage.getItem("userId")),

  /******************** NAV ********************/

  NAV_MAIN : [
    {
      "href": "/shop",
      "name": "Shop",
      "type": "solid",
      "icon": "store"
    },
    {
      "href": "/blog",
      "name": "Blog",
      "type": "solid",
      "icon": "blog"
    },
    {
      "href": "/galleries",
      "name": "Galleries",
      "type": "regular",
      "icon": "images"
    },
    {
      "href": "/links",
      "name": "Links",
      "type": "solid",
      "icon": "link"
    }
  ],

  /******************** FOOT ********************/

  FOOT : [
    {
      "href": "https://github.com/philippebeck",
      "title": "Philippe Beck @GitHub",
      "fa": "github",
      "color": "black"
    }, 
    {
      "href": "https://www.linkedin.com/in/philippebeck",
      "title": "Philippe Beck @LinkedIn",
      "fa": "linkedin-in",
      "color": "sky-dark"
    }, 
    {
      "href": "https://medium.com/@philippebeck",
      "title": "Philippe Beck @Medium",
      "fa": "medium",
      "color": "green-dark"
    }, 
    {
      "href": "https://www.npmjs.com/~philippebeck",
      "title": "Philippe Beck @NPM",
      "fa": "npm",
      "color": "red-dark"
    }, 
    {
      "href": "https://twitter.com/ph_beck",
      "title": "Philippe Beck @Twitter",
      "fa": "twitter",
      "color": "sky"
    }, 
    {
      "href": "https://codepen.io/philippebeck",
      "title": "Philippe Beck @CodePen",
      "fa": "codepen",
      "color": "black"
    }
  ],

  FOOT_TITLE1 : "Infos",
  FOOT_TITLE2 : "Support",

  FOOT1 : [
    {
      "href": "/contact",
      "title": "Messenger",
      "content": "Contact"
    },
    {
      "href": "/legal",
      "title": "Terms & conditions",
      "content": "T&C"
    } 
  ],

  FOOT2 : [
    {
      "href": "https://www.npmjs.com/package/vue-elt",
      "title": "Vuejs SFC Library",
      "content": "Vue-Elt"
    }, 
    {
      "href": "https://www.npmjs.com/package/servidio",
      "title": "JavaScript Frontend Services",
      "content": "Servidio"
    }, 
    {
      "href": "https://www.npmjs.com/package/animadio",
      "title": "Animadio CSS Library",
      "content": "Animadio"
    }, 
    {
      "href": "https://www.npmjs.com/package/nemjs",
      "title": "JavaScript Backend Services",
      "content": "Nemjs"
    }, 
    {
      "href": "https://www.npmjs.com/package/vesan",
      "title": "CMS with Vue-Elt, Servidio, Animadio & NemJS",
      "content": "Vesan"
    }
  ],

  /******************** CATEGORIES ********************/

  CATS_ARTICLE : [
    "Transportation",
    "Business", 
    "Culture",
    "Fashion",
    "Food",
    "Health",
    "News",
    "Politics",
    "Science",
    "Sports",
    "Technology", 
    "Travel"
  ],

  CATS_LINK : [
    "HTML5",
    "CSS3",
    "JS",
    "PHP",
    "Python",
    "Git",
    "Dev"
  ],

  CATS_ORDER : [
    "Pending",
    "Paid",
    "Done",
    "Canceled"
  ],

  CATS_PRODUCT : [
    "Beauty",
    "Electronics",
    "Fashion",
    "Food",
    "Furniture",
    "Games",
    "Health",
    "Home",
    "Industrial",
    "Media",
    "Pet",
    "Sports",
  ],

  /******************** FORMS ********************/

  ARTICLE_FORM : [
    "name", 
    "text", 
    "image", 
    "alt", 
    "cat"
  ],

  CONTACT_FORM : [
    "email",
    "subject",
    "text"
  ],

  LINK_FORM : [
    "name", 
    "url", 
    "cat"
  ],

  PRODUCT_FORM : [
    "name", 
    "description", 
    "image", 
    "alt", 
    "price", 
    "options", 
    "cat"
  ],

  USER_FORM : [
    "name", 
    "email",
    "image", 
    "pass"
  ],

  /******************** LIST ********************/

  HOME_CONTENT : [
    "Vue-Elt for Components",
    "Servidio for Frontend Services",
    "Animadio for Design",
    "NemJS for Backend Middlewares"
  ],

  IS_MODERATE : [
    "true",
    "false"
  ],

  ROLES_USER : [
    "admin",
    "editor",
    "user"
  ],

  SLIDES : [
    "vuejs", 
    "sass", 
    "node-js", 
    "html5", 
    "js", 
    "css3"
  ],

  /******************** HEAD TITLES ********************/

  HEAD: "",
  HEAD_ADMIN: "Admin",
  HEAD_ARTICLE: "Article Editor",
  HEAD_BASKET: "Basket",
  HEAD_BLOG: "Blog",
  HEAD_CONTACT: "Contact",
  HEAD_GALLERY : "Galleries",
  HEAD_HOME: "Home",
  HEAD_LEGAL: "General Conditions",
  HEAD_LINK: "Links",
  HEAD_LOGIN: "Login",
  HEAD_PRODUCT: "Service Editor",
  HEAD_PROFILE: "Profile",
  HEAD_SHOP: "Services",

  /********************META DESCRIPTION********************/

  META_ADMIN: "Administration",
  META_ARTICLE: "Edit a blog article",
  META_BASKET: "Basket of online services",
  META_BLOG: "Blog for...",
  META_CONTACT: "Contact me for any questions",
  META_GALLERY : "Images galleries",
  META_HOME: "Welcome to the ... website",
  META_IMAGE : "Images product by ",
  META_LEGAL: "General terms of use",
  META_LINK: "Links for...",
  META_LOGIN: "Login & registration",
  META_PRODUCT: "Edit a shop service",
  META_PROFILE: "Profile & order management",
  META_SHOP: "Services of...",

  /******************** TITLES ********************/

  // PRIVATE VIEWS
  ADMIN_EDITOR : "Admin",
  PROFILE_EDITOR : "Account",
  PROFILE_SUB : "Profile",
  ORDERS_SUB : "Orders",
  EDITOR : "Editor",
  // PUBLIC VIEWS
  BASKET_VIEW : "Basket",
  BASKET_SUB : "Your products",
  BLOG_VIEW : "Blog",
  CONTACT_VIEW : "Contact",
  CONTACT_SUB : "Send me a message",
  ERROR_VIEW : "Error",
  GALLERY_VIEW : "Images galleries",
  HOME_VIEW : "Vesan",
  HOME_SUB : "CMS with Vue-Elt, Servidio, Animadio & Nemjs",
  LEGAL_VIEW : "Apache License",
  LEGAL_SUB : "TERMS & CONDITIONS FOR USE, REPRODUCTION & DISTRIBUTION",
  LOGIN_VIEW : "Connection",
  LINK_VIEW : "Links",
  LINK_SUB : "Links for developers",
  SHOP_VIEW : "Shop",
  // CONNECTOR COMPONENTS
  FORGOT_PASS : "Forgot password",
  SIGN_IN : "Sign in",
  SIGN_UP : "Sign up",
  // CREATOR COMPONENTS
  ARTICLE_CREATOR : "Create article",
  COMMENT_CREATOR : "Create comment",
  GALLERY_CREATOR : "Create gallery",
  IMAGE_CREATOR : "Create image",
  LINK_CREATOR : "Create link",
  PRODUCT_CREATOR : "Create product",
  REVIEW_CREATOR : "Create review",
  // LIST COMPONENTS
  COMMENT_LIST : "Comment list",
  REVIEW_LIST : "Review list",
  // MANAGER COMPONENTS
  ARTICLE_MANAGER : "Article manager",
  COMMENT_MANAGER : "Comment manager",
  GALLERY_MANAGER : "Gallery manager",
  IMAGE_MANAGER : "Image Manager",
  LINK_MANAGER : "Link manager",
  ORDER_MANAGER : "Order manager",
  PRODUCT_MANAGER : "Product manager",
  REVIEW_MANAGER : "Review manager",
  USER_MANAGER : "User manager",

  /******************** INTRO ********************/

  INTRO_ADMIN : "Manage all data !",
  INTRO_ARTICLE : "Articles to read !",
  INTRO_ARTICLES : "Manage articles",
  INTRO_BASKET : "Use the Paypal button to order",
  INTRO_COMMENTS : "Manage comments",
  INTRO_CONTACT : "Contact me if you have any question",
  INTRO_ERROR : "Page not found !",
  INTRO_FORGOT : "Need a new password ?",
  INTRO_GALLERY : "Watch the galleries !",
  INTRO_HOME : "CMS with Vue-Elt, Servidio, Animadio & NemJS",
  INTRO_LEGAL : "Version 2.0, January 2004",
  INTRO_LINK : "Links for dev !",
  INTRO_LINKS : "Manage links",
  INTRO_ORDERS : "Manage orders",
  INTRO_PRODUCT : "Products to buy !",
  INTRO_PRODUCTS : "Manage products",
  INTRO_PROFILE : "Manage your profile & your orders",
  INTRO_REVIEWS : "Manage reviews",
  INTRO_SIGNIN : "Sign in to your account !",
  INTRO_SIGNUP : "Sign up to comment & review !",
  INTRO_USERS : "Manage users",

  /******************** INFO ********************/

  INFO_ALT : "Alternative text",
  INFO_CATEGORY : "Choose a category",
  INFO_EMAIL : "john@doe.com",
  INFO_IMAGE : "Image file only",
  INFO_NAME : "My new name",
  INFO_OPTION : "Choose an option",
  INFO_OPTIONS : "option-1,option-2,option-3,etc",
  INFO_PASSWORD : "********",
  INFO_PRICE : "100 €",
  INFO_QUANTITY : "Choose a quantity",
  INFO_SCORE : "From 0 to 5",
  INFO_SUBJECT : "The subject of your message ?",
  INFO_TEXT : "Once upon a time...",
  INFO_URL : "https://",
  INFO_UP_ALT : "Update the alternative text",
  INFO_UP_CATEGORY : "Update the category",
  INFO_UP_COMMENT : "Update comment #",
  INFO_UP_DESCRIPTION : "Update the description",
  INFO_UP_EMAIL : "Update the email",
  INFO_UP_IMAGE : "Update the image",
  INFO_UP_MODERATE : "Update moderation",
  INFO_UP_NAME : "Update the name",
  INFO_UP_OPTIONS : "Update the options",
  INFO_UP_PRICE : "Update the price",
  INFO_UP_PROFILE : "Update your profile",
  INFO_UP_QUANTITY : "Update the quantity",
  INFO_UP_ORDER : "Update status of order #",
  INFO_UP_REVIEW : "Update review #",
  INFO_UP_ROLE : "Update the role",
  INFO_UP_SCORE : "Update the score",
  INFO_UP_STATUS : "Update the status",
  INFO_UP_TEXT : "Update the text",
  INFO_UP_URL : "Update the URL",

  /******************** LEGEND ********************/

  LEGEND_ALT : "Alt",
  LEGEND_AUTHOR : "Author",
  LEGEND_CATEGORY : "Category",
  LEGEND_DESCRIPTION : "Description",
  LEGEND_EMAIL : "Email",
  LEGEND_GALLERY : "Gallerie",
  LEGEND_IMAGE : "Image",
  LEGEND_NAME : "Name",
  LEGEND_OPTION : "Option",
  LEGEND_OPTIONS : "Options",
  LEGEND_PASSWORD : "Password",
  LEGEND_PRICE : "Price",
  LEGEND_QUANTITY : "Quantity",
  LEGEND_SCORE : "Score",
  LEGEND_SUBJECT : "Subject",
  LEGEND_TEXT : "Text",
  LEGEND_TITLE : "Title",
  LEGEND_URL : "Url",

  /******************** LABEL ********************/
  
  LABEL_ALT : "Write the alternative text",
  LABEL_AUTHOR : "Provide the author name",
  LABEL_CATEGORY : "Choose the most appropriate category",
  LABEL_DESCRIPTION : "Write the description",
  LABEL_EMAIL : "Write your email",
  LABEL_GALLERY : "Choose a gallerie",
  LABEL_IMAGE : "Provide an image",
  LABEL_NAME : "Write a name",
  LABEL_OPTION : "Indicate the product option",
  LABEL_OPTIONS : "Write the options",
  LABEL_PASSWORD : "8 to 50 characters with upper & lower, 1 number mini & no space",
  LABEL_PRICE : "Write the price",
  LABEL_QUANTITY : "Indicate the product quantity",
  LABEL_SCORE : "Write the score",
  LABEL_SUBJECT : "Write the subject",
  LABEL_TEXT : "Write the text",
  LABEL_TITLE : "Write the title",
  LABEL_URL : "Write the URL",

  /******************** CONTENT ********************/

  CONTENT_ADD : "Add ",
  CONTENT_ADMIN : "Administer",
  CONTENT_CLEAR : "Clear ",
  CONTENT_CREATE : "Create ",
  CONTENT_ENTER : "Enter ",
  CONTENT_LOGOUT : "Logout",
  CONTENT_ORDER : "Order ",
  CONTENT_REVIEW_LOGIN : "Login to review",
  CONTENT_REVIEW_WRITE : "Write a review",
  CONTENT_SEND : "Send ",
  CONTENT_SIGNUP : "Signup",
  CONTENT_UPDATE : "Update ",

  /******************** TITLE ********************/

  TITLE_ADMIN : "Admin",
  TITLE_BASKET : "Watch my basket",
  TITLE_CLEAR : "Clear the basket",
  TITLE_COMMENT_MODERATE : "Moderate comment #",
  TITLE_DELETE : "Delete ",
  TITLE_DELETE_ACCOUNT : "Delete your account",
  TITLE_DELETE_COMMENT : "Delete comment #",
  TITLE_DELETE_IMAGE : "Delete image #",
  TITLE_DELETE_ORDER : "Delete order #",
  TITLE_DELETE_REVIEW : "Delete review #",
  TITLE_DISLIKE : "Dislike ",
  TITLE_FORGOT : "Send a new password",
  TITLE_GO : "Go to ",
  TITLE_LIKE : "Like ",
  TITLE_LIKE_LOGIN : "Login to like ",
  TITLE_LOGIN : "Login",
  TITLE_LOGOUT : "Logout",
  TITLE_MESSAGE : "Send a message",
  TITLE_ORDER : "Login to order those Products",
  TITLE_READ : "Read ",
  TITLE_REVIEW_FIRST : "Be the first to write a review about ",
  TITLE_REVIEW_MODERATE : "Moderate review #",
  TITLE_REVIEW_READ : "Read reviews about ",
  TITLE_SIGNIN : "SignIn to your account",
  TITLE_SIGNUP : "SignUp a new user",
  TITLE_UPDATE : "Update ",
  TITLE_TOGGLE : "Basculer",
  TITLE_TOP : "Remonter",
  TITLE_WATCH : "Watch ",

  /******************** ALERT ********************/

  ALERT_BASKET_ADDED : " has been added to the basket !",
  ALERT_COMMENT : "Comment #",
  ALERT_CREATED : " created !",
  ALERT_DELETED : " deleted !",
  ALERT_DISLIKED : " disliked !",
  ALERT_HOME : "Return Home !",
  ALERT_IMAGE : "Image #",
  ALERT_IMG : "An image must be uploaded !",
  ALERT_LIKED : " liked !",
  ALERT_MODERATED : " moderated !",
  ALERT_NEW_COMMENT : "New comment created !",
  ALERT_NEW_REVIEW : "New review created !",
  ALERT_OPTION : "You need to choose an option !",
  ALERT_ORDER : "Order #",
  ALERT_ORDER_CREATED : "Order created !",
  ALERT_REVIEW : "Review #",
  ALERT_SENDED : " sended !",
  ALERT_UPDATED : " updated !",
  // SERVIDIO
  CHECK_EMAIL : "Your Email is not a valid address.",
  CHECK_NUMBER : "The number must be between ",
  CHECK_PASS : "Your Password must have 8 to 50 characters, with uppercase, lowercase, 1 number minimum & no space.",
  CHECK_STRING : "The number of characters must be between ",
  CHECK_URL : "This URL is not a valid path.",

  /******************** CONFIRM ********************/

  CONFIRM_BASKET : "Do you want to clear your basket ?",
  CONFIRM_FORGOT : `, do you confirm sending a new password ?`,

  /******************** PAYPAL ********************/

  PAYPAL_BTN : "Failed to render the PayPal Buttons",
  PAYPAL_CANCEL : "Canceled transaction !",
  PAYPAL_ERROR : "Invalid transaction !",
  PAYPAL_SDK : "Failed to load the PayPal JS SDK script",
  PAYPAL_STATUS : "Status of transaction #",

  /******************** INTERPOLATION ********************/

  BASKET_EMPTY : "Your basket is empty !",
  BASKET_TOTAL : "The total of your basket is ",
  CREATE_BY : "Created by ",
  EDIT : "Edit",
  ERROR_LINK : "Go back home ?",
  HEAD_MOD : "mod/del",
  HEAD_UP : "up/del",
  ON : " on ",
  PROFILE_OF : "Profile of ",
  RELEASE_ON : "Release on ",
  TOTAL : "Total",
  UPDATE_ON : "Updated on ",

  /******************** OTHER ********************/

  FORGOT_SUBJECT : "New password",
  FORGOT_TEXT : "This is your new password, keep it safe : ",
  LEGAL_LINK : "https://www.apache.org/licenses",
  LEGAL_CONTENT : "1. Definitions. \n\n 'License' shall mean the terms & conditions for use, reproduction, & distribution as defined by Sections 1 through 9 of this document. \n\n 'Licensor' shall mean the copyright owner or entity authorized by the copyright owner that is granting the License. \n\n 'Legal Entity' shall mean the union of the acting entity & all other entities that control, are controlled by, or are under common control with that entity. For the purposes of this definition, 'control' means (i) the power, direct or indirect, to cause the direction or management of such entity, whether by contract or otherwise, or (ii) ownership of fifty percent (50%) or more of the outstanding shares, or (iii) beneficial ownership of such entity. \n\n 'You' (or 'Your') shall mean an individual or Legal Entity exercising permissions granted by this License. \n\n 'Source' form shall mean the preferred form for making modifications, including but not limited to software source code, documentation source, & configuration files. \n\n 'Object' form shall mean any form resulting from mechanical transformation or translation of a Source form, including but not limited to compiled object code, generated documentation, & conversions to other media types. \n\n 'Work' shall mean the work of authorship, whether in Source or Object form, made available under the License, as indicated by a copyright notice that is included in or attached to the work (an example is provided in the Appendix below). \n\n 'Derivative Works' shall mean any work, whether in Source or Object form, that is based on (or derived from) the Work & for which the editorial revisions, annotations, elaborations, or other modifications represent, as a whole, an original work of authorship. For the purposes of this License, Derivative Works shall not include works that remain separable from, or merely link (or bind by name) to the interfaces of, the Work & Derivative Works thereof. \n\n 'Contribution' shall mean any work of authorship, including the original version of the Work & any modifications or additions to that Work or Derivative Works thereof, that is intentionally submitted to Licensor for inclusion in the Work by the copyright owner or by an individual or Legal Entity authorized to submit on behalf of the copyright owner. For the purposes of this definition, 'submitted' means any form of electronic, verbal, or written communication sent to the Licensor or its representatives, including but not limited to communication on electronic mailing lists, source code control systems, & issue tracking systems that are managed by, or on behalf of, the Licensor for the purpose of discussing & improving the Work, but excluding communication that is conspicuously marked or otherwise designated in writing by the copyright owner as 'Not a Contribution.' \n\n 'Contributor' shall mean Licensor & any individual or Legal Entity on behalf of whom a Contribution has been received by Licensor & subsequently incorporated within the Work. \n\n 2. Grant of Copyright License. Subject to the terms & conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable copyright license to reproduce, prepare Derivative Works of, publicly display, publicly perform, sublicense, & distribute the Work & such Derivative Works in Source or Object form. \n\n 3. Grant of Patent License. Subject to the terms & conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable (except as stated in this section) patent license to make, have made, use, offer to sell, sell, import, & otherwise transfer the Work, where such license applies only to those patent claims licensable by such Contributor that are necessarily infringed by their Contribution(s) alone or by combination of their Contribution(s) with the Work to which such Contribution(s) was submitted. If You institute patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Work or a Contribution incorporated within the Work constitutes direct or contributory patent infringement, then any patent licenses granted to You under this License for that Work shall terminate as of the date such litigation is filed. \n\n 4. Redistribution. You may reproduce & distribute copies of the Work or Derivative Works thereof in any medium, with or without modifications, & in Source or Object form, provided that You meet the following conditions: \n\n (a) You must give any other recipients of the Work or Derivative Works a copy of this License; & \n\n (b) You must cause any modified files to carry prominent notices stating that You changed the files; & \n\n (c) You must retain, in the Source form of any Derivative Works that You distribute, all copyright, patent, trademark, & attribution notices from the Source form of the Work, excluding those notices that do not pertain to any part of the Derivative Works; & \n\n (d) If the Work includes a 'NOTICE' text file as part of its distribution, then any Derivative Works that You distribute must include a readable copy of the attribution notices contained within such NOTICE file, excluding those notices that do not pertain to any part of the Derivative Works, in at least one of the following places: within a NOTICE text file distributed as part of the Derivative Works; within the Source form or documentation, if provided along with the Derivative Works; or, within a display generated by the Derivative Works, if & wherever such third-party notices normally appear. The contents of the NOTICE file are for informational purposes only & do not modify the License. You may add Your own attribution notices within Derivative Works that You distribute, alongside or as an addendum to the NOTICE text from the Work, provided that such additional attribution notices cannot be construed as modifying the License. \n\n You may add Your own copyright statement to Your modifications & may provide additional or different license terms & conditions for use, reproduction, or distribution of Your modifications, or for any such Derivative Works as a whole, provided Your use, reproduction, & distribution of the Work otherwise complies with the conditions stated in this License. \n\n 5. Submission of Contributions. Unless You explicitly state otherwise, any Contribution intentionally submitted for inclusion in the Work by You to the Licensor shall be under the terms & conditions of this License, without any additional terms or conditions. Notwithstanding the above, nothing herein shall supersede or modify the terms of any separate license agreement you may have executed with Licensor regarding such Contributions. \n\n 6. Trademarks. This License does not grant permission to use the trade names, trademarks, service marks, or product names of the Licensor, except as required for reasonable & customary use in describing the origin of the Work & reproducing the content of the NOTICE file. \n\n 7. Disclaimer of Warranty. Unless required by applicable law or agreed to in writing, Licensor provides the Work (& each Contributor provides its Contributions) on an 'AS IS' BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied, including, without limitation, any warranties or conditions of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A PARTICULAR PURPOSE. You are solely responsible for determining the appropriateness of using or redistributing the Work & assume any risks associated with Your exercise of permissions under this License. \n\n 8. Limitation of Liability. In no event & under no legal theory, whether in tort (including negligence), contract, or otherwise, unless required by applicable law (such as deliberate & grossly negligent acts) or agreed to in writing, shall any Contributor be liable to You for damages, including any direct, indirect, special, incidental, or consequential damages of any character arising as a result of this License or out of the use or inability to use the Work (including but not limited to damages for loss of goodwill, work stoppage, computer failure or malfunction, or any & all  other commercial damages or losses), even if such Contributor has been advised of the possibility of such damages. \n\n 9. Accepting Warranty or Additional Liability. While redistributing the Work or Derivative Works thereof, You may choose to offer, & charge a fee for, acceptance of support, warranty, indemnity, or other liability obligations &/or rights consistent with this License. However, in accepting such obligations, You may act only on Your own behalf & on Your sole responsibility, not on behalf of any other Contributor, & only if You agree to indemnify, defend, & hold each Contributor harmless for any liability incurred by, or claims asserted against, such Contributor by reason of your accepting any such warranty or additional liability. \n\n END OF TERMS AND CONDITIONS \n\n APPENDIX: How to apply the Apache License to your work. \n\n To apply the Apache License to your work, attach the following boilerplate notice, with the fields enclosed by brackets '{}' replaced with your own identifying information. (Don't include the brackets!)  The text should be enclosed in the appropriate comment syntax for the file format. We also recommend that a file or class name & description of purpose be included on the same 'printed page' as the copyright notice for easier identification within third-party archives. \n\n Copyright 2023 Philippe Beck \n\n Licensed under the Apache License, Version 2.0 (the 'License'); you may not use this file except in compliance with the License. You may obtain a copy of the License at \n\n https://www.apache.org/licenses/LICENSE-2.0 \n\n Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions & limitations under the License."
}
