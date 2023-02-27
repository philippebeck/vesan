"use strict";
/* eslint-disable */

export default {
  /* CONFIG */

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

  PAYPAL_ID : "your-client-id",

  RECAPTCHA_KEY : "your-recaptcha-key",

  SLIDER_DELAY : 5000,

  TEXT_MIN : 8,
  TEXT_MAX : 5000,

  TOKEN : JSON.parse(localStorage.getItem("userToken")),
  USER_ID : JSON.parse(localStorage.getItem("userId")),

  /* LISTS */

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

  IS_MODERATE : [
    "true",
    "false"
  ],

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

  /* MESSAGES */

  ADMIN_INTRO : "Manage all data !",
  ADMIN_TITLE : "Admin",

  ALERT_NAME : "The Name must have between 2 & 50 characters.",
  ALERT_EMAIL : "Your Email is not a valid address.",
  ALERT_FIELD : "Fields cannot be empty !",
  ALERT_ORDER : "Order created !",
  ALERT_PASS : "Your Password must have 8 to 50 characters, with uppercase, lowercase, 1 number minimum & no space.",
  ALERT_URL : "This URL is not a valid path.",
  ALERT_TEXT : "The text must have between 8 & 5000 characters.",

  BASKET_ADD : "Add to Basket ",
  BASKET_CLEAR : "Clear the basket",
  BASKET_EMPTY : "Your basket is empty !",
  BASKET_INTRO : "Use the Paypal button below to order",
  BASKET_LOGIN : "Login to order those Products",
  BASKET_ORDER : "Order those Products",
  BASKET_TITLE : "Basket",
  BASKET_TOTAL : "The total of your basket is",

  BLOG_TITLE : "Blog",
  BLOG_INTRO : "Articles to read !",

  BUTTON_FORGOT : "Send a new password",
  BUTTON_MESSAGE : "Send a message",
  BUTTON_SIGNIN : "SignIn to your account",
  BUTTON_SIGNUP : "SignUp a new user",

  CHECK_AVAILABLE : " is not available !",
  CHECK_REFERENCE : " is already referenced !",
  CHECK_REVIEW : "You have already written a review for this product, you can edit your old review or delete it",

  CONFIRM_BASKET : "Do you want to clear your basket ?",

  CONTACT_INTRO : "Contact me if you have any question",
  CONTACT_TITLE : "Contact",

  CONTENT_CLEAR : "Clear",
  CONTENT_CREATE : "Create",
  CONTENT_ENTER : "Enter",
  CONTENT_ORDER : "Order",
  CONTENT_SEND : "Send",

  CREATE_ALT : "Alternative text",
  CREATE_ARTICLE : "Create article",
  CREATE_BY : "Created by",
  CREATE_CATEGORY : "Choose a category",
  CREATE_COMMENT : "Create comment",
  CREATE_DESCRIPTION : "This is wonderful !",
  CREATE_EMAIL : "john@doe.com",
  CREATE_IMAGE : "Image file only",
  CREATE_LINK : "Create link",
  CREATE_NAME : "My new name",
  CREATE_OPTION : "Select an option",
  CREATE_OPTIONS : "option-1,option-2,option-3,etc",
  CREATE_PASSWORD : "********",
  CREATE_PRICE : "100 €",
  CREATE_PRODUCT : "Create product",
  CREATE_QUANTITY : "Choose a quantity",
  CREATE_REVIEW : "Create review",
  CREATE_SCORE : "From 0 to 5",
  CREATE_SUBJECT : "The subject of your message ?",
  CREATE_TEXT : "Once upon a time...",
  CREATE_TITLE : "My new title",
  CREATE_URL : "https://",

  DELETE : "Delete ",
  DELETE_ACCOUNT : "Delete your account",
  DELETE_COMMENT : "Delete comment #",
  DELETE_ORDER : "Delete order #",
  DELETE_REVIEW : "Delete review #",

  DISLIKE : "Dislike ",

  ERROR_ALT : "404 Error",
  ERROR_TITLE : "Page not found !",
  ERROR_LINK : "Go back home ?",

  FORGOT_CONFIRM : `, do you confirm sending a new password ?`,
  FORGOT_CREDENTIALS : "Wrong email or password !",
  FORGOT_EMAIL : "This email is not referenced",
  FORGOT_INTRO : "Need a new password ?",
  FORGOT_SUBJECT : "New password",
  FORGOT_TEXT : "This is your new password, keep it safe : ",
  FORGOT_TITLE : "Forgot password",

  GO_TO : "Go to ",

  HEAD_MOD : "mod/del",
  HEAD_UP : "up/del",

  HOME_INTRO : "CMS with Vue-Elt, Servidio, Animadio & NemJS",
  HOME_TITLE : "Vesan",

  IMG_ARTICLE : "An image of the article must be uploaded !",
  IMG_PRODUCT : "An image of the product must be uploaded !",

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

  LIKE : "Like ",
  LIKE_LOGIN : "Login to like ",

  LINK_INTRO : "Links for dev !",
  LINK_TITLE : "Links",

  LIST_COMMENTS : "Comment list",
  LIST_REVIEWS : "Review list",

  MANAGE_SHOP : "Manage products, reviews & orders",
  MANAGE_BLOG : "Manage articles & comments",
  MANAGE_USERS : "Manage users",
  MANAGE_LINKS : "Manage links",

  MANAGER_ARTICLE : "Article manager",
  MANAGER_COMMENT : "Comment manager",
  MANAGER_LINK : "Link manager",
  MANAGER_ORDER : "Order manager",
  MANAGER_PRODUCT : "Product manager",
  MANAGER_REVIEW : "Review manager",
  MANAGER_USER : "User manager",

  MODERATE_COMMENT : "Moderate comment #",
  MODERATE_REVIEW : "Moderate review #",

  ON : "on",

  ORDER_TITLE : "Your orders",

  PROFILE_INTRO : "Manage your profile & your orders",
  PROFILE_TITLE : "Profile",

  READ : "Read ",

  RELEASE_ON : "Release on",

  REVIEW_FIRST : "Be the first to write a review about ",
  REVIEW_LOGIN : "Login to review",
  REVIEW_READ : "Read reviews about ",
  REVIEW_WRITE : "Write a review",

  SHOP_TITLE : "Shop",
  SHOP_INTRO : "Products to buy !",

  SIGNIN_INTRO : "Sign in to your account !",
  SIGNIN_TITLE : "Sign in",

  SIGNUP_INTRO : "Sign up to comment & review !",
  SIGNUP_TITLE : "Sign up",

  TOTAL : "Total",

  UPDATE : "Update ",
  UPDATE_ALT : "Update the alternative text",
  UPDATE_CATEGORY : "Update the category",
  UPDATE_COMMENT : "Update comment #",
  UPDATE_DESCRIPTION : "Update the description",
  UPDATE_EMAIL : "Update the email",
  UPDATE_IMAGE : "Update the image",
  UPDATE_MODERATE : "Update moderation",
  UPDATE_NAME : "Update the name",
  UPDATE_ON : "Updated on",
  UPDATE_OPTIONS : "Update the options",
  UPDATE_PASSWORD : "Update the password",
  UPDATE_PRICE : "Update the price",
  UPDATE_PROFILE : "Update your profile",
  UPDATE_QUANTITY : "Update the quantity",
  UPDATE_ORDER : "Update status of order #",
  UPDATE_REVIEW : "Update review #",
  UPDATE_ROLE : "Update the role",
  UPDATE_SCORE : "Update the score",
  UPDATE_STATUS : "Update the status",
  UPDATE_TEXT : "Update the text",
  UPDATE_TITLE : "Update the title",
  UPDATE_URL : "Update the URL",

  USER_TITLE : "Users",

  WATCH : "Watch ",
}
