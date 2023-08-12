const User = require('../models/user');


module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err,user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user:user
        })
    })
}


// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = async function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    let user = await User.find({email: req.body.email});
        // if(err){console.log('error in finding user in signing up'); return}
        if (user){
            if(user.length==0){
                await User.create(req.body);
                return res.redirect('/users/sign-in');
            }
            return res.redirect('/users/sign-in');
        }else{
            return res.redirect('back');
        }
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success','Logged in sucessfully !');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success','Logged Out sucessfully !');
    return res.redirect('/');
}

//update profile details

module.exports.update=function(req,res){
    User.findByIdAndUpdate(req.params.id,{name:req.body.name ,email:req.body.email},function (err, user) {
        if (err){
            req.flash('error','Error in Updating Profile');
            console.log("Error in Updating Profile " + err);
            return;
        }
        else{
            req.flash('success','Profile Details Updated');
            console.log("Updated User : ", user);
            return res.redirect('/');
        }
        })
}