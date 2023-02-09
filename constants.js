"use strict";
/* eslint-disable */

export default {
  /* SERVIDIO */

  ALERT_NAME : "The Name must have between 2 & 50 characters.",
  ALERT_EMAIL : "Your Email is not a valid address.",
  ALERT_PASS : "Your Password must have 8 to 50 characters, with uppercase, lowercase, 1 number minimum & no space.",
  ALERT_URL : "This URL is not a valid path.",

  API_URL : "http://localhost:3000",
  CONTENT_TYPE : "multipart/form-data", 

  NAME_MIN : 2,
  NAME_MAX : 50,

  PASS_INT : 1,
  PASS_MAX : 50,
  PASS_MIN : 8,

  TOKEN : JSON.parse(localStorage.getItem("userToken")),
  USER_ID : JSON.parse(localStorage.getItem("userId")),

  /* VESAN */

  CAT_ARTICLE: "News",
  CAT_LINK: "HTML5",
  CAT_PRODUCT: "Home",

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
    "Done"
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

  CHECK_AVAILABLE : " is not available !",
  CHECK_REFERENCE : " is already referenced !",
  CHECK_REVIEW : "You have already written a review for this product, you can edit your old review or delete it",

  CREATE_ALT : "Alternative text",
  CREATE_ARTICLE : "Create article",
  CREATE_CATEGORY : "Choose a category",
  CREATE_COMMENT : "Create comment",
  CREATE_DESCRIPTION : "This is wonderful !",
  CREATE_IMAGE : "Image file only",
  CREATE_LINK : "Create link",
  CREATE_NAME : "My new name",
  CREATE_OPTIONS : "option-1,option-2,option-3,etc",
  CREATE_PRICE : "100 €",
  CREATE_PRODUCT : "Create product",
  CREATE_REVIEW : "Create review",
  CREATE_SCORE : "From 0 to 5",
  CREATE_TEXT : "Once upon a time...",
  CREATE_TITLE : "My new title",
  CREATE_URL : "https://",

  FORGOT_CONFIRM : "Do you confirm sending a new password ?",
  FORGOT_SUBJECT : "New Password",
  FORGOT_TEXT : "This is your new Password, keep it safe : ",

  LABEL_ALT : "Fill the alternative text",
  LABEL_CATEGORY : "Choose the most appropriate category",
  LABEL_DESCRIPTION : "Fill the description",
  LABEL_IMAGE : "Provide an image",
  LABEL_NAME : "Fill the name",
  LABEL_OPTIONS : "Fill the options",
  LABEL_PRICE : "Fill the price",
  LABEL_SCORE : "Fill the score",
  LABEL_TEXT : "Fill the text",
  LABEL_TITLE : "Fill the title",

  PRICE_CURRENCY : "EUR",

  ARTICLE_IMG : "An image of the article must be uploaded !",
  PRODUCT_IMG : "An image of the product must be uploaded !",

  ROLES_USER : [
    "admin",
    "editor",
    "user"
  ],

  UPDATE_ALT : "Update the alternative text",
  UPDATE_CATEGORY : "Update the category",
  UPDATE_DESCRIPTION : "Update the description",
  UPDATE_EMAIL : "Update the email",
  UPDATE_IMAGE : "Update the image",
  UPDATE_NAME : "Update the name",
  UPDATE_OPTIONS : "Update the options",
  UPDATE_PASSWORD : "Update the password",
  UPDATE_PRICE : "Update the price",
  UPDATE_ROLE : "Update the role",
  UPDATE_SCORE : "Update the score",
  UPDATE_STATUS : "Update the status",
  UPDATE_TEXT : "Update the text",
  UPDATE_TITLE : "Update the title",
  UPDATE_URL : "Update the URL"
}
