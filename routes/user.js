const express = require("express");
const router = express.Router();
const User = require("../Models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");

// controllers
const userController = require("../controllers/users.js");
const { renderSignupForm, renderLoginForm, login, logout } = require("../controllers/users.js");
// check controllers if not worked 


//render signup form
// signup
router.route("/signup")
.get(renderSignupForm)
.post(wrapAsync(userController.signup));

//render login form
//login
router.route("/login")
.get(renderLoginForm)
.post( saveRedirectUrl ,passport.authenticate("local", {failureRedirect: '/login', failureFlash:true }), login);


router.get("/logout",logout);

module.exports = router;
