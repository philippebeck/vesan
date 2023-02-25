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

  NAME_MIN : 2,
  NAME_MAX : 50,

  PASS_INT : 1,
  PASS_MAX : 50,
  PASS_MIN : 8,

  PAYPAL_ID : "your-client-id",

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

  IS_MODERATE : [
    "true",
    "false"
  ],

  ROLES_USER : [
    "admin",
    "editor",
    "user"
  ],

  /* MESSAGES */

  ALERT_NAME : "The Name must have between 2 & 50 characters.",
  ALERT_EMAIL : "Your Email is not a valid address.",
  ALERT_FIELD : "Fields cannot be empty !",
  ALERT_ORDER : "Order created !",
  ALERT_PASS : "Your Password must have 8 to 50 characters, with uppercase, lowercase, 1 number minimum & no space.",
  ALERT_URL : "This URL is not a valid path.",
  ALERT_TEXT : "The text must have between 8 & 5000 characters.",

  BASKET_CLEAR : "Clear the basket",
  BASKET_LOGIN : "Login to order those Products",
  BASKET_ORDER : "Order those Products",
  BASKET_TOTAL : "The total of your basket is",

  BUTTON_FORGOT : "Send a new password",
  BUTTON_MESSAGE : "Send a message",
  BUTTON_SIGNIN : "SignIn to your account",
  BUTTON_SIGNUP : "SignUp a new user",

  CHECK_AVAILABLE : " is not available !",
  CHECK_REFERENCE : " is already referenced !",
  CHECK_REVIEW : "You have already written a review for this product, you can edit your old review or delete it",

  CONFIRM_BASKET : "Do you want to clear your basket ?",

  CREATE_ALT : "Alternative text",
  CREATE_ARTICLE : "Create article",
  CREATE_CATEGORY : "Choose a category",
  CREATE_COMMENT : "Create comment",
  CREATE_DESCRIPTION : "This is wonderful !",
  CREATE_EMAIL : "john@doe.com",
  CREATE_IMAGE : "Image file only",
  CREATE_LINK : "Create link",
  CREATE_NAME : "My new name",
  CREATE_OPTIONS : "option-1,option-2,option-3,etc",
  CREATE_PASSWORD : "********",
  CREATE_PRICE : "100 €",
  CREATE_PRODUCT : "Create product",
  CREATE_REVIEW : "Create review",
  CREATE_SCORE : "From 0 to 5",
  CREATE_SUBJECT : "The subject of your message ?",
  CREATE_TEXT : "Once upon a time...",
  CREATE_TITLE : "My new title",
  CREATE_URL : "https://",

  DELETE_ACCOUNT : "Delete your account",

  ERROR_ALT : "404 Error",
  ERROR_TITLE : "Page not found !",
  ERROR_LINK : "Go back home ?",

  FORGOT_CONFIRM : `, do you confirm sending a new password ?`,
  FORGOT_CREDENTIALS : "Wrong email or password !",
  FORGOT_EMAIL : "This email is not referenced",
  FORGOT_SUBJECT : "New password",
  FORGOT_TEXT : "This is your new password, keep it safe : ",

  IMG_ARTICLE : "An image of the article must be uploaded !",
  IMG_PRODUCT : "An image of the product must be uploaded !",

  LABEL_ALT : "Write the alternative text",
  LABEL_CATEGORY : "Choose the most appropriate category",
  LABEL_DESCRIPTION : "Write the description",
  LABEL_EMAIL : "Write your email",
  LABEL_IMAGE : "Provide an image",
  LABEL_NAME : "Write a name",
  LABEL_OPTIONS : "Write the options",
  LABEL_PASSWORD : "8 to 50 characters with upper & lower, 1 number mini & no space",
  LABEL_PRICE : "Write the price",
  LABEL_SCORE : "Write the score",
  LABEL_SUBJECT : "Write the subject",
  LABEL_TEXT : "Write the text",
  LABEL_TITLE : "Write the title",

  SIDEBAR_SHOP : "Manage products, reviews & orders",
  SIDEBAR_BLOG : "Manage articles & comments",
  SIDEBAR_USERS : "Manage users",
  SIDEBAR_LINK : "Create a link",
  SIDEBAR_LINKS : "Manage links",

  TITLE_LINK : "Links for dev !",

  UPDATE_ALT : "Update the alternative text",
  UPDATE_CATEGORY : "Update the category",
  UPDATE_DESCRIPTION : "Update the description",
  UPDATE_EMAIL : "Update the email",
  UPDATE_IMAGE : "Update the image",
  UPDATE_MODERATE : "Update moderation",
  UPDATE_NAME : "Update the name",
  UPDATE_OPTIONS : "Update the options",
  UPDATE_PASSWORD : "Update the password",
  UPDATE_PRICE : "Update the price",
  UPDATE_PROFILE : "Update your profile",
  UPDATE_QUANTITY : "Update the quantity",
  UPDATE_ROLE : "Update the role",
  UPDATE_SCORE : "Update the score",
  UPDATE_STATUS : "Update the status",
  UPDATE_TEXT : "Update the text",
  UPDATE_TITLE : "Update the title",
  UPDATE_URL : "Update the URL"
}
