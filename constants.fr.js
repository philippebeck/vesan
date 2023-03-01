"use strict";
/* eslint-disable */

export default {
  /******************** CONFIG ********************/

  API_URL : "http://localhost:3000",

  CAT_ARTICLE : "Informations",
  CAT_LINK : "HTML5",
  CAT_PRODUCT : "Maison",

  CONTENT_TYPE : "multipart/form-data", 

  CURRENCY_ISO : "EUR",
  CURRENCY_SYMBOL : "€",

  ERROR_ALT : "Erreur 404",

  LOGO_ALT : "Logo",
  LOGO_SRC : "/img/logo.svg",

  NAME_MIN : 2,
  NAME_MAX : 50,

  PASS_INT : 1,
  PASS_MAX : 50,
  PASS_MIN : 8,

  PAYPAL_COLOR : "blue",
  PAYPAL_ID : "{votre-paypal-id}",
  PAYPAL_LABEL : "paypal",
  PAYPAL_NAMESPACE : "paypal_sdk",
  PAYPAL_SHAPE : "pill",

  RECAPTCHA_KEY : "{votre-recaptcha-key}",

  SLIDER_DELAY : 5000,
  SLIDER_FA : "brands",

  TEXT_MIN : 8,
  TEXT_MAX : 5000,

  TINY_KEY : "{votre-tiny-key}",

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
      "color": "blue"
    }, 
    {
      "href": "https://medium.com/@philippebeck",
      "title": "Philippe Beck @Medium",
      "fa": "medium",
      "color": "green"
    }, 
    {
      "href": "https://www.npmjs.com/~philippebeck",
      "title": "Philippe Beck @NPM",
      "fa": "npm",
      "color": "red"
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

  FOOT_TITLE1 : "Sites",
  FOOT_TITLE2 : "Outils",
  FOOT_TITLE3 : "Liens",

  FOOT1 : [
    {
      "href": "https://asperger.philippebeck.net",
      "title": "Tests for Asperger's Syndrome",
      "content": "Asperger"
    }, 
    {
      "href": "https://astronomy.philippebeck.net",
      "title": "NASA & CDS APIs",
      "content": "AStronomy"
    }, 
    {
      "href": "https://philippebeck.net",
      "title": "Portal",
      "content": "Philippe Beck"
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

  FOOT3 : [
    {
      "href": "/link",
      "title": "Find links for coding",
      "content": "Links for Dev"
    }, 
    {
      "href": "/legal",
      "title": "Read the legal notice",
      "content": "Legal Notice"
    }, 
    {
      "href": "https://paypal.me/philippebeck",
      "title": "Donation @Philippe Beck",
      "content": "Donation"
    }, 
    {
      "href": "https://github.com/sponsors/philippebeck",
      "title": "Sponsor @Philippe Beck",
      "content": "Sponsor"
    }
  ],

  /******************** CATEGORIES ********************/

  CATS_ARTICLE : [
    "Transport",
    "Entreprise", 
    "Culture",
    "Mode",
    "Alimentation",
    "Santé",
    "Informations",
    "Politique",
    "Science",
    "Sports",
    "Technologie", 
    "Voyage"
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
    "En attente",
    "Payée",
    "Faite",
    "Annulée"
  ],

  CATS_PRODUCT : [
    "Beauté",
    "Electronic",
    "Mode",
    "Almentation",
    "Meubles",
    "Jeux",
    "Santé",
    "Maison",
    "Industriel",
    "Media",
    "Animaux",
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

  HOME_CONTENT : [
    "Vue-Elt pour les Composants",
    "Servidio pour les Services Frontend",
    "Animadio pour le Design",
    "NemJS pour les Middlewares Backend"
  ],

  /******************** TITLES ********************/

  // PRIVATE VIEWS
  ADMIN_VIEW : "Admin",
  PROFILE_VIEW : "Profil",
  // PUBLIC VIEWS
  BASKET_VIEW : "Panier",
  BLOG_VIEW : "Blog",
  CONTACT_VIEW : "Contact",
  ERROR_VIEW : "Erreur",
  HOME_VIEW : "Vesan",
  LEGAL_VIEW : "Licence Apache",
  LINK_VIEW : "Liens",
  SHOP_VIEW : "Boutique",
  // CONNECTOR COMPONENTS
  FORGOT_PASS : "Mot de passe oublié",
  SIGN_IN : "Connexion",
  SIGN_UP : "Inscription",
  // CREATOR COMPONENTS
  ARTICLE_CREATOR : "Créer un article",
  COMMENT_CREATOR : "Créer un commentaire",
  LINK_CREATOR : "Créer un lien",
  PRODUCT_CREATOR : "Créer un produit",
  REVIEW_CREATOR : "Créer un avis",
  // LIST COMPONENTS
  COMMENT_LIST : "Liste des commentaires",
  REVIEW_LIST : "Liste des avis",
  // MANAGER COMPONENTS
  ARTICLE_MANAGER : "Gestionnaire d'articles",
  COMMENT_MANAGER : "Gestionnaire de commentaires",
  LINK_MANAGER : "Gestionnaire de liens",
  ORDER_MANAGER : "Gestionnaire de commandes",
  PRODUCT_MANAGER : "Gestionnaire de produits",
  REVIEW_MANAGER : "Gestionnaire d'avis",
  USER_MANAGER : "Gestionnaire d'utilisateurs",
  // OTHERS
  PROFILE_ORDERS : "Vos commandes",
  ADMIN_USERS : "Utilisateurs",

  /******************** INTRO ********************/

  INTRO_ADMIN : "Gérez toutes les données !",
  INTRO_ARTICLES : "Articles à lire !",
  INTRO_BASKET : "Utilisez le bouton Paypal pour commander",
  INTRO_BLOG : "Gérer les articles et les commentaires",
  INTRO_CONTACT : "Contactez-moi si vous avez des questions",
  INTRO_ERROR : "Page non trouvée !",
  INTRO_FORGOT : "Besoin d'un nouveau mot de passe ?",
  INTRO_HOME : "CMS avec Vue-Elt, Servidio, Animadio & NemJS",
  INTRO_LEGAL : "Version 2.0, Janvier 2004",
  INTRO_LINK : "Liens pour dev !",
  INTRO_LINKS : "Gérer les liens",
  INTRO_PRODUCTS : "Produits à acheter !",
  INTRO_PROFILE : "Gérez votre profil & vos commandes",
  INTRO_SHOP : "Gérer les produits, les avis et les commandes",
  INTRO_SIGNIN : "Connectez-vous à votre compte !",
  INTRO_SIGNUP : "Inscrivez-vous pour commenter et écrire vos avis !",
  INTRO_USERS : "Gérer les utilisateurs",

  /******************** INFO ********************/

  INFO_ALT : "Texte alternatif",
  INFO_CATEGORY : "Choisissez une catégorie",
  INFO_EMAIL : "john@doe.com",
  INFO_IMAGE : "Fichier image uniquement",
  INFO_NAME : "Mon nouveau nom",
  INFO_OPTION : "Choisissez une option",
  INFO_OPTIONS : "option-1,option-2,option-3,etc",
  INFO_PASSWORD : "********",
  INFO_PRICE : "100 €",
  INFO_QUANTITY : "Choisissez une quantité",
  INFO_SCORE : "From 0 to 5",
  INFO_SUBJECT : "Le sujet de votre message ?",
  INFO_TEXT : "Il était une fois...",
  INFO_URL : "https://",
  INFO_UP_ALT : "Mettre à jour le texte alternatif",
  INFO_UP_CATEGORY : "Mettre à jour la catégorie",
  INFO_UP_COMMENT : "Mettre à jour le commentaire #",
  INFO_UP_DESCRIPTION : "Mettre à jour la description",
  INFO_UP_EMAIL : "Mettre à jour l'email",
  INFO_UP_IMAGE : "Mettre à jour l'image",
  INFO_UP_MODERATE : "Mettre à jour la modération",
  INFO_UP_NAME : "Mettre à jour le nom",
  INFO_UP_OPTIONS : "Mettre à jour les options",
  INFO_UP_PRICE : "Mettre à jour le prix",
  INFO_UP_PROFILE : "Mettre à jour le profil",
  INFO_UP_QUANTITY : "Mettre à jour la quantité",
  INFO_UP_ORDER : "Mettre à jour le statut de la commande #",
  INFO_UP_REVIEW : "Mettre à jour l'avis #",
  INFO_UP_ROLE : "Mettre à jour le role",
  INFO_UP_SCORE : "Mettre à jour le score",
  INFO_UP_STATUS : "Mettre à jour le statut",
  INFO_UP_TEXT : "Mettre à jour le texte",
  INFO_UP_URL : "Mettre à jour l'URL",

  /******************** LEGEND ********************/

  LEGEND_ALT : "Alt",
  LEGEND_CATEGORY : "Catégorie",
  LEGEND_DESCRIPTION : "Description",
  LEGEND_EMAIL : "Email",
  LEGEND_IMAGE : "Image",
  LEGEND_NAME : "Nom",
  LEGEND_OPTION : "Option",
  LEGEND_OPTIONS : "Options",
  LEGEND_PASSWORD : "Mot de passe",
  LEGEND_PRICE : "Prix",
  LEGEND_QUANTITY : "Quantité",
  LEGEND_SCORE : "Score",
  LEGEND_SUBJECT : "Sujet",
  LEGEND_TEXT : "Texte",
  LEGEND_TITLE : "Titre",
  LEGEND_URL : "Url",

  /******************** LABEL ********************/
  
  LABEL_ALT : "Ecrivez le texte alternatif",
  LABEL_CATEGORY : "Choisissez la catégorie la plus appropriée",
  LABEL_DESCRIPTION : "Ecrivez la description",
  LABEL_EMAIL : "Ecrivez votre email",
  LABEL_IMAGE : "Fournissez une image",
  LABEL_NAME : "Ecrivez un name",
  LABEL_OPTION : "Indiquez l'option du produit",
  LABEL_OPTIONS : "Ecrivez les options",
  LABEL_PASSWORD : "8 à 50 caractères avec majuscule & minuscule, 1 nombre mini & pas d'espace",
  LABEL_PRICE : "Ecrivez le prix",
  LABEL_QUANTITY : "Indiquez la quantité du produit",
  LABEL_SCORE : "Ecrivez le score",
  LABEL_SUBJECT : "Ecrivez le sujet",
  LABEL_TEXT : "Ecrivez le texte",
  LABEL_TITLE : "Ecrivez le titre",
  LABEL_URL : "Ecrivez l'URL",

  /******************** CONTENT ********************/

  CONTENT_ADD : "Ajouter ",
  CONTENT_CLEAR : "Vider ",
  CONTENT_CREATE : "Créer ",
  CONTENT_ENTER : "Entrer ",
  CONTENT_ORDER : "Commande ",
  CONTENT_REVIEW_LOGIN : "Connectez-vous pour évaluer",
  CONTENT_REVIEW_WRITE : "Ecrivez un avis",
  CONTENT_SEND : "Envoyer ",

  /******************** TITLE ********************/

  TITLE_BASKET : "Connectez-vous pour commander ces produits",
  TITLE_CLEAR : "Vider le panier",
  TITLE_COMMENT_MODERATE : "Modérer le commentaire #",
  TITLE_DELETE : "Supprimer ",
  TITLE_DELETE_ACCOUNT : "Supprimer votre compte",
  TITLE_DELETE_COMMENT : "Supprimer le commentaire #",
  TITLE_DELETE_ORDER : "Supprimer la commande #",
  TITLE_DELETE_REVIEW : "Supprimer l'avis #",
  TITLE_DISLIKE : "Je n'aime plus ",
  TITLE_FORGOT : "Envoyer un nouveau mot de passe",
  TITLE_GO : "Aller à ",
  TITLE_LIKE : "J'aime ",
  TITLE_LIKE_LOGIN : "Connectez-vous pour liker ",
  TITLE_MESSAGE : "Envoyer un message",
  TITLE_READ : "Lire ",
  TITLE_REVIEW_FIRST : "Soyez le premier à rédiger un avis sur ",
  TITLE_REVIEW_MODERATE : "Modérer l'avis #",
  TITLE_REVIEW_READ : "Lire des avis sur ",
  TITLE_SIGNIN : "Connectez-vous à votre compte",
  TITLE_SIGNUP : "Inscrire un nouvel utilisateur",
  TITLE_UPDATE : "Mettre à jour ",
  TITLE_WATCH : "Regarder ",

  /******************** ALERT ********************/

  ALERT_AVAILABLE : " n'est pas disponible !",
  ALERT_BASKET_ADDED : " a été ajouté au panier !",
  ALERT_COMMENT : "Commentaire #",
  ALERT_CREATED : " créé !",
  ALERT_DELETED : " supprimé !",
  ALERT_DISLIKED : " pas aimé !",
  ALERT_FORGOT_EMAIL : "Cet email n'est pas référencé",
  ALERT_HOME : "Retournes à l'accueil !",
  ALERT_IMG : "Une image doit être téléchargée !",
  ALERT_LIKED : " aimé !",
  ALERT_MODERATED : " modéré !",
  ALERT_NEW_COMMENT : "Nouveau commentaire créé !",
  ALERT_NEW_REVIEW : "Nouvel avis créé !",
  ALERT_OPTION : "Vous devez choisir une option !",
  ALERT_ORDER : "Commande #",
  ALERT_ORDER_CREATED : "Commande créée !",
  ALERT_PRODUCT : "Vous avez déjà rédigé un avis sur ce produit, vous pouvez modifier votre ancien avis ou le supprimer",
  ALERT_REFERENCED : " est déjà référencé !",
  ALERT_REVIEW : "Avis #",
  ALERT_SENDED : " envoyé !",
  ALERT_UPDATED : " mis à jour !",
  // SERVIDIO
  CHECK_NAME : "Le nom doit avoir entre 2 et 50 caractères.",
  CHECK_EMAIL : "Votre email n'est pas une adresse valide.",
  CHECK_PASS : "Votre mot de passe doit comporter entre 8 et 50 caractères, avec des majuscules, des minuscules, 1 chiffre minimum et aucun espace.",
  CHECK_URL : "Cette URL n'est pas un chemin valide.",
  CHECK_TEXT : "Le texte doit avoir entre 8 et 5000 caractères.",

  /******************** CONFIRM ********************/

  CONFIRM_BASKET : "Voulez-vous vider votre panier ?",
  CONFIRM_FORGOT : `, confirmez-vous l'envoi d'un nouveau mot de passe ?`,

  /******************** PAYPAL ********************/

  PAYPAL_BTN : "Échec du rendu des boutons PayPal",
  PAYPAL_CANCEL : "Transaction annulée !",
  PAYPAL_ERROR : "Transaction invalide !",
  PAYPAL_SDK : "Échec du chargement du script PayPal JS SDK",
  PAYPAL_STATUS : "Statut de la transaction #",

  /******************** INTERPOLATION ********************/

  BASKET_EMPTY : "Votre panier est vide !",
  BASKET_TOTAL : "Le total de votre panier est de ",
  CREATE_BY : "Créé par ",
  ERROR_LINK : "Retourner à l'accueil ?",
  HEAD_MOD : "mod/supp",
  HEAD_UP : "maj/supp",
  ON : "le",
  PROFILE_OF : "Profil de ",
  RELEASE_ON : "Sortie le ",
  TOTAL : "Total",
  UPDATE_ON : "Mis à jour le ",

  /******************** OTHER ********************/

  FORGOT_SUBJECT : "Nouveau mot de passe",
  FORGOT_TEXT : "Ceci est votre nouveau mot de passe, gardez-le en sécurité : ",
}
