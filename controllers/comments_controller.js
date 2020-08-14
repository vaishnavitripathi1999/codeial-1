const Comment  = require("../models/comment")
const Post = require("../models/post")

module.exports.create = function(req, res){
    Post.findById(req.body.post, function(erroe, post){

        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(error, comment){
                if(error){

                    console.log("error in commenting on the Post");
                }else{
                    console.log('comment',comment);
                }

                post.comments.push(comment) ;
                post.save();

                res.redirect("/")
            })
        }
    })
}

module.exports.destroy = function(req, res){
    Comment.findById(req.params.id, function(error, comment){
        if(comment.user == req.user.id){

            let postId = comment.post;
            comment.remove() ;

            Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, function(error, post){
                return res.redirect("back");
            })
        }else{
            return res.redirect("back");
        }
    })
}