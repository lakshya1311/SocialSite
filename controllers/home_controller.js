const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = async function(req, res){
    try{
        // populate the user of each post
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
                }
        })
    
        let user = await User.find({});
            return res.render('home', {
                title:"Codeial | Home",
                posts:posts,
                all_users : user
            })
    }
    catch(err){
        console.log('Error', err);
        req.flash('error',err);
        return;
    }  
}

// console.log(req.cookies);
// res.cookie('user_id', 25);

// Post.find({}, function(err, posts){
//     return res.render('home', {
//         title: "Codeial | Home",
//         posts:  posts
//     });
// });
// module.exports.actionName = function(req, res){}