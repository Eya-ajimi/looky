const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require("../utils/errors.utils");
const fs=require("fs")


//--------------------------- crud of the post----------------------------------------

 // read post
module.exports.readPost = (req, res) => {
    PostModel.find((err, docs) => {
      if (!err) res.send(docs);
      else console.log("Error to get data : " + err);
    }).sort({ createdAt: -1 });
  };
  
  // create post
module.exports.createPost = async (req, res) => {
    // let fileName;
    // console.log("1",req.file)

    // if (req.file !== null) {
    //   try { 
    //     if (
    //       req.file.detectedMimeType != "image/jpg" &&
    //       req.file.detectedMimeType != "image/png" &&
    //       req.file.detectedMimeType != "image/jpeg"
    //     )
    //       throw Error("invalid file");
    //       console.log("2",req.file.size)
    //     if (req.file.size > 500000) throw Error("max size");
    //   } catch (err) {
    //     const errors = uploadErrors(err);
    //     return res.status(201).json({ errors });
    //   }
    //   fileName = req.body.posterId + Date.now() + ".jpg";
  
    //   await pipeline(
    //     req.file.stream,
    //     fs.createWriteStream(
    //       `${__dirname}/../client/public/uploads/posts/${fileName}`
    //     )
    //   );
    // }
  
    const newPost = new PostModel({
      posterId: req.body.posterId,
      message: req.body.message,
       picture: req.body.picture ,
      video: req.body.video,
      likers: [],
      comments: [],
    });
  
    try {
      const user=await UserModel.findOne({_id:newPost.posterId})
        console.log("1",user.pseudo)
        newPost.pseudo=user.pseudo
        console.log("2",newPost)
      const post = await newPost.save();
      return res.status(208).json({post,user});
    } catch (err) {
      return res.status(407).send(err);
    }
  }; 
  
  //update post 
  module.exports.updatePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    const updatedRecord = {
      message: req.body.message,
    };
  
    PostModel.findByIdAndUpdate(
      req.params.id,
      { $set: updatedRecord },
      { new: true },
      (err, docs) => {
        console.log("msg1",err)
         console.log("msg2",docs)
        if (!err) res.send(docs);
        else console.log("Update error : " + err);
      }
    );
  };  
  //delete post
  
  module.exports.deletePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Delete error : " + err);
    });
  };

  //------------------------------ like and unlike post ----------------------------



 //like post 

  module.exports.likePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    try {
      await PostModel.findByIdAndUpdate(
        req.params.id,
        {
          $addToSet: { likers: req.body.id },
        },
        { new: true },
        (err, docs) => {
          if (err) return res.status(400).send(err);
        }
      );
      await UserModel.findByIdAndUpdate(
        req.body.id,
        {
          $addToSet: { likes: req.params.id },
        },
        { new: true },
        (err, docs) => {
          if (!err) res.send(docs);
          else return res.status(400).send(err);
        }
      );
    } catch (err) {
      return res.status(400).send(err);
    }
  };

  //unlike post 
  
  module.exports.unlikePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    try {
      await PostModel.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { likers: req.body.id },
        },
        { new: true },
        (err, docs) => {
          if (err) return res.status(400).send(err);
        }
      );
      await UserModel.findByIdAndUpdate(
        req.body.id,
        {
          $pull: { likes: req.params.id },
        },
        { new: true },
        (err, docs) => {
          if (!err) res.send(docs);
          else return res.status(400).send(err);
        }
      );
    } catch (err) {
      return res.status(400).send(err);
    }
  };

  // ----------------------- commentes----------------------

  // read comment
  module.exports.commentPost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    try {
      
      const p=await PostModel.findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            comments: {
              commenterId: req.body.commenterId,
              commenterPseudo: req.body.commenterPseudo,
              text: req.body.text,
              timestamp: new Date().getTime(),
            },
          },
        })
        console.log(p)
      //   ,
      //   { new: true },
      //   (err, docs) => {
      //     if (!err) return res.send(docs);
      //     else return res.status(400).send(err);
      //   }
      // );
      res.send(p)
    } catch (err) {
      return res.status(400).send(err);
    }
  };
  

  // edit comment
  //cant find the comment
  
  module.exports.editCommentPost =  (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    try {
        console.log("60d3ad6e0f0f160ab479c818")
      return PostModel.findById(req.params.id, (err, docs) => {
        const theComment = docs.comments.find((comment) =>
          comment._id.equals(req.body.commentId)
        );
  
        if (!theComment) return res.status(404).send("Comment not found");
        theComment.text = req.body.text;
  
         docs.save((err) => {
          if (!err) return res.status(200).send(docs);
          return res.status(500).send(err);
        });
      });
    } catch (err) {
      return res.status(408).send(err);
    }
  };
  

//   // delete comment


  module.exports.deleteCommentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    try {
      return PostModel.findByIdAndUpdate(
        req.params.id,
        {
          $pull: {
            comments: {
              _id: req.body.commentId,
            },
          },
        },
        // { new: true },
        (err, docs) => {
          if (!err) return res.send(docs);
          else return res.status(400).send(err);
        }
      );
    } catch (err) {
      return res.status(400).send(err);
    }
  };