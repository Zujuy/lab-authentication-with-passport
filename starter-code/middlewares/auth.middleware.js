exports.isLoggedIn = (req, res, next) => {
   
    req.isAuthenticated() ? next() : res.redirect("/private");
  };
  
  exports.isNotLoggedIn = (req, res, next) => {
    !req.isAuthenticated() ? next() : res.redirect("/login");
  };
  
  exports.checkRole = role => (req, res, next) => {
    if (req.user.role === role) {
      return next();
    } else {
      return res.send("No autorizado para acceder");
    }
  };