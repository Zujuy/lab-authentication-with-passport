require("dotenv").config();

const User = require("../models/User");

exports.signupGet = (_, res) => res.render("passport/signup");

exports.signupPost = (req, res, next) => {
  const { name, email, password, passwordrepeat, role } = req.body; 
  if (password !== passwordrepeat) {
    return res.render("passport/signup", {
      msg: "Passwords must be the same"
    });
  }
  
  User.register({ name, email, role }, password)
    .then(user => res.redirect("/login"))
    .catch(err => {
      if (err.name === "UserExistsError") {
        return res.render("passport/signup", {
          msg: "Ya existe un registro con ese e-mail"
        });
      }
    });
};

exports.loginGet = async (req, res) => {
  await res.render("passport/login");
};

exports.privateGet = (req, res) => {
  res.render("passport/private", { user: req.user });
};
