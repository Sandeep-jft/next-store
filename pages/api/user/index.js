// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectMongo from "helper/initDB"
import User from "models/user";

connectMongo();

export default async function handler(req, res) {
  try {
    switch(req.method){
      case "POST":
        await createUser(req,res);
        break;
    }
  } catch (error){
    res.status(401).json({ error })
  }
}

const createUser = async (req,res)=>{
  try{
    const {name,email,password} = req.body;
    if(!name || !email || !password ){
      throw ('Please provide all fields');
    }

    const userDetails = await User.findOne({email});
    if(userDetails){
        throw "User already exist";
    }

    const user = new User({
        name,
        email,
        password
      });
      
      const data = await user.save();
      res.status(201).json({ message: 'success', user:data })

  } catch (error){
    return res.status(500).json({ error })
  }
  
}