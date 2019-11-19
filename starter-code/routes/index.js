const express = require("express");
const router = express.Router();
const {
  signupGet,
  signupPost,
  loginGet,
  privateGet
} = require("../controllers/auth.controlers");
const {
  isLoggedIn,
  isNotLoggedIn,
  checkRole
} = require("../middlewares/auth.middleware");
const passport = require("../config/passport");

router.get("/", (req, res, next) => res.render("index"));

// SIGNUP
router.get("/signup", signupGet);
router.post("/signup", signupPost);

// LOGIN
router.get("/login", isNotLoggedIn, loginGet);

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login");
    }
    req.logIn(user, err => {
      if (err) {
        return next(err);
      }
    });
  })(req, res, next);
});

// router.get("/private", isLoggedIn, privateGet);


// router.get("/private", isLoggedIn, checkRole("USER"), (req, res, next) => {
//   res.send("Bienvenido");
// });