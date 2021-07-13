 const UserModel = require ('../models/user.model')
 const ObjectID = require ('mongoose').Types.ObjectId

    
 module.exports.getAllUsers = async (req,res)=>{
     const users = await UserModel.find().select('-password')
    res.status(200).json(users)
 } 

 module.exports.userInfo = (req,res)=>{
      console.log(req.params)
      if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select("-password");
};   


 exports.updateUser = async (req, res) => {
    
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
   const user= await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
          
        $set: {
          ...req.body,
        }, 
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ message: err });
      }
    );
    res.json({msg:"user edited",user})
  } catch (err) {
      console.log(err)
    return res.status(501).json({ message: err });
  }
};

module.exports.deleteUser = async (req,res)=>{
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  
    try {
         await UserModel.findByIdAndDelete ({ _id : req.params.id})
        res.status(202).json({message:"successfully deleted ."})
        
    } catch (err) {
        console.log(err)
        return res.status(502).json({message : err})
        
    }
}
//follow
module.exports.follow = async (req, res) => {
  // if (
  //   !ObjectID.isValid(req.params.id) ||
  //   !ObjectID.isValid(req.body.idTofollow)
  // )
  //  { return res.status(400).send("ID unknown : " + req.params.id);}

  try {
    // add to the follower list
    console.log("1",req.params)
    console.log("2",req.body)
    const user=await UserModel.findOne({_id:req.params.id})
    user.following.push(req.body.idTofollow)
    // const user =await UserModel.findByIdAndUpdate(
    //   req.params.id,
    //   { $addToSet: { following: req.body.idTofollow } },
      
      // (err, docs) => {
      //   if (!err) res.status(201).json(docs);
      //   else return res.status(400).jsos(err);
      //   console.log(err)
      // }
   //probleme of aading the right id 
    // );
  await  user.save()
    console.log(user)
    // add to following list
    const user1=await UserModel.findOne({_id:req.body.idTofollow})
    user.followers.push(req.params.id)
   await user1.save()
    // const user1=await UserModel.findByIdAndUpdate(
    //   req.body.idTofollow,
    //   { $addToSet: { followers: req.params.id } },
      // { new: true, upsert: true },
      // (err, docs) => {
      //   // if (!err) res.status(201).json(docs);
      //   if (err) return res.status(400).jsos(err);
      // }
    // );
    console.log(user1)
    res.json({user})
  } catch (err) {
    console.log(err)
    return res.status(505).json({ message: err });
  }
};

 // unfollow 
 
module.exports.unfollow = async (req, res) => {
  // if (
  //   !ObjectID.isValid(req.params.id) ||
  //   !ObjectID.isValid(req.body.idToUnfollow)
  // )
  //   return res.status(400).send("ID unknown : " + req.params.id);

  try {
    const user2= await UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnfollow } },
      { new: true, upsert: true },
      // (err, docs) => {
      //   if (!err) res.status(201).json(docs);
      //   else return res.status(400).jsos(err);
      // }
    );
    console.log(user2)
    // remove to following list
   const user3=await UserModel.findByIdAndUpdate(
      req.body.idToUnfollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true },
      // (err, docs) => {
      //   // if (!err) res.status(201).json(docs);
      //   if (err) return res.status(400).jsos(err);
      // }
    );
    console.log(user3)
    
    res.json({user2})
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};