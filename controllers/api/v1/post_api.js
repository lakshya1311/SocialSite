const User = require('../../../models/user');
const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index= async function(req,res){
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

    return res.json(200,{
        message:"List of posts",
        posts:posts
    })
}
catch(err){
    console.log('Internal Server Error', err);
    return res.json(500,{
        message:"Internal Server Error"
    })
    // req.flash('error',err);
    return;
}
}

module.exports.destroy = async function(req,res){
    try{
    let post = await Post.findById(req.params.id);
        //.id means converting the id into String
        // if(post.user==req.user.id){
            post.remove();
            await Comment.deleteMany({ post : req.params.id});
            return res.json(200, {
                message:"Post and related Data Deleted"
            })
    }
    catch(err){
        console.log("Error" , err);
        return;
        }
    }