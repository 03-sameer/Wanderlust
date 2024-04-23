

module.exports.renderSignupForm =(req, res) => {
    res.render("users/signup.ejs");
};


module.exports.signup = async(req, res) => {
    try{
        let {usermame, email, password} = req.body;
    const newUser =  new User({email, username});
   const registeredUser  = await User.register(newUser, password);
   console.log(registeredUser);
   req.login(registeredUser, (err) =>{
    if(err){
        return next(err);
    }
    req.flash("success", "welcome to wanderlust");
    res.redirect("/listings");
   });
   
     
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}



module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
}

module.exports.login = async(req, res) =>{
    req.flash("welcome to wanderlust ! u r logedin");
    // this thing is used to check the trigger point of the redirecting to the samm page especially to the home page
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
    }

module.exports.logout =  (req, res, next) =>{
    req.logout((err) =>{
        if(err){
            next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/listings");
    })
}
