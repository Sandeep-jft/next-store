// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectMongo from "helper/initDB"
import User from "models/user";
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


connectMongo();

export default async function handler(req, res) {
  try {
    const {email,password} = req.body;
    if( !email || !password ){
        return res.status(422).json({error:"Please provide all fields"})

    }

    const userDetails = await User.findOne({email}).select("+password");
    if(!userDetails){
       return res.status(404).json({error:"User not found"})
    }

    // User.comparePassword(password, function(err, isMatch) {
    //     if (err) throw err;
    //     console.log(password, isMatch); // -&gt; Password123: true

    // });

    // const isPasswordMatch = await userDetails.compareUserPassword(password);

    const result = await bcrypt.compare(password, userDetails.password);

    if(!result){
        return res.status(422).json({error:"Please provide correct credentials"})
    }

    var token = jwt.sign({ userId:userDetails._id }, process.env.SECRET_KEY, {
         expiresIn:'7d'
    });

    return res.status(201).json({token,message:"Login success"});
   

  } catch (error){
    console.log('error', error);
    res.status(500).json({ error })
  }
}
