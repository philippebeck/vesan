"use strict";
/* eslint-disable */

export default {
  /******************** CONFIG ********************/

  API_URL : "http://localhost:3000",
  UI_URL : "http://localhost:8080",

  CAT_ARTICLE : "Informations",
  CAT_LINK : "HTML5",
  CAT_PRODUCT : "Maison",

  CONTENT_TYPE : "multipart/form-data", 

  CURRENCY_ISO : "EUR",
  CURRENCY_SYMBOL : "€",

  ERROR_ALT : "Erreur 404",

  HOME_ALT : "Home image",
  HOME_LOOP : true,
  HOME_MEDIA : "slider",
  HOME_SRC : "/video/home.mp4",
  HOME_WIDTH : 500,

  LANG : "fr",

  LOGO_ALT : "Logo",
  LOGO_SRC : "/img/logo.svg",
  LOGO_WIDTH : "30",

  NUM_MAX : 5,
  NUM_MIN : 0,

  ORDER_STATUS : "En attente",

  PASS_INT : 1,
  PASS_MAX : 50,
  PASS_MIN : 8,

  PAYPAL_COLOR : "blue",
  PAYPAL_ID : "{votre-paypal-id}",
  PAYPAL_LABEL : "paypal",
  PAYPAL_NAMESPACE : "paypal_sdk",
  PAYPAL_SHAPE : "pill",

  PRICE_MAX : 5000,
  PRICE_MIN : 1,

  RECAPTCHA_KEY : "{votre-recaptcha-key}",

  SLIDER_DELAY : 5000,
  SLIDER_FA : "brands",

  STRING_MAX : 50,
  STRING_MIN : 2,

  TEXT_MAX : 5000,
  TEXT_MIN : 8,

  TINY_KEY : "{votre-tiny-key}",

  TOKEN : JSON.parse(localStorage.getItem("userToken")),

  TW_ID : "",

  URL_MAX : 100,
  URL_MIN : 5,

  USER_ID : JSON.parse(localStorage.getItem("userId")),

  /******************** NAV ********************/

  NAV_MAIN : [
    {
      "href": "/home",
      "name": "Accueil",
      "type": "solid",
      "icon": "laptop-house"
    },
    {
      "href": "/shop",
      "name": "Boutique",
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
      "href": "/contact",
      "name": "Contact",
      "type": "brands",
      "icon": "at"
    },
    {
      "href": "/basket",
      "name": "Panier",
      "type": "solid",
      "icon": "basket-shopping"
    }
  ],

  NAV_ADMIN : [
    "admin", 
    "profile", 
    "logout"
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

  HOME_CONTENT : [
    "Vue-Elt pour les Composants",
    "Servidio pour les Services Frontend",
    "Animadio pour le Design",
    "NemJS pour les Middlewares Backend"
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

  HEAD : "",
  HEAD_ADMIN : "Admin",
  HEAD_ARTICLE : "Éditeur d'article",
  HEAD_BASKET : "Panier",
  HEAD_BLOG : "Blog",
  HEAD_CONTACT : "Contact",
  HEAD_HOME : "Accueil",
  HEAD_LEGAL : "Conditions générales",
  HEAD_LINK : "Liens",
  HEAD_LOGIN : "Connexion",
  HEAD_PRODUCT : "Éditeur de service",
  HEAD_PROFILE : "Profil",
  HEAD_SHOP : "Services",

  /******************** META DESCRIPTION ********************/

  META_ADMIN : "Administration",
  META_ARTICLE : "Éditer un article du blog",
  META_BASKET : "Panier de services en ligne",
  META_BLOG : "Blog pour ...",
  META_CONTACT : "Contactez-moi pour toute question",
  META_HOME : "Bienvenue sur le site Web de ...",
  META_LEGAL : "Conditions générales d'utilisation",
  META_LINK : "Liens pour ...",
  META_LOGIN : "Connexion & inscription",
  META_PRODUCT : "Éditer un service du shop",
  META_PROFILE : "Gestion de son profil & de ses commandes",
  META_SHOP : "Services de ...",

  /******************** TITLES ********************/

  // PRIVATE VIEWS
  ADMIN_EDITOR : "Admin",
  PROFILE_EDITOR : "Compte",
  PROFILE_SUB : "Profil",
  ORDERS_SUB : "Commandes",
  EDITOR : "Éditeur",
  // PUBLIC VIEWS
  BASKET_VIEW : "Panier",
  BASKET_SUB : "Vos produits",
  BLOG_VIEW : "Blog",
  CONTACT_VIEW : "Contact",
  CONTACT_SUB : "Envoyez-moi un message",
  ERROR_VIEW : "Erreur",
  HOME_VIEW : "Vesan",
  HOME_SUB : "CMS avec Vue-Elt, Servidio, Animadio & Nemjs",
  LEGAL_VIEW : "Licence Apache",
  LEGAL_SUB : "TERMS & CONDITIONS FOR USE, REPRODUCTION & DISTRIBUTION",
  LOGIN_VIEW : "Connexion",
  LINK_VIEW : "Liens",
  LINK_SUB : "Liens pour développeurs",
  SHOP_VIEW : "Services",
  // CONNECTOR COMPONENTS
  FORGOT_PASS : "Mot de passe oublié",
  SIGN_IN : "Entrée",
  SIGN_UP : "Inscription",
  // CREATOR COMPONENTS
  ARTICLE_CREATOR : "Créer un article",
  COMMENT_CREATOR : "Créer un commentaire",
  LINK_CREATOR : "Créer un lien",
  PRODUCT_CREATOR : "Créer un service",
  REVIEW_CREATOR : "Créer un avis",
  // LIST COMPONENTS
  COMMENT_LIST : "Liste des commentaires",
  REVIEW_LIST : "Liste des avis",
  // MANAGER COMPONENTS
  ARTICLE_MANAGER : "Gestionnaire d'articles",
  COMMENT_MANAGER : "Gestionnaire de commentaires",
  LINK_MANAGER : "Gestionnaire de liens",
  ORDER_MANAGER : "Gestionnaire de commandes",
  PRODUCT_MANAGER : "Gestionnaire de services",
  REVIEW_MANAGER : "Gestionnaire d'avis",
  USER_MANAGER : "Gestionnaire d'utilisateurs",
  // OTHERS
  ADMIN_USERS : "Utilisateurs",

  /******************** INTRO ********************/

  INTRO_ADMIN : "Gérez toutes les données !",
  INTRO_ARTICLE : "Articles à lire prochainement !",
  INTRO_ARTICLES : "Gérer les articles",
  INTRO_BASKET : "Paiements sécurisés par PayPal",
  INTRO_COMMENTS : "Gérer les commentaires",
  INTRO_CONTACT : "Pour toute question, demande de devis personnalisé ou soucis technique",
  INTRO_ERROR : "Page non trouvée !",
  INTRO_FORGOT : "Besoin d'un nouveau mot de passe ?",
  INTRO_HOME : "100% online !",
  INTRO_LEGAL : "Version 2.0, Janvier 2004",
  INTRO_LINK : "Soyez curieux !",
  INTRO_LINKS : "Gérer les liens",
  INTRO_ORDERS : "Gérer les commandes",
  INTRO_PRODUCT : "siren 837 516 855",
  INTRO_PRODUCTS : "Gérer les produits",
  INTRO_PROFILE : "Gérer vos informations personnelles",
  INTRO_REVIEWS : "Gérer les avis",
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
  LABEL_NAME : "Ecrivez un nom",
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
  CONTENT_SIGNUP : "S'inscrire",
  CONTENT_UPDATE : "Mettre à jour ",

  /******************** TITLE ********************/

  TITLE_ADMIN : "Admin",
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
  TITLE_LOGIN : "Connexion",
  TITLE_LOGOUT : "Déconnexion",
  TITLE_MESSAGE : "Envoyer un message",
  TITLE_READ : "Lire ",
  TITLE_REVIEW_FIRST : "Soyez le premier à rédiger un avis sur ",
  TITLE_REVIEW_MODERATE : "Modérer l'avis #",
  TITLE_REVIEW_READ : "Lire des avis sur ",
  TITLE_SIGNIN : "Se connecter à son compte",
  TITLE_SIGNUP : "S'inscrire comme nouvel utilisateur",
  TITLE_UPDATE : "Mettre à jour ",
  TITLE_TOGGLE : "Basculer",
  TITLE_TOP : "Remonter",
  TITLE_WATCH : "Regarder ",

  /******************** ALERT ********************/

  ALERT_BASKET_ADDED : " a été ajouté au panier !",
  ALERT_COMMENT : "Commentaire #",
  ALERT_CREATED : " créé !",
  ALERT_DELETED : " supprimé !",
  ALERT_DISLIKED : " pas aimé !",
  ALERT_HOME : "Retour à l'accueil !",
  ALERT_IMG : "Une image doit être téléchargée !",
  ALERT_LIKED : " aimé !",
  ALERT_MODERATED : " modéré !",
  ALERT_NEW_COMMENT : "Nouveau commentaire créé !",
  ALERT_NEW_REVIEW : "Nouvel avis créé !",
  ALERT_OPTION : "Vous devez choisir une option !",
  ALERT_ORDER : "Commande #",
  ALERT_ORDER_CREATED : "Commande créée !",
  ALERT_REVIEW : "Avis #",
  ALERT_SENDED : " envoyé !",
  ALERT_UPDATED : " mis à jour !",
  // SERVIDIO
  CHECK_EMAIL : "Votre email n'est pas une adresse valide.",
  CHECK_NUMBER : "Le nombre doit être compris entre ",
  CHECK_PASS : "Votre mot de passe doit comporter entre 8 et 50 caractères, avec des majuscules, des minuscules, 1 chiffre minimum et aucun espace.",
  CHECK_STRING : "Le nombre de caractères doit être compris entre ",
  CHECK_URL : "Cette URL n'est pas un chemin valide.",

  /******************** CONFIRM ********************/

  CONFIRM_BASKET : "Voulez-vous vider votre panier ?",
  CONFIRM_FORGOT : `Confirmez-vous l'envoi d'un nouveau mot de passe ?`,

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
  EDIT : "Éditer",
  ERROR_LINK : "Retourner à l'accueil ?",
  HEAD_MOD : "mod/del",
  HEAD_UP : "up/del",
  ON : "le",
  PROFILE_OF : "Profil de ",
  RELEASE_ON : "Sortie le ",
  TOTAL : "Total",
  UPDATE_ON : "Mis à jour le ",

  /******************** OTHER ********************/

  FORGOT_SUBJECT : "Nouveau mot de passe",
  FORGOT_TEXT : "Ceci est votre nouveau mot de passe, gardez-le en sécurité : ",
  LEGAL_LINK : "https://www.apache.org/licenses",
  LEGAL_CONTENT : "1. Definitions. \n\n 'License' shall mean the terms & conditions for use, reproduction, & distribution as defined by Sections 1 through 9 of this document. \n\n 'Licensor' shall mean the copyright owner or entity authorized by the copyright owner that is granting the License. \n\n 'Legal Entity' shall mean the union of the acting entity & all other entities that control, are controlled by, or are under common control with that entity. For the purposes of this definition, 'control' means (i) the power, direct or indirect, to cause the direction or management of such entity, whether by contract or otherwise, or (ii) ownership of fifty percent (50%) or more of the outstanding shares, or (iii) beneficial ownership of such entity. \n\n 'You' (or 'Your') shall mean an individual or Legal Entity exercising permissions granted by this License. \n\n 'Source' form shall mean the preferred form for making modifications, including but not limited to software source code, documentation source, & configuration files. \n\n 'Object' form shall mean any form resulting from mechanical transformation or translation of a Source form, including but not limited to compiled object code, generated documentation, & conversions to other media types. \n\n 'Work' shall mean the work of authorship, whether in Source or Object form, made available under the License, as indicated by a copyright notice that is included in or attached to the work (an example is provided in the Appendix below). \n\n 'Derivative Works' shall mean any work, whether in Source or Object form, that is based on (or derived from) the Work & for which the editorial revisions, annotations, elaborations, or other modifications represent, as a whole, an original work of authorship. For the purposes of this License, Derivative Works shall not include works that remain separable from, or merely link (or bind by name) to the interfaces of, the Work & Derivative Works thereof. \n\n 'Contribution' shall mean any work of authorship, including the original version of the Work & any modifications or additions to that Work or Derivative Works thereof, that is intentionally submitted to Licensor for inclusion in the Work by the copyright owner or by an individual or Legal Entity authorized to submit on behalf of the copyright owner. For the purposes of this definition, 'submitted' means any form of electronic, verbal, or written communication sent to the Licensor or its representatives, including but not limited to communication on electronic mailing lists, source code control systems, & issue tracking systems that are managed by, or on behalf of, the Licensor for the purpose of discussing & improving the Work, but excluding communication that is conspicuously marked or otherwise designated in writing by the copyright owner as 'Not a Contribution.' \n\n 'Contributor' shall mean Licensor & any individual or Legal Entity on behalf of whom a Contribution has been received by Licensor & subsequently incorporated within the Work. \n\n 2. Grant of Copyright License. Subject to the terms & conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable copyright license to reproduce, prepare Derivative Works of, publicly display, publicly perform, sublicense, & distribute the Work & such Derivative Works in Source or Object form. \n\n 3. Grant of Patent License. Subject to the terms & conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable (except as stated in this section) patent license to make, have made, use, offer to sell, sell, import, & otherwise transfer the Work, where such license applies only to those patent claims licensable by such Contributor that are necessarily infringed by their Contribution(s) alone or by combination of their Contribution(s) with the Work to which such Contribution(s) was submitted. If You institute patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Work or a Contribution incorporated within the Work constitutes direct or contributory patent infringement, then any patent licenses granted to You under this License for that Work shall terminate as of the date such litigation is filed. \n\n 4. Redistribution. You may reproduce & distribute copies of the Work or Derivative Works thereof in any medium, with or without modifications, & in Source or Object form, provided that You meet the following conditions: \n\n (a) You must give any other recipients of the Work or Derivative Works a copy of this License; & \n\n (b) You must cause any modified files to carry prominent notices stating that You changed the files; & \n\n (c) You must retain, in the Source form of any Derivative Works that You distribute, all copyright, patent, trademark, & attribution notices from the Source form of the Work, excluding those notices that do not pertain to any part of the Derivative Works; & \n\n (d) If the Work includes a 'NOTICE' text file as part of its distribution, then any Derivative Works that You distribute must include a readable copy of the attribution notices contained within such NOTICE file, excluding those notices that do not pertain to any part of the Derivative Works, in at least one of the following places: within a NOTICE text file distributed as part of the Derivative Works; within the Source form or documentation, if provided along with the Derivative Works; or, within a display generated by the Derivative Works, if & wherever such third-party notices normally appear. The contents of the NOTICE file are for informational purposes only & do not modify the License. You may add Your own attribution notices within Derivative Works that You distribute, alongside or as an addendum to the NOTICE text from the Work, provided that such additional attribution notices cannot be construed as modifying the License. \n\n You may add Your own copyright statement to Your modifications & may provide additional or different license terms & conditions for use, reproduction, or distribution of Your modifications, or for any such Derivative Works as a whole, provided Your use, reproduction, & distribution of the Work otherwise complies with the conditions stated in this License. \n\n 5. Submission of Contributions. Unless You explicitly state otherwise, any Contribution intentionally submitted for inclusion in the Work by You to the Licensor shall be under the terms & conditions of this License, without any additional terms or conditions. Notwithstanding the above, nothing herein shall supersede or modify the terms of any separate license agreement you may have executed with Licensor regarding such Contributions. \n\n 6. Trademarks. This License does not grant permission to use the trade names, trademarks, service marks, or product names of the Licensor, except as required for reasonable & customary use in describing the origin of the Work & reproducing the content of the NOTICE file. \n\n 7. Disclaimer of Warranty. Unless required by applicable law or agreed to in writing, Licensor provides the Work (& each Contributor provides its Contributions) on an 'AS IS' BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied, including, without limitation, any warranties or conditions of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A PARTICULAR PURPOSE. You are solely responsible for determining the appropriateness of using or redistributing the Work & assume any risks associated with Your exercise of permissions under this License. \n\n 8. Limitation of Liability. In no event & under no legal theory, whether in tort (including negligence), contract, or otherwise, unless required by applicable law (such as deliberate & grossly negligent acts) or agreed to in writing, shall any Contributor be liable to You for damages, including any direct, indirect, special, incidental, or consequential damages of any character arising as a result of this License or out of the use or inability to use the Work (including but not limited to damages for loss of goodwill, work stoppage, computer failure or malfunction, or any & all  other commercial damages or losses), even if such Contributor has been advised of the possibility of such damages. \n\n 9. Accepting Warranty or Additional Liability. While redistributing the Work or Derivative Works thereof, You may choose to offer, & charge a fee for, acceptance of support, warranty, indemnity, or other liability obligations &/or rights consistent with this License. However, in accepting such obligations, You may act only on Your own behalf & on Your sole responsibility, not on behalf of any other Contributor, & only if You agree to indemnify, defend, & hold each Contributor harmless for any liability incurred by, or claims asserted against, such Contributor by reason of your accepting any such warranty or additional liability. \n\n END OF TERMS AND CONDITIONS \n\n APPENDIX: How to apply the Apache License to your work. \n\n To apply the Apache License to your work, attach the following boilerplate notice, with the fields enclosed by brackets '{}' replaced with your own identifying information. (Don't include the brackets!)  The text should be enclosed in the appropriate comment syntax for the file format. We also recommend that a file or class name & description of purpose be included on the same 'printed page' as the copyright notice for easier identification within third-party archives. \n\n Copyright 2023 Philippe Beck \n\n Licensed under the Apache License, Version 2.0 (the 'License'); you may not use this file except in compliance with the License. You may obtain a copy of the License at \n\n https://www.apache.org/licenses/LICENSE-2.0 \n\n Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions & limitations under the License."
}
