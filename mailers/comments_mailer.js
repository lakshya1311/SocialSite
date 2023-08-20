const nodeMailer=require('../config/nodemailer');

//another way to export item 

exports.newComment = (comment)=>{
    nodeMailer.transporter.sendMail({
        from:'kuchbhi@131197@gmail.com',
        to:'luv.lakshya@gmail.com',
        subject:"Your nes comment has been published",
        html:"<h1>Your comment has been added to the post</h1>"
    },(err,info)=>{
        if(err)
        {
            console.log("Error in sending mail");
        }
        console.log("Message Sent");
        return;
        });  
    }
