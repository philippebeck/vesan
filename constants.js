"use strict";
/* eslint-disable */

export default {
  /******************** CONFIG ********************/

  API_URL : "http://localhost:3000",

  CAT_ARTICLE : "News",
  CAT_LINK : "HTML5",
  CAT_PRODUCT : "Home",

  CONTENT_TYPE : "multipart/form-data", 

  CURRENCY_ISO : "EUR",
  CURRENCY_SYMBOL : "€",

  LOGO_ALT : "Logo Phi",
  LOGO_SRC : "/img/logo.svg",

  NAME_MIN : 2,
  NAME_MAX : 50,

  PASS_INT : 1,
  PASS_MAX : 50,
  PASS_MIN : 8,

  PAYPAL_COLOR : "blue",
  PAYPAL_LABEL : "paypal",
  PAYPAL_NAMESPACE : "paypal_sdk",
  PAYPAL_SHAPE : "pill",

  RECAPTCHA_KEY : "your-recaptcha-key",

  SLIDER_DELAY : 5000,

  TEXT_MIN : 8,
  TEXT_MAX : 5000,

  TOKEN : JSON.parse(localStorage.getItem("userToken")),
  USER_ID : JSON.parse(localStorage.getItem("userId")),

  /******************** NAV ********************/

  NAV_ADMIN : [
    "admin", 
    "profile", 
    "logout"
  ],

  NAV_MAIN : [
    "home", 
    "shop", 
    "blog", 
    "contact", 
    "basket"
  ],

  NAV_USER : [
    "profile", 
    "logout"
  ],

  /******************** FOOT ********************/

  FOOT : [
    "GitHub", 
    "LinkedIn", 
    "Medium", 
    "NPM", 
    "Twitter", 
    "CodePen"
  ],

  FOOT1 : [
    "Asperger", 
    "Astronomy", 
    "Philippe Beck"
  ],

  FOOT2 : [
    "Vue-Elt", 
    "Servidio", 
    "Animadio", 
    "NemJS", 
    "Vesan"
  ],

  FOOT3 : [
    "Links", 
    "Legal Notice", 
    "Donation", 
    "Sponsor"
  ],

  /******************** CATS ********************/

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

  /******************** UNDER CONSTRUCTION ********************/

  IS_MODERATE : [
    "true",
    "false"
  ],

  CONTACT_LIST : [
    "email",
    "subject",
    "text"
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

  /******************** TITLES ********************/

  ADMIN_VIEW : "Admin",
  ARTICLE_CREATOR : "Create article",
  ARTICLE_MANAGER : "Article manager",
  BASKET_VIEW : "Basket",
  BLOG_VIEW : "Blog",
  COMMENT_CREATOR : "Create comment",
  COMMENT_LIST : "Comment list",
  COMMENT_MANAGER : "Comment manager",
  CONTACT_VIEW : "Contact",
  ERROR_VIEW : "Error",
  FORGOT_PASS : "Forgot password",
  HOME_VIEW : "Vesan",
  LEGAL_VIEW : "Apache License",
  LINK_CREATOR : "Create link",
  LINK_MANAGER : "Link manager",
  LINK_VIEW : "Links",
  ORDER_MANAGER : "Order manager",
  PRODUCT_CREATOR : "Create product",
  PRODUCT_MANAGER : "Product manager",
  PROFILE_VIEW : "Profile",
  REVIEW_CREATOR : "Create review",
  REVIEW_LIST : "Review list",
  REVIEW_MANAGER : "Review manager",
  SHOP_VIEW : "Shop",
  SIGN_IN : "Sign in",
  SIGN_UP : "Sign up",
  USER_MANAGER : "User manager",

  /******************** INTRO ********************/

  INTRO_ADMIN : "Manage all data !",
  INTRO_BASKET : "Use the Paypal button below to order",
  INTRO_BLOG : "Articles to read !",
  INTRO_CONTACT : "Contact me if you have any question",
  INTRO_ERROR : "Page not found !",
  INTRO_FORGOT : "Need a new password ?",
  INTRO_HOME : "CMS with Vue-Elt, Servidio, Animadio & NemJS",
  INTRO_LEGAL : "Version 2.0, January 2004",
  INTRO_LINK : "Links for dev !",
  INTRO_PROFILE : "Manage your profile & your orders",
  INTRO_SHOP : "Products to buy !",
  INTRO_SIGNIN : "Sign in to your account !",
  INTRO_SIGNUP : "Sign up to comment & review !",
  MANAGE_SHOP : "Manage products, reviews & orders",
  MANAGE_BLOG : "Manage articles & comments",
  MANAGE_USERS : "Manage users",
  MANAGE_LINKS : "Manage links",

  /******************** INFO ********************/

  INFO_ALT : "Alternative text",
  INFO_CATEGORY : "Choose a category",
  INFO_EMAIL : "john@doe.com",
  INFO_IMAGE : "Image file only",
  INFO_NAME : "My new name",
  INFO_OPTION : "Select an option",
  INFO_OPTIONS : "option-1,option-2,option-3,etc",
  INFO_PASSWORD : "********",
  INFO_PRICE : "100 €",
  INFO_QUANTITY : "Choose a quantity",
  INFO_SCORE : "From 0 to 5",
  INFO_SUBJECT : "The subject of your message ?",
  INFO_TEXT : "Once upon a time...",
  INFO_URL : "https://",

  /******************** LEGEND ********************/

  LEGEND_ALT : "Alt",
  LEGEND_CATEGORY : "Category",
  LEGEND_DESCRIPTION : "Description",
  LEGEND_EMAIL : "Email",
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
  LABEL_CATEGORY : "Choose the most appropriate category",
  LABEL_DESCRIPTION : "Write the description",
  LABEL_EMAIL : "Write your email",
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

  /******************** UPDATE ********************/

  UPDATE_ALT : "Update the alternative text",
  UPDATE_CATEGORY : "Update the category",
  UPDATE_COMMENT : "Update comment #",
  UPDATE_DESCRIPTION : "Update the description",
  UPDATE_EMAIL : "Update the email",
  UPDATE_IMAGE : "Update the image",
  UPDATE_MODERATE : "Update moderation",
  UPDATE_NAME : "Update the name",
  UPDATE_OPTIONS : "Update the options",
  UPDATE_PRICE : "Update the price",
  UPDATE_PROFILE : "Update your profile",
  UPDATE_QUANTITY : "Update the quantity",
  UPDATE_ORDER : "Update status of order #",
  UPDATE_REVIEW : "Update review #",
  UPDATE_ROLE : "Update the role",
  UPDATE_SCORE : "Update the score",
  UPDATE_STATUS : "Update the status",
  UPDATE_TEXT : "Update the text",
  UPDATE_URL : "Update the URL",

  /******************** CONTENT ********************/

  CONTENT_ADD : "Add",
  CONTENT_CLEAR : "Clear",
  CONTENT_CREATE : "Create",
  CONTENT_ENTER : "Enter",
  CONTENT_ORDER : "Order",
  CONTENT_SEND : "Send",

  /******************** TITLE ********************/

  TITLE_CLEAR : "Clear the basket",
  TITLE_FORGOT : "Send a new password",
  TITLE_MESSAGE : "Send a message",
  TITLE_SIGNIN : "SignIn to your account",
  TITLE_SIGNUP : "SignUp a new user",

  /******************** WORD ********************/

  DELETE : "Delete ",
  DELETED : " deleted !",
  DISLIKE : "Dislike ",
  DISLIKED : " disliked !",
  LIKE : "Like ",
  LIKED : " liked !",
  ON : "on",
  READ : "Read ",
  TOTAL : "Total",
  WATCH : "Watch ",

  /******************** SERVIDIO CHECK ********************/

  CHECK_NAME : "The Name must have between 2 & 50 characters.",
  CHECK_EMAIL : "Your Email is not a valid address.",
  CHECK_PASS : "Your Password must have 8 to 50 characters, with uppercase, lowercase, 1 number minimum & no space.",
  CHECK_URL : "This URL is not a valid path.",
  CHECK_TEXT : "The text must have between 8 & 5000 characters.",

  /******************** BASKET ********************/

  BASKET_CONFIRM : "Do you want to clear your basket ?",
  BASKET_EMPTY : "Your basket is empty !",
  BASKET_LOGIN : "Login to order those Products",
  BASKET_ORDER : "Order those Products",
  BASKET_TOTAL : "The total of your basket is",

  /******************** DELETE ********************/

  DELETE_ACCOUNT : "Delete your account",
  DELETE_COMMENT : "Delete comment #",
  DELETE_ORDER : "Delete order #",
  DELETE_REVIEW : "Delete review #",

  /******************** FORGOT ********************/

  FORGOT_CONFIRM : `, do you confirm sending a new password ?`,
  FORGOT_CREDENTIALS : "Wrong email or password !",
  FORGOT_EMAIL : "This email is not referenced",
  FORGOT_SUBJECT : "New password",
  FORGOT_TEXT : "This is your new password, keep it safe : ",

  /******************** PAYPAL ********************/

  PAYPAL_BTN : "Failed to render the PayPal Buttons",
  PAYPAL_CANCEL : "Canceled transaction !",
  PAYPAL_ERROR : "Invalid transaction !",
  PAYPAL_SDK : "Failed to load the PayPal JS SDK script",
  PAYPAL_STATUS : "Status of transaction #",

  /******************** REVIEW ********************/

  REVIEW_FIRST : "Be the first to write a review about ",
  REVIEW_LOGIN : "Login to review",
  REVIEW_READ : "Read reviews about ",
  REVIEW_WRITE : "Write a review",

  /******************** UNDER CONSTRUCTION ********************/

  ALERT_ORDER : "Order created !",

  CHECK_AVAILABLE : " is not available !",

  CHECK_REFERENCE : " is already referenced !",
  CHECK_REVIEW : "You have already written a review for this product, you can edit your old review or delete it",

  CREATE_BY : "Created by",

  ERROR_ALT : "404 Error",
  ERROR_LINK : "Go back home ?",

  GO_HOME : "Go back Home !",
  GO_TO : "Go to ",

  HEAD_MOD : "mod/del",
  HEAD_UP : "up/del",

  IMG_ARTICLE : "An image of the article must be uploaded !",
  IMG_PRODUCT : "An image of the product must be uploaded !",

  LIKE_LOGIN : "Login to like ",

  MODERATE_COMMENT : "Moderate comment #",
  MODERATE_REVIEW : "Moderate review #",

  RELEASE_ON : "Release on",

  TITLE_ORDER : "Your orders",
  TITLE_USER : "Users",

  UPDATE : "Update ",
  UPDATE_ON : "Updated on",
  UPDATED : " updated !",
}
