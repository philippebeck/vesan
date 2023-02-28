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
  PAYPAL_ID : "your-paypal-id",
  PAYPAL_LABEL : "paypal",
  PAYPAL_NAMESPACE : "paypal_sdk",
  PAYPAL_SHAPE : "pill",

  RECAPTCHA_KEY : "your-recaptcha-key",

  SLIDER_DELAY : 5000,
  SLIDER_FA : "brands",

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

  /******************** TITLES ********************/

  // PRIVATE VIEWS
  ADMIN_VIEW : "Admin",
  PROFILE_VIEW : "Profile",
  // PUBLIC VIEWS
  BASKET_VIEW : "Basket",
  BLOG_VIEW : "Blog",
  CONTACT_VIEW : "Contact",
  ERROR_VIEW : "Error",
  HOME_VIEW : "Vesan",
  LEGAL_VIEW : "Apache License",
  LINK_VIEW : "Links",
  SHOP_VIEW : "Shop",
  // CONNECTOR COMPONENTS
  FORGOT_PASS : "Forgot password",
  SIGN_IN : "Sign in",
  SIGN_UP : "Sign up",
  // CREATOR COMPONENTS
  ARTICLE_CREATOR : "Create article",
  COMMENT_CREATOR : "Create comment",
  LINK_CREATOR : "Create link",
  PRODUCT_CREATOR : "Create product",
  REVIEW_CREATOR : "Create review",
  // LIST COMPONENTS
  COMMENT_LIST : "Comment list",
  REVIEW_LIST : "Review list",
  // MANAGER COMPONENTS
  ARTICLE_MANAGER : "Article manager",
  COMMENT_MANAGER : "Comment manager",
  LINK_MANAGER : "Link manager",
  ORDER_MANAGER : "Order manager",
  PRODUCT_MANAGER : "Product manager",
  REVIEW_MANAGER : "Review manager",
  USER_MANAGER : "User manager",
  // OTHERS
  PROFILE_ORDERS : "Your orders",
  ADMIN_USERS : "Users",

  /******************** INTRO ********************/

  INTRO_ADMIN : "Manage all data !",
  INTRO_ARTICLES : "Articles to read !",
  INTRO_BASKET : "Use the Paypal button below to order",
  INTRO_BLOG : "Manage articles & comments",
  INTRO_CONTACT : "Contact me if you have any question",
  INTRO_ERROR : "Page not found !",
  INTRO_FORGOT : "Need a new password ?",
  INTRO_HOME : "CMS with Vue-Elt, Servidio, Animadio & NemJS",
  INTRO_LEGAL : "Version 2.0, January 2004",
  INTRO_LINK : "Links for dev !",
  INTRO_LINKS : "Manage links",
  INTRO_PRODUCTS : "Products to buy !",
  INTRO_PROFILE : "Manage your profile & your orders",
  INTRO_SHOP : "Manage products, reviews & orders",
  INTRO_SIGNIN : "Sign in to your account !",
  INTRO_SIGNUP : "Sign up to comment & review !",
  INTRO_USERS : "Manage users",

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

  /******************** CONTENT ********************/

  CONTENT_ADD : "Add ",
  CONTENT_CLEAR : "Clear ",
  CONTENT_CREATE : "Create ",
  CONTENT_ENTER : "Enter ",
  CONTENT_ORDER : "Order ",
  CONTENT_REVIEW_LOGIN : "Login to review",
  CONTENT_REVIEW_WRITE : "Write a review",
  CONTENT_SEND : "Send ",

  /******************** TITLE ********************/

  TITLE_BASKET : "Login to order those Products",
  TITLE_CLEAR : "Clear the basket",
  TITLE_COMMENT_MODERATE : "Moderate comment #",
  TITLE_DELETE : "Delete ",
  TITLE_DELETE_ACCOUNT : "Delete your account",
  TITLE_DELETE_COMMENT : "Delete comment #",
  TITLE_DELETE_ORDER : "Delete order #",
  TITLE_DELETE_REVIEW : "Delete review #",
  TITLE_DISLIKE : "Dislike ",
  TITLE_FORGOT : "Send a new password",
  TITLE_GO : "Go to ",
  TITLE_LIKE : "Like ",
  TITLE_LIKE_LOGIN : "Login to like ",
  TITLE_MESSAGE : "Send a message",
  TITLE_READ : "Read ",
  TITLE_REVIEW_FIRST : "Be the first to write a review about ",
  TITLE_REVIEW_MODERATE : "Moderate review #",
  TITLE_REVIEW_READ : "Read reviews about ",
  TITLE_SIGNIN : "SignIn to your account",
  TITLE_SIGNUP : "SignUp a new user",
  TITLE_UPDATE : "Update ",
  TITLE_WATCH : "Watch ",

  /******************** ALERT ********************/

  ALERT_AVAILABLE : " is not available !",
  ALERT_BASKET_ADDED : " has been added to the Basket !",
  ALERT_COMMENT : "Comment #",
  ALERT_CREATED : " created !",
  ALERT_DELETED : " deleted !",
  ALERT_DISLIKED : " disliked !",
  ALERT_FORGOT_CREDENTIALS : "Wrong email or password !",
  ALERT_FORGOT_EMAIL : "This email is not referenced",
  ALERT_HOME : "Go back Home !",
  ALERT_IMG : "An image must be uploaded !",
  ALERT_LIKED : " liked !",
  ALERT_MODERATED : " moderated !",
  ALERT_NEW_COMMENT : "New comment created !",
  ALERT_NEW_REVIEW : "New review created !",
  ALERT_OPTION : "You need to choose an option !",
  ALERT_ORDER : "Order #",
  ALERT_ORDER_CREATED : "Order created !",
  ALERT_PRODUCT : "You have already written a review for this product, you can edit your old review or delete it",
  ALERT_REFERENCED : " is already referenced !",
  ALERT_REVIEW : "Review #",
  ALERT_SENDED : " sended !",
  ALERT_UPDATED : " updated !",
  // SERVIDIO
  CHECK_NAME : "The Name must have between 2 & 50 characters.",
  CHECK_EMAIL : "Your Email is not a valid address.",
  CHECK_PASS : "Your Password must have 8 to 50 characters, with uppercase, lowercase, 1 number minimum & no space.",
  CHECK_URL : "This URL is not a valid path.",
  CHECK_TEXT : "The text must have between 8 & 5000 characters.",

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
  BASKET_TOTAL : "The total of your basket is",
  CREATE_BY : "Created by",
  ERROR_LINK : "Go back home ?",
  HEAD_MOD : "mod/del",
  HEAD_UP : "up/del",
  ON : "on",
  RELEASE_ON : "Release on",
  TOTAL : "Total",
  UPDATE_ON : "Updated on",

  /******************** OTHER ********************/

  ERROR_ALT : "404 Error",
  FORGOT_SUBJECT : "New password",
  FORGOT_TEXT : "This is your new password, keep it safe : ",
}
